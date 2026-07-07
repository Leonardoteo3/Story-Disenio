// Datos simulados del curso. Aquí es donde agregarías nuevos pasos.
const steps = [
    {
        // Paso 1 (El original proporcionado)
        image: "fotos/woman-airport-service-agent-with-passport-helping-traveler-check-terminal-counter-female-passenger-assistant-with-smile-travel-security-immigration-documents-airline-control.jpg",
        text: "Las compañías aéreas marcan una serie de procedimientos para atender sus aviones que cumplen con lo establecido por las organizaciones en cuanto a la seguridad operacional."
    },
    {
        // Paso 2 (Simulado para demostración)
        image: "fotos/woman-airport-service-agent-with-passport-helping-traveler-check-terminal-counter-female-passenger-assistant-with-smile-travel-security-immigration-documents-airline-control.jpg",
        text: "Durante el abordaje y desembarque, se siguen protocolos estrictos para garantizar que todos los pasajeros y la tripulación se encuentren en condiciones óptimas de seguridad y organización."
    },
    {
        // Paso 3 (Simulado para demostración)
        image: "fotos/woman-airport-service-agent-with-passport-helping-traveler-check-terminal-counter-female-passenger-assistant-with-smile-travel-security-immigration-documents-airline-control.jpg",
        text: "El mantenimiento preventivo en tierra es un pilar fundamental. Cada revisión técnica está minuciosamente documentada para cumplir con los estándares internacionales de la aviación civil."
    }
];

let currentIndex = 0;
const totalSteps = steps.length;

// Elementos del DOM
const textElement = document.getElementById('step-text');
const imageElement = document.getElementById('step-image');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const currentStepText = document.getElementById('current-step');
const totalStepsText = document.getElementById('total-steps');

// Elemento SVG para la barra de progreso
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value; // Radio del círculo
const circumference = radius * 2 * Math.PI; // Circunferencia total

// Inicializamos el SVG para que la línea empiece oculta
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = circumference;

// Función para actualizar la barra de progreso circular
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Función principal que actualiza toda la interfaz
function updateUI() {
    // 1. Efecto de desvanecimiento para salida
    textElement.style.opacity = 0;
    imageElement.style.opacity = 0;

    // Esperar a que termine la animación de salida (300ms aprox)
    setTimeout(() => {
        // 2. Actualizar contenido
        textElement.textContent = steps[currentIndex].text;
        imageElement.src = steps[currentIndex].image;
        
        // 3. Actualizar textos de contador
        currentStepText.textContent = currentIndex + 1;
        
        // 4. Actualizar la barra de progreso visual alrededor del Avatar
        const progressPercentage = ((currentIndex + 1) / totalSteps) * 100;
        setProgress(progressPercentage);

        // 5. Lógica de habilitar/deshabilitar botones
        btnPrev.disabled = currentIndex === 0;
        
        if (currentIndex === totalSteps - 1) {
            btnNext.textContent = "Finalizar";
            btnNext.style.animation = "none"; // Quitar el efecto de latido en el último paso
        } else {
            btnNext.textContent = "Siguiente";
            btnNext.style.animation = "pulse 2s infinite"; // Restaurar el latido
        }

        // 6. Efecto de aparición (fade in)
        textElement.style.opacity = 1;
        imageElement.style.opacity = 1;
    }, 300); // 300ms es el tiempo que dura la transición opacity en CSS
}

// Evento: Botón Siguiente
btnNext.addEventListener('click', () => {
    if (currentIndex < totalSteps - 1) {
        currentIndex++;
        updateUI();
    } else {
        alert("¡Has finalizado esta sección de capacitación!");
    }
});

// Evento: Botón Anterior
btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateUI();
    }
});

// Arrancar la interfaz al cargar la página
totalStepsText.textContent = totalSteps;
updateUI();