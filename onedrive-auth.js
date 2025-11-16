async function loginOneDrive() {
    const authUrl =
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize" +
        `?client_id=${ONEDRIVE_CONFIG.clientId}` +
        "&response_type=token" +
        `&redirect_uri=${encodeURIComponent(ONEDRIVE_CONFIG.redirectUri)}` +
        `&scope=${encodeURIComponent(ONEDRIVE_CONFIG.scopes)}`;

    window.location = authUrl;
}
