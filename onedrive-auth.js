// onedrive-auth.js
// Fonctions utilitaires autour du token OneDrive

// Lance la connexion OneDrive (PKCE)
function loginOneDrive() {
  startOneDrivePKCE();
}

// Vérifie s'il y a déjà un token
function hasOneDriveToken() {
  return !!localStorage.getItem("onedrive_token");
}

// Retourne le token OU null
function getOneDriveToken() {
  return localStorage.getItem("onedrive_token");
}

// Pour ton bouton "Tester token OneDrive"
function testOneDriveToken() {
  const token = getOneDriveToken();
  if (token) {
    alert("✅ Token OneDrive trouvé !");
  } else {
    alert("❌ Aucun token OneDrive trouvé");
  }
}

// À utiliser dans l'upload : demande un token, sinon déclenche le login
async function ensureOneDriveToken() {
  const token = getOneDriveToken();
  if (!token) {
    alert("Aucun token OneDrive – connexion à OneDrive…");
    loginOneDrive();
    return null;
  }
  return token;
}