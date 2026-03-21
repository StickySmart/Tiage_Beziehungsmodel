/**
 * ageVerification.js — Age verification modal
 * Extracted from app-main.js v1.8.1034
 *
 * Dependencies (via window.*):
 *   window.openCommentsListModal (commentModal.js)
 *   sessionStorage, localStorage, DOM
 */
(function() {
    'use strict';

    function checkAgeVerification() {
        // Check if user already verified age in this session
        try {
            if (sessionStorage.getItem('tiage_age_verified') === 'true') {
                // Already verified in this session, don't show modal
                const modal = document.getElementById('ageVerificationModal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }
                return;
            }
        } catch(e) {
            console.warn('Could not check sessionStorage:', e);
        }

        // Show modal for age verification
        const modal = document.getElementById('ageVerificationModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden';
        }
    }

    // confirmAge - hoisted function declaration ensures availability even if script
    // partially fails (prevents infinite recursion from wrapper pattern)
    function confirmAge(isAdult) {
        console.log('confirmAge called with:', isAdult);

        if (isAdult) {
            // Save age verification for this session (prevents showing on back navigation)
            try {
                sessionStorage.setItem('tiage_age_verified', 'true');
            } catch(e) {
                console.warn('Could not save session age verification:', e);
            }

            // Automatically save cookie consent when user confirms age
            try {
                localStorage.setItem('tiage_cookie_consent', 'true');
                localStorage.setItem('tiage_cookie_consent_timestamp', new Date().toISOString());
            } catch(e) {
                console.warn('Could not save cookie consent:', e);
            }

            // Hide modal
            var modal = document.getElementById('ageVerificationModal');
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
        } else {
            window.location.href = 'https://www.google.com';
        }
    }
    window.confirmAge = confirmAge;

    // Initialize age verification - robust version with multiple fallbacks
    function initAgeVerification() {
        const modal = document.getElementById('ageVerificationModal');
        const yesButton = document.getElementById('ageVerifyYes');
        const noButton = document.getElementById('ageVerifyNo');

        // Helper function to handle age confirmation - uses sessionStorage
        function handleAgeConfirm(isAdult, event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            console.log('handleAgeConfirm called:', isAdult);

            if (isAdult) {
                // Save age verification for this session (prevents showing on back navigation)
                try {
                    sessionStorage.setItem('tiage_age_verified', 'true');
                } catch(e) {
                    console.warn('Could not save session age verification:', e);
                }

                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                    modal.style.visibility = 'hidden';
                    modal.style.opacity = '0';
                    modal.style.pointerEvents = 'none';
                }
                document.body.style.overflow = 'auto';

                // Check for pending openComments navigation after age verification
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('openComments') === '1') {
                    // Remove openComments parameter from URL to prevent loop on back-navigation
                    urlParams.delete('openComments');
                    const cleanUrl = urlParams.toString()
                        ? `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`
                        : `${window.location.pathname}${window.location.hash}`;
                    history.replaceState(null, '', cleanUrl);

                    setTimeout(() => {
                        if (typeof window.openCommentsListModal === 'function') {
                            window.openCommentsListModal();
                        }
                    }, 100);
                }
            } else {
                window.location.href = 'https://www.google.com';
            }
        }

        // Add event listeners to YES button
        if (yesButton) {
            yesButton.style.pointerEvents = 'auto';
            yesButton.style.cursor = 'pointer';
            yesButton.style.position = 'relative';
            yesButton.style.zIndex = '10002';

            // Remove old onclick to prevent double-firing
            yesButton.removeAttribute('onclick');

            // Add multiple event types for maximum compatibility
            yesButton.addEventListener('click', function(e) {
                handleAgeConfirm(true, e);
            }, { passive: false, capture: true });

            yesButton.addEventListener('touchend', function(e) {
                handleAgeConfirm(true, e);
            }, { passive: false, capture: true });

            // Also handle mousedown as fallback
            yesButton.addEventListener('mousedown', function(e) {
                handleAgeConfirm(true, e);
            }, { passive: false, capture: true });
        }

        // Add event listeners to NO button
        if (noButton) {
            noButton.style.pointerEvents = 'auto';
            noButton.style.cursor = 'pointer';
            noButton.style.position = 'relative';
            noButton.style.zIndex = '10002';

            // Remove old onclick
            noButton.removeAttribute('onclick');

            noButton.addEventListener('click', function(e) {
                handleAgeConfirm(false, e);
            }, { passive: false, capture: true });

            noButton.addEventListener('touchend', function(e) {
                handleAgeConfirm(false, e);
            }, { passive: false, capture: true });
        }

        // Check if already verified in this session before showing modal
        try {
            if (sessionStorage.getItem('tiage_age_verified') === 'true') {
                // Already verified, hide modal
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }
                return;
            }
        } catch(e) {
            console.warn('Could not check sessionStorage:', e);
        }

        // Show modal on page load if not verified
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        }
    }

    // ── Exports ──────────────────────────────────────────────────────────────
    window.checkAgeVerification = checkAgeVerification;
    window.confirmAge = confirmAge;
    window.initAgeVerification = initAgeVerification;

})();
