// ----PRELOADER & RESET ANIMATIONS ON CLICK

const menuLinks = document.querySelectorAll(".link-page, .link-home");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("active");
    setTimeout(() => {
      preloader.classList.add("inactive");

      setTimeout(() => {
        preloader.classList.remove("active");
        preloader.classList.remove("inactive");

        $(function () {
          $(".link-home, .link-page").click(function () {
            $(".typewriter, .introText, .introText2 ").css({
              animation: "null",
            });
            setTimeout(function () {
              $(".typewriter, .introText, .introText2").css({ animation: "" });
            }, 1900);
          });
        });
      }, 500);
    }, 2000);
  });
});

// ------BANER EFFECT----

const rotators = document.querySelectorAll(".rotator");
let index = 0;
setInterval(() => {
  rotators.forEach((rotator) => {
    rotator.style.transform = `translate3d(${-index}%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
  });
  index = (index + 0.1) % 100;
}, 8);

// -----TYPEWRITER PAUSE TIMES----

function addTypewriterPause() {
  const typewriter = document.querySelector(".typewriter");
  if (typewriter) {
    setTimeout(() => {
      typewriter.classList.add("paused");
      setTimeout(() => {
        typewriter.classList.remove("paused");
        setTimeout(() => {
          typewriter.classList.add("paused");
          setTimeout(() => {
            typewriter.classList.remove("paused");
          }, 400);
        }, 700);
      }, 400);
    }, 800);
  } else {
    setTimeout(addTypewriterPause, 100);
  }
}
addTypewriterPause();

// ----LISENERS FOR THE TABS & ADDING THE TYPING EFFECT CLASS---

var linkHome = 0;
var linkPage = "";

function pageOn() {
  $("#section-home").addClass("inactive-page-home");
  $(".typewriter").removeClass("typewriter");
  linkHome = 1;
}

function pageOff() {
  $("#section-home").removeClass("inactive-page-home");
  $(".active-page").removeClass("active-page");
  $(".text-zone .main-title").addClass("typewriter");
  linkHome = 0;
}

$(".link-page").on("click", function (event) {
  event.preventDefault();

  $(".page-home").addClass("inactive-page-home");
  linkPage = $(this).attr("href");
  $(".active-page").removeClass("active-page");
  $(linkPage).addClass("active-page");
  pageOn();
});

$(".link-home").on("click", function (event) {
  event.preventDefault();

  if (linkHome === 0) {
    // pageOn();
  } else if (linkHome === 1) {
    $("#section-home").removeClass("inactive-page-home");
  }
  pageOff();

  setTimeout(function () {
    addTypewriterPause(); //---RUN THE PAUSE FUNCTION 1.6s AFTER THE HOME-PAGE IS DISPLAYED
  }, 1600);
});

// ---- 3D SPHERE TEXT----

const Texts = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "BOOTSTRAP",
  "NODE.JS",
  "EXPRESS",
  "JQUERY",
  "REACT",
  "PHOTOSHOP",
  "FIGMA",
];

function radiusValue() {
  if (window.innerWidth <= 768) {
    return 160;
  } else {
    return 360;
  }
}

var tagCloud;

function createTagCloud() {
  if (tagCloud) {
    tagCloud.destroy();
  }
  tagCloud = TagCloud(".Sphere", Texts, {
    radius: radiusValue(),
    maxSpeed: "fast",
    initSpeed: "fast",
    direction: 135,
    keep: true,
  });
}
createTagCloud();
function updateTagCloudRadius() {
  createTagCloud();
}
window.addEventListener("resize", updateTagCloudRadius);

// ---OPACITY EFFECT ON LOAD---

window.addEventListener("load", function () {
  $(".text-zone .main-title").addClass("typewriter");
  var style = document.createElement("style");
  style.innerHTML = "* { opacity: 1; }"; // set opacity to 100% for all elements
  document.head.appendChild(style);
});

// ----MOUSE TENDRILS TRAIL EFFECT-----

function Loco(remove) {
  if (!remove) {
    var ctx,
      hue,
      target = {},
      tendrils = [],
      settings = {};

    settings.debug = false;
    settings.friction = 0.5;
    settings.trails = 40;
    settings.size = 70;
    settings.dampening = 0.25;
    settings.tension = 0.98;

    Math.TWO_PI = Math.PI * 2;

    // ========================================================================================
    // Oscillator
    // ----------------------------------------------------------------------------------------

    function Oscillator(options) {
      this.init(options || {});
    }

    Oscillator.prototype = (function () {
      var value = 0;

      return {
        init: function (options) {
          this.phase = options.phase || 0;
          this.offset = options.offset || 0;
          this.frequency = options.frequency || 0.001;
          this.amplitude = options.amplitude || 1;
        },

        update: function () {
          this.phase += this.frequency;
          value = this.offset + Math.sin(this.phase) * this.amplitude;
          return value;
        },

        value: function () {
          return value;
        },
      };
    })();

    // ========================================================================================
    // Tendril
    // ----------------------------------------------------------------------------------------

    function Tendril(options) {
      this.init(options || {});
    }

    Tendril.prototype = (function () {
      class Node {
        constructor() {
          this.x = 0;
          this.y = 0;
          this.vy = 0;
          this.vx = 0;
        }
      }

      return {
        init: function (options) {
          this.spring = options.spring + Math.random() * 0.1 - 0.05;
          this.friction = settings.friction + Math.random() * 0.01 - 0.005;
          this.nodes = [];

          for (var i = 0, node; i < settings.size; i++) {
            node = new Node();
            node.x = target.x;
            node.y = target.y;

            this.nodes.push(node);
          }
        },

        update: function () {
          var spring = this.spring,
            node = this.nodes[0];

          node.vx += (target.x - node.x) * spring;
          node.vy += (target.y - node.y) * spring;

          for (var prev, i = 0, n = this.nodes.length; i < n; i++) {
            node = this.nodes[i];

            if (i > 0) {
              prev = this.nodes[i - 1];

              node.vx += (prev.x - node.x) * spring;
              node.vy += (prev.y - node.y) * spring;
              node.vx += prev.vx * settings.dampening;
              node.vy += prev.vy * settings.dampening;
            }

            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;

            spring *= settings.tension;
          }
        },

        draw: function () {
          var x = this.nodes[0].x,
            y = this.nodes[0].y,
            a,
            b;

          ctx.beginPath();
          ctx.moveTo(x, y);

          for (var i = 1, n = this.nodes.length - 2; i < n; i++) {
            a = this.nodes[i];
            b = this.nodes[i + 1];
            x = (a.x + b.x) * 0.5;
            y = (a.y + b.y) * 0.5;

            ctx.quadraticCurveTo(a.x, a.y, x, y);
          }

          a = this.nodes[i];
          b = this.nodes[i + 1];

          ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
          ctx.stroke();
          ctx.closePath();
        },
      };
    })();

    // ----------------------------------------------------------------------------------------

    function init(event) {
      document.removeEventListener("mousemove", init);
      document.removeEventListener("touchstart", init);

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("touchmove", mousemove);
      document.addEventListener("touchstart", touchstart);

      mousemove(event);
      reset();
      loop();
    }

    function reset() {
      tendrils = [];

      for (var i = 0; i < settings.trails; i++) {
        tendrils.push(
          new Tendril({
            spring: 0.45 + 0.025 * (i / settings.trails),
          })
        );
      }
    }

    function randomIntFromInterval(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var color = randomIntFromInterval(1, 2);

    function loop() {
      if (!ctx.running) return;

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = "hsla(346,98%,56%,0.25)";
      ctx.lineWidth = 1;

      if (color == 1) {
        ctx.strokeStyle = "hsla(346,98%,56%,0.25)";
      } else {
        ctx.strokeStyle = "hsla(171,98%,56%,0.25)";
      }

      for (var i = 0, tendril; i < settings.trails; i++) {
        tendril = tendrils[i];
        tendril.update();
        tendril.draw();
      }

      ctx.frame++;
      requestAnimFrame(loop);
    }

    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function start() {
      if (!ctx.running) {
        ctx.running = true;
        loop();
      }
    }

    function stop() {
      ctx.running = false;
    }

    function mousemove(event) {
      if (event.touches) {
        target.x = event.touches[0].pageX;
        target.y = event.touches[0].pageY;
      } else {
        target.x = event.clientX + 50;
        target.y = event.clientY;
      }
      event.preventDefault();
    }

    function touchstart(event) {
      if (event.touches.length == 1) {
        target.x = event.touches[0].pageX;
        target.y = event.touches[0].pageY;
      }
    }

    function save() {
      if (!buffer) {
        buffer = document.createElement("canvas");
        buffer.width = screen.availWidth;
        buffer.height = screen.availHeight;
        buffer.ctx = buffer.getContext("2d");
      }

      buffer.ctx.drawImage(
        canvas,
        Math.round(buffer.width / 2 - canvas.width / 2),
        Math.round(buffer.height / 2 - canvas.height / 2)
      );
    }

    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (fn) {
          window.setTimeout(fn, 1000 / 60);
        }
      );
    })();

    ctx = document.getElementById("canvas").getContext("2d");

    ctx.running = true;
    ctx.frame = 1;

    hue = new Oscillator({
      phase: Math.random() * Math.TWO_PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener("mousemove", init);
    document.addEventListener("touchstart", init);
    document.body.addEventListener("orientationchange", resize);
    window.addEventListener("resize", resize);
    window.addEventListener("focus", start);
    window.addEventListener("blur", stop);

    resize();
  } else {
    document.body.removeEventListener("orientationchange", resize);
    window.removeEventListener("resize", resize);
    window.removeEventListener("focus", start);
    window.removeEventListener("blur", stop);

    document.removeEventListener("mousemove", mousemove);
    document.removeEventListener("touchmove", mousemove);
    document.removeEventListener("touchstart", touchstart);
  }
}
Loco();
