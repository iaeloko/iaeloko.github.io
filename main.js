// Obtén los elementos del DOM
var openBtn = document.getElementById('openBtn');
var closeBtn = document.getElementById('closeBtn');
var popup = document.getElementById('popup');

// Función para abrir la ventana flotante
function openPopup() {
  popup.style.display = 'block';
}

// Función para cerrar la ventana flotante
function closePopup() {
  popup.style.display = 'none';
}

// Agrega los eventos de clic a los botones
openBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

function mostrarAlerta() {
  alert("¡Disculpa! Sección en Construcción 🖥️‍🔧");
}