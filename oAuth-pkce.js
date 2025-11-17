// oAuth-pkce.js
// Génération PKCE + redirection vers Microsoft

// Génère une string aléatoire (code_verifier)
function generateRandomString(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let result = "";
  const randomValues = new Uint8Array(length);
  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < randomValues.length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  return result;
}

// Encodage base64 URL safe
function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// SHA-256
async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await window.crypto.subtle.digest("SHA-256", data);
}

// Génère le challenge à partir du verifier
async function pkceChallengeFromVerifier(verifier) {
  const hashed = await sha256(verifier);
  return base64UrlEncode(hashed);
}

// Lance le flux OAuth avec PKCE
async function startOneDrivePKCE() {
  if (!window.ONEDRIVE_CONFIG) {
    alert("Config OneDrive manquante (ONEDRIVE_CONFIG).");
    return;
  }

  const verifier = generateRandomString(64);
  sessionStorage.setItem("onedrive_pkce_verifier", verifier);

  const challenge = await pkceChallengeFromVerifier(verifier);

  const params = new URLSearchParams({
    client_id: ONEDRIVE_CONFIG.clientId,
    response_type: "code",
    redirect_uri: ONEDRIVE_CONFIG.redirectUri,
    response_mode: "query",
    scope: ONEDRIVE_CONFIG.scopes,
    code_challenge: challenge,
    code_challenge_method: "S256"
  });

  const authUrl =
    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?" +
    params.toString();

  window.location.href = authUrl;
}