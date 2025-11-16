async function uploadToOneDrive(table) {
    // Récupérer le token stocké après le login
    const token = localStorage.getItem("onedrive_access_token");

    if (!token) {
        console.warn("Aucun token — lancement du login OneDrive…");
        return loginOneDrive();
    }

    // Génération du CSV
    const csv = [...table.querySelectorAll("tr")].map(r =>
        `${r.children[1].innerText};${r.children[2].innerText};${r.children[3].innerText}`
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Nom unique avec date / heure
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

        const result = await response.json();

        if (response.ok) {
            alert("✔ Export envoyé dans OneDrive !");
            console.log("OneDrive upload OK :", result);
        } else {
            console.error("Erreur OneDrive :", result);
            alert("❌ Erreur OneDrive. Token expiré ? Je relance le login.");
            loginOneDrive();
        }
    } catch (err) {
        console.error("Erreur réseau :", err);
        alert("❌ Impossible d'envoyer le fichier.");
    }
}
