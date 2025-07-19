import { db } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const nombreEl = document.getElementById('nombreCliente');
const puntosEl = document.getElementById('puntosCliente');

async function cargarCliente() {
  if (!id) {
    nombreEl.textContent = "ID no proporcionado";
    return;
  }

  const docRef = doc(db, "Clientes", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    nombreEl.textContent = data.nombre;
    puntosEl.textContent = data.puntos ?? 0;
  } else {
    nombreEl.textContent = "Cliente no encontrado";
    puntosEl.textContent = "-";
  }
}

cargarCliente();
