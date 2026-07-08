const steps = [
    {
        title: "Servicio de control de fauna del aeropuerto trabaja en el lado aire para minimizar",
        image: "fotos/woman-airport-service-agent-with-passport-helping-traveler-check-terminal-counter-female-passenger-assistant-with-smile-travel-security-immigration-documents-airline-control.jpg",
        text: "Las compañías aéreas marcan una serie de procedimientos para atender sus aviones que cumplen con lo establecido por las organizaciones en cuanto a la seguridad operacional."
    },
    {
        title: "Seguridad en el Embarque",
        image: "fotos/woman-airport-service-agent-with-passport-helping-traveler-check-terminal-counter-female-passenger-assistant-with-smile-travel-security-immigration-documents-airline-control.jpg",
        text: "Durante el abordaje y desembarque, se siguen protocolos estrictos para garantizar que todos los pasajeros y la tripulación se encuentren en condiciones óptimas de seguridad y organización."
    },
    {
        title: "Mantenimiento Preventivo",
        image: "fotos/woman-airport-service-agent-with-passport-helping-traveler-check-terminal-counter-female-passenger-assistant-with-smile-travel-security-immigration-documents-airline-control.jpg",
        text: "El mantenimiento preventivo en tierra es un pilar fundamental. Cada revisión técnica está minuciosamente documentada para cumplir con los estándares internacionales de la aviación civil."
    }
];

let currentIndex = 0;
const totalSteps = steps.length;
let prevButtonTimeout; // Para controlar la animación retardada

// Elementos del DOM
const titleElement = document.getElementById('step-title');
const textElement = document.getElementById('step-text');
const imageElement = document.getElementById('step-image');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const currentStepText = document.getElementById('current-step');
const totalStepsText = document.getElementById('total-steps');

// Elemento SVG para la barra de progreso "Squircle"
const rect = document.querySelector('.progress-rect');
// En lugar de calcular matemáticamente, JS puede darnos la longitud exacta del trazo
const pathLength = rect.getTotalLength();

// Inicializamos el SVG para que la línea empiece vacía
rect.style.strokeDasharray = `${pathLength} ${pathLength}`;
rect.style.strokeDashoffset = pathLength;

function setProgress(percent) {
    const offset = pathLength - (percent / 100) * pathLength;
    rect.style.strokeDashoffset = offset;
}

function updateUI() {
    // 1. Ocultar botón anterior y limpiar el timeout si existía
    btnPrev.classList.remove('show-animated');
    btnPrev.disabled = true;
    clearTimeout(prevButtonTimeout);

    // 2. Efecto de desvanecimiento para salida de textos e imagen
    titleElement.style.opacity = 0;
    textElement.style.opacity = 0;
    imageElement.style.opacity = 0;

    setTimeout(() => {
        // 3. Actualizar contenido
        titleElement.textContent = steps[currentIndex].title;
        textElement.textContent = steps[currentIndex].text;
        imageElement.src = steps[currentIndex].image;
        
        currentStepText.textContent = currentIndex + 1;
        
        // 4. Actualizar Barra de Progreso alrededor del Avatar
        const progressPercentage = ((currentIndex + 1) / totalSteps) * 100;
        setProgress(progressPercentage);

        // 5. Configurar Botón Siguiente
        if (currentIndex === totalSteps - 1) {
            btnNext.textContent = "Finalizar";
            btnNext.classList.remove('pulse-anim');
            btnNext.classList.add('finish-btn');
        } else {
            btnNext.textContent = "Siguiente";
            btnNext.classList.add('pulse-anim');
            btnNext.classList.remove('finish-btn');
        }

        // 6. Efecto de aparición (fade in)
        titleElement.style.opacity = 1;
        textElement.style.opacity = 1;
        imageElement.style.opacity = 1;

        // 7. Animación retardada del Botón Anterior (Solo si no estamos en el primer paso)
        if (currentIndex > 0) {
            // El botón aparece mágicamente 1.5 segundos después de cambiar de paso
            prevButtonTimeout = setTimeout(() => {
                btnPrev.disabled = false;
                btnPrev.classList.add('show-animated');
            }, 1500); 
        }

    }, 300); // Espera a que termine el fade out
}

// Eventos de botones
btnNext.addEventListener('click', () => {
    if (currentIndex < totalSteps - 1) {
        currentIndex++;
        updateUI();
    } else {
        alert("¡Has finalizado esta sección de capacitación!");
    }
});

btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateUI();
    }
});

// Arrancar interfaz
totalStepsText.textContent = totalSteps;
// Forzamos un pequeño delay al inicio para que la animación del progreso se vea al cargar
setTimeout(() => {
    updateUI();
}, 100);