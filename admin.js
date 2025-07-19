import { db } from './firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function chargerClients() {
  const table = document.getElementById('clientTableBody');
  const querySnapshot = await getDocs(collection(db, "Clientes"));
  table.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
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

document.getElementById("ajoutClientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value.trim();
  const points = parseInt(document.getElementById("pointsClient").value.trim(), 10);

  if (!nom || isNaN(points)) return;

  const clientsRef = collection(db, "Clientes");
  const q = query(clientsRef, where("nombre", "==", nom));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Le client existe → on met à jour ses points
    const clientDoc = querySnapshot.docs[0];
    const currentPoints = clientDoc.data().puntos ?? 0;
    await updateDoc(doc(db, "Clientes", clientDoc.id), {
      puntos: currentPoints + points
    });
  } else {
    // Nouveau client → on l’ajoute
    await addDoc(clientsRef, {
      nombre: nom,
      puntos: points
    });
  }

  document.getElementById("ajoutClientForm").reset();
  chargerClients();
});

chargerClients();
