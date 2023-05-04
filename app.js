//@ts-check
import { Quiz } from "./models/Quiz.js";
import { UI } from "./models/UI.js";
import { questions } from "./data/questions.js";

/* *******************************
        Variable Globales
********************************** */

let botonAcceder = document.getElementById("idBotonAcceder") 
let botonSalir = document.getElementById("idBotonSalir")



/* *******************************
        Eventos
********************************** */
botonAcceder?.addEventListener("click", login, false);
botonSalir?.addEventListener("click", logout, false);


/* *******************************
        Funciones
********************************** */


function mostrarQuiz(quiz, ui){
  if (quiz.isEnded()) {
    ui.showScores(quiz.score);
  }
  else{
    ui.showQuestion(quiz.getQuestionIndex().text);
    ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
    //Metodo en el que utilice peticiones asyncronas
    // ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => {
    //   quiz.guess(currentChoice);
    //   setTimeout(() => {
    //     console.log("1")
    //     renderPage(quiz, ui);
        
    //   }, 0);
    // });
    ui.showChoices(quiz.getQuestionIndex().choices);
    const botones = document.querySelectorAll("button.button")

    botones.forEach(e => {
      e.addEventListener("click",function(){
        //Comprobamos si la respuesta es correcta
        quiz.guess(this.textContent)

        //Mostramos la siguientes

        mostrarQuiz(quiz,ui)
      })
    })
   
  }

  }
    

    
    
  


function main() {
  document.getElementById("idNombreAutor").innerHTML= localStorage.getItem("nombre")
  localStorage.setItem("indice",0)

  const quiz = new Quiz(questions);
  const ui = new UI(quiz);
  mostrarQuiz(quiz,ui);
  
}



function login() {
  let nombre = prompt("Escribe tu nombre de usuario")
  localStorage.setItem("nombre", nombre)
  document.getElementById("idNombreAutor").innerHTML = nombre
}

function logout(){
  window.localStorage.clear();
  location.reload();
}

/* *******************************
        Llamada a Funciones
********************************** */

main();
