
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
    
    this.almacenarResultado(score)
   
    let H1Resultado = document.createElement("h1")
    let H1Resultado1 = document.createTextNode("Resultado de mi Quiz")
    H1Resultado.appendChild(H1Resultado1)
    
    //Se crea un elemento y se le añade la puntuación. 

    let puntuacion = document.createElement("h3")
    let puntuacion1 = document.createTextNode(`Tu puntuacion es: ${score}`)
    puntuacion.appendChild(puntuacion1)

//Evento para borrar elemento del quizz
    const element1 = document.getElementById("quiz");  
    
    element1.addEventListener("click",(event)=> {
      document.getElementById("cabecera").remove();
      document.getElementById("main").remove();
      document.getElementById("footer").remove();
      
    })
/* *******************************
        Creación de tabla
********************************** */

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
    
    element1.appendChild(H1Resultado)
    element1.appendChild(puntuacion)

   
  }

  showProgress(currentIndex, total) {
    let element = document.getElementById("progress");
    console.log(this._quiz)
    element.innerHTML = `Pregunta ${this._quiz.getIndex()} de ${total}`;
  }

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
