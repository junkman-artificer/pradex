import html, pathlib
C={'Armor':'c-oth','Health':'c-hp','Mana':'c-mana','Strength':'c-str','Dexterity':'c-dex','Intellect':'c-int','Health Regen':'c-hp','Mana Regen':'c-mana',
 'Barrier':'c-bar','Barrier Regen':'c-bar','Reduce All Damage':'c-oth','Reduce Physical Damage':'c-oth','Evasion':'c-oth','All Hit Rating':'c-oth','All Crit Rating':'c-oth',
 'Poison Spell Power':'c-sp','Poison Duration':'c-oth','Weapon Speed':'c-oth','Magic Resistance':'c-oth','Frost Spell Power':'c-sp','Cleave':'c-oth','Holy Spell Power':'c-sp',
 'Health on Spell Hit':'c-hp','Mana on Spell Hit':'c-mana','Weapon Hit Rating':'c-oth','Weapon Crit Rating':'c-oth','Double Strike':'c-oth'}
def dps(d,s):
    a,b=[int(x) for x in d.split('-')]; v=(a+b)/2/float(s[:-1]); return f"{v+1e-9:.2f}"
# name: (slot, weapon(dmg,speed) or None, stats[(name,val)], req[(attr,val)])
I={
"Crypt Raider's Axe":("Axe",("11-14","4.0s"),[("Strength","3"),("Health Regen","2")],[("Strength","10")]),
"Catacomb Staff":("Staff",("10-11","3.8s"),[("Intellect","3"),("Mana Regen","3"),("Holy Spell Power","2")],[("Intellect","10")]),
"Gloomwood Longbow":("Bow",("30-36","4.3s"),[("Dexterity","5"),("Weapon Hit Rating","5%"),("Weapon Crit Rating","5%"),("Double Strike","7%")],[("Dexterity","27")]),
"Fungal Mystic's Staff":("Staff",("20-24","3.7s"),[("Strength","2"),("Intellect","4"),("Mana Regen","3"),("Health on Spell Hit","3"),("Mana on Spell Hit","3")],[("Intellect","27")]),
"Boots of Relentless Pursuit":("Boots",None,[("Armor","11"),("Health","18"),("Strength","2"),("Health Regen","3")],[("Strength","14")]),
"Shadowweave Boots":("Boots",None,[("Armor","8"),("Evasion","4%"),("All Hit Rating","2%"),("All Crit Rating","2%")],[("Dexterity","10")]),
"Shadowstalker's Cowl":("Helmet",None,[("Armor","16"),("Evasion","4%"),("All Hit Rating","2%"),("All Crit Rating","2%")],[("Dexterity","10")]),
"Shadowweave Pants":("Pants",None,[("Armor","18"),("Evasion","4%"),("All Hit Rating","2%"),("All Crit Rating","2%")],[("Dexterity","10")]),
"Shadowfang Dagger":("Dagger",("7-11","2.9s"),[("Dexterity","1"),("Poison Spell Power","1"),("Poison Duration","1")],[("Dexterity","8")]),
"The Butcher's Leather Apron":("Chest",None,[("Armor","40"),("Health","18"),("Strength","6"),("Health Regen","4"),("Reduce All Damage","2%")],[("Strength","14")]),
"The Butcher's Cleaver":("Great Sword",("19-22","4.5s"),[("Strength","6"),("Health Regen","4")],[("Strength","14")]),
"Nereid's Crown":("Helmet",None,[("Armor","18"),("Intellect","4"),("Barrier","12"),("Mana Regen","2"),("Barrier Regen","2")],[("Intellect","14")]),
"Cuirass of the Deep Warden":("Chest",None,[("Armor","35"),("Intellect","3"),("Barrier","16"),("Mana Regen","2"),("Barrier Regen","2")],[("Intellect","14")]),
"Seal of the Deep Warden":("Necklace",None,[("Intellect","5"),("Mana Regen","2"),("Barrier Regen","4")],[]),
"Barkplate of Immovable Might":("Chest",None,[("Armor","56"),("Strength","4"),("Health Regen","4"),("Reduce All Damage","3%")],[("Strength","27")]),
"Worldroot Seed":("Orb",None,[("Health Regen","5"),("Mana Regen","4"),("Barrier Regen","3")],[("Intellect","27")]),
"Shadowpaw Gloves":("Gloves",None,[("Armor","15"),("Dexterity","9"),("Intellect","3"),("All Hit Rating","4%"),("All Crit Rating","4%")],[("Dexterity","33")]),
"Gloomfang":("Dagger",("20-25","2.7s"),[("Strength","2"),("Dexterity","5"),("Intellect","2"),("Poison Spell Power","2"),("Weapon Speed","10%")],[("Dexterity","33")]),
"Rune-etched Warhammer":("Club",("37-42","4.4s"),[("Strength","8"),("Health Regen","5")],[("Strength","30")]),
"Mantle of the Wild Hunt":("Cape",None,[("Armor","17"),("Health","12"),("Mana","16"),("Dexterity","5"),("Intellect","7")],[("Dexterity","33")]),
"Band of Endless Growth":("Ring",None,[("Health Regen","5"),("Mana Regen","5")],[]),
"Lightning Striker Gauntlets":("Gloves",None,[("Armor","20"),("Strength","4"),("Dexterity","9"),("Intellect","4"),("Evasion","4%"),("Magic Resistance","5%"),("All Hit Rating","4%"),("All Crit Rating","4%"),("Weapon Speed","7%")],[("Dexterity","52")]),
"Stormcaller Drake's Crown":("Helmet",None,[("Armor","46"),("Dexterity","7"),("Intellect","7"),("Evasion","6%"),("Magic Resistance","7%"),("All Hit Rating","5%"),("All Crit Rating","5%"),("Weapon Speed","10%")],[("Dexterity","52")]),
"Drakehide Harness":("Chest",None,[("Armor","59"),("Strength","6"),("Dexterity","9"),("Evasion","8%"),("Magic Resistance","6%"),("All Hit Rating","5%"),("All Crit Rating","5%"),("Weapon Speed","9%")],[("Dexterity","52")]),
"Icehowl's Resilience":("Chest",None,[("Armor","88"),("Health","40"),("Strength","10"),("Dexterity","6"),("Frost Spell Power","5"),("Magic Resistance","8%"),("Reduce All Damage","6%")],[("Strength","56")]),
"Ravenspire War Axe":("Great Axe",("54-57","4.3s"),[("Strength","12"),("Dexterity","5"),("Intellect","5"),("Mana Regen","6"),("Cleave","15%")],[("Strength","44")]),
"Heart of Winter":("Necklace",None,[("Strength","12"),("Intellect","10"),("Frost Spell Power","2"),("Health Regen","6")],[]),
"Zephyra's Skywalkers":("Boots",None,[("Armor","28"),("Health","14"),("Mana","20"),("Strength","4"),("Dexterity","8"),("Intellect","5"),("Evasion","8%"),("Magic Resistance","5%"),("Health Regen","3"),("Mana Regen","3")],[("Dexterity","52"),("Intellect","52")]),
}
RC={'Strength':'c-str','Dexterity':'c-dex','Intellect':'c-int'}
def card(n):
    slot,w,st,req=I[n]
    h=f'<div class="pdx-item"><div class="pdx-item__head"><span class="pdx-item__name">{html.escape(n,quote=True).replace("&#x27;","&#x27;")}</span><span class="pdx-item__slot">{slot}</span></div>'
    if w:
        d,s=w; h+=f'<div class="pdx-tiles"><div class="pdx-tile"><b class="t-dmg">{d}</b><span>Damage</span></div><div class="pdx-tile"><b class="t-dps">{dps(d,s)}</b><span>DPS</span></div><div class="pdx-tile"><b class="t-spd">{s}</b><span>Speed</span></div></div>'
    h+='<div class="pdx-label">Stats</div><div class="pdx-chips">'+''.join(f'<span class="pdx-chip">{a} <b class="{C[a]}">{v}</b></span>' for a,v in st)+'</div>'
    h+='<div class="pdx-label">Requirements</div><div class="pdx-chips">'+(''.join(f'<span class="pdx-chip">{a} <b class="{RC[a]}">{v}</b></span>' for a,v in req) if req else '<span class="pdx-chip pdx-chip--none">None</span>')+'</div></div>'
    return h
S={ # source: (where)
"Skeleton's Chest":"The treasure box for finishing The Bone Gallery (Eastern Gate). Every item in it is level 9.",
"Goblin Treasure Box":"The treasure box for finishing Thronheart Chamber (Gloomhaven). Every item in it is level 16.",
"The Watchman":"Most adventure decks in Eastern Gate. Level 11 gear.",
"Master of Shadows":"The Underbelly (Eastern Gate). Level 8 to 9 gear.",
"The Butcher of the Burrows":"Most decks in The Burrows, plus Travel to the Burrows. Level 11 gear.",
"Calypthia, the Guardian Nereid":"Relic's Rest, at the end of the Sunken Crypts :lucide-move-right: The Drowned Tombs :lucide-move-right: Relic's Rest triple-decker (The Burrows). Level 11 gear.",
"Worldroot Treant":"Most adventure decks in Gloomhaven. Level 16 gear.",
"Nocturnis":"Most decks in Briarstone Quarry. Level 18 gear.",
"Krag Skullsplitter, the Goblin King":"The Throne Room (Briarstone Quarry). Level 17 to 18 gear.",
"Briar Beast":"The Beast's Lair (Briarstone Quarry). Level 16 to 18 gear.",
"Stormcaller Drake":"Most Stormwatch travel decks, plus Howling Gorge. Level 23 gear.",
"Icehowl, the Elder Giant":"Frostbite Ridge, Phantom's Perch and Ascend to Icetooth Base Camp (Stormwatch), plus Icetooth Peaks (Icetooth Base Camp). Level 21 to 24 gear.",
"Zephyra, Queen of the Skies":"Icetooth Peaks (Icetooth Base Camp). Level 24 gear.",
}
SEAL='''    !!! tip "Hold onto the Seal"
        Almost every class needs Mana Regen to keep its abilities going, and there are only a few places it can roll on gear. Jewelry rarely drops too, so outside of a lucky Smithing craft, the Seal of the Deep Warden is likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25.
'''
def block(src,items,why,extra=''):
    slots=', '.join(dict.fromkeys(I[i][0] for i in items))
    out=f'??? note "{src}: {slots}"\n    **Where:** {S[src]}\n\n    **Why:** {why}\n\n'
    out+='\n\n'.join('    '+card(i) for i in items)+'\n'
    if extra: out+='\n'+extra
    return out
P={
'warrior':[
("Skeleton's Chest",["Crypt Raider's Axe"],"Early Strength plus Health Regen, and it's one of the first Uniques most players can get."),
("The Butcher of the Burrows",["The Butcher's Cleaver","The Butcher's Leather Apron"],"The Cleaver is a big Strength Great Sword for damage, and the Apron adds Health, Health Regen and Reduce All Damage whichever way you build."),
("Calypthia, the Guardian Nereid",["Seal of the Deep Warden"],"Jewelry rarely drops and Mana Regen only rolls in a few places, so outside of a lucky Smithing craft, this is likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25."),
("Krag Skullsplitter, the Goblin King",["Rune-etched Warhammer"],"A hard-hitting club with +8 Strength and Health Regen."),
("Icehowl, the Elder Giant",["Ravenspire War Axe"],"+12 Strength and 15% Cleave, so your hits spill over onto a second target."),
],
'magician':[
("Calypthia, the Guardian Nereid",["Nereid's Crown","Cuirass of the Deep Warden","Seal of the Deep Warden"],"Intellect, Mana Regen and Barrier on every piece. The Seal is the real prize: jewelry rarely drops and Mana Regen only rolls in a few places, so outside of a lucky Smithing craft, it's likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25."),
("Goblin Treasure Box",["Fungal Mystic's Staff"],"Intellect and Mana Regen, plus Health and Mana on Spell Hit to keep you casting."),
("Worldroot Treant",["Worldroot Seed"],"An Orb with 4 Mana Regen, plus Health and Barrier Regen."),
("Icehowl, the Elder Giant",["Heart of Winter"],"10 Intellect and Frost Spell Power, plus Health Regen."),
],
'thief':[
("Master of Shadows",["Shadowweave Boots","Shadowstalker's Cowl","Shadowweave Pants","Shadowfang Dagger"],"Evasion, Hit and Crit on every armor piece, plus a poison dagger. A great early set for a Thief."),
("Calypthia, the Guardian Nereid",["Seal of the Deep Warden"],"Jewelry rarely drops and Mana Regen only rolls in a few places, so outside of a lucky Smithing craft, this is likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25."),
("Nocturnis",["Gloomfang","Shadowpaw Gloves"],"Gloomfang adds 10% Weapon Speed and Poison Spell Power, and the gloves bring Dexterity, Hit and Crit."),
("Stormcaller Drake",["Lightning Striker Gauntlets","Stormcaller Drake's Crown","Drakehide Harness"],"Weapon Speed, Hit, Crit and Evasion on all three pieces."),
],
'priest':[
("Skeleton's Chest",["Catacomb Staff"],"Holy Spell Power, Intellect and Mana Regen all in one early weapon."),
("Calypthia, the Guardian Nereid",["Nereid's Crown","Cuirass of the Deep Warden","Seal of the Deep Warden"],"Intellect, Mana Regen and Barrier on every piece. The Seal is the real prize: jewelry rarely drops and Mana Regen only rolls in a few places, so outside of a lucky Smithing craft, it's likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25."),
("Goblin Treasure Box",["Fungal Mystic's Staff"],"An upgrade over the Catacomb Staff, with Health and Mana on Spell Hit to keep the heals going."),
("Briar Beast",["Band of Endless Growth"],"5 Health Regen and 5 Mana Regen on a ring."),
],
'bard':[
("Calypthia, the Guardian Nereid",["Seal of the Deep Warden"],"Jewelry rarely drops and Mana Regen only rolls in a few places, so outside of a lucky Smithing craft, this is likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25."),
("Goblin Treasure Box",["Gloomwood Longbow"],"A back line bow with Dexterity, Hit, Crit and Double Strike."),
("Briar Beast",["Mantle of the Wild Hunt","Band of Endless Growth"],"The cape covers both Dexterity and Intellect plus Mana, and the ring brings both regens."),
("Zephyra, Queen of the Skies",["Zephyra's Skywalkers"],"Dexterity, Intellect, both regens and Evasion on one pair of boots."),
],
'blood-knight':[
("The Butcher of the Burrows",["The Butcher's Cleaver","The Butcher's Leather Apron"],"Strength and Health Regen on the Cleaver, and Health, Health Regen and Reduce All Damage on the Apron."),
("The Watchman",["Boots of Relentless Pursuit"],"Health, Strength and Health Regen, with nothing wasted."),
("Worldroot Treant",["Barkplate of Immovable Might"],"56 Armor, Health Regen and 3% Reduce All Damage."),
("Icehowl, the Elder Giant",["Icehowl's Resilience"],"88 Armor, 40 Health, Magic Resistance and 6% Reduce All Damage."),
],
'ranger':[
("Master of Shadows",["Shadowweave Boots","Shadowstalker's Cowl","Shadowweave Pants"],"Evasion, Hit and Crit on every piece, early on."),
("Calypthia, the Guardian Nereid",["Seal of the Deep Warden"],"Jewelry rarely drops and Mana Regen only rolls in a few places, so outside of a lucky Smithing craft, this is likely the only Mana Regen necklace you'll see while leveling. Pretty much everyone wears it all the way from 11 to 25."),
("Goblin Treasure Box",["Gloomwood Longbow"],"A bow with Dexterity, Hit, Crit and Double Strike."),
("Nocturnis",["Shadowpaw Gloves"],"Dexterity, Hit and Crit."),
("Stormcaller Drake",["Lightning Striker Gauntlets","Stormcaller Drake's Crown","Drakehide Harness"],"Weapon Speed, Hit, Crit and Evasion on all three pieces."),
],
}
src=pathlib.Path('/tmp/claude-0/-home-claude/8a2b0970-5db2-5a62-bac8-4fc76e9a0751/scratchpad/rewrite/base/docs/classes'); out=pathlib.Path('/mnt/user-data/outputs/uniques-v3'); out.mkdir(parents=True,exist_ok=True)
OLD="""Uniques you can find while leveling that are worth keeping an eye out for:

| Item | Where to find it | Why it's worth grabbing |
|---|---|---|
| [Item name] | [Location] | [What makes it good] |
| [Item name] | [Location] | [What makes it good] |
"""
NEW_INTRO="Uniques you can find while leveling that are worth keeping an eye out for.\n\n"
for cls,blocks in P.items():
    b=(src/f'{cls}.md').read_bytes(); nl='\r\n' if b'\r\n' in b else '\n'; t=b.decode().replace('\r\n','\n')
    assert t.count(OLD)==1,cls
    t=t.replace(OLD, NEW_INTRO+'\n'.join(block(*x) for x in blocks))
    (out/f'{cls}.md').write_bytes(t.replace('\n',nl).encode())
print('ok')
