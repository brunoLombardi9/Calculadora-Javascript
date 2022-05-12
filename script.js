// Variables -------------------------------------------------------------------------------------------------------

const botonesNumeros = document.querySelectorAll('[data-numero]');
const botonesOperadores = document.querySelectorAll('[data-operador]');
const botonCe = document.querySelector('[data-borrar-todo]'); // borra todo
const botonC = document.querySelector('[data-borrar]'); // borra ultima entrada
const botonIgual = document.querySelector('[data-igual]'); //ejecuta la operacion cargada
const operacionAnterior = document.querySelector('[data-operacion-arriba]'); // parte superior del display
const operacionActual = document.querySelector('[data-operacion-abajo]'); // parte inferior del display
let operacion;
let resultado;

// Funciones -------------------------------------------------------------------------------------------------------

function escribirNumero(botonNumero) {
  if (operacionActual.innerText === "0") return;
  if (botonNumero.innerText === "." && operacionActual.innerText.includes(".")) return;

  operacionActual.innerText += botonNumero.innerText;

  if (operacionActual.innerText === ".") {
    operacionActual.innerText = "0.";
  }
}

function elegirOperacion(botonesOperadores) {
  if (operacionActual.innerText === "") return;
  if (operacionActual.innerText.slice(-1) === ".") {
    operacionActual.innerText = operacionActual.innerText.slice(0, -1);
  }

  if (operacionActual.innerText !== "" && operacionAnterior.innerText !== "") {
    calcular();
  }

  operacion = botonesOperadores.innerText;

  if (operacionActual.innerText.includes(".")) {
    if (contarDecimales(parseFloat(operacionActual.innerText)) > 5) {
      operacionActual.innerText = parseFloat(operacionActual.innerText).toFixed(5);
    }
  }

  operacionAnterior.innerText = `${operacionActual.innerText} ${operacion}`;
  operacionActual.innerText = "";
}

function calcular() {
  if (operacionActual.innerText === "" || operacionAnterior.innerText === "") return;

  const numeroAnterior = parseFloat(operacionAnterior.innerText);
  const numeroActual = parseFloat(operacionActual.innerText);

  switch (operacion) {
    case "+":
      resultado = numeroAnterior + numeroActual;
      break;
    case "-":
      resultado = numeroAnterior - numeroActual;
      break;
    case "x":
      resultado = numeroAnterior * numeroActual;
      break;
    case "/":
      resultado = numeroAnterior / numeroActual;
      break;
  }

  operacionAnterior.innerText = "";

  if (Number.isInteger(resultado) === false) {
    if (contarDecimales(resultado) > 5) {
      resultado = resultado.toFixed(5);
    }
  }

  operacionActual.innerText = resultado;
}

function borrarTodo() {
  operacionAnterior.innerText = "";
  operacionActual.innerText = "0";
  resultado = null;
}

function borrar() {
  if (operacionActual.innerText === "0") return;
  if (operacionActual.innerText.length === 1) {
    operacionActual.innerText = "0";
  } else {
    operacionActual.innerText = operacionActual.innerText.slice(0, -1);
  }
}

function contarDecimales(numero) {
  if (Math.floor(numero) === numero) return 0;
  return numero.toString().split(".")[1].length;
}

// Eventos  -------------------------------------------------------------------------------------------------------

botonesNumeros.forEach(boton => {
  boton.addEventListener('click', () => {
    escribirNumero(boton);
  });
});

botonesOperadores.forEach(boton => {
  boton.addEventListener('click', () => {
    elegirOperacion(boton);
  });
});

botonCe.addEventListener('click', () => {
  borrarTodo();
});

botonC.addEventListener('click', () => {
  borrar();
});

botonIgual.addEventListener('click', () => {
  calcular();
});
