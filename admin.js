import { db } from './firebase.js';
import { collection, getDocs, deleteDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function chargerClientes() {
  const table = document.getElementById('clientTableBody');
  const querySnapshot = await getDocs(collection(db, "Clientes"));

  table.innerHTML = ""; // Vider la table avant de recharger

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    const nomCell = document.createElement("td");
    nomCell.textContent = data.nombre || "Desconocido";

    const pointsCell = document.createElement("td");
    pointsCell.textContent = data.puntos ?? 0;

    // Bouton SUPPRIMER
    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.onclick = async () => {
      await deleteDoc(doc(db, "Clientes", docSnap.id));
      chargerClientes(); // Recharge la table après suppression
    };
    deleteCell.appendChild(deleteBtn);

    // Bouton AFFICHER CARTE
    const viewBtn = document.createElement("a");
    viewBtn.textContent = "Ver tarjeta";
    viewBtn.href = `carte.html?id=${docSnap.id}`;
    viewBtn.target = "_blank";
    viewBtn.style.marginLeft = "10px";
    deleteCell.appendChild(viewBtn);

    row.appendChild(nomCell);
    row.appendChild(pointsCell);
    row.appendChild(deleteCell);
    table.appendChild(row);
  });
}

chargerClientes();
