
export class UI {
  constructor() {}

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
  showChoices(choices, callback) {
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {
      const button = document.createElement("button");
      button.addEventListener("click", () => callback(choices[i]));
      button.className = "button";
      button.innerText = choices[i];

      choicesContainer.append(button);
    }
  }

  showScores(score) {
    
       // let botonSalir = document.getElementById("idBotonSalir") 
    // botonSalir.addEventListener("click", logout, onclick);

    // function logout(){
    //   window.localStorage.clear();
    //   location.reload();
    // }


    const usuarios = []
    usuarios.push(["luis",1])
    usuarios.push(["luis",3])
    usuarios.push(["luis",2])
    usuarios.push(["pepe",1])

    const usuario = localStorage.getItem("idBotonAcceder")

   
    let H1Resultado = document.createElement("h1")
    let H1Resultado1 = document.createTextNode("Resultado de mi Quiz")
    H1Resultado.appendChild(H1Resultado1)
    
    // <h2 id="score">Your scores: ${quiz.score}</h2>

    let puntuacion = document.createElement("h3")
    let puntuacion1 = document.createTextNode(`Tu puntuacion es: ${score}`)
    puntuacion.appendChild(puntuacion1)


    const element1 = document.getElementById("quiz");  
    
    element1.addEventListener("click",(event)=> {
      event.target.parentElement.remove();
    })

    // element1.innerHTML=""
    
    console.log(H1Resultado,puntuacion)
    
    element1.appendChild(H1Resultado)
    element1.appendChild(puntuacion)
  }

  showProgress(currentIndex, total) {
    var element = document.getElementById("progress");
    element.innerHTML = `Pregunta ${currentIndex} de ${total}`;
  }
}
