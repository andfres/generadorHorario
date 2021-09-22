const d = new Date();
d.setHours(10, 50);
const duracion_clase = 50;
const duracion_pausas = 5;

const asig = ['ENTORNO CLIENTE', 'ENTORNO SERVIDOR', 'DESPLIEGUE A. WEB',
  'DISEÑO INTERFAZ', 'EMPRESA E INICIATIVA'
]

const array = [
  ['1', 0, 0, 1, 1, 2],
  ['2', 0, 0, 1, 0, 2],
  ['3', 3, 2, 4, 0, 4],

  ['4', 2, 2, 2, 3, 3],
  ['5', 2, 3, 0, 3, 3],
  ['5', 2, 0, 0, 3, 3]
];


const array3 = [
  ['1', asig[0], asig[0], asig[1], asig[1], asig[2]],
  ['2', asig[0], asig[0], asig[1], asig[0], asig[2]],
  ['3', asig[3], asig[2], asig[4], asig[0], asig[4]],

  ['4', asig[2], asig[2], asig[2], asig[3], asig[3]],
  ['5', asig[2], asig[3], asig[0], asig[3], asig[3]],
  ['5', asig[2], asig[0], asig[0], asig[3], asig[3]]
];



const array2 = [
  ['1', '', 'A', 'A', 'A', 'a'],
  ['2', 'B', 'B', 'B', 'A', 'a'],
  ['3', 'B', 'B', 'B', 'A', 'a'],
  ['4', 'B', 'A', 'B', 'A', 'a'],
  ['5', 'C', 'D', 'J', 'A', 'a'],
  ['5', 'C', 'D', 'J', 'A', 'c']
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