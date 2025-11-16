// REMPLACE ces valeurs par TES clés (ne les partage jamais)
const CLIENT_ID = "4c6a4fb0-1ce2-4ad8-a5a1-cb7a0b42b5db";
const TENANT_ID = "e84eeda3-e050-4237-83c3-236b52ee5fc1";
const CLIENT_SECRET = "bfb8Q~9fBc3igNpa1q-5BEafynwkWQHFxY39xalp";

// ===== NE RIEN MODIFIER CI-DESSOUS =====

async function getAccessToken() {
  const url = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("scope", "https://graph.microsoft.com/.default");
  params.append("client_secret", CLIENT_SECRET);
  params.append("grant_type", "client_credentials");

  const res = await fetch(url, {
    method: "POST",
    body: params
  });

  const data = await res.json();
  return data.access_token;
}
