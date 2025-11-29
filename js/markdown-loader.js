/**
 * Markdown Loader Utility
 * Lädt und rendert Markdown-Dateien für das Tiage-Beziehungsmodell
 *
 * © 2025 Ti-age.de - Alle Rechte vorbehalten
 */

const MarkdownLoader = {
    cache: new Map(),

    /**
     * Lädt eine Markdown-Datei und konvertiert sie zu HTML
     * @param {string} path - Pfad zur MD-Datei (relativ zum Root)
     * @returns {Promise<string>} - HTML-String
     */
    async load(path) {
        // Cache prüfen
        if (this.cache.has(path)) {
            return this.cache.get(path);
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status}`);
            }

            const markdown = await response.text();
            const html = this.toHTML(markdown);

            // Im Cache speichern
            this.cache.set(path, html);

            return html;
        } catch (error) {
            console.error('MarkdownLoader error:', error);
            return `<p class="md-error">Fehler beim Laden der Dokumentation: ${error.message}</p>`;
        }
    },

    /**
     * Konvertiert Markdown zu HTML (lightweight Parser)
     * @param {string} markdown - Markdown-String
     * @returns {string} - HTML-String
     */
    toHTML(markdown) {
        let html = markdown;

        // Escape HTML entities first (aber nicht in Code-Blöcken)
        // Wir machen das später für Code-Blöcke separat

        // Code-Blöcke (``` ... ```) - muss zuerst kommen
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
            const escapedCode = this.escapeHTML(code.trim());
            return `<pre class="md-code-block${lang ? ` language-${lang}` : ''}"><code>${escapedCode}</code></pre>`;
        });

        // Inline Code (`...`)
        html = html.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');

        // Headers
        html = html.replace(/^#### (.+)$/gm, '<h4 class="md-h4">$1</h4>');
        html = html.replace(/^### (.+)$/gm, '<h3 class="md-h3">$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2 class="md-h2">$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1 class="md-h1">$1</h1>');

        // Blockquotes
        html = html.replace(/^> \*(.+)\*$/gm, '<blockquote class="md-quote"><em>$1</em></blockquote>');
        html = html.replace(/^> (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>');

        // Horizontal Rules
        html = html.replace(/^---$/gm, '<hr class="md-hr">');

        // Tables
        html = this.parseTables(html);

        // Bold and Italic
        html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link" target="_blank" rel="noopener">$1</a>');

        // Unordered Lists
        html = this.parseLists(html);

        // Paragraphs (Zeilen die keine HTML-Tags sind)
        html = html.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="md-p">$1</p>');

        // Cleanup: Entferne leere Paragraphen
        html = html.replace(/<p class="md-p"><\/p>/g, '');
        html = html.replace(/<p class="md-p">\s*<\/p>/g, '');

        // Mehrere Zeilenumbrüche zu einem
        html = html.replace(/\n{3,}/g, '\n\n');

        return html.trim();
    },

    /**
     * Parst Markdown-Tabellen zu HTML
     */
    parseTables(html) {
        const tableRegex = /\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g;

        return html.replace(tableRegex, (match, headerRow, bodyRows) => {
            const headers = headerRow.split('|').filter(h => h.trim());
            const rows = bodyRows.trim().split('\n');

            let table = '<table class="md-table"><thead><tr>';
            headers.forEach(h => {
                table += `<th>${h.trim()}</th>`;
            });
            table += '</tr></thead><tbody>';

            rows.forEach(row => {
                const cells = row.split('|').filter(c => c.trim() !== '');
                table += '<tr>';
                cells.forEach(cell => {
                    table += `<td>${cell.trim()}</td>`;
                });
                table += '</tr>';
            });

            table += '</tbody></table>';
            return table;
        });
    },

    /**
     * Parst Markdown-Listen zu HTML
     */
    parseLists(html) {
        const lines = html.split('\n');
        const result = [];
        let inList = false;
        let listItems = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const listMatch = line.match(/^(\s*)[-*]\s+(.+)$/);

            if (listMatch) {
                if (!inList) {
                    inList = true;
                    listItems = [];
                }
                listItems.push(listMatch[2]);
            } else {
                if (inList) {
                    result.push('<ul class="md-list">');
                    listItems.forEach(item => {
                        result.push(`<li>${item}</li>`);
                    });
                    result.push('</ul>');
                    inList = false;
                    listItems = [];
                }
                result.push(line);
            }
        }

        // Falls die Datei mit einer Liste endet
        if (inList) {
            result.push('<ul class="md-list">');
            listItems.forEach(item => {
                result.push(`<li>${item}</li>`);
            });
            result.push('</ul>');
        }

        return result.join('\n');
    },

    /**
     * Escaped HTML-Entities
     */
    escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    /**
     * Lädt Content in ein DOM-Element
     * @param {string} path - Pfad zur MD-Datei
     * @param {string|HTMLElement} target - Ziel-Element oder Selektor
     * @param {boolean} showLoading - Zeige Loading-Indikator
     */
    async loadInto(path, target, showLoading = true) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;

        if (!element) {
            console.error('MarkdownLoader: Target element not found:', target);
            return;
        }

        if (showLoading) {
            element.innerHTML = '<div class="md-loading"><span class="md-spinner"></span> Lade Dokumentation...</div>';
        }

        const html = await this.load(path);
        element.innerHTML = html;
    },

    /**
     * Lädt mehrere Markdown-Dateien und fügt sie zusammen
     * @param {string[]} paths - Array von Pfaden
     * @returns {Promise<string>} - Kombinierter HTML-String
     */
    async loadMultiple(paths) {
        const results = await Promise.all(paths.map(path => this.load(path)));
        return results.join('<hr class="md-section-divider">');
    },

    /**
     * Leert den Cache
     */
    clearCache() {
        this.cache.clear();
    }
};

// CSS für Markdown-Rendering (wird dynamisch eingefügt)
const markdownStyles = `
<style id="markdown-loader-styles">
/* Markdown Loader Styles */
.md-h1 { font-size: 1.8em; color: var(--primary-light); margin: 20px 0 15px 0; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
.md-h2 { font-size: 1.4em; color: var(--primary); margin: 25px 0 12px 0; border-bottom: 1px solid var(--border); padding-bottom: 6px; }
.md-h3 { font-size: 1.2em; color: var(--text-primary); margin: 20px 0 10px 0; }
.md-h4 { font-size: 1.1em; color: var(--text-secondary); margin: 15px 0 8px 0; }

.md-p { margin: 10px 0; line-height: 1.6; color: var(--text-secondary); }

.md-quote {
    border-left: 3px solid var(--primary);
    padding: 10px 15px;
    margin: 15px 0;
    background: rgba(255,255,255,0.03);
    font-style: italic;
    color: var(--text-muted);
}

.md-list {
    margin: 10px 0 10px 20px;
    color: var(--text-secondary);
}
.md-list li { margin: 6px 0; line-height: 1.5; }

.md-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 0.95em;
}
.md-table th {
    background: var(--bg-card);
    padding: 10px 12px;
    text-align: left;
    border: 1px solid var(--border);
    color: var(--text-primary);
}
.md-table td {
    padding: 8px 12px;
    border: 1px solid var(--border);
    color: var(--text-secondary);
}
.md-table tr:nth-child(even) { background: rgba(255,255,255,0.02); }

.md-code-block {
    background: var(--bg-card);
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 15px 0;
    border: 1px solid var(--border);
}
.md-code-block code {
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    color: var(--primary-light);
}

.md-inline-code {
    background: rgba(255,255,255,0.1);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    color: var(--primary-light);
}

.md-link {
    color: var(--primary);
    text-decoration: none;
}
.md-link:hover { text-decoration: underline; }

.md-hr {
    border: none;
    border-top: 1px solid var(--border);
    margin: 25px 0;
}

.md-section-divider {
    border: none;
    border-top: 2px solid var(--primary);
    margin: 30px 0;
    opacity: 0.3;
}

.md-loading {
    text-align: center;
    padding: 40px;
    color: var(--text-muted);
}

.md-spinner {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid var(--border);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: md-spin 0.8s linear infinite;
    margin-right: 10px;
    vertical-align: middle;
}

@keyframes md-spin {
    to { transform: rotate(360deg); }
}

.md-error {
    color: var(--danger);
    padding: 15px;
    background: rgba(231, 76, 60, 0.1);
    border-radius: 6px;
    border-left: 3px solid var(--danger);
}
</style>
`;

// Styles beim Laden einfügen
if (typeof document !== 'undefined' && !document.getElementById('markdown-loader-styles')) {
    document.head.insertAdjacentHTML('beforeend', markdownStyles);
}

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarkdownLoader;
}
