
export class UI {
  constructor(quiz) {
    this._quiz=quiz
  }
  
  get quiz(){
    return this._quiz;
  }

  /**
   *
   * @param {sting} text
   */

  

  showQuestion(text) {
    
    const questionTitle = document.getElementById("question");
    questionTitle.innerHTML = text;
  }

 

  /**
   *
   * @param {string[]} choices
   */
  showChoices(choices) {
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {
      const button = document.createElement("button");
      button.className = "button";
      button.innerText = choices[i];
      let mascara = this 
      choicesContainer.append(button);
}
  }


  showScores(score) {

/* *******************************
        Mostrar el resultado actual
********************************** */
    this.almacenarResultado(score)
    let H1Resultado = document.createElement("h3")
    let H1Resultado1 = document.createTextNode("Tu resultado de esta partida es: ")
    H1Resultado.appendChild(H1Resultado1)
    let puntuacion = document.createElement("h3")
    let puntuacion1 = document.createTextNode(`${score}`)
    puntuacion.appendChild(puntuacion1)

/* *******************************
        Borrar los otros elementos
        para mostrar resultado
********************************** */
    const element1 = document.getElementById("quiz");  
    
    element1.addEventListener("click",(event)=> {
      document.getElementById("cabecera").remove();
      document.getElementById("main").remove();
      document.getElementById("footer").remove();
      
    })

    
/* *******************************
        Creación de tabla
********************************** */
let H3Tabla1 = document.createTextNode("Tabla de puntuaciones")
let H3Tabla = document.createElement("legend")
H3Tabla.appendChild(H3Tabla1)

let nombres = [];


let nombreGet = localStorage.getItem("nombre")
nombres.push(nombreGet)
console.log("El nombre", nombreGet)

let informacion = JSON.parse(localStorage.getItem("informacion"))
let resultado = informacion.resultados

console.log("El array es: -----------", resultado)

let tabla = document.getElementById("idTabla")
tabla.removeAttribute("class")
for(let i = 0; i < resultado.length; i++){
  let tr = document.createElement("tr")
  let td = document.createElement("td")
  td.innerHTML = resultado[i].nombre; 

  tr.appendChild(td)
  
  let td2 = document.createElement("td")
  td2.innerHTML = resultado[i].puntuacion; 

  tr.appendChild(td2)

  tabla.appendChild(tr)

}

console.log(resultado);
    
    console.log(H1Resultado,puntuacion)
    
    element1.appendChild(H3Tabla)
    element1.appendChild(H1Resultado)
    element1.appendChild(puntuacion)
   /* *******************************
            Botón para volver al inicio
    ********************************** */
            const btnInicio = document.createElement("button");
            const btnInicioText = document.createTextNode("Volver al inicio");
            btnInicio.appendChild(btnInicioText);
            
            btnInicio.addEventListener("click", () => {
              window.location.href = "index.html";
            });
            
            element1.appendChild(btnInicio);  

   /* *******************************
            Botón para mostrar ultimos 5
    ********************************** */
            const btnMostrar5Ultimos = document.createElement("button");
            const btmMostrar5UltimosTexto = document.createTextNode("Últimos 5 resultados");
            btnMostrar5Ultimos.appendChild(btmMostrar5UltimosTexto);

            btnMostrar5Ultimos.addEventListener("click", () => {
              // Obtener los 5 primeros resultados
              //const ult5 = resultado.slice(0, 5);
              const ult5 = resultado.slice(Math.max(resultado.length - 5, 0));

              // Crear una nueva tabla con los 5 primeros resultados
              const tablaTop5 = document.createElement("table");
              const trHeader = document.createElement("tr");
              const thNombre = document.createElement("th");
              const thPuntuacion = document.createElement("th");
              const thNombreText = document.createTextNode("Nombre");
              const thPuntuacionText = document.createTextNode("Puntuación");
              
              thNombre.appendChild(thNombreText);
              thPuntuacion.appendChild(thPuntuacionText);
              trHeader.appendChild(thNombre);
              trHeader.appendChild(thPuntuacion);
              tablaTop5.appendChild(trHeader);
              
              for(let i = 0; i < ult5.length; i++){
                const tr = document.createElement("tr");
                const tdNombre = document.createElement("td");
                const tdPuntuacion = document.createElement("td");
                const tdNombreText = document.createTextNode(ult5[i].nombre);
                const tdPuntuacionText = document.createTextNode(ult5[i].puntuacion);
                
                tdNombre.appendChild(tdNombreText);
                tdPuntuacion.appendChild(tdPuntuacionText);
                tr.appendChild(tdNombre);
                tr.appendChild(tdPuntuacion);
                tablaTop5.appendChild(tr);
              }
              
              // Agregar la nueva tabla a la página
              element1.appendChild(tablaTop5);
            });
            

            element1.appendChild(btnMostrar5Ultimos);


  /* *******************************
            Botón para mostrar top 5
             puntuaciones
    ********************************** */

             const btnMostrarTop5Altas = document.createElement("button");
             const btnMostrarTop5AltasTexto = document.createTextNode("Top 5 puntuaciones más altas");
             btnMostrarTop5Altas.appendChild(btnMostrarTop5AltasTexto);
             
             btnMostrarTop5Altas.addEventListener("click", () => {
               // Ordenar el array de resultados según la puntuación
               const sorted = resultado.sort((a, b) => b.puntuacion - a.puntuacion);
               
               // Seleccionar los primeros 5 elementos
               const top5 = sorted.slice(0, 5);
               
               // Crear una nueva tabla con los 5 primeros resultados
               const tablaTop5 = document.createElement("table");
               const trHeader = document.createElement("tr");
               const thNombre = document.createElement("th");
               const thPuntuacion = document.createElement("th");
               const thNombreText = document.createTextNode("Nombre");
               const thPuntuacionText = document.createTextNode("Puntuación");
                           
               thNombre.appendChild(thNombreText);
               thPuntuacion.appendChild(thPuntuacionText);
               trHeader.appendChild(thNombre);
               trHeader.appendChild(thPuntuacion);
               tablaTop5.appendChild(trHeader);
                           
               for(let i = 0; i < top5.length; i++){
                 const tr = document.createElement("tr");
                 const tdNombre = document.createElement("td");
                 const tdPuntuacion = document.createElement("td");
                 const tdNombreText = document.createTextNode(top5[i].nombre);
                 const tdPuntuacionText = document.createTextNode(top5[i].puntuacion);
                             
                 tdNombre.appendChild(tdNombreText);
                 tdPuntuacion.appendChild(tdPuntuacionText);
                 tr.appendChild(tdNombre);
                 tr.appendChild(tdPuntuacion);
                 tablaTop5.appendChild(tr);
               }
                           
               // Agregar la nueva tabla a la página
               element1.appendChild(tablaTop5);
             });
             
             element1.appendChild(btnMostrarTop5Altas);
             
        /* *******************************
            Botón para mostrar 5
            mas bajas
    ********************************** */

            const btnMostrar5MasBajas = document.createElement("button");
const btnMostrar5MasBajasTexto = document.createTextNode("5 puntuaciones más bajas");
btnMostrar5MasBajas.appendChild(btnMostrar5MasBajasTexto);

btnMostrar5MasBajas.addEventListener("click", () => {
  // Ordenar los resultados de menor a mayor
  const resultadosOrdenados = resultado.sort((a, b) => a.puntuacion - b.puntuacion);

  // Obtener los 5 primeros resultados
  const ult5 = resultadosOrdenados.slice(0, 5);

  // Crear una nueva tabla con los 5 primeros resultados
  const tablaTop5 = document.createElement("table");
  const trHeader = document.createElement("tr");
  const thNombre = document.createElement("th");
  const thPuntuacion = document.createElement("th");
  const thNombreText = document.createTextNode("Nombre");
  const thPuntuacionText = document.createTextNode("Puntuación");

  thNombre.appendChild(thNombreText);
  thPuntuacion.appendChild(thPuntuacionText);
  trHeader.appendChild(thNombre);
  trHeader.appendChild(thPuntuacion);
  tablaTop5.appendChild(trHeader);

  for(let i = 0; i < ult5.length; i++){
    const tr = document.createElement("tr");
    const tdNombre = document.createElement("td");
    const tdPuntuacion = document.createElement("td");
    const tdNombreText = document.createTextNode(ult5[i].nombre);
    const tdPuntuacionText = document.createTextNode(ult5[i].puntuacion);

    tdNombre.appendChild(tdNombreText);
    tdPuntuacion.appendChild(tdPuntuacionText);
    tr.appendChild(tdNombre);
    tr.appendChild(tdPuntuacion);
    tablaTop5.appendChild(tr);
  }

  // Agregar la nueva tabla a la página
  element1.appendChild(tablaTop5);
});

element1.appendChild(btnMostrar5MasBajas);

        
      }
  




  showProgress(currentIndex, total) {
    let element = document.getElementById("progress");
    console.log(this._quiz)
    element.innerHTML = `Pregunta ${this._quiz.getIndex()} de ${total}`;
  }



  /* *******************************
        Funcion de almacenamiento
        en localstorage
********************************** */
  almacenarResultado(score){
    
    let informacion=localStorage.getItem("informacion")

    if(informacion === null) {
      informacion = { 
        resultados : [{
          nombre:localStorage.getItem("nombre"),
          puntuacion:score}]
        }
    }else{
      informacion=JSON.parse(informacion)
      informacion.resultados.push(
        {
          nombre: localStorage.getItem("nombre"),
          puntuacion:score
        })
    }
    
    localStorage.setItem("informacion", JSON.stringify(informacion))

    console.log("aaaaaaaa",informacion)
    
  }
}
