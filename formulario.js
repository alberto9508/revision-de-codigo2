var formulario = document.querySelector("#formulario");

formulario.onsubmit = function(e) {
  e.preventDefault(); // Corregido el método preventDefault()

  var n = formulario.elements["name"]; // Corregido el acceso al campo de nombre
  var e = formulario.elements["age"]; // Corregido el acceso al campo de edad
  var na = formulario.elements["nationality"]; // Corregido el acceso al campo de nacionalidad

  var nombre = n.value;
  var edad = parseInt(e.value); // Convertir el valor de edad a entero

  var i = na.selectedIndex;
  var nacionalidad = na.options[i].value;
  console.log(nombre, edad);
  console.log(nacionalidad);

  if (nombre.length === 0) {
    n.classList.add("error");
  }
  if (isNaN(edad) || edad < 18 || edad > 120) { // Añadida la comprobación de isNaN
    e.classList.add("error");
  }

  if (nombre.length > 0 && !isNaN(edad) && (edad >= 18 && edad <= 120)) { // Corregida la condición de edad
    agregarInvitado(nombre, edad, nacionalidad);
  }
};

function agregarInvitado(nombre, edad, nacionalidad) {
  // Corregido el manejo de nacionalidades
  var nacionalidades = {
    "ar": "Argentina",
    "mx": "Mexicana",
    "vnzl": "Venezolana",
    "per": "Peruana"
  };

  var lista = document.getElementById("lista-de-invitados");

  var elementoLista = document.createElement("div");
  elementoLista.classList.add("elemento-lista"); // Corregida la función add

  var botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Eliminar invitado";
  botonBorrar.className = "boton-borrar"; // Cambiado el id por className para evitar duplicados
  botonBorrar.onclick = function() {
    elementoLista.remove(); // Corregida la eliminación del invitado
  };

  lista.appendChild(elementoLista);

  function crearElemento(descripcion, valor) {
    var spanNombre = document.createElement("span");
    var inputNombre = document.createElement("input");
    var espacio = document.createElement("br");
    spanNombre.textContent = descripcion + ": ";
    inputNombre.value = valor;
    inputNombre.readOnly = true; // Hacer el campo de solo lectura
    elementoLista.appendChild(spanNombre);
    elementoLista.appendChild(inputNombre);
    elementoLista.appendChild(espacio);
  }

  crearElemento("Nombre", nombre);
  crearElemento("Edad", edad);
  crearElemento("Nacionalidad", nacionalidades[nacionalidad]); // Usar el objeto nacionalidades

  elementoLista.appendChild(botonBorrar);
}