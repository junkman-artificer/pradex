# Enchanting

Enchanting changes an item's affixes using essence. This page covers how it all works. Looking for tips and priorities? Check out [Strategy](strategy.md).

[:lucide-sparkles: Official enchantments list](https://www.pradotraveler.com/enchantments){ .md-button .md-button--primary target="_blank" }

## Essences

The essence you need depends on the item level of the gear you're enchanting.

<div class="pdx-compact" markdown>

| Essence | Item level |
|---|---|
| :lucide-flame:{ .flame--blue } Magic Essence | 1 to 10 |
| :lucide-flame:{ .flame--red } Spirit Essence | 11 to 20 |
| :lucide-flame:{ .flame--green } Mystic Essence | 21 to 30 |
| :lucide-flame:{ .flame--purple } Astral Essence | 31 and up |

</div>

<span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> These ranges come from testing.

## Spending an attunement

Every enchant uses one of the item's [attunements](../gearing-up/rarity.md#what-are-attunements) plus essence. You can spend it in one of two ways.

### Replace an affix

Roll a whole new affix for a slot. You're offered **three random choices** from that slot's pool, and the one you pick overwrites what was there. This is also how you fill an empty slot.

<div class="pdx-compact" markdown>

| Essence | Cost to replace an existing affix |
|---|---|
| :lucide-flame:{ .flame--blue } Magic Essence | 3 |
| :lucide-flame:{ .flame--red } Spirit Essence | 4 |
| :lucide-flame:{ .flame--green } Mystic Essence | 5 |
| :lucide-flame:{ .flame--purple } Astral Essence | 6 |

</div>

Filling an empty slot costs more, and the cost goes up with every affix the item already has.

<div class="pdx-compact pdx-dense" markdown>

| Affixes already on the item | :lucide-flame:{ .flame--blue } Magic | :lucide-flame:{ .flame--red } Spirit | :lucide-flame:{ .flame--green } Mystic | :lucide-flame:{ .flame--purple } Astral |
|---|---|---|---|---|
| 1 | [ ] | [ ] | [ ] | 5 |
| 2 | [ ] | [ ] | [ ] | [ ] |
| 3 | [ ] | [ ] | [ ] | 7 |
| 4 | [ ] | [ ] | [ ] | [ ] |

</div>

<span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> These costs come from testing. <span class="pdx-status pdx-status--unconfirmed" title="A best guess that hasn't been tested yet.">Unconfirmed</span> Astral costs seem to go up by 1 for each affix already on the item.

### Reroll a value

Keep the affix, but reroll its number within its range. [Essence cost.]

!!! tip "You can't roll the same value twice"
    A reroll never lands on the value you already have. So if an affix has a 6 to 7 range and yours is a 6, a reroll is a guaranteed upgrade to 7.

## Imbuing

Imbuing raises an item's rarity by one tier. It's the only enchanting operation that uses a shard.

<div class="pdx-compact" markdown>

| Imbue | Gains | Attunements |
|---|---|---|
| Socketed or Common to Uncommon | 2 random affixes | Rolls 1 to 2 |
| Uncommon to Rare | 1 to 4 more random affixes, depending on item level | Rolls a fresh 2 to 4 |

</div>

It costs one shard matching the item's level, plus crafting materials for that type of gear. For example, imbuing a Linen Shirt takes 1 Strange Shard and 3 Linen Cloth. Shards come from disenchanting.

<span class="pdx-status pdx-status--observed" title="Seen in play or testing. No official source.">Observed</span> Gear that has no crafting materials, like the jewelry and weapons from Gloomhaven, costs essence instead.

<div class="pdx-compact pdx-dense" markdown>

| Imbue | :lucide-flame:{ .flame--blue } Magic | :lucide-flame:{ .flame--red } Spirit | :lucide-flame:{ .flame--green } Mystic | :lucide-flame:{ .flame--purple } Astral |
|---|---|---|---|---|
| Socketed to Uncommon | [ ] | [ ] | [ ] | 4 |
| Uncommon to Rare | [ ] | [ ] | [ ] | 6 |

</div>

<div class="pdx-compact" markdown>

| Shard | Item level |
|---|---|
| Strange Shard | 1 to 10 |
| Glowing Shard | 11 to 20 |
| Brilliant Shard | 21 to 30 |
| Prismatic Shard | 31 and up |

</div>

!!! tip "Spend your Uncommon attunements first"
    Imbuing refills your attunements, so don't let your Uncommon ones go to waste. Use every one to land great starting affixes or max out their values before you imbue to Rare.

!!! bug "Attunements didn't refill?"
    That's a bug! Report it on the [Prado Discord](https://discord.gg/CnB2zBeN65) and someone can help sort it out.