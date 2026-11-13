# Status Effects

What each status effect does, how to apply it, and how to protect yourself from it. Combat is automatic, so these all come from your gear, consumables, and class abilities.

Each status lists:

- **At a glance:** its type, how long it lasts, whether it stacks, and whether a Shield can make you immune.
- **Apply it:** stats, consumables, and abilities that cause it.
- **Empower it:** things that make the status hit harder or last longer.
- **Works well with:** things that take advantage of a target that has it.

Abilities are listed by name. Higher ranks of the same ability are stronger or last longer. See each [class page](../classes/index.md) for exact numbers.

!!! tip "Protection from every status"
    - **% Reduced Status Effect Debuff Duration** (Suffix) shortens every status effect on you. See [Stats](../gearing-up/stats.md#status-effects).
    - Some abilities remove negative statuses: **Cleanse** and **Mass Dispel** (Priest), **Berserk** (Warrior), and **Bloodrage** (Blood Knight).

## Bleed

!!! info "At a glance"
    - **Type:** Damage over time
    - **Duration:** 4 to 7 seconds, depending on the source
    - **Stacks:** Yes
    - **Immunity:** Immune to Bleed (Shield Prefix)

Deals damage every second, and each application adds its own stack. The number on a Bleed icon is that stack's **damage per second**.

How much each stack deals depends on the source:

- **Blood Strike and Cruel Weapon** (Blood Knight) scale with the **target's** max health, so they hit hardest against big, tanky enemies.
- **Blood Boil** (Blood Knight) scales with **your** max health.
- **Hemorrhage** (Warrior) deals a flat amount each second.

??? example "Bleed math"
    Blood Strike IV applies Bleed for 25 + 5.25% of the target's max health over 7 seconds. Against a Ward Captain with 3,488 max health:

    - 5.25% of 3,488 = 183.1, plus 25 = **208.1 total damage**
    - Spread over 7 seconds = **about 30 per second**, which is the number shown on that stack

- **Apply it:**
    - % Chance to Apply Bleed (Suffix)
    - Hemorrhage (Warrior)
    - Blood Strike, Cruel Weapon, Blood Boil (Blood Knight)
- **Works well with:**
    - % Bonus Damage to Bleeding Targets (Suffix)
    - Death Strike: extra damage per Bleed stack (Blood Knight)
    - Heart Strike: heals per Bleed stack (Blood Knight)

## Blind

!!! info "At a glance"
    - **Type:** Debuff
    - **Duration:** 4 seconds from Flash Bomb
    - **Stacks:** [ ]
    - **Immunity:** Immune to Blind (Shield Prefix)

Increases the target's chance to miss. Shown as **Blinded** in combat replays.

How much depends on the source: Flash Bomb adds 30% at rank I and 45% at rank II. Blind from **% Chance to Apply Blind** likely adds 30%, but that hasn't been confirmed.

- **Apply it:**
    - % Chance to Apply Blind (Suffix)
    - Flash Bomb: the target and adjacent enemies (Thief)

## Burn

!!! info "At a glance"
    - **Type:** Damage over time
    - **Duration:** 3 seconds from abilities
    - **Stacks:** Yes
    - **Immunity:** Immune to Burn (Shield Prefix)

Deals damage over time. Each rank deals more:

| Rank | Base damage |
|---|---|
| Burn I | 3 |
| Burn II | 6 |
| Burn III | 9 |
| Burn IV | [12?] |
| Burn V | [15?] |

Higher ranks of Burn abilities apply higher ranks of Burn.

- **Apply it:**
    - % Chance to Apply Burn (Suffix)
    - Fireball, Firebrand Weapon, Dragon's Breath (Magician)
    - Explosive Shot (Ranger)
- **Empower it:** Fire Spell Power: every 4 points adds 1 Burn damage

## Curse

!!! info "At a glance"
    - **Type:** Debuff
    - **Duration:** 5 seconds
    - **Stacks:** No. Reapplying it refreshes the duration.
    - **Immunity:** None

Lowers the target's magic resistance by **40%** for **5 seconds**.

- **Apply it:** % Chance to Curse (Suffix)

## Deep Wound

!!! info "At a glance"
    - **Type:** Debuff
    - **Duration:** 5 seconds
    - **Stacks:** No. Reapplying it refreshes the duration.
    - **Immunity:** None

Reduces the target's healing from all sources by **40%** for **5 seconds**.

- **Apply it:** % Chance to Deep Wound (Suffix)

## Enfeeble

!!! info "At a glance"
    - **Type:** Debuff
    - **Duration:** 5 seconds
    - **Stacks:** No. Reapplying it refreshes the duration.
    - **Immunity:** None

Reduces the target's damage by **40%** for **5 seconds**.

- **Apply it:** % Chance to Enfeeble (Suffix)

## Freeze

!!! info "At a glance"
    - **Type:** Crowd control
    - **Duration:** 1 to 3 seconds, depending on the source
    - **Stacks:** No, and it has diminishing returns
    - **Immunity:** Immune to Freeze (Shield Prefix)

Stops **all** of the target's action timers, both weapon attacks and abilities, for as long as it lasts. Each Freeze or Stun also gives the target diminishing returns against more Freeze and Stun for 7 seconds after it's applied. See [Freeze and Stun](index.md#freeze-and-stun).

- **Apply it:**
    - % Chance to Apply Freeze (Suffix)
    - Icebite Weapon Oil: Frostbite, a 50% chance to Freeze on weapon hits (duration unconfirmed)
    - Frostbolt, Icebrand Weapon, Blizzard (Magician)
    - Freezing Shot (Ranger)
- **Empower it:** Frost Spell Power: every 4 points adds 0.2 seconds
- **Works well with:** % Bonus Damage to Frozen Targets (Suffix)

## Hamstring

!!! info "At a glance"
    - **Type:** Debuff
    - **Duration:** 5 seconds
    - **Stacks:** No. Reapplying it refreshes the duration.
    - **Immunity:** None

Lowers the target's evasion by **40%** for **5 seconds**.

- **Apply it:** % Chance to Hamstring (Suffix)

## Poison

!!! info "At a glance"
    - **Type:** Damage over time
    - **Duration:** 7 seconds, longer with Poison Duration
    - **Stacks:** Yes
    - **Immunity:** Immune to Poison (Shield Prefix)

Deals **1 damage per stack, every second**. Each poisoning ability applies a set number of stacks, listed in its description, and **Poison Potency** adds more.

For example, a level 1 Poisoned Dagger applies 1 stack, so it deals 1 damage per second. With +2 Poison Potency, it applies 3 stacks and deals 3 damage per second.

- **Apply it:**
    - % Chance to Apply Poison (Suffix)
    - Blight Weapon Oil: 33% chance on weapon hits
    - Deadly Poison, Poisoned Dagger, Strangling Gas (Thief)
    - Serpent Shot (Ranger)
- **Empower it:**
    - Poison Potency (Prefix, Daggers only): each point adds 1 stack to your poisoning abilities
    - Poison Duration (Prefix)
- **Works well with:**
    - % Bonus Damage to Poisoned Targets (Suffix)
    - Venomous Strike: extra damage per Poison stack (Thief)
    - Leech and Extraction: restore health and mana per Poison stack (Thief)

## Slow

!!! info "At a glance"
    - **Type:** Crowd control
    - **Duration:** 1 to 1.75 seconds, depending on the source
    - **Stacks:** Its duration appears to add up, but it never slows more than half speed.
    - **Immunity:** None

Makes the target's weapon and ability timers count down at **half speed**, so every attack and ability takes twice as long to come back. Slowed timers show a blue tint in combat replays. Reapplying Slow keeps it going longer, but never makes timers slower than half speed.

??? example "How we measured it"
    In a replay, two enemies' timers counted down at 1.0 second per second until a Bard's Requiem of Suffering landed. From then on, every timer on both enemies counted down at 0.5 seconds per second, for the rest of the fight.

    The Slow was reapplied several times during that stretch, and the timers never got any slower than half speed. Repeated Slows seem to keep it going longer, not make it stronger.

- **Apply it:**
    - Thunderclap (Warrior)
    - Requiem of Suffering, Sorcerer's Lament (Bard)
- **Empower it:** Performance: every point adds 0.2 seconds to song-based Slows (Bard)

## Stun

!!! info "At a glance"
    - **Type:** Crowd control
    - **Duration:** 1 to 3 seconds, depending on the source
    - **Stacks:** No, and it has diminishing returns
    - **Immunity:** None

Stops **all** of the target's action timers, both weapon attacks and abilities, for as long as it lasts. Each Freeze or Stun also gives the target diminishing returns against more Freeze and Stun for 7 seconds after it's applied. See [Freeze and Stun](index.md#freeze-and-stun).

- **Apply it:**
    - % Chance to Apply Stun (Suffix)
    - Kidney Punch, Subduing Strike (Thief)
- **Works well with:** % Bonus Damage to Stunned Targets (Suffix)

## Sunder Armor

!!! info "At a glance"
    - **Type:** Debuff
    - **Duration:** 5 seconds
    - **Stacks:** No. Reapplying it refreshes the duration.
    - **Immunity:** None

Reduces the target's armor by **40%** for **5 seconds**.

- **Apply it:** % Chance to Sunder Armor (Suffix)

## Positive effects

Not every status is bad. These are buffs that help you or your allies.

!!! tip "Enemies can remove these"
    The Priest's **Purge** and **Mass Exorcism** remove positive effects from enemies, so don't be surprised when enemy casters strip yours too.

### Ability Haste

!!! info "At a glance"
    - **Type:** Buff
    - **Duration:** 1 second from Bard songs, longer with Performance
    - **Stacks:** Its duration appears to add up, but it never speeds timers past double.
    - **Removed by:** Purge, Mass Exorcism

Makes ability timers count down at **double speed**, so abilities come back in half the time. It's the mirror of [Slow](#slow). It doesn't affect weapon timers.

- **Get it:**
    - Wizard's Minuet, Moonlight Rhapsody, Meadowland Pastoral (Bard songs, whole party)
    - Virtuoso: a short burst every time the Bard casts an ability (Bard trait)
- **Empower it:** Performance: every point adds 0.2 seconds to song-based Haste (Bard)

??? example "How we measured it"
    In the same replay used for Slow, the party's ability timers counted down at 1.0 second per second until the Bard's songs landed. From then on, they counted down at 2.0 seconds per second for the rest of the fight, while weapon timers stayed at normal speed.

    The songs reapplied Haste for about 15 seconds straight, and ability timers never went past double speed.

### Weapon Haste

!!! info "At a glance"
    - **Type:** Buff
    - **Duration:** 1 to 5 seconds, depending on the source
    - **Stacks:** Its duration appears to add up, but it never speeds timers past double, even from two different sources.
    - **Removed by:** Purge, Mass Exorcism

Makes weapon timers count down at **double speed**, so you attack twice as often. It's the weapon version of [Ability Haste](#ability-haste). It doesn't affect ability timers.

- **Get it:**
    - Soldier's Fanfare, Ode to Glory, Rogue's Scherzo, Dancer's Bagatelle (Bard songs, whole party)
    - Bloodrage (Blood Knight)
    - Quick Draw (Ranger, self only, together with Ability Haste)
- **Empower it:** Performance: every point adds 0.2 seconds to song-based Haste (Bard)

??? example "How we measured it"
    In an Arena replay, a Bard alternated two Weapon Haste songs. The party's weapon timers counted down at 1.0 second per second until the first song landed. From then on, they counted down at 2.0 seconds per second for the rest of the fight, while their ability timers stayed at normal speed.

    The two songs overlapped often, and weapon timers never went past double speed.

    In a second replay, a Blood Knight cast Bloodrage while a Bard's Weapon Haste song was already running. The Blood Knight's weapon timer stayed at 2.0 seconds per second the whole time, the same speed as allies who only had the song.
