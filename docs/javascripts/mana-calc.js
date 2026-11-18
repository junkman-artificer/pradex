// Pradex mana calculator. Runs a fight-by-fight simulation of your mana.
// Rules (from Pradex and in-game testing):
//   a fight lasts 40 seconds (fatigue), every ability starts on cooldown,
//   an ability casts the moment it comes off cooldown, a cast you can't afford
//   is skipped and its cooldown restarts, Mana Regen ticks every 5 seconds,
//   mana carries over between fights, and haste doubles timers.
(function () {
  "use strict";

  var CLASSES = [
    ["WAR", "Warrior"], ["MAG", "Magician"], ["THF", "Thief"], ["PST", "Priest"],
    ["BRD", "Bard"], ["BLO", "Blood Knight"], ["RNG", "Ranger"]
  ];
  var FIGHT = 40, DT = 0.05, MAX_FIGHTS = 100;

  function all() { return window.PDX_ABILITIES || []; }
  function ab(row) {
    return { cls: row[0], level: row[1], tier: row[2], type: row[3], name: row[4], mana: row[5], cd: row[6], text: row[7] };
  }
  function family(name) { return name.replace(/ (II|III|IV|V)$/, ""); }
  function num(re, text) { var m = re.exec(text); return m ? parseFloat(m[1]) : 0; }

  // Damaging abilities that don't sound like spells. Treated as not tagged "spell", so no Mana on Spell Hit.
  var NOT_SPELLS = ["Explosive Shot", "Freezing Shot", "Tranquilizing Shot", "Explosive Grenade", "Thunderclap"];

  // What an ability does to mana and timers, read from its text.
  function effects(a) {
    var t = a.text, e = {};
    e.abilityHaste = num(/Ability Haste for ([\d.]+) second/, t) || num(/Ability and Weapon Haste for ([\d.]+) second/, t);
    e.weaponHaste = num(/Weapon Haste for ([\d.]+) second/, t) || num(/Ability and Weapon Haste for ([\d.]+) second/, t);
    e.isSong = /^(Sound|Play|Intone|Sing|Strike up|Weave|Compose|Perform) /.test(t);
    e.selfOnly = /granting yourself/.test(t);
    e.costCut = num(/reduces mana cost of allies' spells by ([\d.]+)/, t);
    e.infusion = num(/giving ([\d.]+) mana regen per second for 3 seconds/, t);
    e.partyMana = num(/health and ([\d.]+) mana to all allies/, t);
    e.oneMana = num(/health and ([\d.]+) mana to an allied character/, t);
    // Weapon hits from abilities, for Weapon Manasteal. These never count as spell hits.
    var strikes = /Deal (\d+) main-hand weapon strikes/.exec(t);
    if (strikes) e.wHits = parseInt(strikes[1], 10);
    else if (/with both weapons/.test(t)) e.wHits = "weapons";
    else if (/with your off-hand weapon/.test(t)) e.wHits = 1;
    else if (/[\d.]+% weapon damage/.test(t)) {
      if (/all enemies/.test(t)) e.wHits = "all";
      else if (/twin arrows/.test(t)) { e.wHits = 2; e.wCap = true; }
      else e.wHits = 1;
    } else e.wHits = 0;
    // Spell hits, for Mana on Spell Hit: damaging abilities that aren't weapon strikes.
    var damaging = !e.wHits && NOT_SPELLS.indexOf(family(a.name || "")) < 0 && /damage/.test(t) && !/whenever|missed attacks/i.test(t) && !/weapon damage|weapon strike|weapon attack|Bleed|reducing|reduces|damage taken|damage received|missing/.test(t) && !e.isSong;
    if (/arcane damage|projectiles/.test(t) && /3 arcane projectiles/.test(t)) { e.hits = 3; e.fixedHits = true; }
    else if (damaging && /enemies adjacent to your target are struck/.test(t)) e.hits = 3; // the target and up to two beside it
    else if (damaging && /all enemies|each enemy|enemy front line/.test(t)) e.hits = "all";
    else if (damaging && /adjacent/.test(t)) e.hits = 2;
    else e.hits = damaging ? 1 : 0;
    return e;
  }

  // Highest rank of each family a character has unlocked at a level.
  function unlocked(cls, level) {
    var best = {};
    all().map(ab).forEach(function (a) {
      if (a.cls !== cls || a.level > level) return;
      var f = family(a.name);
      if (!best[f] || a.level > best[f].level || (a.level === best[f].level && a.tier >= best[f].tier)) best[f] = a;
    });
    return best;
  }

  var SUPPORT = {
    BRD: ["Harmony", "Wizard's Minuet", "Moonlight Rhapsody", "Meadowland Pastoral", "Soldier's Fanfare", "Ode to Glory", "Rogue's Scherzo", "Dancer's Bagatelle"],
    MAG: ["Arcane Infusion"],
    PST: ["Prayer of Healing", "Healing Word"]
  };

  // ---------- simulation ----------
  function simulate(cfg) {
    var casters = [];
    function addCaster(list, who, perf, speed) {
      // Gear speed shortens cooldowns, capped at a 90% cut so a typo can't zero them out.
      var cut = 1 - Math.min(90, speed || 0) / 100;
      list.forEach(function (a) { casters.push({ a: a, e: effects(a), who: who, perf: perf || 0, cd: a.cd * cut, t: a.cd * cut }); });
    }
    addCaster(cfg.mine, "me", cfg.myPerf, cfg.abilitySpeed);
    cfg.mates.forEach(function (m, i) { addCaster(m.abilities, "mate" + i, m.perf, m.speed); });

    var regenMul = 1 - Math.min(100, cfg.regenRed) / 100;
    var regen = (cfg.regen + cfg.harmony) * regenMul;
    var steal = 1 + cfg.incSteal / 100;
    var mana = cfg.maxMana, rows = [], fullPower = null;
    var partySize = 1 + cfg.mates.length;

    for (var f = 1; f <= MAX_FIGHTS; f++) {
      var start = mana, skipped = 0, cast = 0;
      var aHaste = 0, wHaste = 0, cut = 0, cutLeft = 0, infRate = 0, infLeft = 0;
      var weapons = cfg.weapons.map(function (s) { return { speed: s, t: s }; });
      var tick = 5;
      casters.forEach(function (c) { c.t = c.cd; });

      for (var time = 0; time < FIGHT - 1e-9; time += DT) {
        // Haste makes timers count down twice as fast. Gear speed already shortened the timers above.
        var aMul = aHaste > 0 ? 2 : 1, wMul = wHaste > 0 ? 2 : 1; // the weapon speed you enter already includes All Speed
        // Abilities
        for (var i = 0; i < casters.length; i++) {
          var c = casters[i];
          if (!c.a.cd) continue;
          c.t -= DT * aMul;
          if (c.t > 1e-9) continue;
          c.t += c.cd;
          var e = c.e;
          if (c.who === "me") {
            var cost = Math.max(0, c.a.mana - Math.floor(cfg.arcane / 4) - (cutLeft > 0 ? cut : 0));
            cost = Math.ceil(cost * (1 + cfg.costInc / 100));
            if (cost > mana + 1e-9) { skipped++; continue; }
            mana -= cost; cast++;
            mana += cfg.onCast;
            var hits = e.hits === "all" ? cfg.enemies : e.fixedHits ? e.hits : Math.min(e.hits, cfg.enemies);
            mana += hits * cfg.spellSteal * steal * cfg.spellHit / 100;
            var wh = e.wHits === "all" ? cfg.enemies : e.wHits === "weapons" ? Math.max(1, cfg.weapons.length) : e.wCap ? Math.min(e.wHits, cfg.enemies) : e.wHits;
            mana += wh * cfg.weaponSteal * steal * cfg.hitChance / 100;
            if (cfg.virtuoso && cfg.myPerf) aHaste += 0.1 * cfg.myPerf;
          }
          // Effects that reach you, from your casts or a teammate's
          var bonus = e.isSong ? 0.2 * c.perf : 0;
          if (e.abilityHaste && (!e.selfOnly || c.who === "me")) aHaste += e.abilityHaste + bonus;
          if (e.weaponHaste && (!e.selfOnly || c.who === "me") && !/Bloodrage/.test(c.a.name)) wHaste += e.weaponHaste + bonus;
          if (/Bloodrage/.test(c.a.name) && c.who === "me") wHaste += e.weaponHaste;
          if (e.costCut) { cut = e.costCut; cutLeft = 5; }
          if (e.infusion) { infRate = e.infusion; infLeft = 3; }
          if (e.partyMana) mana += e.partyMana;
          if (e.oneMana) mana += e.oneMana / partySize;
        }
        // Weapon hits
        weapons.forEach(function (w) {
          w.t -= DT * wMul;
          if (w.t <= 1e-9) {
            w.t += w.speed;
            var chance = cfg.hitChance / 100;
            mana += cfg.weaponSteal * steal * chance;
          }
        });
        // Regen and timed effects
        if (infLeft > 0) { mana += infRate * regenMul * DT; infLeft -= DT; }
        if (time + DT >= tick - 1e-9) { mana += regen; tick += 5; }
        aHaste = Math.max(0, aHaste - DT); wHaste = Math.max(0, wHaste - DT);
        cutLeft = Math.max(0, cutLeft - DT);
        if (mana > cfg.maxMana) mana = cfg.maxMana;
      }
      mana = Math.min(cfg.maxMana, mana + cfg.onKill * cfg.enemies);
      rows.push({ fight: f, start: start, end: mana, cast: cast, skipped: skipped });
      if (skipped && fullPower === null) fullPower = f - 1;
      if (f >= 10 && fullPower !== null && f >= fullPower + 5) break;
    }
    return { rows: rows, fullPower: fullPower };
  }

  // ---------- interface ----------
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k]; else if (k === "html") n.innerHTML = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    (kids || []).forEach(function (k) { if (k) n.appendChild(k); });
    return n;
  }
  function field(label, id, value, hint, attrs, wrapId) {
    var input = el("input", Object.assign({ type: "number", id: id, value: value, min: "0", step: "any", inputmode: "decimal" }, attrs || {}));
    var wrap = wrapId ? { class: "pdx-calc__field", id: wrapId, hidden: "hidden" } : { class: "pdx-calc__field" };
    return el("label", wrap, [el("span", { text: label }), input, hint ? el("small", { text: hint }) : null]);
  }
  function select(label, id, options, value) {
    var s = el("select", { id: id });
    options.forEach(function (o) { var op = el("option", { value: o[0], text: o[1] }); if (o[0] === value) op.selected = true; s.appendChild(op); });
    return el("label", { class: "pdx-calc__field" }, [el("span", { text: label }), s]);
  }
  function levels(max) { var o = []; for (var i = max; i >= 1; i--) o.push([String(i), String(i)]); return o; }
  function v(root, id) { var n = root.querySelector("#" + id); return n && !n.disabled ? parseFloat(n.value) || 0 : 0; }

  function build(root) {
    root.innerHTML = "";
    var form = el("div", { class: "pdx-calc" });

    // You
    var you = el("fieldset", { class: "pdx-calc__box" }, [el("legend", { text: "You" })]);
    var row1 = el("div", { class: "pdx-calc__row" }, [
      select("Class", "mc-cls", CLASSES, "MAG"), select("Level", "mc-lvl", levels(25), "25"),
      select("Subclass", "mc-sub", [["", "None"]].concat(CLASSES), ""), select("Subclass level", "mc-sublvl", levels(12), "12")
    ]);
    var abilityBox = el("div", { class: "pdx-calc__slots", id: "mc-abilities" });
    you.appendChild(row1);
    you.appendChild(el("p", { class: "pdx-calc__note", text: "Fill your spell slots the way you have them in game: 3 slots, or 4 for a Magician main from level 16 (Enchiridion). Pick a spell, then its rank. The same spell can fill more than one slot at different ranks." }));
    you.appendChild(abilityBox);

    var stats = el("fieldset", { class: "pdx-calc__box" }, [el("legend", { text: "Your character screen" }),
      el("div", { class: "pdx-calc__row" }, [
        field("Max Mana", "mc-max", 200, "Your full mana pool"), field("Mana Regen", "mc-regen", 10, "Per 5 seconds"),
        field("Arcane Spell Power", "mc-arcane", 0, "Every 4 cuts costs by 1"), field("Performance", "mc-perf", 0, "Bard main or subclass")
      ]),
      el("div", { class: "pdx-calc__row" }, [
        field("Mana on Spell Cast", "mc-oncast", 0, "Per spell you cast"), field("Mana on Spell Hit", "mc-spellsteal", 0, "Per enemy a spell hits"),
        field("Weapon Manasteal", "mc-wsteal", 0, "Per weapon hit"), field("% Increased Manasteal", "mc-incsteal", 0, "Boosts both kinds of steal")
      ]),
      el("div", { class: "pdx-calc__row" }, [
        field("Mana on Kill", "mc-onkill", 0, "Per enemy defeated"),
        field("Ability Speed %", "mc-aspeed", 0, "Shortens ability cooldowns", { max: "90" }),
        field("All Speed %", "mc-allspeed", 0, "Cooldowns and weapon speed", { max: "90" }),
        field("Spell hit chance %", "mc-shit", 90, "For Mana on Spell Hit", { max: "100" }, "mc-sgroup")
      ]),
      el("div", { class: "pdx-calc__row", id: "mc-wgroup", hidden: "hidden" }, [
        field("Main hand speed", "mc-w1", 3.0, "Speed shown in your stats"), field("Off hand speed", "mc-w2", 0, "From your stats, 0 if none"),
        field("Weapon hit chance %", "mc-hit", 90, "For Weapon Manasteal", { max: "100" })
      ])
    ]);

    var fight = el("fieldset", { class: "pdx-calc__box" }, [el("legend", { text: "The run" }),
      el("label", { class: "pdx-calc__field pdx-calc__slider" }, [
        el("span", { html: "Mana cost increase<span class=\"pdx-calc__readout\">: <b id=\"mc-incv\">0%</b></span><span class=\"pdx-calc__unit\"> (%)</span>" }),
        el("input", { type: "range", id: "mc-incr", min: "0", max: "600", step: "1", value: "0", "aria-label": "Mana cost increase slider" }),
        el("input", { type: "number", id: "mc-inc", min: "0", max: "600", step: "1", value: "0", inputmode: "numeric", class: "pdx-calc__num", "aria-label": "Mana cost increase (%)" })
      ]),
      el("label", { class: "pdx-calc__field pdx-calc__slider" }, [
        el("span", { html: "Mana Regen reduction<span class=\"pdx-calc__readout\">: <b id=\"mc-redv\">0%</b></span><span class=\"pdx-calc__unit\"> (%)</span>" }),
        el("input", { type: "range", id: "mc-redr", min: "0", max: "100", step: "1", value: "0", "aria-label": "Mana Regen reduction slider" }),
        el("input", { type: "number", id: "mc-red", min: "0", max: "100", step: "1", value: "0", inputmode: "numeric", class: "pdx-calc__num", "aria-label": "Mana Regen reduction (%)" }),
        el("small", { text: "From waystone modifiers. Set them to the harshest run you expect." })
      ]),
      el("div", { class: "pdx-calc__row" }, [
        field("Enemies per fight", "mc-enemies", 3, "Average across the run")
      ])
    ]);

    var partyBody = el("div", { id: "mc-party", hidden: "hidden" });
    var mates = el("fieldset", { class: "pdx-calc__box pdx-calc__party" }, [el("legend", {}, [
      el("button", { type: "button", class: "pdx-calc__toggle", "aria-expanded": "false", "aria-controls": "mc-party" }, [
        el("span", { text: "Your party" }), el("b", { id: "mc-pcount" }), el("small", { text: "Add teammates who help with mana" })])
      ]), partyBody]);
    partyBody.appendChild(
      el("p", { class: "pdx-calc__note", text: "Teammates' support is counted as if they cast it on cooldown. Add their subclass too, since a Bard or Priest subclass still brings Harmony or Prayer of Healing." }));
    for (var i = 0; i < 3; i++) {
      partyBody.appendChild(el("div", { class: "pdx-calc__mate", "data-i": String(i) }, [
        el("div", { class: "pdx-calc__row" }, [
          select("Teammate " + (i + 1), "mc-m" + i, [["", "Empty"]].concat(CLASSES), ""),
          select("Level", "mc-ml" + i, levels(25), "25"),
          select("Subclass", "mc-msb" + i, [["", "None"]].concat(CLASSES), ""),
          select("Subclass level", "mc-msl" + i, levels(12), "12"),
          field("Performance", "mc-mp" + i, 0, "Bard main or subclass"),
          field("Ability Speed %", "mc-mspd" + i, 0, "Ability plus All Speed", { max: "90" })
        ]),
        el("div", { class: "pdx-calc__abilities", id: "mc-ma" + i })
      ]));
    }

    var out = el("div", { class: "pdx-calc__out", id: "mc-out", "aria-live": "polite" });
    [you, stats, fight, mates, out].forEach(function (n) { form.appendChild(n); });
    root.appendChild(form);

    function castable() {
      var cls = root.querySelector("#mc-cls").value, lvl = v(root, "mc-lvl");
      var sub = root.querySelector("#mc-sub").value, subl = Math.min(12, v(root, "mc-sublvl"));
      var fams = {}, order = [];
      [[cls, lvl], [sub, sub ? subl : 0]].forEach(function (p) {
        if (!p[0]) return;
        all().map(ab).forEach(function (a) {
          if (a.cls !== p[0] || a.level > p[1] || a.type !== "Active") return;
          var key = a.cls + "|" + family(a.name);
          if (!fams[key]) { fams[key] = { cls: a.cls, name: family(a.name), ranks: [] }; order.push(key); }
          fams[key].ranks.push(a);
        });
      });
      order.sort(function (x, y) { return fams[x].name.localeCompare(fams[y].name) || fams[x].cls.localeCompare(fams[y].cls); });
      return { fams: fams, order: order, slots: cls === "MAG" && lvl >= 16 ? 4 : 3, showCls: !!sub };
    }
    // The spell name is already in the spell dropdown, so ranks only show the numeral.
    function rankName(a) { var m = / (II|III|IV|V)$/.exec(a.name); return "Rank " + (m ? m[1] : "I"); }
    function rankLabel(a) { return rankName(a) + " (" + (a.mana ? a.mana + " mana" : "health") + ", " + a.cd + "s)"; }
    function fillRank(i, c, keep) {
      var sel = root.querySelector("#mc-s" + i), rank = root.querySelector("#mc-r" + i);
      rank.innerHTML = "";
      var f = c.fams[sel.value];
      if (!f) { rank.disabled = true; rank.appendChild(el("option", { value: "", text: "No rank" })); return; }
      rank.disabled = false;
      f.ranks.forEach(function (a) { rank.appendChild(el("option", { value: a.name, text: rankLabel(a) })); });
      var names = f.ranks.map(function (a) { return a.name; });
      rank.value = keep && names.indexOf(keep) >= 0 ? keep : names[names.length - 1];
    }
    // The same spell can sit in several slots at different ranks, but each rank only once.
    // A slot that clashes moves to the highest rank still free, or empties if none is left.
    function lockRanks(spells, ranks, fams, refill) {
      var taken = [];
      ranks.forEach(function (r, i) {
        if (!r.disabled && taken.indexOf(r.value) >= 0) {
          var free = [].filter.call(r.options, function (o) { return o.value && taken.indexOf(o.value) < 0; });
          if (free.length) r.value = free[free.length - 1].value;
          else { spells[i].value = ""; refill(spells[i], r); }
        }
        taken.push(r.disabled ? "" : r.value);
      });
      ranks.forEach(function (r, i) {
        var others = taken.filter(function (u, j) { return j !== i && u; });
        [].forEach.call(r.options, function (o) { o.disabled = !!o.value && others.indexOf(o.value) >= 0; });
        [].forEach.call(spells[i].options, function (o) {
          var f = fams[o.value];
          o.disabled = !!f && o.value !== spells[i].value && f.ranks.every(function (a) { return others.indexOf(a.name) >= 0; });
        });
      });
    }
    function lockPicked() {
      var c = castable();
      lockRanks([].slice.call(abilityBox.querySelectorAll("select.mc-spell")), [].slice.call(abilityBox.querySelectorAll("select.mc-rank")), c.fams,
        function (sp) { fillRank(/\d+$/.exec(sp.id)[0], c); });
    }
    function listAbilities() {
      var c = castable();
      var old = [].slice.call(abilityBox.querySelectorAll(".pdx-calc__slot")).map(function (r) {
        return { spell: r.querySelector("select.mc-spell").value, rank: r.querySelector("select.mc-rank").value };
      });
      abilityBox.innerHTML = "";
      for (var i = 0; i < c.slots; i++) {
        var spell = el("select", { id: "mc-s" + i, class: "mc-spell", "aria-label": "Slot " + (i + 1) + " spell" });
        spell.appendChild(el("option", { value: "", text: "Empty" }));
        c.order.forEach(function (key) {
          var f = c.fams[key];
          spell.appendChild(el("option", { value: key, text: f.name }));
        });
        var rank = el("select", { id: "mc-r" + i, class: "mc-rank", "aria-label": "Slot " + (i + 1) + " rank" });
        abilityBox.appendChild(el("div", { class: "pdx-calc__slot" }, [
          el("span", { class: "pdx-calc__slotno", text: "Slot " + (i + 1) }), spell, rank
        ]));
        if (old[i] && c.fams[old[i].spell]) spell.value = old[i].spell;
        fillRank(i, c, old[i] && old[i].rank);
      }
      lockPicked();
    }
    function listSubs() {
      var cls = root.querySelector("#mc-cls").value, sub = root.querySelector("#mc-sub");
      var keep = sub.value; sub.innerHTML = "";
      [["", "None"]].concat(CLASSES.filter(function (x) { return x[0] !== cls; })).forEach(function (o) {
        sub.appendChild(el("option", { value: o[0], text: o[1] }));
      });
      sub.value = keep !== cls ? keep : "";
    }
    function listMate(i) {
      var cls = root.querySelector("#mc-m" + i).value, lvl = v(root, "mc-ml" + i);
      var subSel = root.querySelector("#mc-msb" + i), keep = subSel.value;
      subSel.innerHTML = "";
      [["", "None"]].concat(CLASSES.filter(function (x) { return x[0] !== cls; })).forEach(function (o) { subSel.appendChild(el("option", { value: o[0], text: o[1] })); });
      subSel.value = keep !== cls ? keep : "";
      var sub = subSel.value, subl = Math.min(12, v(root, "mc-msl" + i));
      var box = root.querySelector("#mc-ma" + i);
      var old = [].slice.call(box.querySelectorAll(".pdx-calc__slot")).map(function (r) {
        return { spell: r.querySelector("select.mc-tspell").value, rank: r.querySelector("select.mc-trank").value };
      });
      box.innerHTML = ""; box.dataset.harmony = "";
      if (!cls) return;
      var fams = {}, order = [];
      [[cls, lvl], [sub, sub ? subl : 0]].forEach(function (p) {
        if (!p[0]) return;
        all().map(ab).forEach(function (a) {
          if (a.cls !== p[0] || a.level > p[1] || (SUPPORT[p[0]] || []).indexOf(family(a.name)) < 0) return;
          if (a.type !== "Active") { if (family(a.name) === "Harmony") box.dataset.harmony = "1"; return; }
          var key = a.cls + "|" + family(a.name);
          if (!fams[key]) { fams[key] = { cls: a.cls, name: family(a.name), ranks: [] }; order.push(key); }
          fams[key].ranks.push(a);
        });
      });
      order.sort(function (x, y) { return fams[x].name.localeCompare(fams[y].name); });
      if (!order.length && !box.dataset.harmony) { box.appendChild(el("p", { class: "pdx-calc__note", text: "No mana support from this class or subclass." })); return; }
      box.appendChild(el("p", { class: "pdx-calc__note", text: (box.dataset.harmony ? "Harmony is always on. " : "") + "Pick the support spells they have slotted, at the rank they actually run. The same spell can fill more than one slot at different ranks. Leave a slot Empty if it holds something else." }));
      var slots = order.length ? (cls === "MAG" && lvl >= 16 ? 4 : 3) : 0;
      box._fams = fams;
      for (var k = 0; k < slots; k++) {
        var spell = el("select", { class: "mc-tspell", "data-mate": String(i), "aria-label": "Teammate " + (i + 1) + " slot " + (k + 1) + " spell" });
        spell.appendChild(el("option", { value: "", text: "Empty" }));
        order.forEach(function (key) { spell.appendChild(el("option", { value: key, text: fams[key].name })); });
        var rank = el("select", { class: "mc-trank", "aria-label": "Teammate " + (i + 1) + " slot " + (k + 1) + " rank" });
        box.appendChild(el("div", { class: "pdx-calc__slot" }, [el("span", { class: "pdx-calc__slotno", text: "Slot " + (k + 1) }), spell, rank]));
        if (old[k] && fams[old[k].spell]) spell.value = old[k].spell;
        fillMateRank(spell, rank, fams, old[k] && old[k].rank);
      }
      lockMate(box);
    }
    function fillMateRank(spell, rank, fams, keep) {
      rank.innerHTML = "";
      var f = fams[spell.value];
      if (!f) { rank.disabled = true; rank.appendChild(el("option", { value: "", text: "No rank" })); return; }
      rank.disabled = false;
      f.ranks.forEach(function (a) { rank.appendChild(el("option", { value: a.name, text: rankName(a) })); });
      var names = f.ranks.map(function (a) { return a.name; });
      rank.value = keep && names.indexOf(keep) >= 0 ? keep : names[names.length - 1];
    }
    function lockMate(box) {
      lockRanks([].slice.call(box.querySelectorAll("select.mc-tspell")), [].slice.call(box.querySelectorAll("select.mc-trank")), box._fams,
        function (sp, rk) { fillMateRank(sp, rk, box._fams, null); });
    }
    function updatePerf() {
      function isBard(a, b) { return root.querySelector(a).value === "BRD" || root.querySelector(b).value === "BRD"; }
      root.querySelector("#mc-perf").disabled = !isBard("#mc-cls", "#mc-sub");
      for (var k = 0; k < 3; k++) {
        root.querySelector("#mc-mp" + k).disabled = !isBard("#mc-m" + k, "#mc-msb" + k);
        root.querySelector("#mc-mspd" + k).disabled = !root.querySelector("#mc-ma" + k).querySelector(".pdx-calc__slot");
      }
    }
    function find(cls, name) {
      return all().map(ab).filter(function (a) { return a.cls === cls && a.name === name; })[0];
    }
    function run() {
      root.querySelector("#mc-incv").textContent = v(root, "mc-inc") + "%";
      root.querySelector("#mc-redv").textContent = v(root, "mc-red") + "%";
      var set = 0; for (var q = 0; q < 3; q++) if (root.querySelector("#mc-m" + q).value) set++;
      root.querySelector("#mc-pcount").textContent = set ? "(" + set + ")" : "";
      var mine = [].slice.call(abilityBox.querySelectorAll("select.mc-rank")).filter(function (n) { return n.value; }).map(function (n) { return find(n.id && root.querySelector("#mc-s" + n.id.slice(4)).value.split("|")[0], n.value); });
      var myCls = root.querySelector("#mc-cls").value, myLvl = v(root, "mc-lvl");
      var harmony = 0, mateList = [];
      for (var i = 0; i < 3; i++) {
        var cls = root.querySelector("#mc-m" + i).value;
        if (!cls) continue;
        var mbox = root.querySelector("#mc-ma" + i);
        var picks = [].slice.call(mbox.querySelectorAll(".pdx-calc__slot")).map(function (r) {
          var sp = r.querySelector("select.mc-tspell").value, rk = r.querySelector("select.mc-trank").value;
          return sp && rk ? find(sp.split("|")[0], rk) : null;
        }).filter(Boolean);
        var perf = v(root, "mc-mp" + i);
        if (mbox.dataset.harmony) harmony += perf;
        mateList.push({ perf: perf, speed: Math.min(90, v(root, "mc-mspd" + i)), abilities: picks.filter(function (a) { return a.cd > 0; }) });
      }
      var weapons = [v(root, "mc-w1"), v(root, "mc-w2")].filter(function (s) { return s > 0; });
      var cfg = {
        mine: mine.filter(Boolean), mates: mateList, maxMana: v(root, "mc-max"), regen: v(root, "mc-regen"), harmony: harmony,
        arcane: v(root, "mc-arcane"), myPerf: v(root, "mc-perf"), virtuoso: myCls === "BRD" && myLvl >= 16,
        onCast: v(root, "mc-oncast"), spellSteal: v(root, "mc-spellsteal"), weaponSteal: v(root, "mc-wsteal"),
        incSteal: v(root, "mc-incsteal"), spellHit: Math.min(100, v(root, "mc-shit")), onKill: v(root, "mc-onkill"), weapons: weapons, hitChance: Math.min(100, v(root, "mc-hit")),
        abilitySpeed: Math.min(90, v(root, "mc-aspeed") + v(root, "mc-allspeed")),
        costInc: v(root, "mc-inc"), regenRed: v(root, "mc-red"), enemies: Math.max(1, v(root, "mc-enemies"))
      };
      render(simulate(cfg), cfg);
    }
    function render(res, cfg) {
      out.innerHTML = "";
      if (!cfg.mine.length) { out.appendChild(el("p", { class: "pdx-calc__result", text: "Fill at least one spell slot to see your mana." })); return; }
      var head;
      if (res.fullPower === null) head = "You can keep every ability casting for " + MAX_FIGHTS + "+ cards in a row.";
      else if (res.fullPower === 0) head = "You'll start skipping casts on your very first card.";
      else head = "You can play " + res.fullPower + " card" + (res.fullPower === 1 ? "" : "s") + " at full power before you start skipping casts.";
      out.appendChild(el("p", { class: "pdx-calc__result", text: head }));
      var t = el("table", {}, [el("thead", {}, [el("tr", {}, ["Card", "Mana at start", "Mana at end", "Casts", "Skipped"].map(function (h) { return el("th", { text: h }); }))])]);
      var tb = el("tbody");
      res.rows.slice(0, Math.max(5, (res.fullPower || 0) + 3)).slice(0, 15).forEach(function (r) {
        tb.appendChild(el("tr", r.skipped ? { class: "pdx-calc__skip" } : {}, [r.fight, Math.round(r.start), Math.round(r.end), r.cast, r.skipped].map(function (x) { return el("td", { text: String(x) }); })));
      });
      t.appendChild(tb);
      out.appendChild(el("div", { class: "md-typeset__table" }, [t]));
    }

    root.addEventListener("change", function (ev) {
      // Snap typed numbers back into range, so a typo shows what is actually counted.
      var tg = ev.target;
      if (tg.type === "number" && tg.value !== "") {
        if (tg.max !== "" && +tg.value > +tg.max) tg.value = tg.max;
        if (tg.min !== "" && +tg.value < +tg.min) tg.value = tg.min;
      }
      var id = ev.target.id || "";
      if (id === "mc-cls") listSubs();
      updatePerf();
      if (/^mc-(cls|lvl|sub|sublvl)$/.test(id)) listAbilities();
      var sl = /^mc-s(\d)$/.exec(id); if (sl) { fillRank(sl[1], castable()); lockPicked(); }
      if (ev.target.classList.contains("mc-rank")) lockPicked();
      if (ev.target.classList.contains("mc-trank")) lockMate(ev.target.closest(".pdx-calc__abilities"));
      if (ev.target.classList.contains("mc-tspell")) { var mb = ev.target.closest(".pdx-calc__abilities"); fillMateRank(ev.target, ev.target.parentNode.querySelector("select.mc-trank"), mb._fams, null); lockMate(mb); }
      var m = /^mc-(?:m|ml|msb|msl)(\d)$/.exec(id); if (m) { listMate(m[1]); updatePerf(); }
      run();
    });
    function showGroups() {
      root.querySelector("#mc-wgroup").hidden = !(v(root, "mc-wsteal") > 0);
      root.querySelector("#mc-sgroup").hidden = !(v(root, "mc-spellsteal") > 0);
    }
    // The slider and the number box hold the same value. Phones get the number box only.
    root.addEventListener("input", function (ev) {
      var pair = { "mc-incr": "mc-inc", "mc-redr": "mc-red", "mc-inc": "mc-incr", "mc-red": "mc-redr" }[ev.target.id];
      if (pair) {
        var t = root.querySelector("#" + pair);
        if (ev.target.type === "range") t.value = ev.target.value;
        else t.value = Math.min(parseFloat(t.max), Math.max(0, parseFloat(ev.target.value) || 0));
      }
      showGroups(); run();
    });
    root.querySelector(".pdx-calc__toggle").addEventListener("click", function () {
      var open = this.getAttribute("aria-expanded") !== "true";
      this.setAttribute("aria-expanded", String(open));
      partyBody.hidden = !open;
    });
    listSubs();
    listAbilities();
    for (var k = 0; k < 3; k++) listMate(k);
    updatePerf();
    showGroups();
    run();
  }

  function init() {
    var root = document.getElementById("pdx-mana-calc");
    if (root && !root.dataset.ready) { root.dataset.ready = "1"; build(root); }
  }
  if (typeof document$ !== "undefined") document$.subscribe(init); else document.addEventListener("DOMContentLoaded", init);
})();
