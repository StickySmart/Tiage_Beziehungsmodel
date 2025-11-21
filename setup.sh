#!/bin/bash

# Setup Script für Tiage_Beziehungsmodell in Claude Code
# ========================================================

echo "🚀 Initialisiere Tiage_Beziehungsmodell Repository..."

# 1. Erstelle Projekt-Struktur
echo "📁 Erstelle Ordnerstruktur..."
mkdir -p data
mkdir -p visualizations
mkdir -p docs
mkdir -p src/generators
mkdir -p src/scripts

# 2. Kopiere Dateien
echo "📄 Kopiere Dateien..."
cp README.md ./
cp kategorien_b-f.json ./data/
cp beziehungsmodelle-b-f-praesentation.html ./visualizations/
cp analyse.md ./docs/

# 3. Initialisiere Git
echo "🔧 Initialisiere Git Repository..."
git init

# 4. Erstelle .gitignore
echo "📝 Erstelle .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*.log

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Temp files
*.tmp
*.bak
EOF

# 5. Erste Commit
echo "💾 Erstelle initialen Commit..."
git add .
git commit -m "Initial commit: Tiage Beziehungsmodell with categories B-F"

# 6. Füge Remote hinzu (wenn noch nicht vorhanden)
echo "🔗 Verbinde mit GitHub..."
git remote add origin https://github.com/StickySmart/Tiage_Beziehungsmodell.git 2>/dev/null || echo "Remote bereits vorhanden"

# 7. Optional: NPM initialisieren für zukünftige Web-Features
echo "📦 Initialisiere NPM (optional)..."
cat > package.json << 'EOF'
{
  "name": "tiage-beziehungsmodell",
  "version": "1.0.0",
  "description": "Datengetriebene Analyse von Beziehungsmodellen",
  "main": "index.js",
  "scripts": {
    "start": "python -m http.server 8000",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/StickySmart/Tiage_Beziehungsmodell.git"
  },
  "keywords": [
    "beziehungsmodelle",
    "tiage",
    "visualisierung",
    "datenanalyse"
  ],
  "author": "StickySmart",
  "license": "MIT"
}
EOF

echo "✅ Setup abgeschlossen!"
echo ""
echo "Nächste Schritte:"
echo "1. Führe 'git push -u origin main' aus um zu GitHub zu pushen"
echo "2. Öffne visualizations/beziehungsmodelle-b-f-praesentation.html im Browser"
echo "3. Starte mit 'claude-code .' in Claude Code"
echo ""
echo "Projekt-Struktur:"
tree -L 2 2>/dev/null || ls -la

