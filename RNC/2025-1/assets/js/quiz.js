/**
 * QuizPack.js - Sistema de Quiz Educacional
 * Versão 1.0.0 - Baseado na arquitetura do InfoPack
 */
(function (global) {
  ("use strict");

  // URL base onde ficam os JSONs dos quizzes
  const BASE_URL =
    "https://recursos-moodle.caeddigital.net/projetos/componentes/quizpack";

  // Cache global para evitar múltiplas requisições
  let quizCache = {};

  // Dados do quiz (simulando requisição JSON)
  const QUIZ_DATA = {
    s3_t2_quiz1: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta: "No dia de atuação você, Certificador(a), deve chegar:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "8:00",
              correto: true,
            },
            {
              id: "alt2",
              texto: "9:01",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Ser pontual é fundamental, se chegar depois das 9:00 será impedido de entrar no local de aplicação.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Você atrasou!</strong> <br><br> Ser pontual é fundamental, se chegar depois das 9:00 será impedido de entrar no local de aplicação.",
            },
          },
        },
        {
          pergunta: "O seu tempo de trabalho no dia de atuação é de:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "12 horas",
              correto: true,
            },
            {
              id: "alt2",
              texto: "10 horas",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Você deve cumprir as 12 horas de trabalho, exceto para o caso de término das provas antes do horário previsto. Se sair antes do término das provas, não poderá retornar.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Você não cumpriu o tempo de trabalho exigido!</strong> <br><br> Você deve cumprir as 12 horas de trabalho, exceto para o caso de término das provas antes do horário previsto. Se sair antes do término das provas, não poderá retornar.",
            },
          },
        },
      ],
    },
    s3_t2_quiz2: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta:
            "Vamos verificar se você está sabendo tudo sobre o processo de certificação da aplicação do Enem e da PND. <br><br> Caso tenha envelope danificado, o(a) Certificador(a) precisa:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Cadastrar uma ocorrência",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Preencher o Relatório de Certificação",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns! Ao verificar um malote danificado, fotografe! Este é o único momento em que pode realizar registro fotográfico!</strong> <br><br> Faça o upload da foto do malote danificado ao cadastrar a ocorrência via sistema RNC (seta <span style='color=rgb(238, 0, 0)'>vermelha</span>). <br><br> Delete a foto do seu celular após o cadastro da ocorrência. <br><br> <button data-modal-bound='false' class='acesse-imagem btn-proximo' style='padding: 7px 15px; background: #065f46;' type='button' data-target='#img-seta' data-toggle='modal'>Ver imagem</button>",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Tente novamente!</strong> <br><br> A informação sobre o malote danificado é caso de OCORRÊNCIA, inclusive é o único momento em que é permitido o registro fotográfico pelo(a) Certificador(a).",
            },
          },
        },
      ],
    },
    s3_t2_quiz3: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta: "Em relação à abertura dos portões, ele deve abrir:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "12h",
              correto: true,
            },
            {
              id: "alt2",
              texto: "12h30",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> É isso mesmo, os portões devem abrir às <strong>12h</strong> na presença do(a) Coordenador(a) de Local e você deve estar lá também para certificar se foram abertos no horário ou se houve antecipação ou atraso. Mas atenção, pois há casos em que é preciso abrir antes do horário, por exemplo, a entrada de um colaborador substituto ou saída por estar passando mal. Essas situações não devem ser consideradas como abertura indevida.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Você atrasou e não acompanhou a abertura dos portões!</strong> <br><br> Os portões devem abrir às <strong>12h</strong> na presença do(a) Coordenador(a) de Local e você deve estar lá também para certificar se foram abertos no horário ou se houve antecipação ou atraso. Mas atenção, pois há casos em que é preciso abrir antes do horário, por exemplo, a entrada de um colaborador substituto ou saída por estar passando mal. <span style='color=rgb(238, 0, 0)'>Essas situações não devem ser consideradas como abertura indevida.</span>",
            },
          },
        },
      ],
    },
    s3_t2_quiz4: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta:
            "No Bloco I há um campo para registro sobre o uso do banheiro pelos(as) Participantes. Vamos ver se sabe o que deve acontecer quando um(a) Participante finaliza a prova e pede para usar o banheiro! <br><br> O(A) Participante que finalizou a prova deve ser orientado(a) a usar:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Banheiros diferentes de quem não finalizou a prova",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Mesmo banheiro de quem não finalizou a prova",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Os participantes que finalizaram a prova <span style='color=rgb(238, 0, 0)'>NÃO DEVEM utilizar o mesmo banheiro de quem não finalizou.</span> Você precisa registrar como isto ocorreu no local de aplicação em que acompanhou os procedimentos.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez, estude mais!</strong> <br><br> Os participantes que finalizaram a prova <span style='color=rgb(238, 0, 0)'>NÃO DEVEM utilizar o mesmo banheiro de quem não finalizou.</span> Você precisa registrar como isto ocorreu no local de aplicação em que acompanhou os procedimentos.",
            },
          },
        },
        {
          pergunta:
            "Outro campo de preenchimento obrigatório no Relatório de Certificação é em relação à saída do local de aplicação com o Caderno de Questões! <br><br> O(A) Participante pode sair com o Caderno de Questões somente:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "30 minutos antes do término da aplicação",
              correto: true,
            },
            {
              id: "alt2",
              texto: "2 horas após o início da aplicação",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Você acertou, está bem atento ao curso. O tempo de liberação de Participantes com o Caderno de Questões é <strong>30 minutos antes do término da aplicação: 18h30</strong> no <strong>1º dia</strong> e <strong>18h</strong> no <strong>2º dia</strong> para o <strong>Enem</strong> e <strong>18h</strong> para a <strong>PND (1 dia de aplicação)</strong>.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Fique atento ao curso!</strong> <br><br> O tempo de liberação de Participantes com o Caderno de Questões é <strong>30</strong> minutos <strong>antes do término da aplicação: 18h30</strong> no <strong>1º dia</strong> e <strong>18h</strong> no <strong>2º dia</strong> para o <strong>Enem</strong> e <strong>18h</strong> para a <strong>PND (1 dia de aplicação)</strong>.",
            },
          },
        },
      ],
    },
    s1_t1_quiz1: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta:
            "Para começar, leia o Edital da RNC nº 58, de 2 de junho de 2025. Vamos verificar se você fez uma leitura atenta! <br><br> Em relação à <strong>apresentação pessoal</strong> para o dia de atuação, <strong>você deve vestir uma camisa:</strong>",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Azul",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Laranja",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Você leu com atenção o Edital, item 9.1.26, é preciso vestir uma camisa azul de qualquer tom.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> Releia com atenção o Edital, item 9.1.26. Esteja atento à cor de sua camisa, é OBRIGATÓRIO que seja uma camisa azul, de qualquer tom.",
            },
          },
        },
        {
          pergunta:
            "Vamos prosseguir, o <strong>melhor calçado para o dia da aplicação</strong> deve ser:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Confortável",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Qualquer tipo",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Você leu com atenção o Edital, item 9.1.26, é preciso que o sapato seja confortável e que NÃO FAÇA BARULHO.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> Releia com atenção o Edital, item 9.1.26. Você deve calçar um sapato confortável e QUE NÃO FAÇA BARULHO.",
            },
          },
        },
        {
          pergunta: "Por fim, a calça que você deve usar é:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Jeans/preta",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Linho/branca",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> Você leu com atenção o Edital, item 9.1.26, é preciso que a calça usada no dia da aplicação seja jeans ou preta.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> Releia com atenção o Edital, item 9.1.26. Você deve vestir calça jeans ou preta.",
            },
          },
        },
      ],
    },
    s1_t2_quiz1: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta:
            "Você deve estar atento somente para o momento de abertura dos portões.",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Verdadeiro",
              correto: false,
            },
            {
              id: "alt2",
              texto: "Falso",
              correto: true,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Arrasou!</strong> <br><br> Você demonstra estar muito atento às informações que constam no Edital. <strong>Faz parte da certificação acompanhar o momento de abertura e fechamento dos portões.</strong>",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Cuidado!</strong> <br><br> <strong>Esteja atento ao item 2.1 do Edital.</strong> Você precisa de muita atenção durante a certificação da abertura e do encerramento dos portões.",
            },
          },
        },
        {
          pergunta:
            "Você precisa acompanhar a devolução dos malotes aos Correios.",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Verdadeiro",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Falso",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Arrasou!</strong> <br><br> Você demonstra estar muito atento às informações que constam no Edital. <strong>Na seção 03, você verá que esta atribuição está relacionada à operação reversa.</strong>",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Cuidado!</strong> <br><br> <strong>Esteja atento ao item 2.1 do Edital. Você precisa de muita atenção durante a certificação da operação reversa que será detalhada na seção 03.</strong>",
            },
          },
        },
        {
          pergunta:
            "Você deve acompanhar o horário estabelecido de início e encerramento das provas. Todas as aplicações acontecerão em um mesmo horário e dia.",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Verdadeiro",
              correto: false,
            },
            {
              id: "alt2",
              texto: "Falso",
              correto: true,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Arrasou!</strong> <br><br> Você demonstra estar muito atento às informações que constam no Edital. EXCEPCIONALMENTE, em 2025, <strong>as aplicações da PND e do Enem ocorrerão em dias distintos. Além disso, devido à COP 30, teremos duas aplicações do Enem, uma entre os dias 9 e 16 de novembro e outra em 30 de novembro e 07 de dezembro para as cidades de Belém, Ananindeua e Marituba, do estado do Pará.</strong>",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Cuidado!</strong> <br><br> <strong>Esteja atento aos itens 1.2 e 1.2.1. As aplicações da PND e do Enem ocorrerão em dias distintos. Além disso, EXCEPCIONALMENTE este ano, devido à COP 30, teremos duas aplicações do Enem, uma entre os dias 9 e 16 de novembro e outra em 30 de novembro e 07 de dezembro para as cidades de Belém, Ananindeua e Marituba, do estado do Pará.</strong>",
            },
          },
        },
      ],
    },
    s1_t2_quiz2: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta:
            "As demandas regulares ou excepcionais são enviadas pelo Inep via:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Página de Acompanhamento",
              correto: true,
            },
            {
              id: "alt2",
              texto: "E-mail",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> <strong>Você leu com atenção o Edital, item 8.1. As demandas são obrigatoriamente enviadas pelo Inep via PÁGINA DE ACOMPANHAMENTO</strong>. Em caso de ausência de resposta, haverá a expiração da demanda, esta será gerada para outro(a) Certificador(a).",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> <strong>Releia com atenção o Edital, item 8.1. As demandas, não são enviadas por e-mail! São OBRIGATORIAMENTE enviadas pelo Inep via PÁGINA DE ACOMPANHAMENTO.</strong> Em caso de ausência de resposta, haverá a expiração da demanda, esta será gerada para outro(a) Certificador(a).",
            },
          },
        },
        {
          pergunta:
            "A expiração da primeira demanda gerada ocorre no prazo de:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "24 horas",
              correto: true,
            },
            {
              id: "alt2",
              texto: "48 horas",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> <strong>Você leu com atenção o Edital, item 8.4.  A primeira geração de demandas PODE EXPIRAR após 24h da sua criação!</strong> A partir da segunda geração, não há um prazo de expiração definido, dependerá da necessidade do Inep.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> <strong>Releia com atenção o Edital, item 8.4. É preciso que aceite a primeira demanda em até 24, após esse prazo ela irá expirar!</strong> A partir da segunda geração, não há um prazo de expiração definido, dependerá da necessidade do Inep.",
            },
          },
        },
      ],
    },
    s5_t2_quiz1: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta:
            "Vamos testar seu conhecimento sobre o que é uma demanda gerada no Sistema Web da RNC. As demandas são:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Convite para atuar nos locais de aplicação",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Solicitação de envio de documentação ao Inep",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> <strong>Você está sabendo tudo sobre as demandas. As demandas funcionam como <strong>convites</strong> para você <strong>atuar</strong>  como Certiﬁcador(a) nos <strong>locais de provas indicados pelo Inep</strong>. Esteja atento a elas no sistema!",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> <strong>Estude mais sobre o envio de demandas pelo Inep para você. As demandas funcionam como <strong>convites</strong> para você <strong>atuar</strong> como Certiﬁcador(a) nos <strong>locais de provas indicados pelo Inep</strong>. Esteja atento a elas no sistema!",
            },
          },
        },
      ],
    },
    s5_t4_quiz1: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta: "As Ocorrências são cadastradas no(a):",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "Página específica no Sistema da RNC",
              correto: true,
            },
            {
              id: "alt2",
              texto: "Relatório de Certificação",
              correto: false,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "<strong>Parabéns!</strong> <br><br> <strong>É isso mesmo, as <strong>Ocorrências</strong> são <strong>cadastradas</strong> em uma <strong>página específica</strong> no <strong>Sistema da RNC</strong>. Elas <span style='color=rgb(238, 0, 0)'>não são cadastradas</span> no <strong>Relatório de Certificação</strong>. Existe",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "<strong>Não foi dessa vez!</strong> <br><br> <strong>As <strong>Ocorrências</strong> são <strong>cadastradas</strong> em uma <strong>página específica</strong> no <strong>Sistema da RNC</strong>. Elas <span style='color=rgb(238, 0, 0)'>não são cadastradas</span> no <strong>Relatório de Certificação</strong>. Existe",
            },
          },
        },
      ],
    },
    s6_t4_quiz1: {
      titulo: "Quiz",
      subtitulo: "Teste seus conhecimentos sobre os procedimentos de aplicação",
      questoes: [
        {
          pergunta: "Em relação ao fechamento dos portões, eles devem fechar:",
          dica: "Este quiz não contabiliza pontos para certificação.",
          alternativas: [
            {
              id: "alt1",
              texto: "12h",
              correto: false,
            },
            {
              id: "alt2",
              texto: "12h30",
              correto: true,
            },
          ],
          feedback: {
            correto: {
              titulo: "Correto!",
              texto:
                "Parabéns! É isso mesmo, os portões devem fechar às <strong>12h30</strong> na <strong>presença do(a) Coordenador(a) de Local</strong> e você deve estar lá também para certificar se foram fechados no horário ou se houve antecipação ou atraso.",
            },
            incorreto: {
              titulo: "Incorreto!",
              texto:
                "O <strong>fechamento do portão ocorreu em horário errado</strong>! Os portões no CPNU devem fechar às <strong>12h30</strong> na presença do(a) <strong>Coordenador(a) de Local</strong> e você deve estar lá também para certificar se foram fechados no horário ou se houve antecipação ou atraso.",
            },
          },
        },
      ],
    },
  };

  // Função para reproduzir som de acerto
  function playSuccessSound() {
    try {
      const audio = new Audio(
        "https://recursos-moodle.caeddigital.net/projetos/cursos/RNC/2025-1/assets/sounds/canto_bem%20te%20vi.mp3"
      );
      audio.volume = 0.7; // Volume a 70%
      audio.play().catch((err) => {
        console.log("Erro ao reproduzir som:", err);
      });
    } catch (err) {
      console.log("Erro ao criar áudio:", err);
    }
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
          10
        ) || 0;

      // Tenta obter de variáveis CSS
      const cs = getComputedStyle(docEl);
      const fromVar =
        parseInt(
          (cs.getPropertyValue("--sticky-header-height") || "0").replace(
            "px",
            ""
          ),
          10
        ) || 0;

      return Math.max(fromData, fromVar, 0);
    } catch (e) {
      return 0;
    }
  }

  async function init() {
    const nodes = Array.from(document.querySelectorAll("[data-quiz]"));
    if (nodes.length > 0) {
      await Promise.all(nodes.map(initQuiz));
    }
  }

  async function initQuiz(el) {
    const quizId = el.getAttribute("data-quiz");

    // Pré-carrega o áudio
    try {
      const audio = new Audio(
        "https://recursos-moodle.caeddigital.net/projetos/cursos/RNC/2025-1/assets/sounds/canto_bem%20te%20vi.mp3"
      );
      audio.preload = "auto";
    } catch (err) {
      console.log("Erro ao pré-carregar áudio:", err);
    }

    try {
      // Em produção, faria fetch do JSON
      // const quizData = await loadQuizData(quizId);
      const quizData = QUIZ_DATA[quizId];

      if (!quizData) {
        console.error(`Quiz ${quizId} não encontrado`);
        return;
      }

      // Cria o Web Component
      const wc = document.createElement("quiz-component");
      const shadow = wc.attachShadow({ mode: "open" });

      // Injeta estilos com variáveis CSS do projeto
      const style = document.createElement("style");
      style.textContent = `${getHostCSSVariables(el)}\n${getQuizStyles()}`;
      shadow.appendChild(style);

      // Cria o container principal
      const container = document.createElement("div");
      container.className = "quiz-container";
      shadow.appendChild(container);

      // Substitui o elemento original
      el.replaceWith(wc);

      // Inicializa o quiz
      const quiz = new QuizController(container, quizData);
      quiz.render();
    } catch (err) {
      console.error(`Erro ao inicializar quiz ${quizId}:`, err);
    }
  }

  // Controller principal do Quiz
  class QuizController {
    constructor(container, data) {
      this.container = container;
      this.data = data;
      this.currentQuestion = 0;
      this.answers = [];
      this.state = "inicial"; // inicial | questao | final
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
          Math.hypot(rPanel.width - x, rPanel.height - y)
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
        (this.currentQuestion / totalQuestoes) * 100
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
        <h3 class="pergunta">${questao.pergunta}</h3>

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
            <div class="alternativa" data-alternativa="${
              alt.id
            }" data-correto="${alt.correto}">
              <div class="alternativa-letra">${String.fromCharCode(
                65 + index
              )}</div>
              <div class="alternativa-texto">${alt.texto}</div>
              <div class="alternativa-icon"></div>
            </div>
          `
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
          card.classList.remove("alt-press")
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
              ALT_CLICK_LOCK_MS
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
            playSuccessSound();
            // ÍCONE: SVG check animado na alternativa correta
            const icon = alt.querySelector(".alternativa-icon");
            if (icon) {
              icon.innerHTML = `
            <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
              <path d="M4 12l5 5 11-11"
                fill="none" stroke="currentColor" stroke-width="3"
                stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
            </svg>
          `;
            }

            // Feedback fold + check desenhado
            feedbackContent.innerHTML = `
          <div class="feedback correto fold feedback--ok">
            <div class="fb-head">
              <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                <path d="M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
              </svg>
              <strong>${questao.feedback.correto.titulo}</strong>
            </div>
            <div class="fb-body">${questao.feedback.correto.texto}</div>
          </div>
        `;
            // Fix para modal do quiz s3_t2_quiz2
            setTimeout(() => {
              const modalBtn = feedbackContent.querySelector(
                '[data-target="#img-seta"]'
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
                  <path d="M4 12l5 5 11-11"
                    fill="none" stroke="currentColor" stroke-width="3"
                    stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
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
                <path d="M6 6L18 18" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" pathLength="1" />
                <path d="M18 6L6 18" fill="none" stroke="currentColor" stroke-width="3"
                  stroke-linecap="round" pathLength="1" />
              </svg>
              <strong>${questao.feedback.incorreto.titulo}</strong>
            </div>
            <div class="fb-body">${questao.feedback.incorreto.texto}</div>
          </div>
        `;
          }

          // mostra o feedback com fold + stroke animation
          feedbackArea.style.display = "block";
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
          <img style="width: 130px;" src="https://recursos-moodle.caeddigital.net/projetos/cursos/RNC/2025-1/assets/img/quiz-passaro-concluido.png">
        </div>
      </div>
      <h2 class="quiz-titulo">Quiz Concluído!</h2>
      <p class="quiz-subtitulo">Excelente! Você domina o conteúdo!</p>

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

  /**
   * Extrai **todas** as CSS custom properties definidas em
   * qualquer seletor dentro de <body> e monta um `:host { --x: y; … }`
   * para que o Shadow DOM possa herdar essas variáveis.
   * (Baseado na implementação do InfoPack)
   */
  function getHostCSSVariables(elementContext) {
    const hostVars = [];

    // ESTRATÉGIA 1: Pega variáveis computadas do contexto atual
    // Procura pelo elemento pai mais próximo que tenha classes de seção
    let contextElement = elementContext;
    while (contextElement && contextElement !== document.body) {
      const computedStyle = getComputedStyle(contextElement);

      // Verifica se este elemento define variáveis CSS
      for (let i = 0; i < computedStyle.length; i++) {
        const propName = computedStyle[i];
        if (propName.startsWith("--")) {
          const propValue = computedStyle.getPropertyValue(propName).trim();
          if (
            propValue &&
            !hostVars.some((v) => v.startsWith(propName + ":"))
          ) {
            hostVars.push(`${propName}:${propValue}`);
          }
        }
      }
      contextElement = contextElement.parentElement;
    }

    // ESTRATÉGIA 2: Detecta seção específica e aplica variáveis corretas
    const sectionClasses = ["secao1", "secao2", "secao3", "secao4", "secao5"];
    let currentSection = null;

    // Procura por classe de seção no elemento ou seus pais
    let searchElement = elementContext;
    while (
      searchElement &&
      searchElement !== document.body &&
      !currentSection
    ) {
      for (const sectionClass of sectionClasses) {
        if (searchElement.classList?.contains(sectionClass)) {
          currentSection = sectionClass;
          break;
        }
      }
      searchElement = searchElement.parentElement;
    }

    // Se encontrou uma seção, pega as variáveis computadas dessa seção
    if (currentSection) {
      const sectionElement = document.querySelector(`.${currentSection}`);
      if (sectionElement) {
        const sectionStyles = getComputedStyle(sectionElement);
        for (let i = 0; i < sectionStyles.length; i++) {
          const propName = sectionStyles[i];
          if (propName.startsWith("--")) {
            const propValue = sectionStyles.getPropertyValue(propName).trim();
            if (propValue) {
              // Remove variável duplicada e adiciona a da seção atual
              const existingIndex = hostVars.findIndex((v) =>
                v.startsWith(propName + ":")
              );
              if (existingIndex >= 0) {
                hostVars[existingIndex] = `${propName}:${propValue}`;
              } else {
                hostVars.push(`${propName}:${propValue}`);
              }
            }
          }
        }
      }
    }

    // ESTRATÉGIA 3: Pega variáveis globais do body como fallback
    const bodyStyles = getComputedStyle(document.body);
    for (let i = 0; i < bodyStyles.length; i++) {
      const propName = bodyStyles[i];
      if (propName.startsWith("--")) {
        const propValue = bodyStyles.getPropertyValue(propName).trim();
        if (propValue && !hostVars.some((v) => v.startsWith(propName + ":"))) {
          hostVars.push(`${propName}:${propValue}`);
        }
      }
    }

    console.log(
      `🎨 Quiz carregado com contexto: ${currentSection || "global"}`,
      {
        variaveisCarregadas: hostVars.length,
        secaoDetectada: currentSection,
      }
    );

    return hostVars.length > 0 ? `:host{${hostVars.join(";")}}` : "";
  }

  function getQuizStyles() {
    return `

    .quiz-container {
      max-width: 600px;
      margin: 10px auto 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    }

    /* TELA INICIAL */
    .quiz-inicial {
      background: linear-gradient(135deg, var(--sec2) 0%, var(--sec3) 100%);
      padding: 60px 30px 60px;
      border-radius: 20px;
      text-align: center;
      color: white;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      position: relative; /* necessário para ripple */
      overflow: hidden;   /* necessário para ripple */
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
      display: none;
    }

    .stat-item {
      text-align: center;
      background: rgba(255,255,255,0.1);
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
      position: relative; /* para pseudo-elementos */
      background: white;
      color: var(--base);
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
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    /* TELA QUESTÃO */
    .quiz-questao {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
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
      color: var(--base);
    }

    .progress-bar {
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--base), var(--sec2));
      transition: width 0.6s cubic-bezier(.23,1,.32,1);
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
      transition: transform 0.18s cubic-bezier(.2,.7,.2,1), box-shadow .18s ease, border-color .18s ease, background-color .18s ease;
      background: white;
      position: relative; /* para shimmer */
      overflow: hidden;
      will-change: transform;
    }

    .alternativa:hover:not(.respondido) {
      border-color: var(--tonica, var(--base));
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
      to { stroke-dashoffset: 0; }
    }

    .quiz-actions {
      margin-top: 30px;
      text-align: center;
    }

    .btn-proximo, .btn-refazer {
      position: relative;
      background: var(--base);
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

    .btn-proximo:hover, .btn-refazer:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    /* TELA FINAL */
    .quiz-final {
      background: white;
      border-radius: 20px;
      padding: 60px 30px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
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

    .resultado-score, .resultado-percentual {
      text-align: center;
    }

    .score-numero, .percentual-numero {
      font-size: 48px;
      font-weight: 700;
      color: var(--base);
      line-height: 1;
    }

    .score-label, .percentual-label {
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
      transition: opacity 0.6s cubic-bezier(.16,1,.3,1), 
                  transform 0.6s cubic-bezier(.16,1,.3,1);
    }

    .quiz-final.is-exit {
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.24s cubic-bezier(.16,1,.3,1), 
                  transform 0.24s cubic-bezier(.16,1,.3,1);
    }

    /* Animação do ripple - VERSÃO ORIGINAL APRIMORADA */
    .ripple-overlay{
      position:absolute; width:32px; height:32px; border-radius:50%;
      background:#fff; opacity:.22; pointer-events:none; transform:scale(0);
      left:0; top:0; will-change:transform, opacity; z-index: 5;
    }

    @keyframes rippleExpand { to { transform: var(--scale-to, scale(60)); opacity:1; } }

    /* Animação das alternativas */
    .alternativas.is-enter .alternativa {
      opacity: 0;
      transform: translateY(10px);
      animation: staggerIn 0.5s forwards;
    }

    .alternativas.is-enter .alternativa:nth-child(1) { animation-delay: 0.05s; }
    .alternativas.is-enter .alternativa:nth-child(2) { animation-delay: 0.1s; }
    .alternativas.is-enter .alternativa:nth-child(3) { animation-delay: 0.15s; }
    .alternativas.is-enter .alternativa:nth-child(4) { animation-delay: 0.2s; }

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
      transition: max-height 0.5s cubic-bezier(.16,1,.3,1),
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
      animation: bounce 0.6s cubic-bezier(.16,1,.3,1) forwards;
    }

    @keyframes bounce {
      0% { transform: scale(0.96); }
      50% { transform: scale(1.04); }
      100% { transform: scale(1); }
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
      to { stroke-dashoffset: 0; }
    }
  `;
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
