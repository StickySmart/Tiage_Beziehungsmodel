# Bildgenerierung für Bedürfnisse

## Übersicht

Es werden **226 Bilder** benötigt, eines für jedes Bedürfnis (#B1 bis #B226).

## Technische Anforderungen

| Eigenschaft | Wert |
|-------------|------|
| **Format** | WebP |
| **Auflösung** | 400 x 600 Pixel (Hochformat) |
| **Farbtiefe** | 8-bit (256 Farben, indexed) |
| **Dateigröße** | ~15-30 KB pro Bild |
| **Gesamtgröße** | ~5-7 MB für alle 226 Bilder |

## Dateinamen-Konvention

```
B001.webp  (Bedürfnis #B1 - Luft)
B002.webp  (Bedürfnis #B2 - Wasser)
...
B226.webp  (Bedürfnis #B226 - Vertrauen-empfangen)
```

## Speicherort

```
/assets/images/beduerfnisse/
├── image-mapping.json
├── B001.webp
├── B002.webp
├── ...
└── B226.webp
```

## Bildstil (Osho Zen Tarot inspiriert)

Die Bilder sollten im Stil der Osho Zen Tarot Karten gestaltet sein:

- **Farbpalette**: Warme Erdtöne, mystische Violett-/Blautöne
- **Stil**: Meditativ, spirituell, symbolisch
- **Bildinhalt**: Basierend auf der zugehörigen Tarot-Karte (siehe `image-mapping.json`)
- **Atmosphäre**: Ruhig, kontemplativ, tiefgründig

## Generierung mit KI (DALL-E / Midjourney)

### Beispiel-Prompt für DALL-E:

```
Osho Zen Tarot style illustration for "[KARTEN-NAME]",
mystical spiritual art, soft warm colors,
meditative atmosphere, digital painting,
portrait orientation, centered composition,
no text, no words
--ar 2:3 --style raw
```

### Batch-Generierung Script

Ein Script zur Generierung mit der OpenAI API könnte so aussehen:

```javascript
// generate-images.js (Beispiel)
const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const mapping = require('./assets/images/beduerfnisse/image-mapping.json');

async function generateImage(id, info) {
    const prompt = `Osho Zen Tarot style illustration for "${info.karte}",
        representing the concept of "${info.label}" in German spirituality,
        mystical digital art, soft warm colors, meditative,
        portrait orientation, no text`;

    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1536",
        quality: "standard"
    });

    // Download and convert to WebP 8-bit
    // ... implementation
}
```

### Geschätzte Kosten (DALL-E 3)

- ~$0.04 pro Bild (Standard Qualität)
- 226 Bilder × $0.04 = **~$9.04**

## Konvertierung zu 8-bit WebP

Nach der Generierung müssen die Bilder konvertiert werden:

```bash
# Mit ImageMagick
for file in *.png; do
    convert "$file" \
        -resize 400x600 \
        -colors 256 \
        -define webp:lossless=false \
        -quality 80 \
        "${file%.png}.webp"
done
```

Oder mit `cwebp`:

```bash
# Mit cwebp (libwebp)
for file in *.png; do
    cwebp -q 80 -resize 400 600 "$file" -o "${file%.png}.webp"
done
```

## Mapping-Datei

Die `image-mapping.json` enthält alle Zuordnungen:

```json
{
  "images": {
    "#B1": { "file": "B001.webp", "label": "Luft", "karte": "The Master" },
    "#B2": { "file": "B002.webp", "label": "Wasser", "karte": "Healing" },
    ...
  }
}
```

## JavaScript Integration

```javascript
// Bild laden
const img = BeduerfnisImages.createImageElement('#B52');
document.body.appendChild(img);

// Prüfen welche Bilder fehlen
const stats = await BeduerfnisImages.getStatistics();
console.log(`${stats.available} von ${stats.total} Bildern verfügbar`);
```

## Checkliste

- [ ] 226 Bilder generieren (oder manuell erstellen)
- [ ] Bilder auf 400x600 px skalieren
- [ ] Zu 8-bit WebP konvertieren
- [ ] Dateien nummeriert benennen (B001.webp - B226.webp)
- [ ] In `/assets/images/beduerfnisse/` speichern
- [ ] Mit `BeduerfnisImages.getStatistics()` prüfen

## Alle Bedürfnisse mit Karten-Zuordnung

| ID | Label | Osho Zen Karte |
|----|-------|----------------|
| #B1 | Luft | The Master |
| #B2 | Wasser | Healing |
| #B3 | Nahrung | Conditioning |
| #B4 | Bewegung | Adventure |
| #B5 | Berührung | Touch |
| #B6 | Erholung | No-Thingness |
| #B7 | Sexueller-Ausdruck | Passion |
| #B8 | Physische-Sicherheit | Courage |
| #B9 | Unterschlupf | Harmony |
| #B10 | Beständigkeit | Completion |
| ... | ... | ... |

(Vollständige Liste siehe `image-mapping.json`)
