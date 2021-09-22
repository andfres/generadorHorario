const d = new Date();
d.setHours(10, 50);
const duracion_clase = 50;
const duracion_pausas = 5;

const asig = ['ENTORNO CLIENTE ', 'ENTORNO SERVIDOR', 'DESPLIEGUE A. WEB',
  'DISEÑO INTERFAZ', 'EMPRESA E INICIATIVA'
]

const array = [
  ['1', 0, 2, 1, 0, 0],
  ['2', 0, 2, 1, 0, 0],
  ['3', 0, 4, 1, 0, 2],

  ['4', 1, 1, 3, 3, 2],
  ['5', 1, 1, 3, 3, 4],
  ['5', 1, 1, 3, 3, 4]
];





function minutes_with_leading_zeros(dt) {
  let hora = dt.getHours() + ':' + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
  //console.log (hora);
  return hora
}



for (let i = 0; i < array.length; i++) {

  console.log(i);
  //Si es 4º hora (despues del recreo) añado 20 minutos
  if (i === 3) {
    d.setMinutes(d.getMinutes() + 60);
    //Añado los minutos de descanso
  } else {
    d.setMinutes(d.getMinutes() + duracion_pausas);
  }

  let hora_entrada = minutes_with_leading_zeros(d);

  //Añado los minutos de la clase
  d.setMinutes(d.getMinutes() + duracion_clase);

  let hora_salida = minutes_with_leading_zeros(d);

  array[i].splice(0, 1, hora_entrada + '</br>' + hora_salida);


}



const contenedor = document.getElementById("contenedor");
const tabla = document.getElementById("tbody");

function generar() {

  for (let i = 0; i < array.length; i++) {
    let newRow = tabla.insertRow();

    for (let j = 0; j < array[i].length; j++) {

      funcion2(newRow, i, j);
    }
  }



  function esPrimera(i, j) {
    if (i === 0) return true;
    return array[i][j] !== array[i - 1][j];
  }



  function contarRepeticiones(i, j) {
    if (i >= array.length - 1) return 1;
    if (array[i][j] !== array[i + 1][j]) return 1;
    return contarRepeticiones(i + 1, j) + 1;
  }

  function funcion2(newRow, i, j) {

    if (!esPrimera(i, j)) return;

    const cell = newRow.insertCell();

    const repetidas = contarRepeticiones(i, j);
    if (repetidas > 1) cell.rowSpan = repetidas;

    //Asigno clases a las celdas
    cell.classList.add('celda' + array[i][j]);

    //cell.innerHTML = `${i}${j}-${array[i][j]}-${repetidas}`;


    //columna horario
    let element;
    if (j === 0) {
      element = array[i][j];


    } else {

      element = asig[array[i][j]];

    }

    cell.innerHTML = `${element}`;





  }

  document.getElementById("boton_generar").remove();
} // fin function generar

generar();
//document.getElementById('boton_generar').onclick = generar;