import { db } from './firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function cargarClientas() {
  const tabla = document.getElementById('clientTableBody');
  tabla.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, "Clientes"));
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data();
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = data.nombre || "Desconocida";

    const celdaPuntos = document.createElement("td");
    celdaPuntos.textContent = data.puntos ?? 0;
    celdaPuntos.contentEditable = true;
    celdaPuntos.addEventListener('blur', async () => {
      const nuevosPuntos = parseInt(celdaPuntos.textContent);
      if (!isNaN(nuevosPuntos)) {
        await updateDoc(doc(db, "Clientes", docSnap.id), { puntos: nuevosPuntos });
      } else {
        celdaPuntos.textContent = data.puntos ?? 0;
      }
    });

    const celdaAcciones = document.createElement("td");
    celdaAcciones.classList.add("actions");
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.onclick = async () => {
      await deleteDoc(doc(db, "Clientes", docSnap.id));
      cargarClientas();
    };
    celdaAcciones.appendChild(botonEliminar);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPuntos);
    fila.appendChild(celdaAcciones);
    tabla.appendChild(fila);
  });
}

window.agregarClienta = async function () {
  const nombre = document.getElementById('nom').value.trim();
  const puntos = parseInt(document.getElementById('points').value);
  if (nombre && !isNaN(puntos)) {
    await addDoc(collection(db, "Clientes"), {
      nombre: nombre,
      puntos: puntos
    });
    document.getElementById('nom').value = '';
    document.getElementById('points').value = '';
    cargarClientas();
  } else {
    alert("Por favor, introduce un nombre y puntos válidos.");
  }
};

cargarClientas();
