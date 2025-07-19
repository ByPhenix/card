import { db } from './firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function chargerClients() {
  const table = document.getElementById('clientTableBody');
  table.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, "Clientes"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    const nomCell = document.createElement("td");
    nomCell.textContent = data.nombre || "Inconnu";

    const pointsCell = document.createElement("td");
    pointsCell.textContent = data.puntos ?? 0;
    pointsCell.contentEditable = true;
    pointsCell.addEventListener('blur', async () => {
      const newPoints = parseInt(pointsCell.textContent);
      if (!isNaN(newPoints)) {
        await updateDoc(doc(db, "Clientes", docSnap.id), { puntos: newPoints });
      } else {
        pointsCell.textContent = data.puntos ?? 0; // reset if invalid
      }
    });

    const actionCell = document.createElement("td");
    actionCell.classList.add("actions");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.onclick = async () => {
      await deleteDoc(doc(db, "Clientes", docSnap.id));
      chargerClients();
    };
    actionCell.appendChild(deleteBtn);

    row.appendChild(nomCell);
    row.appendChild(pointsCell);
    row.appendChild(actionCell);
    table.appendChild(row);
  });
}

window.ajouterClient = async function () {
  const nom = document.getElementById('nom').value.trim();
  const points = parseInt(document.getElementById('points').value);
  if (nom && !isNaN(points)) {
    await addDoc(collection(db, "Clientes"), {
      nombre: nom,
      puntos: points
    });
    document.getElementById('nom').value = '';
    document.getElementById('points').value = '';
    chargerClients();
  } else {
    alert("Veuillez entrer un nom et des points valides.");
  }
};

chargerClients();
