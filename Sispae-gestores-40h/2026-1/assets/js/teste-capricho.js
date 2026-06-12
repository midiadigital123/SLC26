document.addEventListener("DOMContentLoaded", () => {
  /**
   * Objeto de estado para o contador de questões.
   * * @property {number} _value - Propriedade privada que armazena o índice da questão atual.
   * @property {number} value - Interface pública. Ao ser definida, atualiza o estado e
   * dispara a função de atualização visual da interface.
   */
  const counter = {
    _value: 1,

    /**
     * Retorna o valor atual do contador.
     * @returns {number} O índice da questão ativa.
     */
    get value() {
      return this._value;
    },

    /**
     * Atualiza o valor do contador e sincroniza a interface.
     * @param {number} newValue - O novo índice da questão (ex: ao avançar ou voltar).
     */
    set value(newValue) {
      this._value = newValue;
      // Efeito colateral: atualiza o DOM para mostrar apenas a questão correspondente
      showCurrentQuestionOnly(this._value);
    },
  };
  /**
   * Objeto de estado para o array de questões a ser renderizado
   * * @property {Array} _value - Propriedade privada que armazena o array de objetos de questões
   * @property {Array} value - Interface pública. Ao ser definida, atualiza o estado e
   * dispara a função de renderização das questões em tela.
   */
  const questions = {
    _value: [],

    /**
     * Retorna o valor atual do array de questões
     * @returns {Array} Um array de objetos de questão
     */
    get value() {
      return this._value;
    },

    /**
     * Atualiza o array de questões
     * @param {Array} newValue - Um novo array de questões (usado apenas na inicialização do sccript)
     */
    set value(newValue) {
      this._value = newValue;
      // Efeito colateral: atualiza a DOM, criando os elementos que compõem o questionário
      renderQuestions(this._value);
    },
  };

  // Perfis de saída
  let profiles = [];

  /**
   * Constrói e retorna a tela inicial (capa) com título e botão Iniciar
   * @returns {HTMLDivElement} - Container da tela de introdução
   */
  const createIntroScreen = () => {
    const introContainer = document.createElement("div");
    introContainer.id = "intro-capr";

    introContainer.innerHTML = `
            <h1>Teste o perfil da sua escola</h1>
            <button id="btn-capr-start" type="button">INICIAR</button>
        `;

    return introContainer;
  };

  /**
   * Constrói e retorna o container de progresso com contador e barra
   * @returns {HTMLDivElement} - Container com indicador de progresso
   */
  const createProgressBar = () => {
    const progressContainer = document.createElement("div");
    progressContainer.id = "progress-capr";

    progressContainer.innerHTML = `
            <div id="progress-capr-header">
                <span id="progress-capr-text">Questão 1 de 10</span>
                <span id="progress-capr-percent">0%</span>
            </div>
            <div id="progress-capr-bar">
                <div id="progress-capr-fill"></div>
            </div>
        `;

    return progressContainer;
  };

  /**
   * Constrói e retorna o container de bullets de navegação
   * @param {number} totalQuestions - Número total de questões
   * @returns {HTMLDivElement} - Container com os bullets
   */
  const createBullets = (totalQuestions) => {
    const bulletsContainer = document.createElement("div");
    bulletsContainer.id = "bullets-capr";

    for (let i = 1; i <= totalQuestions; i++) {
      const bullet = document.createElement("div");
      bullet.className = "bullet-capr";
      bullet.dataset.question = i;
      bullet.setAttribute("role", "button");
      bullet.setAttribute("aria-label", `Ir para questão ${i}`);
      bulletsContainer.appendChild(bullet);
    }

    return bulletsContainer;
  };

  /**
   * Atualiza o progresso visual (bullets)
   */
  const updateProgress = () => {
    const total = questions.value.length;
    const current = counter.value;

    // Atualiza bullets
    const bullets = document.querySelectorAll(".bullet-capr");
    bullets.forEach((bullet, index) => {
      const questionNumber = index + 1;
      bullet.classList.remove("active", "completed");

      if (questionNumber === current) {
        bullet.classList.add("active");
      } else if (questionNumber < current) {
        bullet.classList.add("completed");
      }
    });
  };

  /**
   * Constrói e retorna um container com os botões de navegação Anterior, Próximo e Finalizar
   * @returns {HTMLDivElement} - Container com os botões de navegação do formulário
   */
  const createNavigator = () => {
    const navContainer = document.createElement("div");
    navContainer.id = "capr-navigator";

    navContainer.innerHTML = `
            <div class="nav-group">
                <button id="btn-capr-previous" type="button">Anterior</button>
                <button id="btn-capr-next" type="button">Próximo</button>
            </div>
            <input id="btn-capr-submit" type="submit" value="Finalizar">
        `;
    return navContainer;
  };

  /**
   * Gera o HTML das questões dinamicamente.
   * @param {Array} questions - Lista de objetos de questões.
   * @returns {string[]}
   */
  const questionsMap = (questions) => {
    const letters = ["A", "B", "C", "D", "E"];
    return questions.map((question, qIndex) => {
      const questionNumber = qIndex + 1;
      const total = questions.length;

      // Geramos o HTML de cada opção dinamicamente
      const optionsHTML = question.opcoes
        .map((opcao, oIndex) => {
          const optionNumber = oIndex + 1;
          const inputId = `question-${questionNumber}-opcao${optionNumber}`;
          const groupName = `group-question-${questionNumber}`;
          const letter = letters[oIndex] || String.fromCharCode(65 + oIndex);

          return `
                    <input
                        type="radio"
                        id="${inputId}"
                        name="${groupName}"
                        value="${opcao.valor}"
                        ${oIndex === 0 ? "required" : ""}
                    >
                    <label for="${inputId}">
                        <span class="option-letter">${letter} -</span>
                        <span class="option-text">${opcao.label}</span>
                    </label>
                `;
        })
        .join(""); // Transforma o array de strings das opções em uma única string

      return `
                <span class="quiz-contador">${questionNumber} de ${total}</span>
                <p>${question.pergunta}</p>
                <div class="conjunto-opcao">
                    ${optionsHTML}
                </div>
            `;
    });
  };

  const renderResult = (container, result) => {
    if (profiles) {
      const outputElement = document.createElement("div");
      const profile =
        result >= 24 ? profiles[0] : result >= 17 ? profiles[1] : profiles[2];
      outputElement.id = "output-capr";
      outputElement.innerHTML = `
                <div id="output-capr-nome">${profile.nome}</div>
                <div id="output-capr-descricao">${profile.descricao}</div>
                <div id="output-capr-acao">${profile.acao}</div>
                <button id="btn-capr-restart" type="button">Refazer Teste</button>
            `;
      container.replaceChildren();
      container.appendChild(outputElement);

      // Reinicia o quiz sem recarregar a página
      document
        .getElementById("btn-capr-restart")
        .addEventListener("click", () => {
          container.replaceChildren();
          counter._value = 1;
          renderQuestions(questions.value);
        });
    }
  };

  const renderQuestions = (questions) => {
    const container = document.getElementById("teste-capr");
    if (!container) return;
    // Renderiza a tela inicial primeiro
    const introScreen = createIntroScreen();
    container.appendChild(introScreen);

    // Evento do botão Iniciar
    const startButton = document.getElementById("btn-capr-start");
    startButton.addEventListener("click", () => {
      introScreen.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => {
        introScreen.remove();
        document.getElementById("form-capr").style.display = "block";
        // Inicializa o contador e atualiza a UI
        counter.value = 1;
      }, 300);
    });

    // Cria o formulário (inicialmente oculto)
    const form = document.createElement("form");
    form.id = "form-capr";
    form.style.display = "none";

    // Adiciona o navegador
    form.appendChild(createNavigator());

    form.addEventListener("change", (event) => {
      if (event.target.type === "radio") {
        handleDisplayedButtons();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      let result = 0;
      for (value of Object.values(data)) {
        result += value === "a" ? 3 : value === "b" ? 2 : 1;
      }
      renderResult(container, result);
    });

    container.appendChild(form);

    // Adiciona keyframes para animação de fadeOut
    const style = document.createElement("style");
    style.textContent = `
            @keyframes fadeOut {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px);
                }
            }
        `;
    document.head.appendChild(style);

    const navigator = document.getElementById("capr-navigator");

    // Adiciona as questões
    const questionsHTMLList = questionsMap(questions);
    questionsHTMLList.forEach((questionHTML, index) => {
      const newDiv = document.createElement("div");
      newDiv.id = `question-capr-${index + 1}`;
      newDiv.innerHTML = questionHTML;
      // Todas as questões começam ocultas exceto a primeira
      if (index !== 0) {
        newDiv.classList.add("hidden");
      }
      form.insertBefore(newDiv, navigator);
    });

    // Adiciona os bullets de navegação logo acima do navigator
    navigator.insertAdjacentElement(
      "beforebegin",
      createBullets(questions.length),
    );

    navigator.addEventListener("click", (event) => {
      if (event.target.id === "btn-capr-next") {
        counter.value += 1;
      } else if (event.target.id === "btn-capr-previous") {
        counter.value -= 1;
      }
    });

    // Event listener para os bullets
    const bulletsContainer = document.getElementById("bullets-capr");
    bulletsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("bullet-capr")) {
        const questionNumber = parseInt(event.target.dataset.question);
        // Verifica se já respondeu às questões anteriores
        let canNavigate = true;
        for (let i = 1; i < questionNumber; i++) {
          counter.value = i; // Temporariamente para verificar
          if (!verifyCheck()) {
            canNavigate = false;
            break;
          }
        }
        // Restaura o contador atual
        counter.value = counter.value;

        if (canNavigate) {
          counter.value = questionNumber;
        } else {
          alert("Por favor, responda as questões anteriores primeiro.");
        }
      }
    });

    // Inicializa o contador na primeira questão e atualiza a UI
    counter.value = 1;
  };

  /**
   * Informa se pelo menos um radio
   * button da questão atual foi marcado
   * @returns {boolean}
   */
  const verifyCheck = () => {
    // Seleciona todos os inputs da questão atual pelo ID
    const perguntas = document.querySelectorAll(
      `input[id^="question-${counter.value}-"]`,
    );

    // Filtra apenas os que possuem a propriedade checked como true
    const checked = Array.from(perguntas).filter(
      (pergunta) => pergunta.checked,
    );
    return checked.length > 0;
  };

  const handleDisplayedButtons = () => {
    const previous = document.getElementById("btn-capr-previous");
    const next = document.getElementById("btn-capr-next");
    const submit = document.getElementById("btn-capr-submit");

    // 1. Definimos os estados lógicos (booleanos)
    const isFirst = counter.value === 1;
    const isLast = counter.value === questions.value.length;
    const hasAnswered = verifyCheck();

    // 2. Aplicamos a visibilidade de forma declarativa

    // Botão Voltar: Esconde se for a primeira questão
    previous.disabled = isFirst;

    // Botão Próxima: Esconde se for a última OU se não respondeu
    next.disabled = isLast || !hasAnswered;

    // Botão Finalizar: Esconde se NÃO for a última OU se não respondeu
    submit.disabled = !isLast || !hasAnswered;
  };

  /**
   *
   * @param {number} counter
   */
  const showCurrentQuestionOnly = (counter) => {
    const form = document.getElementById("form-capr");
    const questionsElements = [...form.children].filter(
      (child) =>
        child.id &&
        child.id.startsWith("question-capr-") &&
        child.id !== "capr-navigator" &&
        child.id !== "progress-capr" &&
        child.id !== "bullets-capr",
    );
    questionsElements.forEach((element, index) => {
      if (counter === index + 1) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    });
    handleDisplayedButtons();
    updateProgress(); // Atualiza o progresso visual
  };

  fetch(
    "https://recursos-moodle.caeddigital.net/projetos/cursos/AP/SISPAEAP/2026-1/assets/data/teste-capricho.json",
  )
    .then((response) => response.json())
    .then((data) => {
      questions.value = data.perguntas;
      profiles = data.perfis;
      // A tela de introdução será mostrada primeiro
      // O formulário com a primeira questão será exibido ao clicar em "Iniciar"
    });
});
