async function uploadToOneDrive(table) {

    // Le token correct est "onedrive_token"
    const token = localStorage.getItem("onedrive_token");

    if (!token) {
        console.warn("Aucun token — lancement de la connexion OneDrive…");
        return loginOneDrive();
    }

    // Construction du CSV
    const csv = [...table.querySelectorAll("tr")].map(r =>
        `${r.children[1].innerText};${r.children[2].innerText};${r.children[3].innerText}`
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Nom unique basé sur la date
    const now = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `padova_dlc_${now}.csv`;

    const uploadUrl = 
        `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`;

    try {
        const response = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "text/csv"
            },
            body: blob
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Upload réussi :", result);
            alert("✔ Export envoyé dans OneDrive !");
        } else {
            const error = await response.json();
            console.error("Erreur OneDrive :", error);
            alert("❌ Token expiré – Reconnexion nécessaire.");
            loginOneDrive(); // relance connexion
        }

    } catch (err) {
        console.error("Erreur réseau :", err);
        alert("❌ Erreur réseau pendant l’envoi.");
    }
}