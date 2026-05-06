const nombre = document.getElementById("nombre"); /* Se obtienen los elementos del formulario de inicio de sesión utilizando sus IDs. */
const apellido = document.getElementById("apellido"); /* Se obtienen los elementos del formulario de inicio de sesión utilizando sus IDs. */
const telefono = document.getElementById("telefono"); /* Se obtienen los elementos del formulario de inicio de sesión utilizando sus IDs. */
const form = document.getElementById("form"); /* Se obtiene el elemento del formulario utilizando su ID. */

form.addEventListener("submit", (e) => { /* Se agrega un evento de escucha al formulario para detectar cuando se envía. */
    e.preventDefault(); /* Se previene el comportamiento predeterminado del formulario, que es recargar la página. */

    const nombreValor = nombre.value.trim(); /* Se obtiene el valor del campo de nombre y se eliminan los espacios en blanco al inicio y al final. */
    const apellidoValor = apellido.value.trim(); /* Se obtiene el valor del campo de apellido y se eliminan los espacios en blanco al inicio y al final. */
    const telefonoValor = telefono.value.trim(); /* Se obtiene el valor del campo de teléfono y se eliminan los espacios en blanco al inicio y al final. */

    if (!nombreValor || !apellidoValor || !telefonoValor) { /* Se verifica si alguno de los campos está vacío. */
        alert("Por favor completa todos los campos."); /* Si algún campo está vacío, se muestra una alerta al usuario. */
        return; /* Se detiene la ejecución del código. */
    }

    if (telefonoValor.length !== 10) { /* Se verifica si el número de teléfono tiene exactamente 10 dígitos. */
        alert("El número de teléfono debe tener exactamente 10 dígitos."); /* Si el número de teléfono no tiene exactamente 10 dígitos, se muestra una alerta al usuario. */
        return; /* Se detiene la ejecución del código. */
    }

    window.location.href = "services.html"; /* Si todos los campos están completos y el número de teléfono tiene exactamente 10 dígitos, se redirige al usuario a la página de servicios. */
});

nombre.addEventListener("input", () => { /* Se agrega un evento de escucha al campo de nombre para detectar cuando el usuario ingresa texto. */
    nombre.value = nombre.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,""); /* Se eliminan los caracteres no alfabéticos del campo de nombre. */
});

apellido.addEventListener("input", () => { /* Se agrega un evento de escucha al campo de apellido para detectar cuando el usuario ingresa texto. */
    apellido.value = apellido.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,""); /* Se eliminan los caracteres no alfabéticos del campo de apellido. */
});

telefono.addEventListener("input", () => { /* Se agrega un evento de escucha al campo de teléfono para detectar cuando el usuario ingresa texto. */
    telefono.value = telefono.value.replace(/[^0-9]/g,"").slice(0, 10); /* Se eliminan los caracteres no numéricos del campo de teléfono y se limita a 10 caracteres. */
});











