export class UI {
  constructor(quiz) {
    this._quiz = quiz;
  }

  get quiz() {
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
      let mascara = this;
      choicesContainer.append(button);
    }
  }

  showScores(score) {
    /* *******************************
        Borrar los otros elementos
        para mostrar resultado
********************************** */
    const element1 = document.getElementById("quiz");

    element1.addEventListener("click", (event) => {
      document.getElementById("main").remove();
      document.getElementById("footer").remove();
    });

    /* *******************************
    Mostrar el resultado actual
********************************** */
    this.almacenarResultado(score);
    let h3TextoResultado = crearNodo(
      "h3",
      "Tu resultado en esta partida es: ",
      element1
    );
    let h3Score = crearNodo("h3", score.toString(), element1);

    /* *******************************
        Creación de tabla
        de resultados
********************************** */

    let nombres = [];
    let nombreGet = localStorage.getItem("nombre");
    nombres.push(nombreGet);

    let informacion = JSON.parse(localStorage.getItem("informacion"));
    let resultado = informacion.resultados;

    let tabla = document.getElementById("idTabla");
    tabla.removeAttribute("class");

    const trH = crearNodo("tr");
    const thN = crearNodo("th", "Nombre");
    const thP = crearNodo("th", "Puntuación");

    trH.appendChild(thN);
    trH.appendChild(thP);
    tabla.appendChild(trH);

    for (let i = 0; i < resultado.length; i++) {
      let tr = crearNodo("tr");
      let td = crearNodo("td", resultado[i].nombre);
      let td2 = crearNodo("td", resultado[i].puntuacion);

      tr.appendChild(td);
      tr.appendChild(td2);
      tabla.appendChild(tr);
    }

    /* *******************************
            Funcion crear botones
    ********************************** */

    function crearBoton(elementoPadre, textoBoton, manejadorClick) {
      let boton = crearNodo("button", textoBoton);
      boton.addEventListener("click", manejadorClick);
      elementoPadre.appendChild(boton);
      elementoPadre.appendChild(crearNodo("br"));
    }

    /* *******************************
            Funcion crear tabla
    ********************************** */
    function crearTablaConEncabezado(elementoPadre, textoEncabezado) {
      let tabla = crearNodo("table");
      let trEncabezado = crearNodo("tr");
      let thNombre = crearNodo("th", "Nombre");
      let thPuntuacion = crearNodo("th", "Puntuación");

      trEncabezado.appendChild(thNombre);
      trEncabezado.appendChild(thPuntuacion);
      tabla.appendChild(trEncabezado);

      let h3Encabezado = crearNodo("h3", textoEncabezado);
      elementoPadre.appendChild(h3Encabezado);
      elementoPadre.appendChild(tabla);

      return tabla;
    }

    /* *******************************
            Botón para mostrar ultimos 5
    ********************************** */

    crearBoton(element1, "Últimos 5 resultados", () => {
      let ult5 = resultado.slice(Math.max(resultado.length - 5, 0));
      let tablaTop5 = crearTablaConEncabezado(
        element1,
        "Mostrar los últimos 5 resultados"
      );

      ult5.forEach((result) => {
        let tr = crearNodo("tr");
        let tdNombre = crearNodo("td", result.nombre);
        let tdPuntuacion = crearNodo("td", result.puntuacion);

        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaTop5.appendChild(tr);
      });
    });

    /* *******************************
    Botón para mostrar top 5 puntuaciones
********************************** */

    crearBoton(element1, "Puntuaciones altas", () => {
      let top5 = resultado
        .sort((a, b) => b.puntuacion - a.puntuacion)
        .slice(0, 5);
      let tablaTop5 = crearTablaConEncabezado(
        element1,
        "Mostrar Top 5 Puntuaciones Altas"
      );

      top5.forEach((result) => {
        let tr = crearNodo("tr");
        let tdNombre = crearNodo("td", result.nombre);
        let tdPuntuacion = crearNodo("td", result.puntuacion);

        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaTop5.appendChild(tr);
      });
    });

    /* *******************************
            Botón para mostrar 5
            mas bajas
    ********************************** */

    crearBoton(element1, "Puntuaciones bajas", () => {
      let resultadosOrdenados = resultado.sort(
        (a, b) => a.puntuacion - b.puntuacion
      );
      let ult5 = resultadosOrdenados.slice(0, 5);
      let tablaTop5 = crearTablaConEncabezado(
        element1,
        "Mostrar 5 Puntuaciones más bajas"
      );

      ult5.forEach((result) => {
        let tr = crearNodo("tr");
        let tdNombre = crearNodo("td", result.nombre);
        let tdPuntuacion = crearNodo("td", result.puntuacion);

        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaTop5.appendChild(tr);
      });
    });

    /* *******************************
            Botón para ordenar 
            Alfabeticamente
    ********************************** */
    crearBoton(element1, "Ordenar alfabéticamente", () => {
      let ordenados = resultado.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      let tablaUsuario = crearTablaConEncabezado(
        element1,
        "Ordenar alfabéticamente"
      );
      ordenados.forEach((result) => {
        let tr = crearNodo("tr");
        let tdNombre = crearNodo("td", result.nombre);
        let tdPuntuacion = crearNodo("td", result.puntuacion);

        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaUsuario.appendChild(tr);
      });
    });

    /* *******************************
            Botón para volver al inicio
    ********************************** */

    let btnInicio2 = crearNodo("button", "Volver al inicio", element1);
    btnInicio2.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  showProgress(currentIndex, total) {
    let element = document.getElementById("progress");
    console.log(this._quiz);
    element.innerHTML = `Pregunta ${this._quiz.getIndex()} de ${total}`;
  }

  /* *******************************
        Funcion de almacenamiento
        en localstorage
********************************** */
  almacenarResultado(score) {
    let informacion = localStorage.getItem("informacion");

    if (informacion === null) {
      informacion = {
        resultados: [
          {
            nombre: localStorage.getItem("nombre"),
            puntuacion: score,
          },
        ],
      };
    } else {
      informacion = JSON.parse(informacion);
      informacion.resultados.push({
        nombre: localStorage.getItem("nombre"),
        puntuacion: score,
      });
    }

    localStorage.setItem("informacion", JSON.stringify(informacion));

    console.log("aaaaaaaa", informacion);
  }
}

/**
 * Función para automatizar el proceso de creación de nodos
 *
 *  Ejemplo de uso:
 *
 *  // crearNodo("p", "Hola Mundo", null,["oculto","tam-18"],[{style:"color:red"}, {id:"idNombre"}])
 *
 * @param {*} etiqueta      Tipo de Elemento a crear
 * @param {*} texto         Contenido del elemento
 * @param {*} padre         Elemento padre a asociar
 * @param {*} clases        Clases a añadir al elemento
 * @param {*} atributos     Atributos a a añadir al elemento
 *
 * @returns     Nodo a generar
 */
function crearNodo(
  etiqueta = "div",
  texto = "",
  padre = null,
  clases = [],
  atributos = []
) {
  let nodo = document.createElement(etiqueta);
  let text = document.createTextNode(texto);

  nodo.appendChild(text);

  //Gestión del Padre
  if (padre !== null) {
    padre.appendChild(nodo);
  }

  //Gestión de Clases
  if (clases !== []) {
    clases.forEach((e) => {
      nodo.classList.add(e);
    });
  }

  //Gestión de atributos
  if (atributos !== []) {
    atributos.forEach((e) => {
      for (let i in e) {
        nodo.setAttribute(i, e[i]);
      }
    });
  }

  return nodo;
}
