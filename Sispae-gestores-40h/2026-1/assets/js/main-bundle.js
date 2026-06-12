(function () {
  "use strict";

  // --- DOMUtils.js ---
  const DOMUtils = {
    giveBlankToReference() {
      const links = document.querySelectorAll(
        `#referencias a, #referencias span a, #referencias span strong a, #referencias span strong span a, #referencias p a, #referencias p span a, #referencias p span strong a, #referencias p span strong span a`,
      );

      Array.from(links).forEach((link) => {
        if (
          link.href.indexOf("javascript") === -1 &&
          link.href.indexOf("#") === -1
        ) {
          link.setAttribute("target", "_blank");
        }
      });
    },

    limparLinks() {
      const links = document.querySelectorAll(
        '.container-pai a[href^="https://"]',
      );
      if (!links.length) return;

      links.forEach((link) => {
        if (link.querySelector("span, strong")) {
          const linkClone = link.cloneNode(true);
          const spansAndStrongs = linkClone.querySelectorAll("span, strong");

          spansAndStrongs.forEach((element) => {
            const textNode = document.createTextNode(element.textContent);
            element.parentNode.replaceChild(textNode, element);
          });

          link.parentNode.replaceChild(linkClone, link);
        }
      });
    },

    limparEstilos(divSelector) {
      const div = document.querySelector(divSelector);
      if (!div) return;

      div.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("style");
      });
    },

    init() {
      try {
        this.limparEstilos(".btn-referencias");
        this.limparEstilos(".c-aula-container");
        this.giveBlankToReference();
        this.limparLinks();
      } catch (e) {
        console.error(" [DOMUtils] Erro ao aplicar utilitários:", e);
      }
    },
  };

  // --- PodcastManager.js ---
  const PodcastManager = {
    init() {
      var SC = "object" == typeof SC ? SC : {};

      // Injeta a API do SoundCloud
      SC.Widget = (function (e) {
        var t = {};
        function n(r) {
          if (t[r]) return t[r].exports;
          var o = (t[r] = { i: r, l: !1, exports: {} });
          return (e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports);
        }
        return (
          (n.m = e),
          (n.c = t),
          (n.d = function (e, t, r) {
            n.o(e, t) ||
              Object.defineProperty(e, t, { enumerable: !0, get: r });
          }),
          (n.r = function (e) {
            ("undefined" != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
              Object.defineProperty(e, "__esModule", { value: !0 }));
          }),
          (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (
              (n.r(r),
              Object.defineProperty(r, "default", { enumerable: !0, value: e }),
              2 & t && "string" != typeof e)
            )
              for (var o in e)
                n.d(
                  r,
                  o,
                  function (t) {
                    return e[t];
                  }.bind(null, o),
                );
            return r;
          }),
          (n.n = function (e) {
            var t =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return (n.d(t, "a", t), t);
          }),
          (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (n.p = ""),
          n((n.s = 0))
        );
      })([
        function (e, t, n) {
          var r,
            o,
            i,
            u = n(1),
            a = n(2),
            c = n(3),
            s = u.api,
            l = u.bridge,
            d = [],
            f = [],
            p = /^http(?:s?)/;
          function E(e) {
            var t, n;
            for (t = 0, n = f.length; t < n && !1 !== e(f[t]); t++);
          }
          function v(e) {
            return e.contentWindow
              ? e.contentWindow
              : e.contentDocument && "parentWindow" in e.contentDocument
                ? e.contentDocument.parentWindow
                : null;
          }
          function _(e) {
            var t,
              n = [];
            for (t in e) e.hasOwnProperty(t) && n.push(e[t]);
            return n;
          }
          function S(e, t, n) {
            ((n.callbacks[e] = n.callbacks[e] || []), n.callbacks[e].push(t));
          }
          function h(e, t) {
            var n = !0;
            return (
              (t.callbacks[e] = []),
              E(function (t) {
                if ((t.callbacks[e] || []).length) return ((n = !1), !1);
              }),
              n
            );
          }
          function y(e, t, n) {
            var r,
              o,
              i = v(n);
            if (!i.postMessage) return !1;
            ((r = n.getAttribute("src").split("?")[0]),
              (o = JSON.stringify({ method: e, value: t })),
              "//" === r.substr(0, 2) && (r = window.location.protocol + r),
              (r = r.replace(
                /http:\/\/(w|wt).soundcloud.com/,
                "https://$1.soundcloud.com",
              )),
              i.postMessage(o, r));
          }
          function b(e) {
            var t;
            return (
              E(function (n) {
                if (n.instance === e) return ((t = n), !1);
              }),
              t
            );
          }
          function g(e) {
            var t;
            return (
              E(function (n) {
                if (v(n.element) === e) return ((t = n), !1);
              }),
              t
            );
          }
          function m(e, t) {
            return function (n) {
              var r,
                o = !!((r = n) && r.constructor && r.call && r.apply),
                i = b(this),
                u = !o && t ? n : null,
                a = o && !t ? n : null;
              return (a && S(e, a, i), y(e, u, i.element), this);
            };
          }
          function R(e, t, n) {
            var r, o, i;
            for (r = 0, o = t.length; r < o; r++) e[(i = t[r])] = m(i, n);
          }
          function O(e, t, n) {
            return (
              e +
              "?url=" +
              t +
              "&" +
              (function (e) {
                var t,
                  n,
                  r = [];
                for (t in e)
                  e.hasOwnProperty(t) &&
                    ((n = e[t]),
                    r.push(
                      t +
                        "=" +
                        ("start_track" === t
                          ? parseInt(n, 10)
                          : n
                            ? "true"
                            : "false"),
                    ));
                return r.join("&");
              })(n)
            );
          }
          function w(e, t, n) {
            var r,
              o,
              i = e.callbacks[t] || [];
            for (r = 0, o = i.length; r < o; r++) i[r].apply(e.instance, n);
            ((function (e) {
              var t,
                n = !1;
              for (t in a)
                if (a.hasOwnProperty(t) && a[t] === e) {
                  n = !0;
                  break;
                }
              return n;
            })(t) ||
              t === s.READY) &&
              (e.callbacks[t] = []);
          }
          function A(e) {
            var t, n, r, o, i;
            try {
              n = JSON.parse(e.data);
            } catch (e) {
              return !1;
            }
            return (
              (t = g(e.source)),
              (r = n.method),
              (o = n.value),
              (!t || P(e.origin) === P(t.domain)) &&
                (t
                  ? (r === s.READY &&
                      ((t.isReady = !0),
                      w(t, "__LATE_BINDING__"),
                      h("__LATE_BINDING__", t)),
                    r !== s.PLAY || t.playEventFired || (t.playEventFired = !0),
                    r !== s.PLAY_PROGRESS ||
                      t.playEventFired ||
                      ((t.playEventFired = !0), w(t, s.PLAY, [o])),
                    (i = []),
                    void 0 !== o && i.push(o),
                    void w(t, r, i))
                  : (r === s.READY && d.push(e.source), !1))
            );
          }
          function P(e) {
            return e.replace(p, "");
          }
          (window.addEventListener
            ? window.addEventListener("message", A, !1)
            : window.attachEvent("onmessage", A),
            (e.exports = i =
              function (e, t, n) {
                var i;
                if (
                  (("" === (i = e) || (i && i.charCodeAt && i.substr)) &&
                    (e = document.getElementById(e)),
                  !(function (e) {
                    return !(
                      !e ||
                      1 !== e.nodeType ||
                      "IFRAME" !== e.nodeName.toUpperCase()
                    );
                  })(e))
                )
                  throw new Error(
                    "SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.",
                  );
                t &&
                  ((n = n || {}),
                  (e.src = O("https://wt.soundcloud.test:9200/", t, n)));
                var u,
                  a,
                  c = g(v(e));
                return c && c.instance
                  ? c.instance
                  : ((u = d.indexOf(v(e)) > -1),
                    (a = new r(e)),
                    f.push(new o(a, e, u)),
                    a);
              }),
            (i.Events = s),
            (window.SC = window.SC || {}),
            (window.SC.Widget = i),
            (o = function (e, t, n) {
              ((this.instance = e),
                (this.element = t),
                (this.domain = (function (e) {
                  var t,
                    n,
                    r,
                    o = "";
                  "//" === e.substr(0, 2) && (e = window.location.protocol + e);
                  for (
                    r = e.split("/"), t = 0, n = r.length;
                    t < n && t < 3;
                    t++
                  )
                    ((o += r[t]), t < 2 && (o += "/"));
                  return o;
                })(t.getAttribute("src"))),
                (this.isReady = !!n),
                (this.callbacks = {}));
            }),
            ((r = function () {}).prototype = {
              constructor: r,
              load: function (e, t) {
                if (e) {
                  t = t || {};
                  var n = this,
                    r = b(this),
                    o = r.element,
                    i = o.src,
                    u = i.substr(0, i.indexOf("?"));
                  ((r.isReady = !1),
                    (r.playEventFired = !1),
                    (o.onload = function () {
                      n.bind(s.READY, function () {
                        var e,
                          n = r.callbacks;
                        for (e in n)
                          n.hasOwnProperty(e) &&
                            e !== s.READY &&
                            y(l.ADD_LISTENER, e, r.element);
                        t.callback && t.callback();
                      });
                    }),
                    (o.src = O(u, e, t)));
                }
              },
              bind: function (e, t) {
                var n = this,
                  r = b(this);
                return (
                  r &&
                    r.element &&
                    (e === s.READY && r.isReady
                      ? setTimeout(t, 1)
                      : r.isReady
                        ? (S(e, t, r), y(l.ADD_LISTENER, e, r.element))
                        : S(
                            "__LATE_BINDING__",
                            function () {
                              n.bind(e, t);
                            },
                            r,
                          )),
                  this
                );
              },
              unbind: function (e) {
                var t,
                  n = b(this);
                n &&
                  n.element &&
                  ((t = h(e, n)),
                  e !== s.READY && t && y(l.REMOVE_LISTENER, e, n.element));
              },
            }),
            R(r.prototype, _(a)),
            R(r.prototype, _(c), !0));
        },
        function (e, t) {
          ((t.api = {
            LOAD_PROGRESS: "loadProgress",
            PLAY_PROGRESS: "playProgress",
            PLAY: "play",
            PAUSE: "pause",
            FINISH: "finish",
            SEEK: "seek",
            READY: "ready",
            OPEN_SHARE_PANEL: "sharePanelOpened",
            CLICK_DOWNLOAD: "downloadClicked",
            CLICK_BUY: "buyClicked",
            ERROR: "error",
          }),
            (t.bridge = {
              REMOVE_LISTENER: "removeEventListener",
              ADD_LISTENER: "addEventListener",
            }));
        },
        function (e, t) {
          e.exports = {
            GET_VOLUME: "getVolume",
            GET_DURATION: "getDuration",
            GET_POSITION: "getPosition",
            GET_SOUNDS: "getSounds",
            GET_CURRENT_SOUND: "getCurrentSound",
            GET_CURRENT_SOUND_INDEX: "getCurrentSoundIndex",
            IS_PAUSED: "isPaused",
          };
        },
        function (e, t) {
          e.exports = {
            PLAY: "play",
            PAUSE: "pause",
            TOGGLE: "toggle",
            SEEK_TO: "seekTo",
            SET_VOLUME: "setVolume",
            NEXT: "next",
            PREV: "prev",
            SKIP: "skip",
          };
        },
      ]);

      const convertPositionToTime = (position) => {
        let seconds = Math.floor(position / 1000);
        let hours = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${hours > 0 ? hours.toString() + ":" : ""}${minutes}:${seconds}`;
      };

      const addPodcastsIframe = () => {
        const allPodcasts = document.querySelectorAll('[role="podcast"]');
        if (!allPodcasts.length) return;

        allPodcasts.forEach((podcast) => {
          const url = podcast.dataset.url;
          if (url) {
            const iframe = document.createElement("iframe");
            iframe.src = url;
            iframe.allow = "autoplay; encrypted-media";
            iframe.style = "position: absolute; opacity: 0";
            podcast.appendChild(iframe);

            const widget = SC.Widget(iframe);
            const progressElement = podcast.querySelector(
              ".progress-bar .progress",
            );
            const currentTimeElement = podcast.querySelector(".current");
            const totalDurationElement = podcast.querySelector(".duration");
            let totalDuration = 0;

            if (progressElement && currentTimeElement) {
              widget.bind(SC.Widget.Events.READY, () => {
                widget.getDuration((duration) => {
                  progressElement.dataset.duration = duration;
                  if (totalDurationElement)
                    totalDurationElement.innerText =
                      convertPositionToTime(duration);
                  totalDuration = duration;
                });
                widget.getPosition((position) => {
                  progressElement.dataset.position = position;
                });
              });

              widget.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
                widget.getPosition((position) => {
                  progressElement.dataset.position = position;
                  currentTimeElement.innerText =
                    convertPositionToTime(position);
                  progressElement.style.width = ` ${(position / totalDuration) * 100}%`;
                });
              });
            }

            const playButton = podcast.querySelector(".play-button");
            if (playButton) {
              playButton.innerHTML = `<svg class="btn-play" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" id="yui_3_17_2_1_1773166012216_40">
        <rect width="34" height="34" rx="17" fill="var(--inter1-bg)"></rect>
        <path d="M18.9697 17L16.1816 19.0908V14.9082L18.9697 17Z" fill="var(--color-font-body)" stroke="var(--color-font-body)" stroke-width="4" id="yui_3_17_2_1_1773166012216_39"></path>
    </svg><svg class="btn-pause" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" id="yui_3_17_2_1_1773166012216_54">
        <rect width="34" height="34" rx="17" fill="var(--inter1-bg)" id="yui_3_17_2_1_1773166012216_53"></rect>
        <path d="M17 7C22.5228 7 27 11.4772 27 17C27 22.5228 22.5228 27 17 27C11.4772 27 7 22.5228 7 17C7 11.4772 11.4772 7 17 7ZM17 7.90918C11.9792 7.90918 7.90918 11.9792 7.90918 17C7.90918 22.0208 11.9792 26.0908 17 26.0908C22.0208 26.0908 26.0908 22.0208 26.0908 17C26.0908 11.9792 22.0208 7.90918 17 7.90918ZM15.4092 13.3633C15.7857 13.3633 16.0908 13.6694 16.0908 
        14.0459V20.1816C16.0908 20.5582 15.7857 20.8632 15.4092 20.8633C15.0326 20.8633 14.7275 20.5582 14.7275 20.1816V14.0459C14.7275 13.6693 15.0326 13.3633 15.4092 13.3633ZM18.5908 13.3633C18.9674 13.3633 19.2725 13.6693 19.2725 14.0459V20.1816C19.2725 20.5582 18.9674 20.8633 18.5908 20.8633C18.2143 20.8632 17.9092 20.5582 17.9092 20.1816V14.0459C17.9092 13.6694 18.2143 13.3633 18.5908 13.3633Z" fill="var(--color-font-body)"></path>
    </svg>`;
              playButton.addEventListener("click", () => {
                console.log("clique");
                widget.isPaused((paused) => {
                  if (paused) {
                    widget.play();
                    playButton.classList.add("played");
                  } else {
                    widget.pause();
                    playButton.classList.remove("played");
                  }
                });
              });
            }

            const rewindButton = podcast.querySelector(".rewind-button");
            if (rewindButton) {
              rewindButton.addEventListener("click", () => {
                widget.getPosition((position) =>
                  widget.seekTo(position < 15000 ? 0 : position - 15000),
                );
              });
            }

            const forwardButton = podcast.querySelector(".forward-button");
            if (forwardButton) {
              forwardButton.addEventListener("click", () => {
                widget.getPosition((position) =>
                  widget.seekTo(
                    position + 15000 > totalDuration
                      ? totalDuration
                      : position + 15000,
                  ),
                );
              });
            }
          }
        });
      };

      addPodcastsIframe();
    },
  };

  // --- AccordionManager.js ---
  const AccordionManager = {
    init() {
      const containers = document.querySelectorAll(".accordion-container");

      containers.forEach((container) => {
        container.addEventListener("click", (e) => {
          const header = e.target.closest(".accordion-header");
          if (!header) return;

          const currentItem = header.closest(".accordion-item");
          const isOpen = currentItem.classList.contains("active");
          const setAria = (el, val) => el.setAttribute("aria-expanded", val);

          if (!isOpen) {
            container
              .querySelectorAll(".accordion-item.active")
              .forEach((item) => {
                item.classList.remove("active");
                setAria(item.querySelector(".accordion-header"), "false");
              });
          }

          currentItem.classList.toggle("active");
          setAria(header, currentItem.classList.contains("active"));
        });
      });
    },
  };

  const CarouselManager = {
    init() {
      class Carousel {
        constructor(carousel) {
          if (!carousel) {
            console.error("Carousel not found");
            return;
          }

          this.carousel = carousel;
          this.prevButton = carousel.querySelector(".carousel-control-prev");
          this.nextButton = carousel.querySelector(".carousel-control-next");
          this.carouselItems = carousel.querySelectorAll(".carousel-item");
          this.totalSlides = this.carouselItems.length;

          this.init();
        }

        getCurrentSlideIndex() {
          const activeItem = this.carousel.querySelector(
            ".carousel-item.active",
          );
          return Array.from(this.carouselItems).indexOf(activeItem);
        }

        isMobile() {
          return window.innerWidth < 769;
        }

        getActiveSlideColor() {
          const activeItem = this.carousel.querySelector(
            ".carousel-item.active",
          );
          return window.getComputedStyle(activeItem).backgroundColor;
        }

        updateArrowsColor() {
          if (this.isMobile()) {
            const backgroundColor = this.getActiveSlideColor();
            this.prevButton.style.backgroundColor = backgroundColor;
            this.nextButton.style.backgroundColor = backgroundColor;
          } else {
            this.prevButton.style.backgroundColor = "";
            this.nextButton.style.backgroundColor = "";
          }
        }

        updateArrowsState() {
          const currentIndex = this.getCurrentSlideIndex();

          if (this.isMobile()) {
            // Primeiro slide - desabilita seta anterior
            if (currentIndex === 0) {
              this.prevButton.style.opacity = "0.3";
              this.prevButton.style.pointerEvents = "none";
            } else {
              this.prevButton.style.opacity = "1";
              this.prevButton.style.pointerEvents = "auto";
            }

            // Último slide - desabilita seta próxima
            if (currentIndex === this.totalSlides - 1) {
              this.nextButton.style.opacity = "0.3";
              this.nextButton.style.pointerEvents = "none";
            } else {
              this.nextButton.style.opacity = "1";
              this.nextButton.style.pointerEvents = "auto";
            }
          } else {
            // Desktop - reseta estados
            this.prevButton.style.opacity = "1";
            this.nextButton.style.opacity = "1";
            this.prevButton.style.pointerEvents = "auto";
            this.nextButton.style.pointerEvents = "auto";
          }
        }

        updateCarousel() {
          this.updateArrowsColor();
          this.updateArrowsState();
        }

        setupEventListeners() {
          // Evento de mudança de slide (Bootstrap carousel)
          if (window.$ && this.carousel) {
            window.$(this.carousel).on("slid.bs.carousel", () => {
              this.updateCarousel();
            });
          }

          // Evento de resize
          window.addEventListener("resize", () => {
            this.updateCarousel();
          });
        }

        init() {
          // Aplica estado inicial imediatamente
          this.updateCarousel();

          // Configura listeners
          this.setupEventListeners();
        }
      }

      const seletorCarousel = `#page-mod-page-view .no-overflow .carousel, .constructor .carousel, .container-pai .carousel`;
      const carousels = document.querySelectorAll(seletorCarousel);

      setTimeout(() => {
        if (carousels.length > 0) {
          carousels.forEach((carousel) => new Carousel(carousel));
        }
      }, 300);
    },
  };

  // --- QuizManager.js ---
  const QuizManager = {
    init(global) {
      // console.log("📚 [QuizManager] Inicializando Quiz...");

      // Envelopamos a sua função quiz original aqui dentro para manter o encapsulamento
      (function quiz(global) {
        ("use strict");

        // Cache global para evitar múltiplas requisições
        let quizCache = {};

        async function loadQuizData(quizUrl) {
          // Verifica se JÁ existe uma promessa para ESTA URL específica
          if (!quizCache[quizUrl]) {
            quizCache[quizUrl] = fetch(quizUrl).then((r) => r.json());
          }
          // Aguarda os dados da URL correta
          const data = await quizCache[quizUrl];
          return data;
        }
        // --------------

        function smoothScrollToElement(element, options = {}) {
          if (!element) return;
          const config = {
            offset: options.offset || 20,
            behavior: options.behavior || "smooth",
            force: options.force || false,
            ...options,
          };

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

          const stickyOffset = getStickyHeaderOffset();
          const elementRect = element.getBoundingClientRect();
          const elementPosition = elementRect.top + window.pageYOffset;
          const offsetPosition = elementPosition - stickyOffset - config.offset;

          const reduceMotion =
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const behavior = reduceMotion ? "auto" : config.behavior;

          try {
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: behavior,
            });
          } catch (e) {
            window.scrollTo(0, Math.max(0, offsetPosition));
          }
        }

        function getStickyHeaderOffset() {
          try {
            const docEl = document.documentElement;
            const body = document.body;
            const fromData =
              parseInt(
                body.getAttribute("data-sticky-header-height") ||
                  docEl.getAttribute("data-sticky-header-height") ||
                  "0",
                10,
              ) || 0;
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

        async function initQuizScript() {
          const nodes = Array.from(
            document.querySelectorAll("[data-quiz-url]"),
          );
          if (nodes.length > 0) {
            await Promise.all(nodes.map(initQuiz));
          }
        }

        async function initQuiz(el) {
          const quizUrl = el.getAttribute("data-quiz-url");
          const initialIconUrl = el.getAttribute("data-initial-icon-url");
          const showFeedback = el.getAttribute("data-feedback") === "true";

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
            const link = document.createElement("link");
            link.setAttribute("rel", "stylesheet");
            link.setAttribute(
              "href",
              "https://recursos-moodle.caeddigital.net/projetos/componentes/2026/quiz/m1v1/style.css",
            );
            shadow.appendChild(link);

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
            const quiz = new QuizController(
              container,
              quizData,
              el,
              showFeedback,
            );
            quiz.render();
          } catch (err) {
            console.error(`Erro ao inicializar quiz (${quizUrl}):`, err);
          }
        }

        class QuizController {
          constructor(container, data, element, showFeedback = false) {
            this.container = container;
            this.data = data;
            this.currentQuestion = 0;
            this.answers = [];
            this.state = "inicial";
            this.element = element;
            this.showFeedback = showFeedback;
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
              <div class="ripple-overlay" aria-hidden="true"></div>
            </div>
          `;

            const inicial = this.container.querySelector(".quiz-inicial");
            const btn = this.container.querySelector("#iniciar-quiz");
            const overlay = this.container.querySelector(".ripple-overlay");

            requestAnimationFrame(() => {
              inicial.classList.remove("is-pre");
              inicial.classList.add("is-enter");
            });
            this._fromRestart = false;

            const MAG_INTENSITY = 8;
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

            btn.addEventListener("click", () => {
              const panel = inicial;
              const rPanel = panel.getBoundingClientRect();
              const rBtn = btn.getBoundingClientRect();

              const x = rBtn.left + rBtn.width / 2 - rPanel.left;
              const y = rBtn.top + rBtn.height / 2 - rPanel.top;

              const maxDist = Math.max(
                Math.hypot(x, y),
                Math.hypot(rPanel.width - x, y),
                Math.hypot(x, rPanel.height - y),
                Math.hypot(rPanel.width - x, rPanel.height - y),
              );
              const baseRadius = 16;
              const scaleNeeded = maxDist / baseRadius;

              overlay.style.left = `${x - 16}px`;
              overlay.style.top = `${y - 16}px`;
              overlay.style.setProperty("--scale-to", `scale(${scaleNeeded})`);
              overlay.style.animation = "none";
              overlay.offsetWidth;
              overlay.style.animation =
                "rippleExpand 500ms cubic-bezier(.16,1,.3,1) forwards";

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
                          <path d="M12 3a7 7 0 0 0-4 12c.7.6 1 1.1 1 2v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1c0-.9.3-1.4 1-2A7 7 0 0 0 12 3z"/>
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

            const card = this.container.querySelector(".quiz-questao");
            requestAnimationFrame(() => {
              card.classList.remove("is-pre");
              card.classList.add("is-enter");

              setTimeout(() => {
                smoothScrollToElement(card, { offset: 20 });
              }, 100);
            });

            const list = this.container.querySelector(".alternativas");
            requestAnimationFrame(() => list.classList.add("is-enter"));

            this.bindAlternativas();
          }

          bindAlternativas() {
            const alternativas =
              this.container.querySelectorAll(".alternativa");
            const questao = this.data.questoes[this.currentQuestion];
            const feedbackArea = this.container.querySelector(".feedback-area");
            const feedbackContent =
              this.container.querySelector(".feedback-content");
            const btnProximoo =
              this.container.querySelector("#proxima-questao");

            const ALT_INTENSITY = 8;
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

            const ALT_CLICK_LOCK_MS = 1100;
            alternativas.forEach((card) => {
              const onPress = () => {
                if (card.classList.contains("respondido")) return;
                card.classList.add("is-animating");
                card.style.transform = "";
                card.classList.remove("is-hovered");
                card.classList.add("alt-press");
              };
              const onRelease = () => {
                if (card.classList.contains("respondido")) return;
                card.classList.remove("alt-press");
                void card.offsetWidth;
                card.classList.add("alt-bounce");
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

            alternativas.forEach((alt) => {
              alt.addEventListener("click", () => {
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

                this.answers.push({
                  questao: this.currentQuestion,
                  correto,
                  alternativa: alt.dataset.alternativa,
                });

                const total = this.data.questoes.length;
                const pct = Math.round(
                  ((this.currentQuestion + 1) / total) * 100,
                );
                const bar = this.container.querySelector(".progress-fill");
                const txt = this.container.querySelector(".progresso-text");
                if (bar) {
                  bar.style.width = pct + "%";
                  bar.style.setProperty("--pct", pct + "%");
                }
                if (txt) txt.textContent = `${pct}% concluído`;

                alternativas.forEach((a) => a.classList.add("respondido"));

                if (correto) {
                  alt.classList.add("correta");
                  const icon = alt.querySelector(".alternativa-icon");
                  if (icon) {
                    icon.innerHTML = `
                    <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                      <path d="M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
                    </svg>
                  `;
                  }

                  // Só mostra feedback se showFeedback for true
                  if (this.showFeedback) {
                    feedbackContent.innerHTML = `
                    <div class="feedback correto fold feedback--ok">
                      <div class="fb-head">
                        <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                          <path d="M4 12l5 5 11-11" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" pathLength="1" />
                        </svg>
                        <strong>Correto!</strong>
                      </div>
                      <div class="fb-body">${questao.feedback[questao.correta]}</div>
                    </div>
                  `;

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
                  }
                } else {
                  alt.classList.add("incorreta");

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

                  // Só mostra feedback se showFeedback for true
                  if (this.showFeedback) {
                    const indiceResposta =
                      Array.from(alternativas).indexOf(alt);
                    feedbackContent.innerHTML = `
                    <div class="feedback incorreto fold feedback--err">
                      <div class="fb-head">
                        <svg viewBox="0 0 24 24" class="fb-ico" aria-hidden="true">
                          <path d="M6 6L18 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" pathLength="1" />
                          <path d="M18 6L6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" pathLength="1" />
                        </svg>
                        <strong>Incorreto!</strong>
                      </div>
                      <div class="fb-body">${questao.feedback[indiceResposta]}</div>
                    </div>
                  `;
                  }
                }

                // Só exibe a área de feedback se showFeedback for true
                if (this.showFeedback) {
                  feedbackArea.style.display = "block";
                  const fb = feedbackArea.querySelector(".feedback.fold");
                  requestAnimationFrame(() => fb && fb.classList.add("show"));

                  setTimeout(() => {
                    smoothScrollToElement(btnProximoo, { offset: 500 });
                  }, 300);
                }

                const actions = this.container.querySelector(".quiz-actions");
                actions.style.display = "block";

                const btnProximo =
                  this.container.querySelector("#proxima-questao");
                if (btnProximo && !btnProximo.hasAttribute("data-bound")) {
                  btnProximo.setAttribute("data-bound", "true");
                  btnProximo.addEventListener("click", () => {
                    smoothScrollToElement(this.container, { offset: 20 });

                    setTimeout(() => {
                      if (
                        this.currentQuestion + 1 ===
                        this.data.questoes.length
                      ) {
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
                <div class="icon-circle">
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

            const card = this.container.querySelector(".quiz-final");
            requestAnimationFrame(() => {
              card.classList.remove("is-pre");
              card.classList.add("is-enter");
            });

            this.container
              .querySelector("#refazer-quiz")
              .addEventListener("click", () => {
                card.classList.add("is-exit");
                setTimeout(() => {
                  this.currentQuestion = 0;
                  this.answers = [];
                  this._fromRestart = true;
                  this.state = "inicial";
                  this.render();

                  setTimeout(() => {
                    smoothScrollToElement(this.container, { offset: 20 });
                  }, 100);
                }, 240);
              });
          }
        }

        // Chama a inicialização interna do Quiz
        initQuizScript();

        // Exporta para uso externo se necessário
        global.QuizPack = {
          init: initQuizScript,
          refresh: initQuizScript,
        };
      })(global);
    },
  };

  // --- TesteCapricho.js ---
  const TesteCapricho = {
    init() {
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
          <svg width="344" height="224" viewBox="0 0 344 224" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="icon-quiz-perfil">
<g id="Mask group">
<mask id="mask0_4088_5520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="268" y="37" width="69" height="126">
<path id="Subtract" d="M330.451 38.1015C333.131 36.61 336.423 38.5643 336.397 41.6308L335.667 125.663C335.655 127.102 334.87 128.423 333.612 129.123L274.847 161.835C272.167 163.326 268.875 161.371 268.902 158.305L269.631 74.2734C269.644 72.8344 270.428 71.5123 271.686 70.8124L330.451 38.1015Z" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_4088_5520)">
<g id="Mask group_2" style="mix-blend-mode:luminosity" opacity="0.59" filter="url(#filter0_d_4088_5520)">
<mask id="mask1_4088_5520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="208" y="27" width="171" height="171">
<circle id="Ellipse 5" cx="293.762" cy="112.257" r="85.0556" transform="rotate(30.5038 293.762 112.257)" fill="white"/>
</mask>
<g mask="url(#mask1_4088_5520)">
<circle id="Ellipse 12" cx="293.762" cy="112.257" r="85.0556" transform="rotate(30.5038 293.762 112.257)" fill="white"/>
<g id="Ellipse 10" filter="url(#filter1_f_4088_5520)">
<path d="M229.461 126.083C244.054 134.68 261.491 113.316 270.157 98.6078C278.822 83.899 348.078 119.281 346.641 93.4698C345.839 79.0605 298.106 52.4153 286.397 49.848C258.581 43.7494 227.393 69.1747 218.728 83.8835C210.062 98.5922 214.868 117.485 229.461 126.083Z" fill="var(--inter2-bg)"/>
</g>
<g id="Vector 6" filter="url(#filter2_f_4088_5520)">
<path d="M299.683 58.8371C313.16 54.2744 335.595 57.0202 342.817 44.7614C363.134 10.2751 269.982 13.6437 231.205 37.0766C198.205 57.0185 189.385 142.703 221.074 164.669C241.17 178.599 216.278 116.548 220.051 101.351C223.548 87.2658 233.863 69.5333 247.261 63.9569C257.742 59.5947 288.93 62.4776 299.683 58.8371Z" fill="var(--gray-200)"/>
</g>
<g id="Ellipse 9" filter="url(#filter3_f_4088_5520)">
<ellipse cx="296.476" cy="151.021" rx="59.0386" ry="69.0451" transform="rotate(30.5038 296.476 151.021)" fill="url(#paint0_linear_4088_5520)"/>
</g>
<g id="Ellipse 11" filter="url(#filter4_f_4088_5520)">
<ellipse cx="284.726" cy="119.709" rx="21.0137" ry="20.0131" transform="rotate(30.5038 284.726 119.709)" fill="var(--gray-100)"/>
</g>
</g>
</g>
<g id="Rectangle 7" style="mix-blend-mode:color">
<rect x="268.031" y="49.2635" width="76.145" height="108.547" fill="var(--inter3)"/>
</g>
<g id="Mask group_3" style="mix-blend-mode:luminosity" opacity="0.49" filter="url(#filter5_d_4088_5520)">
<mask id="mask2_4088_5520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="279" y="-28" width="172" height="171">
<circle id="Ellipse 5_2" cx="365.048" cy="57.1736" r="85.0556" transform="rotate(30.5038 365.048 57.1736)" fill="white"/>
</mask>
<g mask="url(#mask2_4088_5520)">
<circle id="Ellipse 12_2" cx="365.048" cy="57.1736" r="85.0556" transform="rotate(30.5038 365.048 57.1736)" fill="white"/>
<g id="Ellipse 10_2" filter="url(#filter6_f_4088_5520)">
<path d="M300.746 70.9989C315.339 79.5962 332.777 58.2328 341.442 43.524C350.107 28.8153 419.363 64.1975 417.926 38.3861C417.124 23.9768 369.392 -2.66839 357.682 -5.2357C329.866 -11.3343 298.679 14.091 290.013 28.7997C281.348 43.5085 286.153 62.4017 300.746 70.9989Z" fill="var(--inter2-bg)"/>
</g>
<g id="Vector 6_2" filter="url(#filter7_f_4088_5520)">
<path d="M370.969 3.75337C384.445 -0.809357 406.881 1.93653 414.103 -10.3223C434.42 -44.8086 341.268 -41.44 302.491 -18.0071C269.491 1.93474 260.671 87.6192 292.36 109.585C312.456 123.515 287.563 61.4648 291.337 46.2669C294.834 32.1821 305.148 14.4496 318.547 8.87315C329.028 4.511 360.216 7.3939 370.969 3.75337Z" fill="var(--inter1-bg)"/>
</g>
<g id="Ellipse 9_2" filter="url(#filter8_f_4088_5520)">
<ellipse cx="367.762" cy="95.937" rx="59.0386" ry="69.0451" transform="rotate(30.5038 367.762 95.937)" fill="url(#paint1_linear_4088_5520)"/>
</g>
<g id="Ellipse 11_2" filter="url(#filter9_f_4088_5520)">
<ellipse cx="356.012" cy="64.6256" rx="21.0137" ry="20.0131" transform="rotate(30.5038 356.012 64.6256)" fill="var(--gray-100)"/>
</g>
</g>
</g>
</g>
</g>
<g id="Group">
<path id="Vector" d="M14.9943 58.4749C15.4364 54.7411 16.363 51.0214 18.1508 47.7794C18.7648 46.6238 19.3788 45.4682 19.9927 44.3126C21.0319 42.2787 21.9904 40.0729 23.6411 38.9193C23.9712 38.6886 24.3555 38.2333 24.5311 37.7577C25.1384 36.5029 25.9875 35.7642 26.8498 35.2239C27.5774 34.7361 28.2984 34.1493 28.9455 33.4895C30.1048 32.2226 31.3778 31.6236 32.6575 31.1237C34.6106 30.3607 36.6443 29.7697 38.5896 29.9255C39.0544 29.6422 39.5126 29.2597 39.8349 29.9477C40.2932 29.5653 40.7514 29.1828 41.1951 29.6199C43.1338 29.6765 45.0184 29.9578 46.8079 30.8867C47.5211 31.2186 48.3558 31.2995 48.7111 32.4834C49.5458 32.5643 50.0834 33.3718 50.5536 34.2056C51.1928 34.4646 51.4543 35.2781 51.7899 36.1645C52.5084 37.6135 53.3617 39.0099 53.8307 40.8616C54.7014 44.5914 54.9659 48.5579 54.2876 52.8928C53.7583 56.3554 52.6507 59.4336 51.2604 62.4186C50.1737 64.7763 48.8586 66.8162 47.5435 68.8562C47.0443 69.6617 46.5518 70.5663 46.7725 71.8028C47.5494 75.1622 46.838 79.0013 47.0021 82.4983C47.0352 82.9941 46.7922 83.496 46.536 83.7996C45.0188 85.9184 43.0934 86.0601 41.5877 84.2064C41.2444 84.2388 40.9617 84.1457 40.8547 83.5771C40.5047 83.5103 40.2828 83.2917 40.1824 82.8222C39.8324 82.7554 39.6713 82.4114 39.5101 82.0674C38.8643 81.7092 38.3466 81.1992 38.0784 80.2865C37.8764 80.3654 37.7284 80.2197 37.6478 80.0477C37.2239 79.9081 36.9888 79.4911 36.7471 78.9751C35.7988 78.2263 34.8902 78.0726 33.6581 78.2487C31.9545 78.6089 30.2575 79.0683 28.5209 78.9328C26.5083 78.8033 24.6646 78.0991 22.8011 77.0973C19.3634 75.2861 16.9304 71.9632 15.6304 66.9767C15.0279 64.1596 14.6948 61.2373 14.9943 58.4749ZM42.9834 82.3385C43.0441 82.213 43.1722 82.0612 43.2396 82.0349C43.1722 82.0612 43.0507 82.3122 42.9834 82.3385ZM19.3015 65.0338C20.3676 68.5855 22.2023 71.2264 24.7856 72.6592C27.5102 74.1385 30.2624 74.9965 33.3328 74.4076C33.9931 73.9461 34.6467 73.3856 35.1909 74.2922C35.5276 74.1607 35.9251 73.9036 36.2619 73.7721C37.589 72.9484 38.4766 73.8226 39.1212 75.1988C39.6732 75.1866 39.8542 75.8281 40.1632 76.3179C40.1765 76.5162 40.2571 76.6883 40.2703 76.8866C40.6335 77.1517 41.1115 77.0667 41.2991 77.8074C41.5685 77.7021 41.7838 77.8215 41.945 78.1655C42.3821 78.5035 42.8259 78.9406 43.0809 79.655C43.3635 79.7481 43.7201 79.914 43.6606 79.0215C43.5217 76.9391 43.4568 74.9295 43.2505 72.8734C43.0708 71.2139 43.1868 69.8459 44.2855 68.7045C44.6697 68.2492 44.9668 67.5226 45.351 67.0673C47.7582 63.7867 49.3518 59.7048 50.5148 55.3841C51.4956 51.4398 51.2377 47.5724 50.5017 43.79C49.9732 41.0458 48.5415 39.265 47.6287 36.9761C47.6287 36.9761 47.696 36.9498 47.6894 36.8507C47.6894 36.8507 47.6221 36.8769 47.6287 36.9761C47.2853 37.0085 47.0568 36.6908 46.9564 36.2213C46.5998 36.0553 46.2564 36.0877 46.0821 35.5454C45.3082 35.3389 44.7231 34.8553 44.1314 34.2724C43.9294 34.3514 43.7273 34.4303 43.5054 34.2118C42.7922 33.8799 41.8758 34.6448 41.325 33.639C41.0622 33.8434 40.7862 33.8495 40.497 33.6573C39.7574 32.9287 38.9834 32.7223 38.1079 33.0644C38.9834 32.7223 39.8247 32.9024 40.497 33.6573C39.3587 34.2037 38.2823 33.6067 37.1783 33.631C36.7134 33.9144 36.3093 34.0722 35.8854 33.9326C35.711 33.3902 35.5697 33.3437 35.3809 33.6209C35.3201 33.7464 35.2594 33.8719 35.2053 34.0965C33.2323 34.562 31.3796 35.7945 29.4331 36.6567C28.827 36.8935 28.3952 37.6726 27.8023 38.1077C24.2105 41.2405 21.7745 46.1603 19.7756 51.418C18.1411 55.9229 18.0544 60.8406 19.3015 65.0338Z" fill="var(--inter1-bg)"/>
<path id="Vector_2" d="M34.8877 31.6984C34.635 31.9945 34.4357 32.0715 34.2168 31.8583C34.2702 31.6392 34.3302 31.5168 34.3901 31.3944C34.5763 31.124 34.7222 31.2661 34.8877 31.6984Z" fill="var(--inter1-bg)"/>
<path id="Vector_3" d="M30.1713 42.5762C31.2447 41.95 32.4248 42.9281 33.0403 44.8473C33.2162 45.3957 33.3241 45.9707 33.5679 46.4924C34.6509 49.1545 34.6443 49.0542 35.9239 46.2898C36.2859 44.3992 37.4006 43.3454 38.2914 42.0706C38.4418 41.1887 39.0531 40.9493 39.4473 40.5892C40.0319 39.9487 40.5128 40.892 41.1308 40.7528C41.6129 40.6669 41.6596 41.3687 41.6317 41.9969C42.0046 42.3652 42.5746 42.5534 42.3017 43.689C42.4642 44.0369 42.4843 44.3377 42.3005 44.7182C42.3806 45.9214 41.7614 47.0898 41.563 48.2991C41.2622 50.0629 41.0427 52.0006 40.3756 53.4964C39.4635 55.4996 38.9789 57.6439 38.5623 59.7617C38.0911 62.1066 37.0164 63.762 35.8806 65.5442C35.4997 66.1049 35.0243 66.2911 34.6513 65.9228C33.9121 65.2864 32.9824 64.9304 32.5628 63.8603C31.4798 61.1982 30.3967 58.5362 29.5787 55.6675C28.4677 53.6336 28.0159 51.0329 27.7679 48.3525C27.4787 46.0997 28.6904 43.3619 30.1713 42.5762Z" fill="var(--inter1-bg)"/>
</g>
<path id="Vector 1" d="M102.067 149.413V74.3232C102.067 71.7411 103.488 69.3686 105.765 68.1507L168.39 34.6534C170.475 33.5386 172.981 33.5509 175.054 34.6863L236.138 68.1368C238.381 69.3652 239.776 71.7191 239.776 74.2765V149.46C239.776 151.994 238.406 154.331 236.194 155.569L175.109 189.747C173.007 190.923 170.448 190.936 168.334 189.781L105.71 155.555C103.464 154.328 102.067 151.972 102.067 149.413Z" fill="white"/>
<g id="Mask group_4">
<mask id="mask3_4088_5520" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="102" y="33" width="138" height="158">
<path id="Vector 2" d="M102.067 149.413V74.3232C102.067 71.7411 103.488 69.3686 105.765 68.1507L168.39 34.6534C170.475 33.5386 172.981 33.5509 175.054 34.6863L236.138 68.1368C238.381 69.3652 239.776 71.7191 239.776 74.2765V149.46C239.776 151.994 238.406 154.331 236.194 155.569L175.109 189.747C173.007 190.923 170.448 190.936 168.334 189.781L105.71 155.555C103.464 154.328 102.067 151.972 102.067 149.413Z" fill="white"/>
</mask>
<g mask="url(#mask3_4088_5520)">
<g id="Ellipse 2" filter="url(#filter10_f_4088_5520)">
<ellipse cx="198.463" cy="165.715" rx="57.5138" ry="58.3238" fill="var(--inter3)"/>
</g>
<g id="Ellipse 1" filter="url(#filter11_f_4088_5520)">
<ellipse cx="202.513" cy="200.548" rx="58.3238" ry="57.5138" fill="var(--inter3)"/>
</g>
<g id="Ellipse 4" filter="url(#filter12_f_4088_5520)">
<ellipse cx="110.977" cy="101.721" rx="31.5921" ry="57.5138" fill="var(--inter3-bg)"/>
</g>
<g id="Ellipse 3" filter="url(#filter13_f_4088_5520)">
<ellipse cx="181.83" cy="98.5413" rx="65.6478" ry="35.0038" transform="rotate(-14.2572 181.83 98.5413)" fill="var(--inter2-bg)"/>
</g>
<g id="Vector 1_2" filter="url(#filter14_f_4088_5520)">
<path d="M167.915 106.27C181.501 97.3018 264.567 75.3803 278.786 34.3621C293.006 -6.65609 355.35 122.771 316.096 145.164C277.166 167.372 154.328 115.239 167.915 106.27Z" fill="var(--inter2-bg)"/>
</g>
</g>
</g>
<g id="Group 2">
<path id="Vector 4" d="M110.167 144.934V79.66C110.167 77.0778 111.589 74.7054 113.866 73.4875L168.295 44.374C170.38 43.2591 172.886 43.2715 174.959 44.4068L228.037 73.4736C230.281 74.702 231.675 77.0558 231.675 79.6133V144.981C231.675 147.515 230.305 149.852 228.093 151.089L175.014 180.788C172.912 181.965 170.353 181.977 168.239 180.822L113.81 151.076C111.564 149.849 110.167 147.493 110.167 144.934Z" stroke="var(--color-font-body)" stroke-width="0.7"/>
<path id="Vector 5" d="M230.246 76.1806L170.921 104.771M170.921 104.771V181.249M170.921 104.771L111.597 76.8954" stroke="var(--color-font-body)" stroke-width="0.7"/>
</g>
<path id="Rectangle 2" d="M259.109 90.7654C261.542 89.4076 264.537 91.1667 264.537 93.9529V179.469C264.537 181.858 263.256 184.063 261.18 185.246L201.03 219.517C198.596 220.904 195.573 219.147 195.573 216.346V130.132C195.573 127.721 196.877 125.5 198.982 124.325L259.109 90.7654Z" fill="white" fill-opacity="0.1" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linejoin="round"/>
<path id="Rectangle 3" d="M337.684 46.2131C340.117 44.8553 343.113 46.6144 343.113 49.4006V134.916C343.112 137.305 341.831 139.511 339.755 140.694L279.605 174.965C277.172 176.351 274.148 174.594 274.148 171.794V85.5793C274.148 83.169 275.452 80.9474 277.557 79.7726L337.684 46.2131Z" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linejoin="round"/>
<path id="Line 8" d="M208.994 138.983L254.357 113.872" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linecap="round"/>
<path id="Line 16" d="M208.994 158.425L254.357 133.313" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linecap="round"/>
<path id="Line 49" d="M288.379 155.185L333.742 130.073" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linecap="round"/>
<path id="Line 17" d="M208.994 177.866L254.357 152.754" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linecap="round"/>
<path id="Line 18" d="M208.994 197.307L254.357 172.196" stroke="var(--color-font-body)" stroke-width="0.7" stroke-linecap="round"/>
<path id="Vector_4" d="M165.65 51.2316C165.199 44.9416 163.209 40.8708 159.895 38.45C159.034 37.8193 158.292 36.7528 157.332 36.2555C154.939 34.9367 154.85 34.9189 152.151 35.5295C152.222 37.2276 152.628 38.6098 153.025 40.1433C154.176 44.6591 153.597 50.1317 151.543 53.3202C150.694 54.6054 149.756 55.8729 148.709 56.7359C146.664 58.3952 145.427 57.9959 143.843 55.3074C142.824 53.6498 141.675 51.8901 141.752 49.3029C141.769 46.2445 142.311 43.4436 143.287 40.8825C144.313 38.2546 145.547 35.8979 147.068 33.9811C147.562 33.314 147.73 32.8115 147.106 31.9984C145.532 29.8477 143.811 28.5863 141.745 28.4808C141.567 28.4453 141.339 28.4766 141.122 28.3567C138.273 27.1003 135.912 28.7732 133.551 31.135C131.289 33.3635 129.393 36.2007 128.061 40.069C126.656 38.105 126.656 38.1049 127.405 35.5751C129.347 28.5369 132.765 25.1609 137.133 23.8114C139.664 23.0142 142.106 23.5773 144.391 25.1808C146.113 26.4422 147.953 27.9571 149.221 30.6591C149.577 31.4191 150.012 31.6588 150.566 31.4629C152.098 30.773 153.6 30.5365 155.183 31.1579C157.912 32.161 160.514 33.7509 162.76 36.648C164.552 38.9185 166.195 41.3891 166.94 45.2117C167.148 46.1718 167.504 46.2428 167.919 45.4068C168.284 44.6375 168.53 43.6149 168.856 42.7612C169.082 42.041 169.359 41.254 169.793 40.8047C170.228 40.3555 170.683 40.293 171.069 41.2885C171.733 42.8751 171.823 44.2709 171.3 46.0805C170.541 48.7615 169.822 51.527 169.063 54.208C168.186 57.3247 167.099 58.1033 165.308 56.5218C164.536 55.9088 163.765 55.2957 162.875 55.1184C162.608 55.0652 162.39 54.9453 162.182 54.6743C161.43 53.759 160.796 51.7189 161.161 50.9496C161.733 49.7624 162.515 50.2243 163.266 50.4506C164.018 50.6768 164.799 51.1387 165.65 51.2316ZM148.338 51.3039C148.911 50.8057 149.257 50.3387 149.523 49.7029C149.79 49.067 150.056 48.4312 150.273 47.8621C151.289 45.3854 151.285 40.5622 150.265 38.2156C149.71 37.0335 149.532 36.998 148.762 37.763C147.745 38.8616 146.965 40.4669 146.185 42.0722C145.139 44.3132 144.34 46.9098 144.373 49.9015C144.434 52.4397 145.354 53.5416 146.748 52.9007C147.489 52.5891 147.983 51.922 148.338 51.3039Z" fill="var(--inter2-bg)"/>
<path id="Vector_5" d="M74.6744 10.3163C75.7741 9.8646 76.6905 10.6174 77.332 11.9726C79.4397 16.6404 80.3561 21.4588 77.1487 26.2772C76.049 27.9335 74.3995 28.5358 72.8416 27.4818C70.9171 26.2772 69.9091 23.868 69.7259 20.7059C69.5426 17.0921 70.184 13.7796 71.8336 11.3704C72.6583 10.3163 73.6664 10.0152 74.6744 10.3163Z" fill="var(--inter2-bg)"/>
<path id="Vector_6" d="M4.97884 126.964C6.07853 126.512 6.99495 127.265 7.63643 128.62C9.74416 133.288 10.6606 138.106 7.45314 142.925C6.35346 144.581 4.70392 145.183 3.14604 144.129C1.22159 142.925 0.213581 140.516 0.0303003 137.354C-0.15298 133.74 0.488491 130.427 2.13802 128.018C2.96278 126.964 3.9708 126.663 4.97884 126.964Z" fill="var(--inter2-bg)"/>
<path id="Vector_7" d="M235.224 24.0874C236.324 23.6357 237.241 24.3886 237.882 25.7437C239.99 30.4115 240.906 35.2299 237.699 40.0483C236.599 41.7047 234.95 42.3069 233.392 41.2529C231.467 40.0483 230.459 37.6391 230.276 34.477C230.093 30.8633 230.734 27.5507 232.384 25.1415C233.208 24.0875 234.216 23.7863 235.224 24.0874Z" fill="var(--inter3-bg)"/>
<g id="Group 5">
<path id="Ellipse 13" d="M325.558 81.6448C330.314 84.668 332.95 90.0892 333.329 96.4594C333.708 102.829 331.825 110.119 327.572 116.809C323.319 123.499 317.516 128.298 311.588 130.658C305.659 133.018 299.632 132.93 294.876 129.907C290.121 126.884 287.484 121.463 287.105 115.093C286.726 108.724 288.609 101.433 292.862 94.7427C297.115 88.0529 302.917 83.2543 308.846 80.8947C314.775 78.5349 320.803 78.6218 325.558 81.6448Z" stroke="var(--color-font-body)" stroke-width="0.7"/>
<path id="Ellipse 14" d="M304.87 106.14C306.537 107.199 308.666 107.241 310.79 106.396C312.913 105.551 315.004 103.826 316.539 101.411C318.075 98.9961 318.749 96.3714 318.613 94.09C318.477 91.808 317.536 89.8978 315.87 88.8383C314.203 87.7789 312.074 87.7372 309.95 88.5825C307.827 89.4277 305.736 91.152 304.201 93.5671C302.665 95.9822 301.991 98.607 302.127 100.888C302.263 103.17 303.204 105.081 304.87 106.14Z" stroke="var(--color-font-body)" stroke-width="0.7"/>
<path id="Vector 7" d="M294.376 129.586C295.817 125.583 301.101 117.001 310.708 114.695C320.315 112.39 324.958 116.617 326.079 119.018" stroke="var(--color-font-body)" stroke-width="0.7"/>
</g>
</g>
<defs>
<filter id="filter0_d_4088_5520" x="204.693" y="27.188" width="178.138" height="178.138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4088_5520"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4088_5520" result="shape"/>
</filter>
<filter id="filter1_f_4088_5520" x="204.416" y="38.9206" width="152.247" height="99.1378" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter2_f_4088_5520" x="191.367" y="9.16901" width="164.313" height="167.522" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter3_f_4088_5520" x="224.698" y="74.3954" width="143.555" height="153.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter4_f_4088_5520" x="247.962" y="83.4308" width="73.5283" height="72.5569" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter5_d_4088_5520" x="275.979" y="-27.8955" width="178.138" height="178.138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4088_5520"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4088_5520" result="shape"/>
</filter>
<filter id="filter6_f_4088_5520" x="275.701" y="-16.1631" width="152.247" height="99.1378" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter7_f_4088_5520" x="262.653" y="-45.9147" width="164.313" height="167.522" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter8_f_4088_5520" x="295.984" y="19.3118" width="143.555" height="153.25" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter9_f_4088_5520" x="319.248" y="28.3472" width="73.5283" height="72.5569" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter10_f_4088_5520" x="121.249" y="87.6914" width="154.428" height="156.048" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="9.85" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter11_f_4088_5520" x="126.589" y="125.434" width="151.848" height="150.228" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="8.8" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter12_f_4088_5520" x="46.6853" y="11.5073" width="128.584" height="180.428" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="16.35" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter13_f_4088_5520" x="95.2155" y="38.5515" width="173.229" height="119.98" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="11.2" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<filter id="filter14_f_4088_5520" x="151.871" y="11.3861" width="192.01" height="154.237" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="7.5" result="effect1_foregroundBlur_4088_5520"/>
</filter>
<linearGradient id="paint0_linear_4088_5520" x1="296.476" y1="81.9756" x2="296.476" y2="220.066" gradientUnits="userSpaceOnUse">
<stop stop-color="var(--inter1-bg)"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
<linearGradient id="paint1_linear_4088_5520" x1="367.762" y1="26.8919" x2="367.762" y2="164.982" gradientUnits="userSpaceOnUse">
<stop stop-color="var(--inter1-bg)"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
</defs>
</svg>

         <h1 class="titulo-capr">Teste o perfil da sua escola</h1>
              <button id="btn-capr-start" type="button">Iniciar</button>
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
              <div class="nav-group" style="width: 100%;justify-content: space-between;" >
              <div class="nav-group">
                  <button id="btn-capr-previous" type="button">Anterior</button>
                  <button id="btn-capr-next" type="button">Próximo</button>
                  
              </div>
                <input id="btn-capr-submit" type="submit" value="Finalizar">
              </div>
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
              const letter =
                letters[oIndex] || String.fromCharCode(65 + oIndex);

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
            result >= 24
              ? profiles[0]
              : result >= 17
                ? profiles[1]
                : profiles[2];
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
          for (const value of Object.values(data)) {
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
              // alert("Por favor, responda as questões anteriores primeiro.");
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
        next.style.display = isLast ? "none" : "inline-block"; // Esconde completamente o botão "Próximo" na última questão

        // Botão Finalizar: Esconde se NÃO for a última OU se não respondeu
        submit.disabled = !isLast || !hasAnswered;
      };

      /**
       *
       * @param {number} counter
       */
      const showCurrentQuestionOnly = (counter) => {
        const form = document.getElementById("form-capr");
        if (!form) return;
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
        })
        .catch((err) => console.error("Erro ao carregar teste capricho:", err));
    },
  };

  // --- InfoAccordion.js ---
  function infoAccordionBehaviour() {
    const accordionItems = document.querySelectorAll(".info-accordion-item");

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

  // --- ComposicaoCaderno.js ---
  const ComposicaoCaderno = {
    async init() {
      const BASE_URL =
        "https://recursos-moodle.caeddigital.net/projetos/componentes/2026/composicao-caderno/generated/";

      function injetarCSS() {
        if (document.querySelector("[data-composicao-caderno-css]")) return;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = BASE_URL + "assets/css/styles.css";
        link.setAttribute("data-composicao-caderno-css", "");
        document.head.appendChild(link);
      }

      async function carregarTemplate() {
        try {
          const response = await fetch(
            "https://recursos-moodle.caeddigital.net/projetos/componentes/2026/composicao-caderno/generated/assets/template/index.html",
          );

          if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

          return await response.text();
        } catch (err) {
          console.error("Erro ao buscar o arquivo:", err);
        }
      }

      function preencherDados(root, dados) {
        root.querySelectorAll("[data-var]").forEach((el) => {
          const chave = el.getAttribute("data-var");
          if (dados[chave] !== undefined) el.textContent = dados[chave];
        });

        root.querySelectorAll("[data-var-list]").forEach((ul) => {
          const chave = ul.getAttribute("data-var-list");
          const itens = dados[chave];
          if (!Array.isArray(itens)) return;
          ul.innerHTML = "";
          itens.forEach((item) => {
            const li = document.createElement("li");
            const texto = typeof item === "object" ? item.texto : item;
            li.innerHTML = texto.replace(/\*([^*]+)\*/g, "<b>$1</b>");
            ul.appendChild(li);
          });
        });
      }

      async function montar(root, template) {
        const composicao = root.dataset.composicaoCaderno;
        const url = composicao
          ? `${BASE_URL}${composicao}.json`
          : `${BASE_URL}data.json`;

        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const dados = await res.json();

          root.classList.add("avaliacao-composicao");
          root.innerHTML = template;
          preencherDados(root, dados);
          console.log("composicao-caderno: OK →", composicao);
        } catch (err) {
          console.error("composicao-caderno: erro →", composicao, err);
        }
      }

      injetarCSS();
      const template = await carregarTemplate();

      if (!template) {
        console.error("composicao-caderno: template não carregado, abortando.");
        return;
      }

      const roots = document.querySelectorAll("[data-composicao-caderno]");
      for (const root of roots) await montar(root, template);
    },
  };

  // --- App.js ---

  const App = {
    init() {
      // Cria boundaries isolados para que o erro em um script não quebre o layout

      try {
        PodcastManager.init();
      } catch (e) {
        console.error("❌ [App] Erro no PodcastManager:", e);
      }

      try {
        AccordionManager.init();
      } catch (e) {
        console.error("❌ [App] Erro no AccordionManager:", e);
      }

      try {
        CarouselManager.init();
      } catch (e) {
        console.error("❌ [App] Erro no CarouselManager:", e);
      }

      try {
        DOMUtils.init();
      } catch (e) {
        console.error("❌ [App] Erro no DOMUtils:", e);
      }

      try {
        QuizManager.init(window);
      } catch (e) {
        console.error("❌ [App] Erro no QuizManager:", e);
      }

      try {
        TesteCapricho.init();
      } catch (e) {
        console.error("❌ [App] Erro no TesteCapricho:", e);
      }

      try {
        ComposicaoCaderno.init();
      } catch (e) {
        console.error("❌ [App] Erro no ComposicaoCaderno:", e);
      }

      // Scripts Externos (ex: Infopack)
      try {
        if (window.infopack && typeof window.infopack.init === "function") {
          window.infopack.init();
        }
      } catch (e) {
        console.error("❌ [App] Erro no Infopack Externo:", e);
      }
    },
  };

  // --- index.js ---

  document.addEventListener("DOMContentLoaded", function () {
    infoAccordionBehaviour();

    // Adicionar chamada de um script externo:
    const link =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    const fontAwesomeLink = document.createElement("link");
    fontAwesomeLink.rel = "stylesheet";
    fontAwesomeLink.href = link;
    document.head.appendChild(fontAwesomeLink);

    // Dá o pontapé inicial
    setTimeout(() => {
      App.init();
    }, 300);
  });
})();


// --- Dica de navegação ---
/**
 * Gera um identificador aleatório.
 * Necessário para tornar IDs internos de filtros e máscaras SVG únicos quando
 * múltiplas instâncias do componente coexistem na mesma página.
 * @returns {string}
 */
const dicaNavegacaoGenerateHash = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

/**
 * Cria o elemento SVG da elipse de fundo com animação de rotação.
 * @returns {HTMLDivElement}
 */
const dicaNavegacaoCreateEllipse = () => {
    const hash = dicaNavegacaoGenerateHash();
    const container = document.createElement('div');
    container.className = 'dica-navegacao-ellipse-wrap';
    container.innerHTML = `
        <svg class="dica-navegacao-ellipse" width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g class="dica-navegacao-mask-group">
                <mask id=${"mask0_" + hash} style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="35">
                    <path id="Icon" d="M34.7234 17.1064C34.7234 26.554 26.9503 34.2128 17.3617 34.2128C7.7731 34.2128 0 26.554 0 17.1064C0 7.65879 7.7731 0 17.3617 0C26.9503 0 34.7234 7.65879 34.7234 17.1064Z" />
                </mask>
                <g mask="url(#${"mask0_" + hash})">
                    <g id=${"Ellipse-2_" + hash} filter="url(#${"filter0_" + hash})">
                        <ellipse class="dica-navegacao-ellipse-primary" cx="4.12766" cy="21.383" rx="18.1277" ry="18.383"/>
                    </g>
                    <g id=${"Ellipse-3_" + hash} filter="url(#${"filter1_" + hash})">
                        <ellipse class="dica-navegacao-ellipse-secondary" cx="19.2746" cy="1.70498" rx="20.6914" ry="17.1372" transform="rotate(-14.2572 19.2746 1.70498)"/>
                    </g>
                </g>
            </g>
            <defs>
                <filter id=${"filter0_" + hash} x="-33.7" y="-16.7" width="75.6554" height="76.1656" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="9.85" result="effect1_foregroundBlur_1199_886"/>
                </filter>
                <filter id=${"filter1_" + hash} x="-23.6229" y="-38.0729" width="85.7951" height="79.5559" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="11.2" result="effect1_foregroundBlur_1199_886"/>
                </filter>
            </defs>
        </svg>
    `;
    return container;
};

/**
 * Cria o elemento SVG do ponteiro/cursor animado.
 * @returns {HTMLDivElement}
 */
const dicaNavegacaoCreatePointer = () => {
    const hash = dicaNavegacaoGenerateHash();
    const container = document.createElement('div');
    container.className = 'dica-navegacao-pointer';
    container.innerHTML = `
        <svg class="dica-navegacao-pointer-svg" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 34 33" fill="none">
            <g clip-path="url(#${"clip0_" + hash})">
                <path d="M18.75 0.388672H9.75C4.77944 0.388672 0.75 4.41811 0.75 9.38867V18.3887C0.75 23.3592 4.77944 27.3887 9.75 27.3887H22.25C21.25 24.3887 18.75 18.8887 19.25 18.3887C19.75 17.8887 27.75 20.8887 27.75 20.8887V9.38867C27.75 4.41811 23.7206 0.388672 18.75 0.388672Z" fill="white" fill-opacity="0.3"/>
                <path d="M27.8138 18.6223V9.43085C27.8138 4.63655 23.9273 0.75 19.133 0.75H9.43085C4.63655 0.75 0.75 4.63655 0.75 9.43085V18.6223C0.75 23.4166 4.63655 27.3032 9.43085 27.3032H19.133" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M27.186 25.9516L31.7514 24.407C32.6071 24.1175 32.6357 22.9434 31.7951 22.6143L20.4763 18.1831C19.6889 17.8748 18.9012 18.6266 19.1965 19.4046L23.5082 30.7652C23.8233 31.5954 25.0226 31.5973 25.3403 30.768L27.186 25.9516Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="white" fill-opacity="0.8"/>
            </g>
            <defs>
                <clipPath id=${"clip0_" + hash}>
                    <rect width="34" height="33" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    `;
    return container;
};

/**
 * Cria o elemento de texto da mensagem.
 * Usa innerText (não innerHTML) para evitar XSS em valores vindos do atributo HTML.
 * @param {string|null} message - Texto exibido ao passar o mouse; usa string vazia como fallback.
 * @returns {HTMLDivElement}
 */
const dicaNavegacaoCreateMessage = (message) => {
    const container = document.createElement('div');
    container.className = 'dica-navegacao-message';
    const p = document.createElement('p');
    p.innerText = message || '';
    container.appendChild(p);
    return container;
};

/**
 * Inicializa todos os elementos `.dica-navegacao` presentes no DOM,
 * injetando a animação SVG e a mensagem definida em `data-dica-navegacao-message`.
 * Pode ser chamada manualmente após inserção dinâmica de novos elementos.
 */
const dicaNavegacaoInit = () => {
    document.querySelectorAll('.dica-navegacao').forEach(container => {
        const animationContainer = document.createElement('div');
        animationContainer.className = 'dica-navegacao-animation';

        animationContainer.appendChild(dicaNavegacaoCreateEllipse());
        animationContainer.appendChild(dicaNavegacaoCreatePointer());
        container.appendChild(animationContainer);

        container.appendChild(
            dicaNavegacaoCreateMessage(container.getAttribute('data-dica-navegacao-message'))
        );
    });
};

document.addEventListener('DOMContentLoaded', dicaNavegacaoInit);
