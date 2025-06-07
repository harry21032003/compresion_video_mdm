// Mostrar/ocultar detalles de cada etapa
function mostrar(id) {
  const seccion = document.getElementById(id);
  const todasLasSecciones = document.querySelectorAll(".detalle");

  todasLasSecciones.forEach(sec => {
    if (sec !== seccion) {
      sec.style.display = "none";
    }
  });

  if (seccion.style.display === "block") {
    seccion.style.display = "none";
  } else {
    seccion.style.display = "block";
  }
}

// Actualizar el valor de bitrate en tiempo real
const bitrateInput = document.getElementById("bitrate");
const bitrateValue = document.getElementById("bitrateValue");
const perfilInput = document.getElementById("perfil");
const gopInput = document.getElementById("gop");
const resultadoSimulador = document.getElementById("resultadoSimulador");

bitrateInput.addEventListener("input", actualizarSimulacion);
perfilInput.addEventListener("change", actualizarSimulacion);
gopInput.addEventListener("input", actualizarSimulacion);

function actualizarSimulacion() {
  const bitrate = parseInt(bitrateInput.value);
  const perfil = perfilInput.value;
  const gop = parseInt(gopInput.value);

  bitrateValue.textContent = `${bitrate} kbps`;

  let calidad = "";
  let descripcion = "";

  // Evaluación básica de los parámetros
  if (bitrate < 1000) {
    calidad = "Baja";
    descripcion = "Alta compresión, pero notable pérdida de calidad. Recomendado solo para resoluciones pequeñas.";
  } else if (bitrate < 3000) {
    calidad = "Media";
    descripcion = "Compresión balanceada, pérdida aceptable en escenas estáticas. Adecuado para web en HD.";
  } else {
    calidad = "Alta";
    descripcion = "Buena calidad, adecuada para Full HD o mayor, ideal para streaming con pocas pérdidas visibles.";
  }

  // Ajustes según el perfil
  if (perfil === "high" && bitrate > 3000) {
    descripcion += " El perfil High permite mejor rendimiento en calidad visual.";
  } else if (perfil === "baseline") {
    descripcion += " El perfil Baseline limita ciertas optimizaciones de compresión.";
  }

  resultadoSimulador.innerHTML = `
    <p><strong>Resultado estimado:</strong></p>
    <p><strong>Calidad:</strong> ${calidad}</p>
    <p>${descripcion}</p>
    <p><strong>GOP:</strong> ${gop} cuadros</p>
  `;
}
