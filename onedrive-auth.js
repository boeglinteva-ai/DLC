async function loginOneDrive() {
    // Générer un code_verifier (PKCE obligatoire)
    const codeVerifier = generateRandomString(64);
    localStorage.setItem("onedrive_code_verifier", codeVerifier);

    // Générer un code_challenge
    const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);

    const authUrl =
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" +
        `?client_id=${ONEDRIVE_CONFIG.clientId}` +
        "&response_type=code" +
        "&response_mode=query" +
        `&redirect_uri=${encodeURIComponent(ONEDRIVE_CONFIG.redirectUri)}` +
        `&scope=${encodeURIComponent(ONEDRIVE_CONFIG.scopes)}` +
        `&code_challenge=${codeChallenge}` +
        "&code_challenge_method=S256";

    window.location = authUrl;
}

// Fonction pour générer une chaîne aléatoire
function generateRandomString(length) {
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

// Convertir le verifier → challenge
async function pkceChallengeFromVerifier(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
