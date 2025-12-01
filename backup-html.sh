#!/bin/bash
# HTML Backup Script
# Erstellt ein Backup aller HTML-Dateien mit Zeitstempel

BACKUP_DIR="backups/html"
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FOLDER="${BACKUP_DIR}/${TIMESTAMP}"

# Wechsle ins Projektverzeichnis
cd "$(dirname "$0")"

# Erstelle Backup-Ordner
mkdir -p "${BACKUP_FOLDER}"

# Kopiere alle HTML-Dateien
echo "Erstelle HTML-Backup: ${TIMESTAMP}"
for file in *.html; do
    if [ -f "$file" ]; then
        cp "$file" "${BACKUP_FOLDER}/"
        echo "  - ${file} gesichert"
    fi
done

echo "Backup abgeschlossen in: ${BACKUP_FOLDER}"

# Optional: Alte Backups löschen (behalte die letzten 10)
cd "${BACKUP_DIR}"
ls -t | tail -n +11 | xargs -r rm -rf
echo "Alte Backups bereinigt (maximal 10 behalten)"
