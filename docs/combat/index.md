# Combat

You can't steer a fight once it starts, but knowing how one plays out shows you what to set up beforehand. This page covers fatigue, formations, weapon range, damage types, targeting, and how hits and blocks work.

## How a fight plays out

Every character attacks on a timer set by their weapon **Speed**, the time between weapon attacks, where lower is better. Abilities fire automatically once they're off cooldown and you have the mana.

A fight ends when one side is defeated. If **both** sides go down at the same time, it's a **draw**:

- **Adventure decks:** a draw counts as a defeat, and your party returns to town.
- **[Arena](../arena/index.md):** a draw counts as a loss. <span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span>

### Fatigue

!!! warning "Fights can't last forever"
    Once a fight passes **40 seconds** of in-game time, **everyone** starts taking **fatigue damage** every second, players and monsters alike, and it keeps growing the longer the fight goes.

This keeps fights from dragging on forever. Monsters take fatigue damage too, so a party with strong healing can sometimes outlast an enemy it can't out-damage and let fatigue finish the job. Just know it's a risky plan: fatigue keeps growing, and if both sides go down at once, it's a draw. In adventure decks, a draw counts as a loss.

## Formations

Your party fights in a **2x2 grid**: two front line slots and two back line slots. Where each character stands changes who can hit them and how hard they hit back.

!!! info "Arena is 3v3"
    [Arena](../arena/index.md) matches are always three players against three.

### Front line

- **Enemy melee attacks can only target your front line.** Melee attackers have to break through before they can reach anyone behind.
- **Stepping up:** when a front line character falls, the ally behind them steps forward and counts as front line from then on, with no melee penalty.

### Back line

- **Melee attacks and abilities deal 35% less damage** from the back line. It's safer back there, but it's no place for an axe or a sword.
- **Ranged attacks and abilities have no back line penalty.**

### Who goes where

- **Put your melee fighters up front.** Warriors, Blood Knights and dual-wielding Thieves do their damage up close, and the back line cuts melee damage by 35%. Blood Knights are melee only, so they belong up front every time.
- **Put your ranged attackers and casters in back.** Rangers, Magicians and Priests lose nothing back there, and it keeps the fragile ones out of reach of enemy melee.
- **Two and two is the natural fit.** With two melee and two ranged, everyone lands where they're strongest.
- **Too many melee? Grab a bow.** If three of you fight up close, whoever ends up in back takes the 35% hit. Warriors and Thieves can switch to a bow and lose nothing. Bards can too, but they give up their instrument, their biggest source of Performance.
- **Think about who steps up.** When a front liner falls, the ally behind them takes their place, so put your sturdier back liner behind the front liner most likely to drop first.
- **Some abilities only help the front line.** A Magician's Firebrand and Icebrand Weapon add damage to front line weapon attacks, so they're at their best when the front is where your damage comes from. A Priest's Divine Shield and Holy Weapon keep the front line alive with Barrier and healing on every weapon hit, so they're at their best when the front is soaking the hits.

!!! tip "Shuffle between fights"
    You can change your formation between battles. If someone needs a breather and you have no other way to recover them, swap them to the back for a fight or two.

## Weapon range

Every weapon is either melee or ranged, which affects its damage, who it can target, and related weapon abilities.

<div class="pdx-compact" markdown>

| Range | Weapons | Can target |
|---|---|---|
| Ranged | Bows, Wands | Front line or back line |
| Melee | Everything else (Swords, Daggers, Spears, Great Axes, Staves, and so on) | Front line only |

</div>

Bows are the go-to back line weapon for Warriors, Thieves, and Bards. Wands are a one-handed ranged option for Magicians and Priests. Blood Knights are melee only.

### Hitting more than one enemy

Some weapons can roll Suffixes that spread their damage across the formation grid:

<div class="pdx-compact" markdown>

| Affix | Also hits | Weapons |
|---|---|---|
| Pierce | Enemies in the same column, behind your target | Bows, Spears |
| Cleave | Enemies in the same row as your target | Clubs, Great Axes, Great Swords, Maces, Staves |
| Splash | Enemies in the same row and column | Clubs only |

</div>

Swords, Daggers, Axes, and Wands can't roll any of these.

### Magical weapons

**Staves** (melee) and **Wands** (ranged) are magical weapons. Unlike physical weapons, they:

- Scale their damage with **Intellect**
- Benefit from **+ Magical Damage**
- Are reduced by the target's **Magic Resistance** instead of Armor

## Damage types

Almost all damage is either **Physical** or **Magical**.

<div class="pdx-compact" markdown>

| Type | Examples | Reduced by |
|---|---|---|
| Physical | Weapon attacks, Hemorrhage, Explosive Shot | Armor |
| Magical | Fireball, Frostbolt, Staves, Wands | Magic Resistance |
| Pure <span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> | Blood Strike's Bleed, Mighty Strikes, more below | Nothing |

</div>

**Pure** damage ignores both Armor and Magic Resistance. So far it has turned up on Bleeds that scale with the enemy's max health, the bonus damage from a Thief's Venomous Strike, a Bard's Requiem of Suffering, and the splash from a Warrior's Mighty Strikes. Drain Life also scales with the enemy's health, but it isn't Pure.

Every character starts with **20% Magic Resistance**, and gear can add more. Higher level monsters are more likely to use magical abilities, so Magic Resistance matters more as you progress.

Most abilities have a tag in game showing their damage type, but not all of them. When one doesn't, you can usually tell by its theme: fire, frost, and arcane are magical, and weapon strikes are physical.

## Barrier

Barrier is a shield that absorbs damage before your health does.

- It starts **full** at the beginning of every fight.
- Damage hits Barrier first, and that damage **isn't reduced by Armor or Magic Resistance**.
- Once Barrier is gone, Armor applies as normal and the rest goes to your health.
- It refills through **Barrier Regen**, certain abilities, and some on-hit effects.

Barrier shows up most often on Intellect-based armor.

## Targeting

- **Melee** attackers can only target the enemy front line.
- **Ranged** attackers can target either line.
- **Provoke** (Warrior) forces enemies to attack the Warrior for a few seconds, and it overrides **Focus Target**. <span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span> Once Provoke ends, they may go back to their original target or pick a new one.

!!! bug "Focus Target can reach the back line"
    Right now, the Thief's level 8 **Focus Target** trait can ignore formations and lock onto the back line. It's reportedly a bug, and a fix is on the way.

## Freeze and Stun

Freeze and Stun have two extra rules so they can't lock someone down forever:

- **Diminishing returns:** each Freeze or Stun puts a counter on the target for **7 seconds**. Every counter **halves** the length of the next Freeze or Stun.
- **No stacking:** two Freezes or Stuns at the same time don't add together. The target is only frozen or stunned as long as the longest one.

See [Status Effects](status-effects.md) for everything else about statuses.

## Hitting, missing, and blocking

- **Hit chance** against **Evasion** decides whether an attack lands.
- **Crit chance** decides whether it critically strikes, and **Crit Multiplier** decides how hard.
- **Block** cuts the damage of an attack in half. **Block Rate** decides how often you block, and **Block Value** blocks additional damage on top of that.

Some Suffixes also hit back: **Return Damage on Block** damages an attacker when you block, and **Return Damage on Hit** damages an attacker when they hit you.

For what each stat does, see [Stats](../gearing-up/stats.md).

## Reading a fight

After each fight, the **combat summary** shows how much damage, healing, and stun each ability contributed, plus how much damage each player took and how many attacks they evaded.

In the **combat replay**, damage and healing text are shown separately, and Freeze, Stun, and Provoke each have their own color. Not sure what a status does? Click its icon in the replay.

## More combat topics

<div class="grid cards" markdown>

-   :lucide-zap:{ .lg .middle } __Status Effects__

    ---

    What every status does, how to apply it, and how to protect against it.

    [:lucide-arrow-right: View statuses](status-effects.md)

</div>

[:lucide-arrow-right: Next: Status Effects](status-effects.md)
