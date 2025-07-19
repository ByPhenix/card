import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const clientName = document.getElementById('clientName');
const stampContainer = document.getElementById('stampContainer');
const rewardMessage = document.getElementById('rewardMessage');

async function cargarDatos() {
  if (!id) {
    clientName.textContent = "ID no encontrado";
    return;
  }

  const ref = doc(db, "Clientes", id);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();
    clientName.textContent = data.nombre || "Sin nombre";

    const puntos = data.puntos ?? 0;
    const maxPuntos = 10;

    for (let i = 0; i < maxPuntos; i++) {
      const stamp = document.createElement("div");
      stamp.classList.add("stamp");
      if (i < puntos) stamp.classList.add("filled");
      stamp.textContent = i < puntos ? "✓" : "";
      stampContainer.appendChild(stamp);
    }

    if (puntos >= maxPuntos) {
      rewardMessage.textContent = "¡Felicidades! Bebida gratis 🎉";
    }
  } else {
    clientName.textContent = "Cliente no encontrado";
  }
}

cargarDatos();
