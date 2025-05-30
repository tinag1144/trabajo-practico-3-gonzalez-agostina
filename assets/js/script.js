// script.js - código parcial para validación y evento click básico

// Se guardan en variables los elementos DOM que se va a usar 
const searchInput = document.getElementById('searchInput'); // acá el usuario escribe el input 
const searchBtn = document.getElementById('searchBtn'); //iniciar busqueda 
const messageContainer = document.getElementById('message'); // mensajes para el usuario 
const resultsContainer = document.getElementById('results'); // contenedor de los personajes 

// Función para limpiar los resultados anteriores y los mensajes
function clearResults() {
  resultsContainer.innerHTML = ''; // limpio los personajes 
  messageContainer.textContent = ''; // limpio los mensajes 
}

// Evento cuando el usuario hace click 
searchBtn.addEventListener('click', () => {
  clearResults(); // limpio la pantalla antes de mostrar nuevos resultados

  const query = searchInput.value.trim(); // agarro el valor del input, sin espacios al principio ni al final

  // Valido que el input no esté vacío
  if (!query) {
    messageContainer.textContent = 'Por favor, ingrese un nombre para buscar.'; // mensjae por si no se escribió nada 
    return; 
  }
});
