// Discord Embedded App SDK — initialisiert nur wenn die App in Discord laeuft

const CLIENT_ID = '1499668041544368178';

(async function initDiscordActivity() {
    // Nur in Discord aktiv (Discord setzt frame_id als URL-Parameter)
    const params = new URLSearchParams(window.location.search);
    if (!params.has('frame_id') && window.parent === window) {
        console.log('[Ti-Age] Browser-Modus (kein Discord)');
        return;
    }

    try {
        const { DiscordSDK } = await import('https://esm.sh/@discord/embedded-app-sdk@latest');
        const sdk = new DiscordSDK(CLIENT_ID);

        await sdk.ready();

        window.discordSdk = sdk;
        document.dispatchEvent(new CustomEvent('discord-ready', { detail: sdk }));

        console.log('[Ti-Age] Discord Activity bereit ✓', {
            channelId: sdk.channelId,
            guildId: sdk.guildId,
        });
    } catch (err) {
        console.warn('[Ti-Age] Discord SDK Fehler:', err.message);
    }
})();
