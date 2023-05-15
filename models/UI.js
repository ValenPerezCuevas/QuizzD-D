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
      document.getElementById("cabecera").remove();
      document.getElementById("main").remove();
      document.getElementById("footer").remove();
    });
    /* *******************************
       Función para crear elementos
********************************** */

    const crearElemento = (etiqueta, texto) => {
      const elemento = document.createElement(etiqueta);
      const nodoTexto = document.createTextNode(texto);
      elemento.appendChild(nodoTexto);
      return elemento;
    };

    /* *******************************
        Mostrar el resultado actual
********************************** */
    this.almacenarResultado(score);
    let H3TextoResultado = document.createElement("h3");
    element1.appendChild(
      crearElemento("h3", "Tu resultado de esta partida es: ")
    );
    element1.appendChild(crearElemento("h3", score.toString()));

    /* *******************************
        Creación de tabla
        de resultados
********************************** */

    let H3TablaResultado = document.createElement("h3");
    element1.appendChild(crearElemento("legend", "Tabla de puntuaciones"));

    let nombres = [];
    let nombreGet = localStorage.getItem("nombre");
    nombres.push(nombreGet);

    let informacion = JSON.parse(localStorage.getItem("informacion"));
    let resultado = informacion.resultados;

    let tabla = document.getElementById("idTabla");
    tabla.removeAttribute("class");
    const trH = document.createElement("tr");
    const thN = document.createElement("th");
    const thP = document.createElement("th");
    const thNombreText = document.createTextNode("Nombre");
    const thPuntuacionText = document.createTextNode("Puntuación");

    thN.appendChild(thNombreText);
    thP.appendChild(thPuntuacionText);
    trH.appendChild(thN);
    trH.appendChild(thP);
    tabla.appendChild(trH);

    for (let i = 0; i < resultado.length; i++) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.innerHTML = resultado[i].nombre;
      tr.appendChild(td);
      let td2 = document.createElement("td");
      td2.innerHTML = resultado[i].puntuacion;
      tr.appendChild(td2);
      tabla.appendChild(tr);
    }

    element1.appendChild(H3TablaResultado);
    element1.appendChild(H3TextoResultado);
    // element1.appendChild(puntuacion);

    /* *******************************
            Funcion crear botones
    ********************************** */

    function crearBoton(elementoPadre, textoBoton, manejadorClick) {
      const boton = document.createElement("button");
      boton.appendChild(document.createTextNode(textoBoton));
      boton.addEventListener("click", manejadorClick);
      elementoPadre.appendChild(boton);
      elementoPadre.appendChild(document.createElement("br"));
    }

    /* *******************************
            Funcion crear tabla
    ********************************** */
    function crearTablaConEncabezado(elementoPadre, textoEncabezado) {
      const tabla = document.createElement("table");
      const trEncabezado = document.createElement("tr");
      const thNombre = document.createElement("th");
      const thPuntuacion = document.createElement("th");
      thNombre.appendChild(document.createTextNode("Nombre"));
      thPuntuacion.appendChild(document.createTextNode("Puntuación"));
      trEncabezado.appendChild(thNombre);
      trEncabezado.appendChild(thPuntuacion);
      tabla.appendChild(trEncabezado);
      elementoPadre
        .appendChild(document.createElement("h3"))
        .appendChild(document.createTextNode(textoEncabezado));
      elementoPadre.appendChild(tabla);
      return tabla;
    }
    /* *******************************
            Botón para mostrar ultimos 5
    ********************************** */
    crearBoton(element1, "Últimos 5 resultados", () => {
      const ult5 = resultado.slice(Math.max(resultado.length - 5, 0));
      const tablaTop5 = crearTablaConEncabezado(
        element1,
        "Mostrar los últimos 5 resultados"
      );
      ult5.forEach((result) => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdPuntuacion = document.createElement("td");
        tdNombre.appendChild(document.createTextNode(result.nombre));
        tdPuntuacion.appendChild(document.createTextNode(result.puntuacion));
        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaTop5.appendChild(tr);
      });
    });

    /* *******************************
    Botón para mostrar top 5 puntuaciones
********************************** */

    crearBoton(element1, "Puntuaciones altas", () => {
      const ordenados = resultado.sort((a, b) => b.puntuacion - a.puntuacion);
      const top5 = ordenados.slice(0, 5);
      const tablaTop5 = crearTablaConEncabezado(
        element1,
        "Mostrar Top 5 Puntuaciones Altas"
      );
      top5.forEach((result) => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdPuntuacion = document.createElement("td");
        tdNombre.appendChild(document.createTextNode(result.nombre));
        tdPuntuacion.appendChild(document.createTextNode(result.puntuacion));
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
      const resultadosOrdenados = resultado.sort(
        (a, b) => a.puntuacion - b.puntuacion
      );
      const ult5 = resultadosOrdenados.slice(0, 5);
      const tablaTop5 = crearTablaConEncabezado(
        element1,
        "Mostrar 5 Puntuaciones más bajas"
      );
      ult5.forEach((result) => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdPuntuacion = document.createElement("td");
        tdNombre.appendChild(document.createTextNode(result.nombre));
        tdPuntuacion.appendChild(document.createTextNode(result.puntuacion));
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
      const ordenados = resultado.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
      const tablaUsuario = crearTablaConEncabezado(
        element1,
        "Ordenar alfabéticamente"
      );
      ordenados.forEach((result) => {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdPuntuacion = document.createElement("td");
        tdNombre.appendChild(document.createTextNode(result.nombre));
        tdPuntuacion.appendChild(document.createTextNode(result.puntuacion));
        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaUsuario.appendChild(tr);
      });
    });

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
