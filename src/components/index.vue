<template>
  <div class="index">
    <!-- <img src="../assets/images/index.jpg" alt="" class="page-img"> -->
    <div class="page-blur"></div>
    <div class="index-wrap">
      <h1 class="animated" :class='{bounceIn: animateName1}'>仰望 · 星空</h1>
      <!-- <h1 class="animated" :class='{fadeInLeft: animateName2}'>我是 树影下的月光</h1> -->
      <!-- <h1 class="animated" :class='{fadeInRight: animateName3}'>下面将会向大家展示一些令人激动的内容</h1> -->
    </div>
    <div @click="toshow" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
  </div>
</template>

<script>
// import $ from "jquery";

export default {
  name: "moon",
  data() {
    return {
      animateName1: false,
      animateName2: false,
      animateName3: false,
      downName: false,
      downOpacity: 0
    };
  },
  methods: {
    toshow: function() {
      this.sideColor(1);
      this.$router.push({ path: "/show" });
      this.$store.state.clickWhere = "62px";
    },
    sideColor: function(num) {
      let liDom = document.getElementsByClassName("sideLi");
      for (var i = 0; i < liDom.length; i++) {
        liDom[i].style.color = "rgba(255,255,255,0.3)";
        liDom[i].children[0].style.opacity = "";
        liDom[i].children[0].style.left = "";
      }
      liDom[num].style.color = "rgba(0,0,0,0.9)";
      liDom[num].children[0].style.opacity = "1";
      liDom[num].children[0].style.left = "-18px";
    }
  },
  mounted: function() {
    var that = this;
    var animateTimer = null;
    var animateNum = 0;
    animateTimer = setInterval(function() {
      if (animateNum <= 2) {
        if (animateNum == 0) {
          that.animateName1 = true;
        }

        if (animateNum == 1) {
          that.animateName2 = true;
        }

        if (animateNum == 2) {
          that.animateName3 = true;
        }
        animateNum++;
      } else {
        clearInterval(animateTimer);
        that.downName = true;
        that.downOpacity = 1;
      }
    }, 600);

    function canvasAnimate() {
      let max_particles = 100;
      let particles = [];
      let frequency = 100;
      let init_num = max_particles;
      let max_time = frequency * max_particles;
      let time_to_recreate = false;

      // Enable repopolate
      setTimeout(
        function() {
          time_to_recreate = true;
        }.bind(this),
        max_time
      );

      // Popolate particles
      popolate(max_particles);

      var tela = document.createElement("canvas");
      tela.id = "indexcanvas";
      tela.width = $(window).width();
      tela.height = $(window).height();
      $("#app").append(tela);

      var canvas = tela.getContext("2d");

      class Particle {
        constructor(canvas, options) {
          let colors = ["#feea00", "#a9df85", "#5dc0ad", "#ff9a00", "#fa3f20"];
          let types = ["full", "fill", "empty"];
          this.random = Math.random();
          this.canvas = canvas;
          this.progress = 0;

          this.x =
            $(window).width() / 2 + (Math.random() * 200 - Math.random() * 200);
          this.y =
            $(window).height() / 2 +
            (Math.random() * 200 - Math.random() * 200);
          this.w = $(window).width();
          this.h = $(window).height();
          this.radius = 1 + 8 * this.random;
          this.type = types[this.randomIntFromInterval(0, types.length - 1)];
          this.color = colors[this.randomIntFromInterval(0, colors.length - 1)];
          this.a = 0;
          this.s = (this.radius + Math.random() * 1) / 10;
          //this.s = 12 //Math.random() * 1;
        }

        getCoordinates() {
          return {
            x: this.x,
            y: this.y
          };
        }

        randomIntFromInterval(min, max) {
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        render() {
          // Create arc
          let lineWidth = 0.2 + 2.8 * this.random;
          let color = this.color;
          switch (this.type) {
            case "full":
              this.createArcFill(this.radius, color);
              this.createArcEmpty(
                this.radius + lineWidth,
                lineWidth / 2,
                color
              );
              break;
            case "fill":
              this.createArcFill(this.radius, color);
              break;
            case "empty":
              this.createArcEmpty(this.radius, lineWidth, color);
              break;
          }
        }

        createArcFill(radius, color) {
          this.canvas.beginPath();
          this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI);
          this.canvas.fillStyle = color;
          this.canvas.fill();
          this.canvas.closePath();
        }

        createArcEmpty(radius, lineWidth, color) {
          this.canvas.beginPath();
          this.canvas.arc(this.x, this.y, radius, 0, 2 * Math.PI);
          this.canvas.lineWidth = lineWidth;
          this.canvas.strokeStyle = color;
          this.canvas.stroke();
          this.canvas.closePath();
        }

        move() {
          this.x += Math.cos(this.a) * this.s;
          this.y += Math.sin(this.a) * this.s;
          this.a += Math.random() * 0.4 - 0.2;

          if (this.x < 0 || this.x > this.w - this.radius) {
            return false;
          }

          if (this.y < 0 || this.y > this.h - this.radius) {
            return false;
          }
          this.render();
          return true;
        }

        calculateDistance(v1, v2) {
          let x = Math.abs(v1.x - v2.x);
          let y = Math.abs(v1.y - v2.y);
          return Math.sqrt(x * x + y * y);
        }
      }

      /*
         * Function to clear layer canvas
         * @num:number number of particles
         */
      function popolate(num) {
        for (var i = 0; i < num; i++) {
          setTimeout(
            (function(x) {
              return function() {
                // Add particle
                particles.push(new Particle(canvas));
              };
            })(i),
            frequency * i
          );
        }
        return particles.length;
      }

      function clear() {
        // canvas.globalAlpha=0.04;
        canvas.fillStyle = "#111111";
        canvas.fillRect(0, 0, tela.width, tela.height);
        // canvas.globalAlpha=1;
      }

      function connection() {
        let old_element = null;
        $.each(particles, function(i, element) {
          if (i > 0) {
            let box1 = old_element.getCoordinates();
            let box2 = element.getCoordinates();
            canvas.beginPath();
            canvas.moveTo(box1.x, box1.y);
            canvas.lineTo(box2.x, box2.y);
            canvas.lineWidth = 0.45;
            canvas.strokeStyle = "#3f47ff";
            canvas.stroke();
            canvas.closePath();
          }

          old_element = element;
        });
      }

      /*
         * Function to update particles in canvas
         */
      function update() {
        clear();
        connection();
        particles = particles.filter(function(p) {
          return p.move();
        });
        // Recreate particles
        if (time_to_recreate) {
          if (particles.length < init_num) {
            popolate(1);
          }
        }
        requestAnimationFrame(update.bind(this));
      }
      update();
      // window.onresize = function() {
      //   $('canvas')[0].getContext('2d').fillStyle = '#111111';
      //   $('canvas')[0].getContext('2d').fillRect(0, 0, $('canvas')[0].width, $('canvas')[0].height);
      //   $('canvas')[0].width = $(window).width();
      //   $('canvas')[0].height = $(window).height();
      // }
    }
    if (document.getElementById("indexcanvas")) {
      document
        .getElementById("app")
        .removeChild(document.getElementById("indexcanvas"));
      // canvasAnimate();
    } else {
      // canvasAnimate();
    }
    window.onresize = function() {
      // $('canvas')[0].getContext('2d').fillStyle = '#fff';
      $("canvas")[0]
        .getContext("2d")
        .clearRect(0, 0, $("canvas")[0].width, $("canvas")[0].height);
      // $('canvas')[0].getContext('2d').fillRect(0, 0, $('canvas')[0].width, $('canvas')[0].height);
      $("canvas")[0].width = $(window).width();
      $("canvas")[0].height = $(window).height();
    };
  },
  destroyed: function() {
    if (document.getElementById("indexcanvas")) {
      document
        .getElementById("app")
        .removeChild(document.getElementById("indexcanvas"));
    }
  },
  activated: function() {
    var that = this;
    var animateTimer = null;
    var animateNum = 0;
    animateTimer = setInterval(function() {
      if (animateNum <= 2) {
        if (animateNum == 0) {
          that.animateName1 = true;
        }

        if (animateNum == 1) {
          that.animateName2 = true;
        }

        if (animateNum == 2) {
          that.animateName3 = true;
        }
        animateNum++;
      } else {
        clearInterval(animateTimer);
        that.downName = true;
        that.downOpacity = 1;
      }
    }, 600);

    // if (document.getElementById('indexcanvas')) {
    //   document.getElementById('app').removeChild(document.getElementById('indexcanvas'));
    //   canvasAnimate();
    // } else {

    //   canvasAnimate();
    // }
  },
  deactivated: function() {
    // if (document.getElementById('indexcanvas')) {
    //   document.getElementById('app').removeChild(document.getElementById('indexcanvas'));
    // }
  }
};
</script>

<style scoped>
.index {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* background-color: rgba(0, 0, 0, 0.1); */
  box-sizing: border-box;
}

canvas {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
}

/* .page-img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    filter: blur(5px);
  } */

.page-blur {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background-color: rgba(255, 255, 255, 0.1);
}

.index-wrap {
  width: 800px;
  height: 120px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -400px;
  margin-top: -120px;
  z-index: 101;
}

.animated {
  width: auto;
  height: 120px;
  line-height: 80px;
  color: white;
  font-size: 68px;
  opacity: 0;
  margin: 0 auto;
  cursor: pointer;
}

.down {
  width: 36px;
  height: 32px;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -18px;
  cursor: pointer;
  z-index: 200;
}

.down img {
  width: 80%;
  height: 80%;
}
</style>