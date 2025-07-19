import { db } from './firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function chargerClients() {
  const table = document.getElementById('clientTableBody');
  const querySnapshot = await getDocs(collection(db, "Clientes"));
  table.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    // Colonne nom
    const nomCell = document.createElement("td");
    nomCell.textContent = data.nombre || "Inconnu";
    row.appendChild(nomCell);

    // Colonne points modifiables
    const pointsCell = document.createElement("td");
    pointsCell.contentEditable = true;
    pointsCell.textContent = data.puntos ?? 0;

    pointsCell.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newPoints = parseInt(pointsCell.textContent.trim(), 10);
        if (!isNaN(newPoints)) {
          await updateDoc(doc(db, "Clientes", docSnap.id), {
            puntos: newPoints
          });
        }
      }
    });

    row.appendChild(pointsCell);

    // Colonne action (supprimer)
    const actionCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "Clientes", docSnap.id));
      chargerClients(); // refresh
    });
    actionCell.appendChild(deleteBtn);
    row.appendChild(actionCell);

    table.appendChild(row);
  });
}

// Ajouter un nouveau client ou incrémenter
document.getElementById("ajoutClientForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value.trim();
  const points = parseInt(document.getElementById("pointsClient").value.trim(), 10);
  if (!nom || isNaN(points)) return;

  const clientsRef = collection(db, "Clientes");
  const q = query(clientsRef, where("nombre", "==", nom));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const clientDoc = querySnapshot.docs[0];
    const currentPoints = clientDoc.data().puntos ?? 0;
    await updateDoc(doc(db, "Clientes", clientDoc.id), {
      puntos: currentPoints + points
    });
  } else {
    await addDoc(clientsRef, {
      nombre: nom,
      puntos: points
    });
  }

  document.getElementById("ajoutClientForm").reset();
  chargerClients();
});

chargerClients();
