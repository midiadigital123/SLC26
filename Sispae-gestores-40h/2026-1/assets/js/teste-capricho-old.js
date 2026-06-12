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
   * Constrói e retorna um container com os botões de navegação Anterior, Próximo e Finalizar
   * @returns {HTMLDivElement} - Container com os botões de navegação do formulário
   */
  const createNavigator = () => {
    const navContainer = document.createElement("div");
    navContainer.id = "capr-navigator";

    navContainer.innerHTML = `
            <button id="btn-capr-previous" type="button">Anterior</button>
            <button id="btn-capr-next" type="button">Próxima</button>
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
    return questions.map((question, qIndex) => {
      const questionNumber = qIndex + 1;

      // Geramos o HTML de cada opção dinamicamente
      const optionsHTML = question.opcoes
        .map((opcao, oIndex) => {
          const optionNumber = oIndex + 1;
          const inputId = `question-${questionNumber}-opcao${optionNumber}`;
          const groupName = `group-question-${questionNumber}`;

          return `
                    <input 
                        type="radio" 
                        id="${inputId}" 
                        name="${groupName}" 
                        value="${opcao.valor}" 
                        ${oIndex === 0 ? "required" : ""}
                    >
                    <label for="${inputId}">${opcao.label}</label><br>
                `;
        })
        .join(""); // Transforma o array de strings das opções em uma única string

      return `
                <p>${question.pergunta}</p>
                ${optionsHTML}
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
                <div id="output-capr-pontuacao">Pontuação: ${profile.min} a ${profile.max} pontos</div>
                <div id="output-capr-descricao">${profile.descricao}</div>
                <div id="output-capr-acao">${profile.acao}</div>
            `;
      container.replaceChildren();
      container.appendChild(outputElement);
    }
  };

  const renderQuestions = (questions) => {
    const container = document.getElementById("teste-capr");

    const form = document.createElement("form");
    form.id = "form-capr";
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

    const navigator = document.getElementById("capr-navigator");

    navigator.addEventListener("click", (event) => {
      if (event.target.id === "btn-capr-next") {
        counter.value += 1;
      } else if (event.target.id === "btn-capr-previous") {
        counter.value -= 1;
      }
    });

    const questionsHTMLList = questionsMap(questions);
    questionsHTMLList.forEach((questionHTML, index) => {
      const newDiv = document.createElement("div");
      newDiv.id = `question-capr-${index + 1}`;
      newDiv.innerHTML = questionHTML;
      form.insertBefore(newDiv, navigator);
    });
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
      (child) => child.id !== "capr-navigator",
    );
    questionsElements.forEach((element, index) => {
      if (counter === index + 1) {
        element.classList.remove("hidden");
      } else {
        element.classList.add("hidden");
      }
    });
    handleDisplayedButtons();
  };

  fetch(
    "https://recursos-moodle.caeddigital.net/projetos/cursos/AP/SISPAEAP/2026-1/assets/data/teste-capricho.json",
  )
    .then((response) => response.json())
    .then((data) => {
      questions.value = data.perguntas;
      profiles = data.perfis;
      counter.value = 1;
    });
});
