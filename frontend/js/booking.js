const selectedServiceElement = document.getElementById("selected-service");
const serviceName = localStorage.getItem("servicio");

const daysContainer = document.getElementById("days-container");
const hoursContainer = document.getElementById("hours-container");
const scheduleMessage = document.getElementById("schedule-message");
const summaryDay = document.getElementById("summary-day");
const summaryHour = document.getElementById("summary-hour");
const summaryService = document.getElementById("summary-service");
const confirmButton = document.getElementById("confirm-booking");
const barbersContainer = document.getElementById("barbers-container");
const summaryBarber = document.getElementById("summary-barber");

// Mostramos el servicio que el usuario eligió en la pantalla anterior
if (selectedServiceElement) {
  selectedServiceElement.textContent = serviceName || "Servicio";
}

// Aquí guardamos la fecha y hora seleccionadas por el usuario
let selectedDay = null;
let selectedHour = null;
let selectedBarber = null;

// Barberos disponibles para que el usuario elija primero
const availableBarbers = [
  "Yeiner Gonzales",
  "Camilo Rodriguez",
];

// Horarios disponibles para mostrar cuando el usuario elija un día
const availableHours = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",  
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
];

// Días de la semana
const weekDays = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado"
];

// Meses para mostrar el nombre correcto del mes
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre"
];

// Obtenemos la fecha actual
const today = new Date();
const currentDayIndex = today.getDay();
const currentDate = today.getDate();
const currentMonth = months[today.getMonth()];

// Función para limpiar estilos activos de los días
function clearActiveDays() {
  const dayButtons = document.querySelectorAll(".calendar");
  dayButtons.forEach((button) => {
    button.classList.remove("active-day");
  });
}

// Función para limpiar estilos activos de las horas
function clearActiveHours() {
  const hourButtons = document.querySelectorAll(".hour-btn");
  hourButtons.forEach((button) => {
    button.classList.remove("active-hour");
  });
}

// Función para limpiar estilos activos de los barberos
function clearActiveBarbers() {
  const barberButtons = document.querySelectorAll(".barber-btn");
  barberButtons.forEach((button) => {
    button.classList.remove("active-barber");
  });
}

// Función para actualizar el resumen de la cita
function updateSummary() {
  if (summaryService) {
    summaryService.textContent = serviceName || "-";
  }

  if (summaryBarber) {
    summaryBarber.textContent = selectedBarber || "-";
  }

  if (summaryDay) {
    summaryDay.textContent = selectedDay || "-";
  }

  if (summaryHour) {
    summaryHour.textContent = selectedHour || "-";
  }
}

// Función para mostrar los barberos disponibles
function renderBarbers() {
  if (!barbersContainer) return;

  barbersContainer.innerHTML = "";

  availableBarbers.forEach((barber) => {
    const barberButton = document.createElement("button");
    barberButton.type = "button";
    barberButton.classList.add("calendar", "barber-btn");
    barberButton.innerHTML = `<p>${barber}</p>`;

    barberButton.addEventListener("click", () => {
      clearActiveBarbers();
      barberButton.classList.add("active-barber");

      selectedBarber = barber;
      selectedDay = null;
      selectedHour = null;

      updateSummary();
      renderDays();
      renderHours();
      clearActiveDays();
      clearActiveHours();
    });

    barbersContainer.appendChild(barberButton);
  });
}

// Función para mostrar los horarios cuando se elige un día
function renderHours() {
  if (!hoursContainer || !scheduleMessage) return;

  hoursContainer.innerHTML = "";

  if (!selectedBarber) {
    scheduleMessage.textContent = "Selecciona un barbero para ver los horarios disponibles.";
    return;
  }

  // Si todavía no se ha elegido un día, mostramos un mensaje de guía
  if (!selectedDay) {
    scheduleMessage.textContent = "Selecciona un día para ver los horarios disponibles.";
    return;
  }

  scheduleMessage.textContent = `Horarios disponibles para ${selectedDay}.`;

  availableHours.forEach((hour) => {
    const hourButton = document.createElement("button");
    hourButton.type = "button";
    hourButton.classList.add("calendar", "hour-btn");
    hourButton.innerHTML = `<p>${hour}</p>`;

    hourButton.addEventListener("click", () => {
      clearActiveHours();
      hourButton.classList.add("active-hour");
      selectedHour = hour;
      updateSummary();
    });

    hoursContainer.appendChild(hourButton);
  });
}

// Función para crear las tarjetas de los días
function renderDays() {
  if (!daysContainer) return;

  daysContainer.innerHTML = "";

  if (!selectedBarber) {
    return;
  }

  // Vamos a mostrar los próximos 7 días desde hoy
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const dayName = weekDays[date.getDay()];
    const dayNumber = date.getDate();
    const monthName = months[date.getMonth()];

    const dayButton = document.createElement("button");
    dayButton.type = "button";
    dayButton.classList.add("calendar");

    // Si el día generado es el día actual, lo marcamos como hoy
    const isToday = i === 0;
    if (isToday) {
      dayButton.classList.add("today-day");
    }

    dayButton.innerHTML = `
      <p>${isToday ? "hoy" : dayName}</p>
      <p class="num">${dayNumber}</p>
      <p>${monthName}</p>
    `;

    dayButton.addEventListener("click", () => {
      if (!selectedBarber) {
        alert("Primero debes seleccionar un barbero.");
        return;
      }

      clearActiveDays();
      dayButton.classList.add("active-day");

      // Guardamos el día seleccionado en texto simple
      selectedDay = `${isToday ? "hoy" : dayName} ${dayNumber} ${monthName}`;
      selectedHour = null;

      // Al cambiar de día, limpiamos la selección de horas
      updateSummary();
      renderHours();
      clearActiveHours();
    });

    daysContainer.appendChild(dayButton);
  }
}

// Botón de confirmación
if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    if (!selectedBarber || !selectedDay || !selectedHour) {
      alert("Primero debes seleccionar un barbero, un día y una hora.");
      return;
    }

    // Aquí luego podrás mandar la cita al backend
    const bookingData = {
      service: serviceName || "",
      barber: selectedBarber || "",
      day: selectedDay,
      hour: selectedHour
    };

    console.log("Cita lista para enviar:", bookingData);
    alert("Cita lista para confirmar.");
  });
}

// Inicializamos la pantalla
updateSummary();
renderBarbers();
renderDays();
renderHours();