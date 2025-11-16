// REMPLACE ces valeurs par TES clés (ne les partage jamais)
const CLIENT_ID = "TON_CLIENT_ID";
const TENANT_ID = "TON_TENANT_ID";
const CLIENT_SECRET = "TON_CLIENT_SECRET";

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
