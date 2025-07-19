import { db } from './firebase.js';
import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Fonction pour charger les clients existants
async function chargerClients() {
  const table = document.getElementById('clientTableBody');
  const querySnapshot = await getDocs(collection(db, "Clientes"));

  table.innerHTML = ""; // Vide la table avant de remplir

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");

    const nomCell = document.createElement("td");
    nomCell.textContent = data.nombre || "Inconnu";

    const pointsCell = document.createElement("td");
    pointsCell.textContent = data.puntos ?? 0;

    row.appendChild(nomCell);
    row.appendChild(pointsCell);
    table.appendChild(row);
  });
}

// Fonction pour ajouter un client
document.getElementById("ajoutClientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value.trim();
  const points = parseInt(document.getElementById("pointsClient").value.trim(), 10);

  if (nom && !isNaN(points)) {
    await addDoc(collection(db, "Clientes"), {
      nombre: nom,
      puntos: points
    });

    // Recharge la liste
    chargerClients();

    // Reset du formulaire
    document.getElementById("ajoutClientForm").reset();
  }
});

// Initialisation au chargement
chargerClients();
