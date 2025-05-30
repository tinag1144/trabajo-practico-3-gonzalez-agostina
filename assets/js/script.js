
// Se guardan en variables los elementos DOM que se va a usar 
const searchInput = document.getElementById('searchInput'); // acá el usuario escribe el input 
const searchBtn = document.getElementById('searchBtn'); //iniciar busqueda 
const messageContainer = document.getElementById('message'); // mensajes para el usuario 
const resultsContainer = document.getElementById('results'); // contenedor de los personajes 


// Arreglo para guardar personajes encontrados
let charactersArray = [];

// Función para limpiar los resultados anteriores y los mensajes
function clearResults() {
  resultsContainer.innerHTML = ''; // limpio los personajes 
  messageContainer.textContent = ''; // limpio los mensajes 
   charactersArray = [];
}

function showMessage(text) {
  messageContainer.textContent = text;
}

// Función para renderizar tarjetas de personajes
function renderCharacters(characters) {
  characters.forEach(character => {
    const card = document.createElement('div');
    card.classList.add('character-card'); 

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" class="character-img"/>
      <h3>${character.name}</h3>
      <p><strong>Raza:</strong> ${character.race}</p>
      <p><strong>Género:</strong> ${character.gender}</p>
    `;

    resultsContainer.appendChild(card);
  });
}

// Función asincrónica para buscar personajes por nombre usando la API de Dragon Ball
async function searchCharactersByName(name) {
  try {
    const response = await fetch(`https://dragonball-api.com/api/characters?name=${encodeURIComponent(name)}`);

    if (!response.ok) {
      throw new Error(`Error al consultar la API. Código: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      showMessage('No se encontraron personajes con ese nombre.');
      return;
    }

    // Guardar los personajes encontrados en el array global
    charactersArray = data.items;

    // Renderizar en pantalla
    renderCharacters(charactersArray);

  } catch (error) {
    console.error('Error de red o fetch:', error);
    showMessage('Ocurrió un error al consultar la API. Por favor, intentá de nuevo más tarde.');
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
