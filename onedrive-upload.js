async function uploadToOneDrive() {

  const rows = [...document.querySelectorAll("#photosBody tr")];

  if (rows.length === 0) {
    alert("Aucune photo à envoyer.");
    return;
  }

  const token = await getAccessToken();

  for (const r of rows) {
    const imgURL = r.children[0].querySelector("img").src;
    const blob = await (await fetch(imgURL)).blob();
    const buffer = await blob.arrayBuffer();

    const filename = `DLC_${Date.now()}.png`;

    await fetch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/Padova/${filename}:/content`,
      {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "image/png"
        },
        body: buffer
      }
    );
  }

  alert("Toutes les photos ont été envoyées sur OneDrive !");
}
