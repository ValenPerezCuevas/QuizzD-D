
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
    
    const usuarios = []
    usuarios.push(["luis",1])
    usuarios.push(["luis",3])
    usuarios.push(["luis",2])
    usuarios.push(["pepe",1])

    const usuario = localStorage.getItem("idBotonAcceder")

   
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

  
    
    console.log(H1Resultado,puntuacion)
    
    element1.appendChild(H1Resultado)
    element1.appendChild(puntuacion)

    console.log(usuario)
   
  }

  showProgress(currentIndex, total) {
    var element = document.getElementById("progress");
    console.log(this._quiz)
    element.innerHTML = `Pregunta ${currentIndex} de ${total}`;
  }
}
