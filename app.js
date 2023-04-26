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
botonAcceder.addEventListener("click", login, onclick);
botonSalir.addEventListener("click", logout, onclick);


/* *******************************
        Funciones
********************************** */
// Renderring the page (método a eliminar para que no fuera recursivo)
// const renderPage = (quiz, ui) => {
//   if (quiz.isEnded()) {
//     ui.showScores(quiz.score);
//   } else {
//     console.log(quiz);
//     // ui.showUsuario(quiz.getQuestionIndex().text);
//     ui.showQuestion(quiz.getQuestionIndex().text);
//     ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
//     ui.showChoices(quiz.getQuestionIndex().choices, (currenChoice) => {
//       quiz.guess(currenChoice);
//       renderPage(quiz, ui);
//     });
//   }
// };
// Aplicación que peta la ram del navegador. Buscar alternativa asíncrona
// const renderPage = (quiz, ui) => {
//   while (!quiz.isEnded()) {
//     console.log(quiz);
//     ui.showQuestion(quiz.getQuestionIndex().text);
//     ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
//     ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => {
//       quiz.guess(currentChoice);
//     });
//   }
//   ui.showScores(quiz.score);
// };

const renderPage = (quiz, ui) => {
  while (!quiz.isEnded()) {
    console.log(quiz);
    ui.showQuestion(quiz.getQuestionIndex().text);
    ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
    ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => {
      quiz.guess(currentChoice);
      setTimeout(() => {
        renderPage(quiz, ui);
      }, 0);
    });
    return;
  }
  ui.showScores(quiz.score);
};

function main() {
  document.getElementById("idNombreAutor").innerHTML= localStorage.getItem("nombre")
  const quiz = new Quiz(questions);
  const ui = new UI();
  renderPage(quiz, ui);
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

main();
