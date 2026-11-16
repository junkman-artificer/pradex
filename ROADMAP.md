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
7. **Ezraek commits manually.** Give the PowerShell commands, never run git.
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

**Section and label names.** Advice from experience goes under "Field notes" ("Early field notes" on class pages). Data plate labels are short nouns: "Access", "Shares gear with", "Found in".

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

## Next steps, in order

### 1. Finish what is half built

- [ ] **Leveling Uniques page.** The class pages only show hand picked Uniques. `tools/data/leveling-uniques.txt` lists every leveling Unique Monster and its loot, but in shorthand (for example "MR" is ambiguous). Re-read each monster's loot from the official site (see "Reading the official site" below), build full cards with the generator pattern in `tools/data/unique-card-generator-example.py`, and put them on a new page, suggested `gearing-up/leveling-uniques.md`, grouped by region in level order. Honeyglow Bear, Whispering Phantom and Sylthara have no cards anywhere today.

### 2. Extend the dex pattern to the pages that are already entries

Each of these is a set of like things, which is exactly what entry numbers and pills are for. Do one set at a time and show Ezraek a screenshot before doing the rest.

- [ ] **Professions.** `# Smithing { data-no="01" data-kind="Profession" }` on the five crafting pages, with pills for the crystal each one uses (Fire, Wind and so on, from the Crafting page).
- [ ] **Status effects.** Each status on `combat/status-effects.md` is already an entry with an "At a glance" plate. Add a pill row under each H2 for its type (Damage over time, Debuff, Control, Buff). H2s can't take the H1 number style, so use pills only.
- [ ] **Class tiles.** On `classes/index.md`, show each class's role pill inside its tile so the colours introduced on the class pages appear one click earlier.
- [ ] **Region table.** Replace the wording in the "Gear drop rules" column on `waystones/regions/index.md` with attribute pills plus a short note.

### 3. New dex features, biggest payoff first

- [ ] **Monster Dex.** A page of Unique Monsters as entries: number, level, where it spawns, what it drops. The data is in `tools/data/leveling-uniques.txt` for leveling and on the region pages for waystones. Ask Ezraek before naming spawn decks as certain, and say "can spawn in" for chance spawns.
- [ ] **Ability Dex.** The official class pages list every ability with level, cost and cooldown. The class pages currently only show the level 12 subclass tables. A full, filterable ability list per class (Active, Passive, Trait) would be the most used reference page on the site.
- [ ] **A real "entry not found" page.** A custom 404 in the screen style: "No data. This entry hasn't been logged yet." plus a link home. Needs `custom_dir` enabled in `zensical.toml`, so test the build.
- [ ] **What's Changed.** `reference/changelog.md` is empty. A dated list styled as a device log would show the guide is alive.

### Parked: the Unique Dex tracker

A "Found?" toggle on every Unique item card plus a checklist page with a progress bar was built and then removed on 2026-11-16. It could only save progress in one browser, and Ezraek's call is that it needs real storage and accounts to be worth having. Don't rebuild it on browser storage. Revisit only if the site ever gets sign in or a hosted database.

### 4. Content still waiting on Ezraek

Placeholders left in the site, to fill by spitballing one section at a time:

- Parties: Building a Team (Ezraek is reworking the layout), Synergies (one filled, one empty template), formation tips on Combat.
- Enchanting Strategy: "Replace or reroll?", "What to prioritize", "More tricks".
- Maximizing Waystones: all three sections.
- Region pages: Overview, Things to watch out for, Tips on all five.
- In game checks: shop caps marked `[ ]` on the crafting pages, Alchemy and Cooking required levels, crafting attribute ranges, Blind stacking, Alchemy +1 and +2 quality, whether Moonlight Rhapsody's mana discount applies to non spell abilities.

### 5. Known rough edges

None right now. Every page was checked at 360, 390 and 1280 px on 2026-11-16 with nothing scrolling sideways. Keep it that way: wrap any new wide table in `<div class="pdx-compact" markdown>`, and show Unique items as `pdx-item` cards, never as table rows.

## Reading the official site

pradotraveler.com is a Next.js app, so plain fetches return an empty shell. Open it in a real browser tab and read `document.body.innerText`. Useful paths: `/classes/WAR` (and MAG, THF, PRI, BRD, BLO, RNG), `/decks`, `/decks/<id>`, `/monsters`, `/vendors`. Loot tables are on each monster's page. Two leveling monsters (Silverhorn Stag, Old Briar Lord) list no loot.

## Testing a change

```powershell
zensical serve
```

Then check the page at phone width in the browser's device toolbar. Before handing back: the build prints "No issues found" and nothing scrolls sideways at 360 px.
