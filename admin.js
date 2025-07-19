import { db } from './firebase.js';
import {
  collection, addDoc, getDocs, deleteDoc,
  doc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const tabla = document.getElementById("tablaClientes");

export async function cargarClientes() {
  tabla.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "Clientes"));
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const fila = document.createElement("tr");

    // Nom (editable)
    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = data.nombre;
    celdaNombre.contentEditable = true;
    celdaNombre.addEventListener("blur", () => actualizarCampo(docSnap.id, "nombre", celdaNombre.textContent));
    fila.appendChild(celdaNombre);

    // Points (editable)
    const celdaPuntos = document.createElement("td");
    celdaPuntos.textContent = data.puntos;
    celdaPuntos.contentEditable = true;
    celdaPuntos.addEventListener("blur", () => {
      const valor = parseInt(celdaPuntos.textContent);
      if (!isNaN(valor)) {
        actualizarCampo(docSnap.id, "puntos", valor);
      } else {
        celdaPuntos.textContent = data.puntos; // reset if invalid
      }
    });
    fila.appendChild(celdaPuntos);

    // Actions
    const celdaAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "action-btn";
    btnEliminar.onclick = () => eliminarCliente(docSnap.id);

    const btnVer = document.createElement("button");
    btnVer.textContent = "Ver tarjeta";
    btnVer.className = "action-btn";
    btnVer.onclick = () => {
      const url = `carte.html?id=${docSnap.id}`;
      window.open(url, "_blank");
    };

    celdaAcciones.appendChild(btnVer);
    celdaAcciones.appendChild(btnEliminar);
    fila.appendChild(celdaAcciones);

    tabla.appendChild(fila);
  });
}

export async function agregarCliente() {
  const nombre = document.getElementById("nombreInput").value;
  const puntos = parseInt(document.getElementById("puntosInput").value) || 0;

  if (!nombre) return alert("Nombre obligatorio");

  await addDoc(collection(db, "Clientes"), { nombre, puntos });
  document.getElementById("nombreInput").value = "";
  document.getElementById("puntosInput").value = "";
  cargarClientes();
}

async function eliminarCliente(id) {
  if (!confirm("¿Estás seguro de eliminar este cliente?")) return;
  await deleteDoc(doc(db, "Clientes", id));
  cargarClientes();
}

async function actualizarCampo(id, campo, valor) {
  await updateDoc(doc(db, "Clientes", id), { [campo]: valor });
}

window.agregarCliente = agregarCliente; // nécessaire pour que le bouton HTML le voie
cargarClientes();
