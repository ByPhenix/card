function getClientIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function afficherCarte() {
  const id = getClientIdFromURL();
  if (!id) return;

  db.collection("clients").doc(id).get().then((doc) => {
    if (doc.exists) {
      document.getElementById("carte").innerText =
        "Nom : " + doc.data().nom + " | Points : " + doc.data().points;
    } else {
      document.getElementById("carte").innerText = "Client non trouvé.";
    }
  });
}

function ajouterTampon() {
  const id = document.getElementById("clientId").value;
  const ref = db.collection("clients").doc(id);

  ref.get().then((doc) => {
    if (doc.exists) {
      const points = doc.data().points + 1;
      ref.update({ points: points }).then(() => {
        alert("Tampon ajouté !");
      });
    } else {
      alert("Client non trouvé !");
    }
  });
}

if (window.location.pathname.includes("carte.html")) {
  window.onload = afficherCarte;
}
