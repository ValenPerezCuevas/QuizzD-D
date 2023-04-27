
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
    
    const gameOverHTML = `
      
      <h2 id="score"> Tu puntuación es ${score}</h2>
      <input type="button" value="Volver Inicio" id="idBotonSalir">
      `;
    

    const element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

    let botonSalir = document.getElementById("idBotonSalir") 
    botonSalir.addEventListener("click", logout, onclick);

    function logout(){
      window.localStorage.clear();
      location.reload();
    }
  }

  showProgress(currentIndex, total) {
    var element = document.getElementById("progress");
    element.innerHTML = `Pregunta ${currentIndex} de ${total}`;
  }
}
