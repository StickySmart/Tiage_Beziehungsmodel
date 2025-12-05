/**
 * TIAGE Modal Loader
 * Dynamically loads modal components from external HTML files
 *
 * (c) 2025 Ti-age.de - All rights reserved
 */

const TiageModalLoader = {
    // Base path for modal components
    basePath: 'components/modals/',

    // Container where modals will be inserted
    containerId: 'modal-container',

    // List of modals to load
    modals: [
        'help-modal.html',
        'profile-review-modal.html',
        'comment-modals.html',
        'info-modals.html',
        'interaction-modals.html'
    ],

    // Track loading state
    loaded: false,
    loadedCount: 0,

    /**
     * Initialize the modal loader
     */
    init: function() {
        // Create container if it doesn't exist
        let container = document.getElementById(this.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            document.body.appendChild(container);
        }

        // Load all modals
        this.loadAllModals();
    },

    /**
     * Load all modals from the list
     */
    loadAllModals: function() {
        const self = this;
        const container = document.getElementById(this.containerId);

        this.modals.forEach(function(modalFile) {
            self.loadModal(modalFile, container);
        });
    },

    /**
     * Load a single modal file
     */
    loadModal: function(filename, container) {
        const self = this;
        const url = this.basePath + filename + '?v=' + (window.TIAGE_VERSION || Date.now());

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    console.warn('[ModalLoader] Could not load:', filename);
                    return '';
                }
                return response.text();
            })
            .then(function(html) {
                if (html) {
                    // Create a temporary container to parse the HTML
                    const temp = document.createElement('div');
                    temp.innerHTML = html;

                    // Append all child nodes to the container
                    while (temp.firstChild) {
                        container.appendChild(temp.firstChild);
                    }

                    console.log('[ModalLoader] Loaded:', filename);
                }

                self.loadedCount++;
                if (self.loadedCount >= self.modals.length) {
                    self.onAllLoaded();
                }
            })
            .catch(function(error) {
                console.error('[ModalLoader] Error loading', filename, error);
                self.loadedCount++;
            });
    },

    /**
     * Called when all modals are loaded
     */
    onAllLoaded: function() {
        this.loaded = true;
        console.log('[ModalLoader] All modals loaded');

        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('modalsLoaded'));
    },

    /**
     * Check if all modals are loaded
     */
    isLoaded: function() {
        return this.loaded;
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        TiageModalLoader.init();
    });
} else {
    TiageModalLoader.init();
}
