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

// Función asincrónica para buscar personajes por nombre usando la API de Dragon Ball
async function searchCharactersByName(name) {
  try {
    const response = await fetch(`https://dragonball-api.com/api/characters?name=${name}`);
    
    if (!response.ok) {
      throw new Error('Error al consultar la API'); // si la API devuelve error, lanza excepción
    }

    const data = await response.json(); // convierte la respuesta en JSON

    if (data.items.length === 0) {
      messageContainer.textContent = 'No se encontraron personajes con ese nombre 😕';
      return;
    }

    // Si hay resultados, los mostramos en consola por ahora (se renderizan en el próximo paso)
    console.log(data.items); // ← esto se reemplazará por renderizado dinámico luego
  } catch (error) {
    console.error(error);
    messageContainer.textContent = 'Ocurrió un error al consultar la API 😵';
  }
}


// Evento cuando el usuario hace click 
searchBtn.addEventListener('click', () => {
  clearResults(); // limpio la pantalla antes de mostrar nuevos resultados

  const query = searchInput.value.trim(); // agarro el valor del input, sin espacios al principio ni al final

  // Valido que el input no esté vacío
  if (!query) {
    messageContainer.textContent = 'Por favor, ingrese un nombre para buscar.'; // mensjae por si no se escribió nada 
    return; //se corta la función
  }


 // Si se valida, se buscala API 
  searchCharactersByName(query);


});
