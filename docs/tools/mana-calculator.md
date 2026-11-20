# Mana Calculator

How many cards can your build get through before it runs dry? Mana carries over from card to card and nothing refills it for free, so a build that's fine for one fight can start skipping casts halfway through a deck.

Fill in your class, your spell slots, and the numbers from your character screen. Add your teammates if they help with mana, then set the mana cost increase and regen reduction to match the run you're planning.

<div id="pdx-mana-calc" class="pdx-calc-root"><p>The calculator needs JavaScript to run.</p></div>

!!! tip "Running Poison with Extraction?"
    You need not apply. Every fourth hit hands back mana for each Poison stack on the target, so a Thief stacking Poison basically never runs out.

## How it counts

Every card is played out in small steps, using these rules:

- **Each card's fight lasts 40 seconds.** That's when [fatigue](../combat/index.md#fatigue) kicks in, so it's the longest a fight goes before something gives, and it's fair to slower builds.
- **Every ability starts on cooldown.** Nothing casts at 0 seconds. Each ability casts the moment its cooldown ends.
- **If you can't afford a cast, it's skipped,** and its cooldown starts over.
- **Mana Regen ticks every 5 seconds,** and whatever mana you have left carries into the next fight.
- **Regen reduction cuts every 5 second tick,** including Harmony. <span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> It cuts Arcane Infusion too, since that is also regen.
- **Nothing else refills you.** No potions, food, or Rests, since none of them are guaranteed.
- **Haste doubles timers.** [Ability Haste](../combat/status-effects.md#ability-haste) speeds up cooldowns and [Weapon Haste](../combat/status-effects.md#weapon-haste) speeds up attacks. Bard songs last 0.2 seconds longer per point of Performance. <span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> Ability Speed and All Speed from gear shorten the cooldown itself, and Haste then counts that shorter cooldown down twice as fast: 20% Ability Speed turns a 10 second cooldown into 8 seconds, and Haste counts those 8 down in 4. All Speed shortens weapon attacks too, but that is already counted in the weapon speed on your stats.
- <span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span> **Cost cuts come first, then the increase.** Arcane Spell Power and Moonlight Rhapsody lower a cost before the waystone increase is applied, which is the safer way to count.
- **Teammates cast their support on cooldown,** shortened by their own Ability Speed, and party Haste speeds their timers up just like yours. The calculator doesn't track their own mana. Harmony adds the Bard's Performance to your Mana Regen.
- **Mana on Kill is added when the fight ends.** <span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> Mana on Spell Hit counts one hit per target an ability damages. Arcane Missiles always counts 3, since it fires three projectiles whatever the number of enemies.
- **Weapon abilities count as weapon hits.** They trigger Weapon Manasteal, never Mana on Spell Hit. Flurry counts each strike (3, 4 or 5 by rank), Mutilate one per weapon, Shiv one, Whirlwind one per enemy, and Split Shot two. <span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span> Piercing Shot counts once, since the enemy behind only takes a portion of the damage. Decoy's counterattack and the splash from Mighty Strikes aren't counted.
- **Only spells trigger Mana on Spell Hit.** Bard songs don't hit anything, so they never do. <span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span> Abilities that deal damage but don't sound like spells (Thunderclap, Explosive Grenade, Explosive Shot, Freezing Shot and Tranquilizing Shot) aren't treated as spells, so they don't either.
