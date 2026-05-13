const userNameElement = document.getElementById("user-name"); /* Se obtiene el elemento del nombre de usuario utilizando su ID. */
const userName = localStorage.getItem("nombre"); /* Se obtiene el valor del nombre de usuario almacenado en el almacenamiento local del navegador. */

if (userNameElement) { /* Se verifica si el elemento del nombre de usuario existe en la página. */
	userNameElement.textContent = userName || "Usuario"; /* Si el nombre de usuario existe, se muestra en el elemento. Si no, se muestra "Usuario" por defecto. */
}

const serviceCards = document.querySelectorAll(".service-card"); /* Se seleccionan todos los elementos con la clase "service-card" y se almacenan en una variable. */

serviceCards.forEach((card) => { /* Se itera sobre cada tarjeta de servicio utilizando el método forEach. */
	card.addEventListener("click", () => { /* Se agrega un evento de escucha a cada tarjeta de servicio para detectar cuando se hace clic en ella. */
		const service = card.dataset.service; /* Se obtiene el valor del atributo "data-service" de la tarjeta de servicio, que contiene el nombre del servicio seleccionado. */
		localStorage.setItem("servicio", service); /* Se almacena el nombre del servicio seleccionado en el almacenamiento local del navegador. */
		window.location.href = "booking.html"; /* Se redirige al usuario a la página de reserva (booking.html) para que pueda seleccionar la fecha y hora de su cita. */
	});
});