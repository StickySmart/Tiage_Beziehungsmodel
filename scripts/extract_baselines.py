#!/usr/bin/env python3
"""
ARCHETYP BASELINE EXTRACTOR (Python)

Extrahiert alle 220 Bedürfnis-Werte aus den 8 Archetypen-Profilen
"""

import json
import re
import os
from pathlib import Path

# Basis-Pfad
BASE_PATH = Path(__file__).parent.parent

# Lade Katalog
with open(BASE_PATH / 'profiles/data/beduerfnis-katalog.json', 'r', encoding='utf-8') as f:
    katalog = json.load(f)

# Archetypen
archetyp_files = {
    'single': 'single.js',
    'duo': 'duo.js',
    'duo_flex': 'duo-flex.js',
    'solopoly': 'solopoly.js',
    'polyamor': 'polyamor.js',
    'ra': 'ra.js',
    'lat': 'lat.js',
    'aromantisch': 'aromantisch.js'
}

print('📚 Lade Archetypen-Profile...')

profiles = {}
for archetype, filename in archetyp_files.items():
    filepath = BASE_PATH / 'profiles/archetypen' / filename
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extrahiere alle '#BXX': ZAHL Paare
    needs = {}
    pattern = r"'#B(\d+)':\s*(\d+)"
    matches = re.findall(pattern, content)

    for need_num, value in matches:
        need_id = f'#B{need_num}'
        needs[need_id] = int(value)

    profiles[archetype] = needs
    print(f'✓ {archetype}: {len(needs)} Bedürfnisse')

# Extrahiere Quellen aus Single-Profil (als Beispiel)
single_path = BASE_PATH / 'profiles/archetypen/single.js'
with open(single_path, 'r', encoding='utf-8') as f:
    single_content = f.read()

# Parse quellen Array
quellen_match = re.search(r'quellen:\s*\[(.*?)\]', single_content, re.DOTALL)
quellen = []
if quellen_match:
    quellen_text = quellen_match.group(1)
    quellen = re.findall(r'"([^"]+)"', quellen_text)

print(f'\n🔬 Erstelle Baseline-Matrix...')

# Erstelle Baseline-Matrix
baselines = {}
for need_id, need_data in katalog['beduerfnisse'].items():
    if not need_id.startswith('#B'):
        continue

    baselines[need_id] = {
        'label': need_data['label'],
        'kategorie': need_data['kategorie'],
        'dimension': need_data['dimension'],
        'archetypen': {}
    }

    # Sammle Werte aus allen Archetypen
    for archetype in archetyp_files.keys():
        if need_id in profiles[archetype]:
            baselines[need_id]['archetypen'][archetype] = profiles[archetype][need_id]

# Erstelle Output
output = {
    'meta': {
        'title': 'Archetypen Bedürfnis-Baselines',
        'version': '1.0.0',
        'datum': '2025-12',
        'beschreibung': 'Wissenschaftliche Baseline-Werte der 8 Archetypen für alle 220 Bedürfnisse',
        'quellen': quellen if quellen else [
            'McCrae & Costa (1997) - Big Five Personality Traits',
            'Wismeijer & van Assen (2013) - BDSM Practitioners N=902',
            'Bartholomew & Horowitz (1991) - Attachment Theory',
            'Deci & Ryan (2000) - Self-Determination Theory'
        ],
        'N_gesamt': '60000+ (Big Five Meta-Analyse)',
        'note': 'Diese Werte repräsentieren den statistischen Erwartungswert (μ) für jeden Archetyp'
    },
    'baselines': baselines
}

# Schreibe Output
output_path = BASE_PATH / 'archetype-baselines-2025-12.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f'\n✅ Baseline-Matrix erstellt: {output_path}')
print(f'📊 {len(baselines)} Bedürfnisse × 8 Archetypen')

# Statistik
total_values = sum(len(b['archetypen']) for b in baselines.values())
print(f'✓ {total_values} Datenpunkte extrahiert')
