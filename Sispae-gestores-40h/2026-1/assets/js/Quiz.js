/**
 * QuizPack.js - Sistema de Quiz Educacional
 * Versão 1.1.0 - Baseado na arquitetura do InfoPack
 */
(function (global) {
  ("use strict");

  // Cache global para evitar múltiplas requisições
  let quizCache = {};

  async function loadQuizData(quizUrl) {
    // Se não houver perguntas armazenadas no cache da aplicação
    if (!quizCache._promise) {
      // Faz o fetch
      quizCache._promise = fetch(quizUrl).then((r) => r.json());
    }
    const data = await quizCache._promise;
    return data;
  }

  // Função utilitária para rolagem suave aprimorada
  function smoothScrollToElement(element, options = {}) {
    if (!element) return;

    // Configurações padrão
    const config = {
      offset: options.offset || 20,
      behavior: options.behavior || "smooth",
      force: options.force || false,
      ...options,
    };

    // Verifica se o elemento já está visível (a menos que force=true)
    if (!config.force) {
      const elementRect = element.getBoundingClientRect();
      const isVisible =
        elementRect.top >= 0 &&
        elementRect.left >= 0 &&
        elementRect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        elementRect.right <=
          (window.innerWidth || document.documentElement.clientWidth);

      if (isVisible) return;
    }

    // Calcula posição considerando cabeçalhos fixos
    const stickyOffset = getStickyHeaderOffset();
    const elementRect = element.getBoundingClientRect();
    const elementPosition = elementRect.top + window.pageYOffset;
    const offsetPosition = elementPosition - stickyOffset - config.offset;

    // Respeita a preferência de redução de movimento
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduceMotion ? "auto" : config.behavior;

    // Executa a rolagem
    try {
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: behavior,
      });
    } catch (e) {
      // Fallback para navegadores antigos
      window.scrollTo(0, Math.max(0, offsetPosition));
    }
  }

  // Função para calcular offset de cabeçalhos fixos
  function getStickyHeaderOffset() {
    try {
      // Tenta obter de atributos data
      const docEl = document.documentElement;
      const body = document.body;
      const fromData =
        parseInt(
          body.getAttribute("data-sticky-header-height") ||
            docEl.getAttribute("data-sticky-header-height") ||
            "0",
          10,
        ) || 0;

      // Tenta obter de variáveis CSS
      const cs = getComputedStyle(docEl);
      const fromVar =
        parseInt(
          (cs.getPropertyValue("--sticky-header-height") || "0").replace(
            "px",
            "",
          ),
          10,
        ) || 0;

      return Math.max(fromData, fromVar, 0);
    } catch (e) {
      return 0;
    }
  }

  async function init() {
    const nodes = Array.from(document.querySelectorAll("[data-quiz-url]"));
    if (nodes.length > 0) {
      await Promise.all(nodes.map(initQuiz));
    }
  }

  async function initQuiz(el) {
    const quizUrl = el.getAttribute("data-quiz-url");
    const initialIconUrl = el.getAttribute("data-initial-icon-url");

    try {
      // Em produção, faria fetch do JSON
      const quizData = await loadQuizData(quizUrl);

      if (!quizData) {
        console.error(`Quiz (${quizUrl}) não encontrado`);
        return;
      }

      // Cria o Web Component
      const wc = document.createElement("quiz-component");
      const shadow = wc.attachShadow({ mode: "open" });

      // Injeta estilos com variáveis CSS do projeto
      // const link = document.createElement("link");
      // link.setAttribute("rel", "stylesheet");
      // link.setAttribute("href", "./style.css"); // Coloque a URL do seu CSS aqui

      const styles = document.createElement("style");
      styles.textContent = `
      :host {
    --light: #F8F9FA;
    --fa-style-family-classic: "Font Awesome 6 Free";
    --base: #6d8b43;
    --activityadministration: #5d63f6;
    --yellow: #FF7518;
    --sec1: #E5F1E5;
    --activitycollaboration: #f7634d;
    --pink: #e83e8c;
    --sec3: #B1DAA1;
    --fonte-aula: "proxima-nova", sans-serif;
    --link-visited: #7e22ce;
    --breakpoint-xs: 0;
    --activityinterface: #a378ff;
    --gray-dark: #212529;
    --border-radius: 1rem;
    --white: #fff;
    --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
    --success: #5CB85C;
    --red: #D9534F;
    --transition-flip: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --base-projeto: #2e5cff;
    --breakpoint-xl: 1200px;
    --font-family-sans-serif: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --link-focus: #0ea5e9;
    --indigo: #6610f2;
    --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
    --padding: 0.9375rem 0 1.5625rem 0;
    --link-hover: #2563eb;
    --card-col-width: 300px;
    --breakpoint-lg: 992px;
    --card-radius: 0;
    --blue: #3097D1;
    --card-height: 22rem;
    --shadow-focus: 0 0 0 4px rgba(51, 189, 252, 0.2);
    --warning: #FF7518;
    --card-max-width: 300px;
    --info: #5BC0DE;
    --orange: #f0ad4e;
    --course-color: #2e5cff;
    --green: #5CB85C;
    --activitycontent: #399be2;
    --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.08);
    --teal: #20c997;
    --black: #000;
    --breakpoint-md: 768px;
    --danger: #D9534F;
    --gray: #888;
    --cyan: #5BC0DE;
    --dark: #343A40;
    --tonica: #006AFF;
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --fundo: #96AC77;
    --activityassessment: #eb66a2;
    --link-normal: #1d4ed8;
    --purple: #613d7c;
    --breakpoint-sm: 576px;
    --shadow-hover: 0 12px 32px rgba(0, 0, 0, 0.15);
    --primary: #3097D1;
    --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
    --sec2: #F1FCD8;
    --fa-style-family-brands: "Font Awesome 6 Brands";
    --secondary: #6C757D;
    --card-gap: 2rem;
    --transition-smooth: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --activitycommunication: #11a676
}


.quiz-container {
    max-width: 600px;
    margin: 10px auto 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

/* TELA INICIAL */
.quiz-inicial {
    background: linear-gradient(135deg, var(--inter1-bg-dark) 0%, var(--inter2-bg-dark) 100%);
    padding: 60px 30px 60px;
    border-radius: 20px;
    text-align: center;
    color: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    position: relative; /* necessário para ripple */
    overflow: hidden; /* necessário para ripple */
}

.img-quiz {
    width: 180px;
    object-fit: cover;
}

.quiz-icon .icon-circle {
    width: 200px;
    height: 200px;
    background-image: var(--icon-quiz);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px auto 0px;
}

.quiz-titulo {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 18px;
    color: white;
    margin-top: 32px;
}

.quiz-subtitulo {
    font-size: 16px;
    opacity: 0.9;
    margin-bottom: 30px;
    line-height: 1.5;
    display: none;
}

.quiz-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 30px;
}

.stat-item {
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    min-width: 70px;
}

.stat-number {
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
}

.stat-label {
    font-size: 14px;
    opacity: 0.9;
    margin-top: 4px;
}

.btn-iniciar {
    position: relative;
    /* para pseudo-elementos */
    background: white;
    color: var(--base1-dark);
    padding: 14px 30px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform .1s ease, filter .1s ease, box-shadow .1s ease;
    will-change: transform, filter;
}

.btn-iniciar:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* TELA QUESTÃO */
.quiz-questao {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.quiz-header {
    background: #f8fafc;
    padding: 20px 30px;
    border-bottom: 1px solid #e5e7eb;
}

.questao-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    font-size: 14px;
    color: #6b7280;
    font-weight: 500;
}

.progresso-text {
    color: var(--base1-dark);
}

.progress-bar {
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(135deg, var(--inter1-bg-dark) 0%, var(--inter2-bg-dark) 100%);
    transition: width 0.6s cubic-bezier(.23, 1, .32, 1);
    border-radius: 2px;
}

.questao-content {
    padding: 30px;
}

.pergunta {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 20px;
    line-height: 1.4;
}

.dica-box {
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 30px;
    color: #1e40af;
    font-size: 14px;
    line-height: 1.5;
}

.alternativas {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 30px;
}

.alternativa {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.18s cubic-bezier(.2, .7, .2, 1), box-shadow .18s ease, border-color .18s ease, background-color .18s ease;
    background: white;
    position: relative;
    /* para shimmer */
    overflow: hidden;
    will-change: transform;
}

.alternativa:hover:not(.respondido) {
    border-color: var(--tonica, var(--base1-dark));
    background: var(--sec1, #f8faff);
}

.alternativa-letra {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #f3f4f6;
    color: #6b7280;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
}

.alternativa-texto {
    flex: 1;
    font-size: 16px;
    color: #374151;
    font-weight: 500;
}

.alternativa-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Estados das alternativas */
.alternativa.correta {
    border-color: #10b981;
    background: #ecfdf5;
}

.alternativa.correta .alternativa-letra {
    background: #10b981;
    color: white;
}

.alternativa.correta .alternativa-icon {
    color: #10b981;
}

.alternativa.correta .alternativa-icon .fb-ico path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    animation: draw .38s ease-out forwards;
}

.alternativa.incorreta {
    border-color: #ef4444;
    background: #fef2f2;
}

.alternativa.incorreta .alternativa-letra {
    background: #ef4444;
    color: white;
}

.alternativa.incorreta .alternativa-icon {
    color: #ef4444;
}

/* Feedback */
.feedback-area {
    margin-top: 24px;
    border-radius: 12px;
    overflow: hidden;
}

.feedback {
    padding: 20px;
    border-radius: 12px;
    font-size: 15px;
    line-height: 1.5;
}

.feedback.correto {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #065f46;
}

.feedback.incorreto {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
}

.fb-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    font-weight: 600;
}

.fb-head .fb-ico {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
}

.fb-body {
    font-weight: 400;
}

.fb-body strong {
    font-weight: 600;
}

/* Animações */
@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}

.quiz-actions {
    margin-top: 30px;
    text-align: center;
}

.btn-proximo,
.btn-refazer {
    position: relative;
    background: var(--base1-dark);
    color: white;
    padding: 14px 30px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform .1s ease, filter .1s ease, box-shadow .1s ease;
    will-change: transform, filter;
}

.btn-proximo:hover,
.btn-refazer:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* TELA FINAL */
.quiz-final {
    background: linear-gradient(135deg, var(--inter1-bg-dark) 0%, var(--inter2-bg-dark) 100%);
    border-radius: 20px;
    padding: 60px 30px;
    text-align: center;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
}

.quiz-final .quiz-icon.success .icon-circle {
    width: 130px;
    height: 130px;
    margin: 0 auto 30px;
}

.quiz-final .quiz-titulo {
    color: #1f2937;
    font-size: 28px;
    margin-bottom: 16px;
}

.quiz-final .quiz-subtitulo {
    color: #6b7280;
    font-size: 16px;
    margin-bottom: 40px;
    display: block;
}

.resultado-card {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 40px;
}

.resultado-score,
.resultado-percentual {
    text-align: center;
}

.score-numero,
.percentual-numero {
    font-size: 48px;
    font-weight: 700;
    color: var(--base1-dark);
    line-height: 1;
}

.score-label,
.percentual-label {
    font-size: 16px;
    color: #6b7280;
    margin-top: 8px;
}

/* Animações de entrada e saída */
.quiz-inicial.is-pre,
.quiz-questao.is-pre,
.quiz-final.is-pre {
    opacity: 0;
    transform: translateY(20px);
}

.quiz-inicial.is-enter,
.quiz-questao.is-enter,
.quiz-final.is-enter {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s cubic-bezier(.16, 1, .3, 1),
        transform 0.6s cubic-bezier(.16, 1, .3, 1);
}

.quiz-final.is-exit {
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.24s cubic-bezier(.16, 1, .3, 1),
        transform 0.24s cubic-bezier(.16, 1, .3, 1);
}

/* Animação do ripple - VERSÃO ORIGINAL APRIMORADA */
.ripple-overlay {
    position: absolute;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #fff;
    opacity: .22;
    pointer-events: none;
    transform: scale(0);
    left: 0;
    top: 0;
    will-change: transform, opacity;
    z-index: 5;
}

@keyframes rippleExpand {
    to {
        transform: var(--scale-to, scale(60));
        opacity: 1;
    }
}

/* Animação das alternativas */
.alternativas.is-enter .alternativa {
    opacity: 0;
    transform: translateY(10px);
    animation: staggerIn 0.5s forwards;
}

.alternativas.is-enter .alternativa:nth-child(1) {
    animation-delay: 0.05s;
}

.alternativas.is-enter .alternativa:nth-child(2) {
    animation-delay: 0.1s;
}

.alternativas.is-enter .alternativa:nth-child(3) {
    animation-delay: 0.15s;
}

.alternativas.is-enter .alternativa:nth-child(4) {
    animation-delay: 0.2s;
}

@keyframes staggerIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Animação do feedback fold */
.feedback.fold {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.5s cubic-bezier(.16, 1, .3, 1),
        opacity 0.3s ease;
}

.feedback.fold.show {
    max-height: 500px;
    opacity: 1;
}

/* Animação do botão de alternativa */
.alternativa.alt-press {
    transform: scale(0.96);
}

.alternativa.alt-bounce {
    animation: bounce 0.6s cubic-bezier(.16, 1, .3, 1) forwards;
}

@keyframes bounce {
    0% {
        transform: scale(0.96);
    }

    50% {
        transform: scale(1.04);
    }

    100% {
        transform: scale(1);
    }
}

/* Animação do ícone de feedback */
.fb-ico path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
}

.feedback--ok .fb-ico path {
    animation: draw 0.38s ease-out forwards;
}

.feedback--err .fb-ico path {
    animation: drawX 0.38s ease-out forwards;
}

@keyframes drawX {
    to {
        stroke-dashoffset: 0;
    }
}
      `;

      // Adiciona o link ao shadow root
      shadow.appendChild(styles);

      const style = document.createElement("style");
      style.textContent = `
                :host {                    
                    --icon-quiz: url(${initialIconUrl});
                }
            `;
      shadow.appendChild(style);

      // Cria o container principal
      const container = document.createElement("div");
      container.className = "quiz-container";
      shadow.appendChild(container);

      // Substitui o elemento original
      el.replaceWith(wc);

      // Inicializa o quiz
      const quiz = new QuizController(container, quizData, el);
      quiz.render();
    } catch (err) {
      console.error(`Erro ao inicializar quiz ${quizId}:`, err);
    }
  }

  // Controller principal do Quiz
  class QuizController {
    constructor(container, data, element) {
      this.container = container;
      this.data = data;
      this.currentQuestion = 0;
      this.answers = [];
      this.state = "inicial"; // inicial | questao | final
      this.element = element;
    }

    render() {
      switch (this.state) {
        case "inicial":
          this.renderInicial();
          break;
        case "questao":
          this.renderQuestao();
          break;
        case "final":
          this.renderFinal();
          break;
      }
    }

    renderInicial() {
      const totalQuestoes = this.data.questoes.length;
      const extraClass = this._fromRestart ? " is-restart" : "";

      this.container.innerHTML = `
                <div class="quiz-inicial is-pre${extraClass}">
                    <div class="quiz-icon">
                        <div class="icon-circle"></div>
                    </div>

                    <h2 class="quiz-titulo">${this.data.titulo}</h2>
                    <p class="quiz-subtitulo">${this.data.subtitulo}</p>

                    <div class="quiz-stats">
                        <div class="stat-item">
                            <div class="stat-number">${totalQuestoes}</div>
                            <div class="stat-label">Questões</div>
                        </div>
                    </div>

                    <button class="btn-iniciar" id="iniciar-quiz">
                        Iniciar Quiz
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </button>

                    <!-- overlay para o ripple -->
                    <div class="ripple-overlay" aria-hidden="true"></div>
                </div>
            `;

      const inicial = this.container.querySelector(".quiz-inicial");
      const btn = this.container.querySelector("#iniciar-quiz");
      const overlay = this.container.querySelector(".ripple-overlay");

      requestAnimationFrame(() => {
        inicial.classList.remove("is-pre");
        inicial.classList.add("is-enter"); // se tiver .is-restart, usa animação específica no CSS
      });
      this._fromRestart = false; // consome a flag

      // FASE 2: botão magnético (aproximação do cursor dentro do hover)
      const MAG_INTENSITY = 8; // px
      const onBtnMove = (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        const tx = Math.max(-1, Math.min(1, x)) * MAG_INTENSITY;
        const ty = Math.max(-1, Math.min(1, y)) * MAG_INTENSITY;
        btn.style.transform = `translate(${tx}px, ${ty}px) scale(1.04)`;
      };
      const resetBtn = () => {
        btn.style.transform = "";
      };
      btn.addEventListener("mousemove", onBtnMove);
      btn.addEventListener("mouseleave", resetBtn);

      // FASE 3: Ripple Reveal — onda que cobre a tela antes de ir para as questões
      btn.addEventListener("click", () => {
        const panel = inicial; // área a ser coberta
        const rPanel = panel.getBoundingClientRect();
        const rBtn = btn.getBoundingClientRect();

        const x = rBtn.left + rBtn.width / 2 - rPanel.left;
        const y = rBtn.top + rBtn.height / 2 - rPanel.top;

        // maior distância até os cantos -> define escala necessária
        const maxDist = Math.max(
          Math.hypot(x, y),
          Math.hypot(rPanel.width - x, y),
          Math.hypot(x, rPanel.height - y),
          Math.hypot(rPanel.width - x, rPanel.height - y),
        );
        const baseRadius = 16; // ripple tem 32px -> raio 16
        const scaleNeeded = maxDist / baseRadius;

        overlay.style.left = `${x - 16}px`;
        overlay.style.top = `${y - 16}px`;
        overlay.style.setProperty("--scale-to", `scale(${scaleNeeded})`);
        overlay.style.animation = "none"; // reset
        overlay.offsetWidth; // reflow
        overlay.style.animation =
          "rippleExpand 500ms cubic-bezier(.16,1,.3,1) forwards";

        // troca de tela logo após o ripple cobrir
        setTimeout(() => {
          this.state = "questao";
          this.render();
        }, 500);
      });
    }

    renderQuestao() {
      const questao = this.data.questoes[this.currentQuestion];
      const totalQuestoes = this.data.questoes.length;
      const progresso = Math.round(
        (this.currentQuestion / totalQuestoes) * 100,
      );

      this.container.innerHTML = `
                <div class="quiz-questao is-pre">
                    <div class="quiz-header">
                        <div class="questao-info">
                            <span>Questão ${this.currentQuestion + 1} de ${totalQuestoes}</span>
                            <span class="progresso-text">${progresso}% concluído</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width:${progresso}%"></div>
                        </div>
                    </div>

                    <div class="questao-content">
                        <h3 class="pergunta">${questao.enunciado}</h3>

                        ${
                          questao.dica
                            ? `
                        
                        <div class="dica-box">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                                <g stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <!-- lâmpada -->
                                    <path d="M12 3a7 7 0 0 0-4 12c.7.6 1 1.1 1 2v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1c0-.9.3-1.4 1-2A7 7 0 0 0 12 3z"/>
                                    <!-- soquete -->
                                    <path d="M9.5 20h5"/>
                                    <path d="M10 17h4"/>
                                </g>
                            </svg>
                            <span>${questao.dica}</span>
                        </div>
                        `
                            : ""
                        }

                        <div class="alternativas">
                            ${questao.alternativas
                              .map(
                                (alt, index) => `
                            <div class="alternativa" data-alternativa="${questao.id}-${index}" data-correto="${questao.correta === index}">
                                <div class="alternativa-letra">${String.fromCharCode(65 + index)}</div>
                                <div class="alternativa-texto">${alt}</div>
                                <div class="alternativa-icon"></div>
                            </div>
                            `,
                              )
                              .join("")}
                        </div>

                        <div class="feedback-area" style="display:none;">
                            <div class="feedback-content"></div>
                        </div>

                        <div class="quiz-actions" style="display:none;">
                            <button class="btn-proximo" id="proxima-questao">
                                ${
                                  this.currentQuestion + 1 === totalQuestoes
                                    ? "Ver Resultado"
                                    : "Próxima Questão"
                                }
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;

      // Entrada cinematográfica do card da questão
      const card = this.container.querySelector(".quiz-questao");
      requestAnimationFrame(() => {
        card.classList.remove("is-pre");
        card.classList.add("is-enter");

        // Rolagem automática ao entrar na questão
        setTimeout(() => {
          smoothScrollToElement(card, { offset: 20 });
        }, 100);
      });

      // Stagger nas alternativas
      const list = this.container.querySelector(".alternativas");
      requestAnimationFrame(() => list.classList.add("is-enter"));

      this.bindAlternativas();
    }

    bindAlternativas() {
      const alternativas = this.container.querySelectorAll(".alternativa");
      const questao = this.data.questoes[this.currentQuestion];
      const feedbackArea = this.container.querySelector(".feedback-area");
      const feedbackContent = this.container.querySelector(".feedback-content");
      const btnProximoo = this.container.querySelector("#proxima-questao");

      /* ---------- Hover magnético (leve) ---------- */
      const ALT_INTENSITY = 8; // px
      alternativas.forEach((card) => {
        const onMove = (e) => {
          if (
            card.classList.contains("is-animating") ||
            card.classList.contains("respondido")
          )
            return;
          const r = card.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          const tx = Math.max(-1, Math.min(1, x)) * ALT_INTENSITY;
          const ty = Math.max(-1, Math.min(1, y)) * ALT_INTENSITY;
          card.style.transform = `translate(${tx}px, ${ty}px) scale(1.02)`;
          card.classList.add("is-hovered");
        };
        const onLeave = () => {
          if (card.classList.contains("is-animating")) return;
          card.style.transform = "";
          card.classList.remove("is-hovered");
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

      /* ---------- Elastic Spring (press → bounce → settle) ---------- */
      const ALT_CLICK_LOCK_MS = 1100; // ~100 + 600 + 400
      alternativas.forEach((card) => {
        const onPress = () => {
          if (card.classList.contains("respondido")) return;
          card.classList.add("is-animating");
          card.style.transform = ""; // não brigar com hover
          card.classList.remove("is-hovered");
          card.classList.add("alt-press"); // Fase 1 (100ms)
        };
        const onRelease = () => {
          if (card.classList.contains("respondido")) return;
          card.classList.remove("alt-press");
          void card.offsetWidth; // restart animation
          card.classList.add("alt-bounce"); // Fase 2 (600ms) + Fase 3 (400ms)
          setTimeout(() => {
            card.classList.remove("alt-bounce", "is-animating");
          }, ALT_CLICK_LOCK_MS);
        };
        card.addEventListener("mousedown", onPress);
        card.addEventListener("touchstart", onPress, { passive: true });
        card.addEventListener("mouseup", onRelease);
        card.addEventListener("touchend", onRelease);
        card.addEventListener("mouseleave", () =>
          card.classList.remove("alt-press"),
        );
      });

      /* ---------- Clique: corrige, anima ícones e mostra feedback ---------- */
      alternativas.forEach((alt) => {
        alt.addEventListener("click", () => {
          // garante o bounce se mouseup ocorrer fora
          if (!alt.classList.contains("alt-bounce")) {
            alt.classList.remove("alt-press");
            void alt.offsetWidth;
            alt.classList.add("alt-bounce");
            setTimeout(
              () => alt.classList.remove("alt-bounce"),
              ALT_CLICK_LOCK_MS,
            );
          }

          if (alt.classList.contains("respondido")) return;

          const correto = alt.dataset.correto === "true";

          // registra resposta
          this.answers.push({
            questao: this.currentQuestion,
            correto,
            alternativa: alt.dataset.alternativa,
          });

          // atualiza progresso (inclui 100% na última questão)
          const total = this.data.questoes.length;
          const pct = Math.round(((this.currentQuestion + 1) / total) * 100);
          const bar = this.container.querySelector(".progress-fill");
          const txt = this.container.querySelector(".progresso-text");
          if (bar) {
            bar.style.width = pct + "%";
            bar.style.setProperty("--pct", pct + "%"); // se usar "bead"
          }
          if (txt) txt.textContent = `${pct}% concluído`;

          // bloqueia mais cliques
          alternativas.forEach((a) => a.classList.add("respondido"));

          if (correto) {
            alt.classList.add("correta");
            // ÍCONE: SVG check animado na alternativa correta
            const icon = alt.querySelector(".alternativa-icon");
            if (icon) {
              icon.innerHTML = `
                                <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                                    <path d="M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
                                </svg>
                            `;
            }

            // Feedback fold + check desenhado
            feedbackContent.innerHTML = `
                            <div class="feedback correto fold feedback--ok">
                                <div class="fb-head">
                                    <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                                        <path d="M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
                                    </svg>
                                    <strong>Correto!</strong>
                                </div>
                                <div class="fb-body">${questao.feedback.correto}</div>
                            </div>
                        `;

            // Fix para modal do quiz s3_t2_quiz2
            setTimeout(() => {
              const modalBtn = feedbackContent.querySelector(
                '[data-target="#img-seta"]',
              );
              if (modalBtn) {
                modalBtn.addEventListener("click", (e) => {
                  e.preventDefault();
                  const modal = document.querySelector("#img-seta");
                  if (modal && window.bootstrap?.Modal) {
                    new window.bootstrap.Modal(modal).show();
                  } else if (modal && window.$) {
                    window.$(modal).modal("show");
                  }
                });
              }
            }, 100);
          } else {
            alt.classList.add("incorreta");

            // marca a correta e injeta o SVG check nela também
            alternativas.forEach((a) => {
              if (a.dataset.correto === "true") {
                a.classList.add("correta");
                const iconOk = a.querySelector(".alternativa-icon");
                if (iconOk) {
                  iconOk.innerHTML = `
                                        <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                                            <path d="M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
                                        </svg>
                                    `;
                }
              }
            });

            // Feedback fold + X desenhado
            feedbackContent.innerHTML = `
                            <div class="feedback incorreto fold feedback--err">
                                <div class="fb-head">
                                    <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                                        <path d="M6 6L18 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" pathLength="1" />
                                        <path d="M18 6L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" pathLength="1" />
                                    </svg>
                                    <strong>Incorreto!</strong>
                                </div>
                                <div class="fb-body">${questao.feedback.incorreto}</div>
                            </div>
                        `;
          }

          // mostra o feedback com fold + stroke animation
          feedbackArea.style.display = "none";
          const fb = feedbackArea.querySelector(".feedback.fold");
          requestAnimationFrame(() => fb && fb.classList.add("show"));

          // Rolagem automática para o feedback após animação
          setTimeout(() => {
            smoothScrollToElement(btnProximoo, { offset: 500 });
          }, 300);

          // mostra ações
          const actions = this.container.querySelector(".quiz-actions");
          actions.style.display = "block";

          // próximo/ver resultado
          const btnProximo = this.container.querySelector("#proxima-questao");
          if (btnProximo && !btnProximo.hasAttribute("data-bound")) {
            btnProximo.setAttribute("data-bound", "true");
            btnProximo.addEventListener("click", () => {
              // Rolagem para o topo antes de mudar de pergunta
              smoothScrollToElement(this.container, { offset: 20 });

              setTimeout(() => {
                if (this.currentQuestion + 1 === this.data.questoes.length) {
                  this.state = "final";
                } else {
                  this.currentQuestion++;
                }
                this.render();
              }, 400);
            });
          }
        });
      });
    }

    renderFinal() {
      const totalQuestoes = this.data.questoes.length;
      const acertos = this.answers.filter((a) => a.correto).length;
      const percentual = Math.round((acertos / totalQuestoes) * 100);

      this.container.innerHTML = `
                <div class="quiz-final is-pre">
                    <div class="quiz-icon success">
                        <div class="icon-circle" style="background: none;">
                            <img style="width: 130px;" src="${this.element.getAttribute("data-final-icon-url")}">
                        </div>
                    </div>
                    <h2 class="quiz-titulo">Quiz Concluído!</h2>
                    <p class="quiz-subtitulo">Veja a seguir os seus resultados!</p>

                    <div class="resultado-card">
                        <div class="resultado-score">
                            <div class="score-numero">${acertos}/${totalQuestoes}</div>
                            <div class="score-label">Respostas Corretas</div>
                        </div>
                        <div class="resultado-percentual">
                            <div class="percentual-numero">${percentual}%</div>
                            <div class="percentual-label">Aproveitamento</div>
                        </div>
                    </div>

                    <button class="btn-refazer" id="refazer-quiz">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M3 12C3 7.03 7.03 3 12 3S21 7.03 21 12 16.97 21 12 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <path d="M8 12L12 8L16 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        Refazer Quiz
                    </button>
                </div>
            `;

      // scale-in ao aparecer
      const card = this.container.querySelector(".quiz-final");
      requestAnimationFrame(() => {
        card.classList.remove("is-pre");
        card.classList.add("is-enter");
      });

      // saída com mini scale-out e volta para a tela inicial com "perfume"
      this.container
        .querySelector("#refazer-quiz")
        .addEventListener("click", () => {
          card.classList.add("is-exit"); // anima o sumiço da tela final
          setTimeout(() => {
            this.currentQuestion = 0;
            this.answers = [];
            this._fromRestart = true; // flag para a inicial fazer scale-in
            this.state = "inicial";
            this.render();

            // Rolagem para o topo após reiniciar o quiz
            setTimeout(() => {
              smoothScrollToElement(this.container, { offset: 20 });
            }, 100);
          }, 240); // deve bater com a duração do .is-exit (abaixo)
        });
    }
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Exporta para uso externo se necessário
  global.QuizPack = {
    init,
    refresh: init,
  };
})(window);
