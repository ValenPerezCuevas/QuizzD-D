//@ts-check
import { Question } from "./Question.js";

export class Quiz {
  score = 0;
  

  /**
   *
   * @param {Question[]} questions
   */
  constructor(questions) {
    this.questions = questions;
  }

  /**
   *
   * @returns {Question} the question found
   */
  getQuestionIndex() {
    return this.questions[parseInt(localStorage.getItem("indice"))];
  }

  getIndex(){
    return parseInt(localStorage.getItem("indice"))
  }

  isEnded() {
    return this.questions.length === parseInt(localStorage.getItem("indice"));
  }

  guess(answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
      this.score++;
      console.log("Correcta")
    }
    let indice = parseInt(localStorage.getItem("indice"));
    localStorage.setItem("indice",indice+1);
  }

}
