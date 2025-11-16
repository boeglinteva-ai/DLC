async function uploadToOneDrive(table) {
    const token = localStorage.getItem("onedrive_token");
    if (!token) return loginOneDrive();

    const csv = [...table.querySelectorAll("tr")].map(r =>
        `${r.children[1].innerText};${r.children[2].innerText};${r.children[3].innerText}`
    ).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    await fetch(
        "https://graph.microsoft.com/v1.0/me/drive/root:/padova_dlc.csv:/content",
        {
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            body: blob
        }
    );
}
