/**
 * @file rnc-script.js
 * @description Arquivo responsável por conter o JS da aula de municípios
 * @version 1.0.1
 * @since 11/11/2024
 * @see {@link https://recursos-moodle.caeddigital.net/projetos/componentes/2025-1/componentes.json}
 */

document.addEventListener("DOMContentLoaded", async function () {
  /**
   * @function jsonToObj
   * @description Função que faz a requisição do JSON e o transforma em um objeto
   * @returns {Promise<Object>}
   * @async
   */
  async function jsonToObj() {
    let urlArquivo =
      "https://recursos-moodle.caeddigital.net/projetos/componentes/2025-1/componentes.json";
    let response = await fetch(urlArquivo);
    let json = await response.text();
    return JSON.parse(json);
  }

  /**
   * @function pushGlobalObject
   * @description Função que faz a requisição do JSON e o transforma em um objeto global
   * @returns {Promise<void>}
   * @async
   */
  async function pushGlobalObject() {
    let obj = await jsonToObj();
    window.objJSON = obj;
  }

  // AGUARDA o JSON estar carregado ANTES de continuar
  await pushGlobalObject();
  console.log("JSON carregado com sucesso:", window.objJSON);

  // Carrega o InfoPack
  await loadScript(
    "https://recursos-moodle.caeddigital.net/projetos/componentes/infopack/infopack.js"
  );

  if (window.infopack && typeof window.infopack.init === "function") {
    window.infopack.init();
  } else {
    console.error("Infopack não disponível — nada será aplicado.");
  }

  // Carrega o QuizPack
  await loadScript(
    "https://recursos-moodle.caeddigital.net/projetos/cursos/RNC/2025-1/assets/js/quiz.js"
  );

  if (window.QuizPack && typeof window.QuizPack.init === "function") {
    window.QuizPack.init();
  } else {
    console.error("Quizpack não disponível — nada será aplicado.");
  }

  // Agora executa o resto da inicialização
  startJsAula();
});

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    document.head.appendChild(s);
  });
}

/**
 * @function startJsAula
 * @description Função que inicia o JS da aula
 * @returns {void}
 */
function startJsAula() {
  verifyJquery();
  scrollIndicator();
}

/**
 * @function verifyJquery
 * @description Função que verifica se o jQuery foi carregado corretamente
 * @returns {void}
 */
function verifyJquery() {
  setTimeout(() => {
    if (typeof jQuery !== "undefined") {
      let isPaginaCurso = document.querySelector(".c-aula-container");
      if (isPaginaCurso) {
        buildRNC();
      } else {
        return;
      }
    } else {
      verifyJquery();
    }
  }, 600);
}

/**
 * @function buildRNC
 * @description Função que inicia a construção dos componentes da página
 * @returns {void}
 */
function buildRNC() {
  buildComponentes();
  infoAccordionBehaviour();
  alteraCorSvgTopico();
  addLinkToImg();
  addLinkToCard();
  normalizeLinks();
}

/**
 * @function callUrlJSBuildGeneric
 * @description Função que faz a requisição do JSON de componentes e chama a função de construção dos componentes
 * @param {Object} el - Objeto com os componentes
 * @returns {void}
 */
function callUrlJSBuildGeneric(el) {
  const localComponents = el.componentes;
  const globalComponents = window.objJSON.componentes;

  Object.keys(localComponents).forEach((localKey) => {
    const localComponent = localComponents[localKey];
    const globalComponent = Object.values(globalComponents).find(
      (globalComp) => globalComp.nome === localKey
    );
    if (globalComponent) {
      const script = document.createElement("script");
      script.src = globalComponent.dependencias;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  });

  window.objComponentes = el;
}

/**
 * @function buildComponentes
 * @description Função que constrói os componentes da página
 * @returns {void}
 */
function buildComponentes() {
  let objComponentes = {
    componentes: {
      Carousel: {
        colors: ["var(--sec1)", "var(--sec2)", "var(--sec3)"],
      },
      Topicos: {},
      Sanfona: {},
      Podcast: {},
      Erros: {},
    },
  };
  callUrlJSBuildGeneric(objComponentes);
}

/**
 * @function alteraCorSvgTopico
 * @description Função que altera a cor do SVG dos tópicos
 * @returns {void}
 */
function alteraCorSvgTopico() {
  const topicoAnterior = document.querySelector(".topico-anterior");
  const proximoTopico = document.querySelector(".proximo-topico");

  if (topicoAnterior && proximoTopico) {
    const svgTopicoAnterior = topicoAnterior.querySelector("svg");
    const pathsAnterior = svgTopicoAnterior.querySelectorAll("path");
    const svgTopicoProximo = proximoTopico.querySelector("svg");
    const pathsProximo = svgTopicoProximo.querySelectorAll("path");
    const corTopicoAnterior = pathsAnterior[0].getAttribute("stroke");
    const corTopicoProximo = pathsProximo[0].getAttribute("stroke");

    topicoAnterior.addEventListener("mouseover", () => {
      pathsAnterior.forEach((path) => {
        path.setAttribute("stroke", "#fff");
      });
    });

    topicoAnterior.addEventListener("mouseout", () => {
      pathsAnterior.forEach((path) => {
        path.setAttribute("stroke", corTopicoAnterior);
      });
    });

    proximoTopico.addEventListener("mouseover", () => {
      pathsProximo.forEach((path) => {
        path.setAttribute("stroke", "#fff");
      });
    });

    proximoTopico.addEventListener("mouseout", () => {
      pathsProximo.forEach((path) => {
        path.setAttribute("stroke", corTopicoProximo);
      });
    });
  }
}

/**
 * @function addLinkToImg
 * @description Função que pega o atributo data-link de cards para transformá-los em links.
 * @returns {void}
 */
function addLinkToImg() {
  let imgLink = document.querySelectorAll(".secao .img-link");
  if (imgLink.length === 0) {
    return;
  }
  imgLink.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      let link = img.getAttribute("data-link");
      window.open(link, "_parent");
    });
  });
}

/**
 * @function addLinkToCard
 * @description Função que pega o atributo data-link de cards para transformá-los em links.
 * @returns {void}
 */
function addLinkToCard() {
  let recurso = document.querySelectorAll(".curso .flip-cards .recurso");
  if (recurso.length === 0) {
    return;
  }
  recurso.forEach((r) => {
    r.style.cursor = "pointer";
    r.addEventListener("click", () => {
      let link = r.getAttribute("data-link");
      r.classList.contains("pesquisa")
        ? window.open(link, "_blank")
        : window.open(link, "_parent");
      //window.open(link, "_parent");
    });
  });
}

function infoAccordionBehaviour() {
  const accordionItems = document.querySelectorAll(".info-accordion-item");
  if (accordionItems.length === 0) {
    return;
  }

  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      accordionItems.forEach((i) => {
        i.classList.remove("active");
      });

      // Add active class to clicked item
      this.classList.add("active");
    });
  });
}

function scrollIndicator() {
  if (!document.querySelector(".progress-bar-caed")) {
    const wrapper = document.querySelector("#page.drawers");
    if (wrapper) {
      const firstContainer = document.querySelector(".c-aula-container");
      if (!firstContainer) return;
      wrapper.style.scrollbarWidth = "auto";
      wrapper.style.scrollbarColor = "#2B3843 #D1D1D1";
      //wrapper.style.scrollbarWidth = "none";
      //wrapper.style.msOverflowStyle = "none";
      //wrapper.classList.add("no-scrollbars");
      const progressBarEl = document.createElement("div");
      progressBarEl.classList.add("progress-bar-caed");
      firstContainer.insertAdjacentElement("afterbegin", progressBarEl);
      console.log(progressBarEl);
      let page = document.getElementById("page");
      page.addEventListener("scroll", () => {
        let height = page.scrollHeight - window.innerHeight;
        let scrollPosition = wrapper.scrollTop;
        let width = (scrollPosition / height) * 100;
        progressBarEl.style.width = `${width}%`;
      });
    }
  } else {
    console.log("progress bar already exists");
  }
}

/**
 * Normaliza todos os <a> dentro de um seletor.
 * @param {String|Element} root - seletor CSS ou nó-raiz onde iremos agir.
 */
function normalizeLinks(root = ".c-aula-container") {
  // Permite passar string ou elemento
  const scope = typeof root === "string" ? document.querySelector(root) : root;
  if (!scope) return console.warn("[normalizeLinks] contêiner não encontrado");

  scope
    .querySelectorAll(
      "a:not([data-toggle='collapse']):not(.acesse-aqui):not([data-slide])"
    )
    .forEach((link) => {
      /* 1. Preserve apenas IMG + texto bruto --------------------------- */
      const imgs = Array.from(link.querySelectorAll("img")).map((img) =>
        img.cloneNode(true)
      );
      const plainText = link.textContent.trim();

      // Zera conteúdo e insere de volta
      link.innerHTML = "";
      imgs.forEach((img) => link.appendChild(img));
      if (plainText) link.appendChild(document.createTextNode(plainText));

      /* 2. Limpa estilos e classes inline ------------------------------ */
      link.removeAttribute("style");
      link.className = ""; // zera todas as classes geradas pelo editor
      link.classList.add("c-link"); // classe padrão

      /* 3. Garante <a> externo seguro ---------------------------------- */
      try {
        const isExternal = link.hostname && link.hostname !== location.hostname;
        if (isExternal) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
      } catch (_) {
        /* link.hostname falha em "mailto:", "tel:", etc. — apenas ignore */
      }
    });
}
