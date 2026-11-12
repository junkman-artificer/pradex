# Combat

Prado is an autobattler, so fights play out on their own. Your job is the setup: your class, your gear, your formation, and who's in your party.

## How a fight plays out

Every character attacks on a timer set by their weapon **Speed**, the time between weapon attacks, where lower is better. Abilities fire automatically once they're off cooldown and you have the mana.

A fight ends when one side is defeated. If **both** sides go down at the same time, it's a **draw**:

- **Adventure decks:** a draw counts as a defeat, and your party returns to town.
- **[Arena](../arena/index.md):** your rating doesn't change.

### Fatigue

!!! warning "Fights can't last forever"
    Once a fight passes **40 seconds** of in-game time, **everyone** starts taking **fatigue damage** every second, players and monsters alike, and it keeps growing the longer the fight goes.

This exists so no fight can go on forever. Since monsters take fatigue damage too, a party with strong healing can sometimes outlast an enemy it can't out-damage and let fatigue finish the job. It's a risky plan, though: fatigue keeps growing, and if both sides go down, it's a draw, which counts as a loss in adventure decks.

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

[Tips for building a formation: who to put up front, who to tuck in back, and how party makeup changes it.]

## Weapon range

Every weapon is either melee or ranged, which affects its damage, who it can target, and related weapon abilities.

| Range | Weapons | Can target |
|---|---|---|
| Ranged | Bows, Wands | Front line or back line |
| Melee | Everything else (Swords, Daggers, Spears, Great Axes, Staves, and so on) | Front line only |

Bows are the go-to back line weapon for Warriors, Thieves, and Bards. Wands are a one-handed ranged option for Magicians and Priests. Blood Knights are melee only.

### Hitting more than one enemy

Some weapons can roll Suffixes that spread their damage across the formation grid:

| Affix | Also hits | Weapons |
|---|---|---|
| Pierce | Enemies in the same column, behind your target | Bows, Spears |
| Cleave | Enemies in the same row as your target | Clubs, Great Axes, Great Swords, Maces, Staves |
| Splash | Enemies in the same row and column | Clubs only |

Swords, Daggers, Axes, and Wands can't roll any of these.

### Magical weapons

**Staves** (melee) and **Wands** (ranged) are magical weapons. Unlike physical weapons, they:

- Scale their damage with **Intellect**
- Benefit from **+ Magical Damage**
- Are reduced by the target's **Magic Resistance** instead of Armor

## Damage types

All damage is either **Physical** or **Magical**.

| Type | Examples | Reduced by |
|---|---|---|
| Physical | Weapon attacks, Hemorrhage, Explosive Shot | Armor |
| Magical | Fireball, Frostbolt, Staves, Wands | Magic Resistance |

Every character starts with **20% Magic Resistance**, and gear can add more. Higher level monsters are more likely to use magical abilities, so Magic Resistance matters more as you progress.

The game doesn't label every ability as Physical or Magical yet. In general, you can tell by its theme: fire, frost, and arcane are magical, and weapon strikes are physical.

## Barrier

Barrier is a shield that absorbs damage before your health does.

- It starts **full** at the beginning of every fight.
- Damage hits Barrier first, and that damage **isn't reduced by Armor**.
- Once Barrier is gone, Armor applies as normal and the rest goes to your health.
- It refills through **Barrier Regen**, certain abilities, and some on-hit effects.

Barrier shows up most often on Intellect-based armor.

## Targeting

- **Melee** attackers can only target the enemy front line.
- **Ranged** attackers can target either line.
- **Provoke** (Warrior) forces enemies to attack the Warrior for a few seconds, and it overrides **Focus Target**. Once Provoke ends, they go back to their original target.

!!! bug "Focus Target can reach the back line"
    The Thief's level 8 **Focus Target** trait can currently ignore formations and lock onto the back line. This is reportedly a bug, and a fix is expected.

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

In the **combat replay**, damage and healing text are shown separately, and Freeze, Stun, and Provoke each have their own color. Click a status icon in the replay to see what it does.

## More combat topics

<div class="grid cards" markdown>

-   :lucide-zap:{ .lg .middle } __Status Effects__

    ---

    What every status does, how to apply it, and how to protect against it.

    [:lucide-arrow-right: View statuses](status-effects.md)

</div>
