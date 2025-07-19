import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Fonction principale pour charger les clients
async function chargerClients() {
  const table = document.getElementById('clientTableBody');
  const querySnapshot = await getDocs(collection(db, "Clientes"));

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

// Exécute la fonction au chargement
chargerClients();
