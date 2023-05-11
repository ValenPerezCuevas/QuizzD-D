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
        Mostrar el resultado actual
********************************** */
    this.almacenarResultado(score);
    let H3TextoResultado = document.createElement("h3");
    let H1Resultado1 = document.createTextNode(
      "Tu resultado de esta partida es: "
    );
    H3TextoResultado.appendChild(H1Resultado1);
    let puntuacion = document.createElement("h3");
    let puntuacion1 = document.createTextNode(`${score}`);
    puntuacion.appendChild(puntuacion1);

    /* *******************************
        Creación de tabla
        de resultados
********************************** */
    let H3Tabla1 = document.createTextNode("Tabla de puntuaciones");
    let H3Tabla = document.createElement("legend");
    H3Tabla.appendChild(H3Tabla1);

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

    element1.appendChild(H3Tabla);
    element1.appendChild(H3TextoResultado);
    element1.appendChild(puntuacion);

/* *******************************
            Botón para mostrar ultimos 5
    ********************************** */
            const btnMostrar5Ultimos = document.createElement("button");
            const btmMostrar5UltimosTexto = document.createTextNode(
              "Últimos 5 resultados"
            );
            btnMostrar5Ultimos.appendChild(btmMostrar5UltimosTexto);
        
           
            const h1Mostrar5Ultimos = document.createElement("h3");
            const h1Mostrar5UltimosTexto = document.createTextNode(
              "Mostrar los últimos 5 resultados"
            );
            h1Mostrar5Ultimos.appendChild(h1Mostrar5UltimosTexto);
        
            // Crear un elemento br para agregar un espacio vacío debajo del botón
            const brEspacio = document.createElement("br");
        
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
        
              for (let i = 0; i < ult5.length; i++) {
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
        
              // Agregar la nueva tabla a la página, después del botón y los elementos h1 y br
              element1.appendChild(h1Mostrar5Ultimos);
              element1.appendChild(brEspacio);
              element1.appendChild(tablaTop5);
            });
        
            // Agregar el botón y los elementos h1 y br a la página, en ese orden
            element1.appendChild(btnMostrar5Ultimos);
        

/* *******************************
    Botón para mostrar top 5 puntuaciones
********************************** */

const btnMostrarTop5Altas = document.createElement("button");
const btnMostrarTop5AltasTexto = document.createTextNode("Puntuaciones altas");
btnMostrarTop5Altas.appendChild(btnMostrarTop5AltasTexto);

const h1MostrarTop5Altas = document.createElement("h3");
const h1MostrarTop5AltasTexto = document.createTextNode("Mostrar Top 5 Puntuaciones Altas");
h1MostrarTop5Altas.appendChild(h1MostrarTop5AltasTexto);

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

  for (let i = 0; i < top5.length; i++) {
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

  // Agregar la nueva tabla y el encabezado a la página
  element1.appendChild(h1MostrarTop5Altas);
  element1.appendChild(tablaTop5);
});

// Agregar el botón a la página con un espacio vacío
element1.appendChild(btnMostrarTop5Altas);
element1.appendChild(document.createElement("br"));


    /* *******************************
            Botón para mostrar 5
            mas bajas
    ********************************** */

    const btnMostrar5MasBajas = document.createElement("button");
    const btnMostrar5MasBajasTexto = document.createTextNode(
      "Puntuaciones bajas"
    );
    btnMostrar5MasBajas.appendChild(btnMostrar5MasBajasTexto);

    const h3MostrarTopBajas = document.createElement("h3");
    const h3MostrarTopBajasTexto = document.createTextNode("Mostrar 5 Puntuaciones más bajas");
    h3MostrarTopBajas.appendChild(h3MostrarTopBajasTexto);

    btnMostrar5MasBajas.addEventListener("click", () => {
      // Ordenar los resultados de menor a mayor
      const resultadosOrdenados = resultado.sort(
        (a, b) => a.puntuacion - b.puntuacion
      );

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

      for (let i = 0; i < ult5.length; i++) {
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
      element1.appendChild(h3MostrarTopBajas)
      element1.appendChild(tablaTop5);
    });

    element1.appendChild(btnMostrar5MasBajas);
    element1.appendChild(document.createElement("br"));



     /* *******************************
            Botón para ordenar 
            Alfabeticamente
    ********************************** */
    const btnUsuario = document.createElement("button");
    const btnUsuarioText = document.createTextNode("Ordenar alfabeticamente");
    btnUsuario.appendChild(btnUsuarioText);


    const h3MostrarAlf = document.createElement("h3");
    const h3MostrarAlfTexto = document.createTextNode("Ordenador alfabéticamente");
    h3MostrarAlf.appendChild(h3MostrarAlfTexto);

    btnUsuario.addEventListener("click", () => {
      // Ordenar el array de resultados según los usuarios
      const sorted = resultado.sort((a, b) => {
        if (a.nombre < b.nombre){
          return -1;
        }

        if(a.nombre > b.nombre){
          return 1;
        }
        return 0;
        });
      

      

      // Crear una nueva tabla con los 5 primeros resultados
      const tablaUsuario = document.createElement("table");
      const trHeader = document.createElement("tr");
      const thNombre = document.createElement("th");
      const thPuntuacion = document.createElement("th");
      const thNombreText = document.createTextNode("Nombre");
      const thPuntuacionText = document.createTextNode("Puntuación");

      thNombre.appendChild(thNombreText);
      thPuntuacion.appendChild(thPuntuacionText);
      trHeader.appendChild(thNombre);
      trHeader.appendChild(thPuntuacion);
      tablaUsuario.appendChild(trHeader);

      for (let i = 0; i < sorted.length; i++) {
        const tr = document.createElement("tr");
        const tdNombre = document.createElement("td");
        const tdPuntuacion = document.createElement("td");
        const tdNombreText = document.createTextNode(sorted[i].nombre);
        const tdPuntuacionText = document.createTextNode(sorted[i].puntuacion);

        tdNombre.appendChild(tdNombreText);
        tdPuntuacion.appendChild(tdPuntuacionText);
        tr.appendChild(tdNombre);
        tr.appendChild(tdPuntuacion);
        tablaUsuario.appendChild(tr);
      }
    

      // Agregar la nueva tabla a la página
      element1.appendChild(h3MostrarAlf)
      element1.appendChild(tablaUsuario);
    });

    element1.appendChild(btnUsuario);
    element1.appendChild(document.createElement("br"));
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
