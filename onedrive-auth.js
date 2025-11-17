async function loginOneDrive() {

    // Génère un PKCE code_verifier
    const verifier = [...crypto.getRandomValues(new Uint8Array(32))]
        .map(b => ('0' + b.toString(16)).slice(-2))
        .join('');

    localStorage.setItem("pkce_verifier", verifier);

    const challenge = await pkceChallengeFromVerifier(verifier);

    const authUrl =
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" +
        `?client_id=${ONEDRIVE_CONFIG.clientId}` +
        "&response_type=code" +
        "&response_mode=query" +
        `&redirect_uri=${encodeURIComponent(ONEDRIVE_CONFIG.redirectUri)}` +
        `&scope=${encodeURIComponent(ONEDRIVE_CONFIG.scopes)}` +
        `&code_challenge=${challenge}` +
        "&code_challenge_method=S256";

    window.location = authUrl;
}

async function uploadToOneDrive(table) {

    let token = localStorage.getItem("onedrive_token");
    if (!token) return loginOneDrive();

    // Génère le CSV
    const csv = [...table.querySelectorAll("tr")].map(r =>
        `${r.children[1].innerText};${r.children[2].innerText};${r.children[3].innerText}`
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const resp = await fetch(
        "https://graph.microsoft.com/v1.0/me/drive/root:/padova_dlc.csv:/content",
        {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: blob
        }
    );

    if (!resp.ok) {
        // Si token expiré → relogin
        localStorage.removeItem("onedrive_token");
        return loginOneDrive();
    }

    alert("Export OneDrive réussi !");
}
function testToken() {
    const token = localStorage.getItem("onedrive_token");
    if (token) {
        alert("TOKEN OK : " + token.substring(0, 40) + "...");
    } else {
        alert("❌ Aucun token OneDrive trouvé");
    }
}