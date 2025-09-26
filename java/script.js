let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
let numeroIntento = 0;
let finJuego = false;
let tiempoRestante = 60; // ⏳ tiempo inicial en segundos
let temporizador;

const adivinanzaInput = document.getElementById('adivinanza');
const botonIntentar = document.getElementById('botonIntentar');
const intentosPrevios = document.getElementById('intentosPrevios');
const resultado = document.getElementById('resultado');
const pista = document.getElementById('pista');
const reiniciarJuego = document.getElementById('reiniciarJuego');
const contador = document.getElementById('contador');
const tiempo = document.getElementById('tiempo');

// 🔹 Función principal
function verificarIntento() {
    if (finJuego) return;

    const adivinanzaUsuario = Number(adivinanzaInput.value);

    if (!adivinanzaUsuario || adivinanzaUsuario < 1 || adivinanzaUsuario > 100) {
        resultado.textContent = '⚠️ Por favor, introduce un número válido entre 1 y 100.';
        resultado.style.color = "orange";
        return;
    }

    numeroIntento++;

    if (numeroIntento === 1) {
        intentosPrevios.textContent = 'Intentos previos: ';
    }

    intentosPrevios.textContent += adivinanzaUsuario + ' ';
    
    if (adivinanzaUsuario === numeroAleatorio) {
        resultado.textContent = '🎉 ¡Felicidades! Adivinaste el número.';
        resultado.style.color = 'lightgreen';
        pista.textContent = '';
        finDelJuego();
    } else if (numeroIntento >= 10) {
        resultado.textContent = '❌ ¡Fin del juego! El número era ' + numeroAleatorio + '.';
        resultado.style.color = 'red';
        pista.textContent = '';
        finDelJuego();
    } else {
        resultado.textContent = '❌ Incorrecto.';
        resultado.style.color = 'red';

        if (adivinanzaUsuario < numeroAleatorio) {
            pista.textContent = 'El número es mayor ⬆️';
        } else {
            pista.textContent = 'El número es menor ⬇️';
        }

        // 🔹 Vibración al fallar
        resultado.classList.add("vibrar");
        setTimeout(() => resultado.classList.remove("vibrar"), 300);
    }

    // 🔹 Actualizar contador dinámico
    contador.textContent = `Intentos restantes: ${10 - numeroIntento}`;

    adivinanzaInput.value = '';
    adivinanzaInput.focus();
}

// 🔹 Fin del juego
function finDelJuego() {
    finJuego = true;
    clearInterval(temporizador); // detener el reloj
    adivinanzaInput.disabled = true;
    botonIntentar.disabled = true;
    reiniciarJuego.style.display = 'inline-block';
}

// 🔹 Reiniciar partida
function reiniciarPartida() {
    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    numeroIntento = 0;
    finJuego = false;
    tiempoRestante = 60;

    adivinanzaInput.disabled = false;
    botonIntentar.disabled = false;
    adivinanzaInput.value = '';
    intentosPrevios.textContent = 'Intentos previos:';
    resultado.textContent = '';
    pista.textContent = '';
    contador.textContent = "Intentos restantes: 10";
    tiempo.textContent = "Tiempo restante: 60s";
    tiempo.classList.remove("parpadeo");
    reiniciarJuego.style.display = 'none';

    iniciarTemporizador();
}

// 🔹 Temporizador
function iniciarTemporizador() {
    temporizador = setInterval(() => {
        tiempoRestante--;
        tiempo.textContent = `Tiempo restante: ${tiempoRestante}s`;

        if (tiempoRestante <= 10) {
            tiempo.classList.add("parpadeo");
        }

        if (tiempoRestante <= 0) {
            resultado.textContent = '⌛ ¡Tiempo agotado! El número era ' + numeroAleatorio + '.';
            resultado.style.color = "red";
            pista.textContent = '';
            finDelJuego();
        }
    }, 1000);
}

// 🔹 Eventos
botonIntentar.addEventListener('click', verificarIntento);
reiniciarJuego.addEventListener('click', reiniciarPartida);

// Iniciar el juego automáticamente
iniciarTemporizador();
