# Pradex roadmap

A working plan for making Pradex feel like a real Pokedex for Prado Traveler. Written on 2026-11-16 as a handover, so any assistant (or Ezraek) can pick it up cold.

## How to work on this project

These are standing rules from Ezraek. Follow them before anything else.

1. **Discuss first.** Explain each change and wait for a yes before making it.
2. **One question at a time.**
3. **No em dashes anywhere, and no dashes at all in site text.**
4. **Keep things similar.** Reuse the existing formats and wording before inventing new ones.
5. **Hand written sections belong to Ezraek.** Proofread, fact check and suggest. Draft only when asked ("spitball").
6. **Never present a farming spot as the best one without checking with Ezraek.** There is no public loot table.
7. **Ezraek commits manually.** Give the PowerShell commands, never run git. Put them on one pasteable line: `git add -A; git commit -m "..."; git push`.
8. **Always re-read a file from disk right before editing it,** keep its line endings (most Markdown here is CRLF, the CSS and JS are LF), and verify the write afterward.
9. **Check every visual change at 360, 390 and 1280 px wide.** No sideways page scrolling on phones.

## The design language

The site is a handheld dex: a red casing (header and footer), a dark screen (the content panel), green readouts for anything the "device" says, and gold for anything Unique.

| Colour | Token | Meaning |
|---|---|---|
| Red `#dc0a2d` | `--pdx-red` | The casing. Header, footer edge, the bar under each page title. |
| Screen green `#7ee08f` | `--pdx-screen` | Device readouts: links, labels, entry numbers, table headers, progress. |
| Gold `#f2c230` | `--pdx-amber` | Unique items, found state, tips. |
| Ink `#12161b` | `--pdx-ink` | Boxes sitting on the screen. |

Stat colours are used the same way everywhere (item card chips, attribute pills, the STR/DEX/INT abbreviations): **STR red, DEX green, INT blue** to match the game, then **Health pink, Mana purple, Barrier teal, Spell Power gold** so they never clash with the attributes. Don't introduce a second scheme.

Type: **Chakra Petch** (`--pdx-readout`) for anything the device "prints" (headings, labels, numbers, pills). Body text stays in the theme font so guides stay easy to read.

Voice: guide pages use Ezraek's casual voice. Reference pages stay short and dex-like.

All of this lives in `docs/stylesheets/extra.css`. The section headed "Pokedex layer 2" holds the components below.

## Component cookbook

**Dex entry header.** Put the number on the H1 and the pills right under it:

```markdown
# Warrior { data-no="01" data-kind="Class" }

<p class="pdx-types"><span class="pdx-type pdx-type--bruiser">Bruiser</span><span class="pdx-tag">Everyone</span></p>
```

- `pdx-type` is a solid colour pill. Role colours: `--bruiser`, `--caster`, `--skirmisher`, `--cleric`, `--support`, `--juggernaut`, `--marksman`. Attribute colours: `--str`, `--dex`, `--int`.
- `pdx-tag` is a quiet outlined pill for facts like availability.
- Numbers in use: Classes 01 to 07, Regions 01 to 05. Two digits everywhere, since no set will reach 100.

**Data plate.** Any `!!! info` box whose list items start with a bold label becomes a label and value table automatically. Keep labels to one or two words so they don't wrap on phones.

**Menu tiles.** Every `<div class="grid cards" markdown>` grid gets the tile style, and the whole tile is clickable. Add `pdx-numbered` to the class list (`grid cards pdx-numbered`) only when the tile numbers match entry numbers, as on the Classes page. Ezraek decided numbers anywhere else are clutter.

**Unique item cards.** The existing `pdx-item` cards, used for every Unique item on the class, Arena and region pages.

**Confidence tags.** Three levels, used everywhere a claim isn't certain. Never write "likely", "seems to" or "hasn't been confirmed" in running text. Use the tag instead:

```html
<span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span>
<span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span>
```

- No tag means **Confirmed**: the game or the official site says so.
- **Observed**: seen in play or testing, no official source. Put the tag in front of the sentence.
- **Unconfirmed**: a best guess nobody has tested. In icon tooltips, where HTML can't go, write "Unconfirmed: " in front of the text.
- Both words are defined in the Glossary. Ask Ezraek which level a new claim belongs at.

**Section and label names.** Advice from experience goes under "Field notes" ("Starter notes" on class pages). Data plate labels are short nouns: "Access", "Shares gear with", "Found in".

**Boxes.** Colours carry meaning, so pick the box by meaning: `info` is device data (green), `tip` is advice (gold), `warning` is a mistake to avoid (orange), `??? note` is reserved for Unique item sources (gold edge), `??? abstract` for long reference tables, `??? example` for worked maths, `??? question` for FAQ entries.

## What was done on 2026-11-16

- Screen scanlines and glow, breadcrumbs as a status line, sidebar cursor, footer casing.
- One palette for every admonition and collapsible. "At a glance" boxes became data plates.
- Dex entry headers on all 7 class pages and all 5 region pages.
- Menu tiles (numbered only on the Classes page), readout table headers, glossary entry styling.
- Confidence tags (Observed, Unconfirmed) replaced every hedged phrase. "Tips" sections became "Field notes".
- Site description set to "Field Guide: ONLINE. Accessing all known data on Prado Traveler." It shows in link previews and search results.
- Home page boot screen with counts for classes, regions and professions. These are typed by hand in `docs/index.md`, so update them if a class or region is added.
Nothing in the written guides was changed.

## What was done on 2026-11-17

- **Spellbooks section** (`docs/spellbooks/`), right after Classes in the menu. A landing page with the drop rule, a "Going deeper" tip and a link to the learning steps in First Steps, plus one page per class with every ability on its own row. Traits are left out (they have no spellbook). Each class page ends its Starter notes with a "Need a spellbook?" link.
- **Ability names link to the official ability page** (`pradotraveler.com/abilities/<id>`, opens in a new tab), so descriptions and drop lists stay current without upkeep.
- **Deck data saved** to `data/decks.json` (outside `docs/`, not published): all 84 decks with region, type, level, card counts, common monsters and the 13 deck chains.
- **Maximizing Waystones** written with Ezraek: keep decks small, rune sorting rules, saving VITA as a group, Shrines then Treasures, and two Observed field notes.
- **Crafting data filled:** Smithing and Tailoring attribute ranges, Alchemy and Cooking required levels, and Stormwatch Provisions shop stock (Thundercap, Elderwort, Frost Hide, Frostfern).
- **Uniques section** under Gearing Up: Leveling (every leveling Unique Monster and the two treasure boxes, by region), Endgame (waystone Uniques from the region pages, plus Stormcaller Drake, Icehowl and Zephyra, whose gear stays strong in T5), and Arena (moved off the Arena page, which now links to it). The Leveling and late boss cards were built from the official monster and item pages. The class pages keep their hand picked "Uniques to watch for".
- **Off-hand types:** cards name the real type (Orb, Relic, Shield, Instrument, Quiver) instead of "Off-hand". The official site only says "Offhand", so ask Ezraek when a new one turns up.
- **Arena draws** treated as a loss (Unconfirmed).

## How the spellbook tables are built

Rerun this if the game adds abilities, decks or shop stock.

1. **Drops follow level, not monster.** A spellbook drops from any common monster within 1 level of the ability's required level (the "Spellbook Dropped By" list on each ability page confirms it).
2. **Buy beats farm.** If any shop sells the book ("Manual of ..." on a vendor page), the row says "Buy at <cheapest shop>, <price>". Pricier shops go in the store icon hovertext: `:lucide-store:{ title="Also at <shop> for <price>" }`. Ezraek confirmed spellbooks are always in stock. Sunflower Market sells every class's first two books for 50 copper, each class has a guild shop in Eastern Gate, Westfield Supply Store, Gloomguard Armaments and Gale's Training Yard sell a few more.
3. **Farm spot = highest share of Monster cards,** counting every deck in a chain you must clear first (chains are in `data/decks.json`). Only Adventure and Travel decks count. Current picks by ability level: 2 Pebble Beach, 3 to 4 Whispering Caves, 5 to 6 Old Mill Dungeon, 7 Thieves' Hideout, 8 to 9 Old City Catacombs then The Bone Gallery, 10 to 12 Sunken Crypts, 13 Gloomwood Den, 14 to 16 Goblin Warrens, 17 to 18 Briarstone Keep then The Guard Tower, 19 to 20 Shepherd's Steppes, 21 to 23 Icetooth Peaks, 24 Ravenspire Tower through The Arcanist's Study.
4. **Level 25 books** come from waystones. If the ability page has a Tier box, the row says "Farm in T3+ waystones" (the Tier is a minimum). Untiered ones say "Farm in any waystone".
5. **The tables stay about the spellbook only.** No leveling advice in the rows (Ezraek's call); the landing page tip covers Venture Deeper.

## Next steps, in order

### 1. Finish what is half built

Nothing right now.

### 2. Extend the dex pattern to the pages that are already entries

Each of these is a set of like things, which is exactly what entry numbers and pills are for. Do one set at a time and show Ezraek a screenshot before doing the rest.

- ~~**Professions.**~~ Dropped (Ezraek): dex headers on the crafting pages added nothing.
- [x] **Status effects.** Done 2026-11-17: a colored type pill under each status (`pdx-type--dot`, `--debuff`, `--cc`, `--buff`), and the Type line came out of the data plates. Ezraek turned down extra tags for Stacks and Immunity since the plate already says it.
- ~~**Class tiles.**~~ Dropped 2026-11-17 (Ezraek): role pills on the tiles only repeated the text already there.
- ~~**Region table.**~~ Dropped 2026-11-17 (Ezraek): attribute pills added nothing a five row table needs.

### 3. New dex features, biggest payoff first

- ~~**Monster Dex.**~~ Covered better by the Uniques pages (Leveling, Endgame, Arena) and the monster cards on each region page.
- ~~**Ability Dex.**~~ Covered better by the Spellbooks pages, which list every ability per class and link to the official ability page.
- [x] **A real "entry not found" page.** Done 2026-11-17: `overrides/404.html` ("Unknown No. ??", link home), with `custom_dir` on in `zensical.toml`. Locally it only looks right when served under `/pradex/`.
- [x] **What's Changed.** Filled in 2026-11-17, newest first, player-facing changes only. Add a dated entry when something notable ships.

### Parked: the Unique Dex tracker

A "Found?" toggle on every Unique item card plus a checklist page with a progress bar was built and then removed on 2026-11-16. It could only save progress in one browser, and Ezraek's call is that it needs real storage and accounts to be worth having. Don't rebuild it on browser storage. Revisit only if the site ever gets sign in or a hosted database.

### 4. Content still waiting on Ezraek

Placeholders left in the site, to fill by spitballing one section at a time:

- Parties: Building a Team (Ezraek is reworking the layout), Synergies folded into Building a Team as "Combos worth knowing" (Mana Loop, Deep Freeze, Dodge Tank, Spell Storm); review at the end whether it stays, formation tips on Combat.
- In game checks: shop caps, ongoing. Tooltips without a known cap say "Sold at <shop>" (Alembics & Infusions, plus Moonmoss, Dreamshade and Frostfern at Stormwatch Provisions); every shop rotates its stock, so add caps as screenshots come in, Leatherworking attribute ranges (waiting on screenshots), Magic, Spirit and Mystic essence costs for imbuing Gloomhaven gear, Arena draw rating, whether Blind and Dazzle add up (both can be on one enemy; seen 2026-11-17), Alchemy +1 and +2 quality, whether Moonlight Rhapsody's mana discount applies to non spell abilities.

### 5. Known rough edges

None right now. Every page was checked at 360, 390 and 1280 px on 2026-11-16 with nothing scrolling sideways. Keep it that way: wrap any new wide table in `<div class="pdx-compact" markdown>` (use `pdx-compact pdx-dense` for four or more columns, which shrinks the text a little on phones), and show Unique items as `pdx-item` cards, never as table rows.

## Reading the official site

pradotraveler.com is a Next.js app, so plain fetches return an empty shell. Open it in a real browser tab and read `document.body.innerText`. Useful paths: `/classes/WAR` (and MAG, THF, PST, BRD, BLO, RNG), `/abilities/<id>` (Tier box and "Spellbook Dropped By"), `/decks`, `/decks/<id>` (card counts, monsters, "Connected Decks"), `/monsters`, `/locations/<id>` and `/vendors/<id>` (shop stock and prices). To move between pages without a fresh approval each time, use `window.next.router.push(path)` in the open tab. Calling the backend API directly is blocked, so read pages instead. Loot tables are on each monster's page. Two leveling monsters (Silverhorn Stag, Old Briar Lord) list no loot.

## Testing a change

```powershell
zensical serve
```

Then check the page at phone width in the browser's device toolbar. Before handing back: the build prints "No issues found" and nothing scrolls sideways at 360 px.

## Needs Proof

`docs/reference/needs-proof.md` lists every Unconfirmed claim on the site. Whenever an Unconfirmed tag is added or cleared, update that table in the same change so it never drifts. Observed items stay off it. Leatherworking attributes are not on it: Ezraek is filling those in from game data before launch.
