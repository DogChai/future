<template>
  <div id="app">
    <canvas id="fireworks" ></canvas>
    <div id="bg-image"></div>
    <audio id="audio" :volume='volumeRate' :currentTime='musicRate' src="http://ohx9cuj3d.bkt.clouddn.com/%E5%AE%89%E7%94%B0%E3%83%AC%E3%82%A4%20-%20Brand%20New%20Day.mp3"></audio>
    <div class="side-right">
      <ul class="side-right-ul">
        <div class="side-choose" :style="{top: this.$store.state.clickWhere}"></div>
        <li class="sideLi" style="color: rgba(0, 0, 0, 0.9);" data-index='0' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi'
          data-path='/index' data-where="7">
          主页
          <i class="fa fa-moon sideIcon"></i>
        </li>
        <li class="sideLi" data-index='1' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/show' data-where="62">
          案例
          <i class="fa fa-sun sideIcon"></i>
        </li>
        <li class="sideLi" data-index='2' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/music' data-where="117">
          音乐
          <i class="fa fa-headphones sideIcon"></i>
        </li>
        <li class="sideLi" data-index='3' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/see' data-where="172">
          歌词
          <i class="fa fa-bullseye sideIcon"></i>
        </li>
        <li class="sideLi" data-index='4' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/eat' data-where="227">
          菜谱
          <i class="fa fa-utensils sideIcon"></i>
        </li>
      </ul>
    </div>
    <transition :name='transitionName'>
      <keep-alive>
        <router-view id="main-page"></router-view>
      </keep-alive>
    </transition>
    <div class="hover-music" v-on:mousedown.stop='moveMusic' :style="{top: hoverTop, left: hoverLeft}">
      <div class="hm-top">
        <span class="fa fa-music"></span>
        <span class="hm-list" @click='openList'>
          <!-- {{musicData[0].name}} -->
          <ul data-bol='false'>
            <li v-for='(item,index) in musicData'>{{item.name}}</li>
          </ul>
        </span>
        <span class="hm-num">
          <i class="fa fa-angle-double-right"></i> 3</span>
      </div>
      <div class="hm-wrap">
        <div class="hm-name" title="正在播放">
          <i class="fa fa-play hm-name-icon"></i>
          <span class="hm-name-text">{{$store.state.gMusicValue.name}}</span>
        </div>
        <div class="hm-time">
          <div class="hm-musicLeft" v-on:mousedown.stop='stopMove'>
            <span class="hm-long" id="hm-mcontrol">
              <span class="hm-circle" id="hm-mbar" v-on:mousedown.stop='changeRate' :style='{left: musicRateBar + "px"}'></span>
              <span class="hm-comp" id="hm-mcomp" :style='{width: musicRateComp + "px"}'></span>
            </span>
          </div>
          <span class="hm-havetime">00:00/<span>{{$store.state.gMusicValue.time}}</span> </span>
        </div>
        <div class="hm-control">
          <div class="hm-icon">
            <span title="上一曲">
              <i class="fa fa-step-backward"></i>
            </span>
            <span @click='playMusic' title="播放/暂停">
              <i class="fa fa-play-circle"></i>
            </span>
            <span title="下一曲">
              <i class="fa fa-step-forward"></i>
            </span>
            <span title="切换顺序">
              <i class="fa fa-random"></i>
            </span>
          </div>
          <div class="hm-volume" v-on:mousedown.stop='stopMove'>
            <span class="hm-vlong" id="hm-vcontrol">
              <span class="hm-circle" id="hm-vbar" v-on:mousedown.stop='changeVolume' :style='{left: volumeRateComp + "px"}'></span>
              <span class="hm-comp" id="hm-vcomp" :style='{width: volumeRateComp + "px"}'></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { flower } from "./assets/script/flower.js";
import axios from "axios";
import { mapGetters, mapState } from "vuex";

//控制
import control from "./components/control";

export default {
  name: "App",
  components: {
    control
  },
  data() {
    return {
      transitionName: "",
      pageNum: 0,
      pageArr: ["/index", "/show", "/music", "/see", "/eat"],
      ifClick: true,
      clickTop: "7px",
      saveNum: "",
      hoverTop: "0px",
      hoverLeft: "0px",
      musicData: [], //音乐数组
      playBol: false, //是否正在播放
      musicRate: 0, //音乐进度
      musicRateBar: 0, //音乐拖动点显示
      musicRateComp: 0, //音乐进度条显示
      volumeRate: 0, //音乐音量
      volumeRateBar: 80, //音乐音量拖动点显示
      volumeRateComp: 80 //音乐音量进度显示
    };
  },
  methods: {
    //阻止拖动，优化体验
    stopMove: function() {
      //yes
    },
    //显示分类
    openList: function(e) {
      var myUl = e.target.children[0];
      var ulBol = myUl.getAttribute("data-bol");
      if (ulBol == "true") {
        myUl.style.display = "none";
        myUl.style.opacity = 0;
        myUl.setAttribute("data-bol", "false");
      } else {
        myUl.style.display = "block";
        myUl.style.opacity = 1;
        myUl.setAttribute("data-bol", "true");
      }
    },
    //播放音乐
    playMusic: function(e) {
      var target = document.getElementsByClassName("hm-icon")[0].children[1];
      //正在播放 则暂停，切换按钮
      if (this.playBol) {
        this.playBol = false;
        target.children[0].className = "fa fa-play-circle";
        document.getElementById("audio").pause();
      } else {
        //没有播放 则播放，切换按钮
        this.playBol = true;
        target.children[0].className = "fa fa-pause-circle";
        document.getElementById("audio").play();
      }
    },
    //拖动音乐框
    moveMusic: function(e) {
      var that = this;
      var target = document.getElementsByClassName("hover-music")[0];
      var x = e.clientX - target.offsetLeft;
      var y = e.clientY - target.offsetTop;
      var drag = target;
      document.onmousemove = function(e) {
        if (drag) {
          var myapp = document.getElementById("app");
          var left = e.clientX - x;
          var top = e.clientY - y;
          if (left <= 0) {
            left = 0;
          } else if (left >= myapp.offsetWidth - drag.offsetWidth) {
            left = myapp.offsetWidth - drag.offsetWidth;
          }
          if (top <= 0) {
            top = 0;
          } else if (top >= myapp.offsetHeight - drag.offsetHeight) {
            top = myapp.offsetHeight - drag.offsetHeight;
          }
          that.hoverLeft = left + "px";
          that.hoverTop = top + "px";
        }
      };
      document.onmouseup = function() {
        document.onmousemove = null;

        document.onmousedown = null;
      };
    },
    moveChoose: function(e) {
      this.saveNum = this.$store.state.clickWhere;
      // this.chooseTop = e.currentTarget.dataset.where + 'px';
      this.$store.state.clickWhere = e.currentTarget.dataset.where + "px";
    },
    //调整歌曲进度
    changeRate: function(e) {
      var that = this;
      var audio = document.getElementById("audio");
      var hmControl = document.getElementById("hm-mcontrol");
      var hmBar = document.getElementById("hm-mbar");
      var hmComp = document.getElementById("hm-mcomp");
      var barLeft = 0;
      var leftVal = e.clientX - hmBar.offsetLeft;
      console.log(audio.duration);
      document.onmousemove = function(e) {
        barLeft = e.clientX - leftVal;
        var compWidth;
        if (barLeft <= -5) {
          barLeft = -5;
        }

        if (barLeft >= 140) {
          barLeft = 140;
        }
        compWidth = barLeft;
        if (compWidth <= 0) {
          compWidth = 0;
        }
        that.musicRateBar = barLeft;
        that.musicRateComp = compWidth;
        that.musicRate = (compWidth / 140).toFixed(2);
        console.log(that.musicRate);
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmousedown = null;
      };
    },
    //调整音量
    changeVolume: function(e) {
      var that = this;
      var audio = document.getElementById("audio");
      var hmControl = document.getElementById("hm-vcontrol");
      var hmBar = document.getElementById("hm-vbar");
      var hmComp = document.getElementById("hm-vcomp");
      var barLeft = 0;
      var leftVal = e.clientX - hmBar.offsetLeft;
      console.log();
      document.onmousemove = function(e) {
        barLeft = e.clientX - leftVal;
        var compWidth;
        if (barLeft <= -5) {
          barLeft = -5;
        }

        if (barLeft >= 80) {
          barLeft = 80;
        }
        compWidth = barLeft;
        if (compWidth <= 0) {
          compWidth = 0;
        }
        that.volumeRateBar = barLeft;
        that.volumeRateComp = compWidth;
        that.volumeRate = (compWidth / 80).toFixed(2);
        console.log(that.volumeRate);
        document.getElementById("audio").volume = that.volumeRate;
      };
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmousedown = null;
      };
    },
    //上一曲
    prevMusic: function() {},
    //下一曲
    nextMusic: function() {},
    //切换播放顺序
    changeTurn: function() {},

    leaveLi: function(e) {
      if (this.ifClick) {
        // this.clickTop = this.$store.state.sideWhere;
        // this.chooseTop = this.clickTop;
        this.$store.state.clickWhere = this.saveNum;
      } else {
        this.chooseTop = e.currentTarget.dataset.where + "px";
        this.$store.state.sideWhere = this.chooseTop;
      }
    },
    changeStore(val) {
      // var val = parseInt(val);
      this.$store.commit('changeIndex',parseInt(this.pageNum));
      this.$store.commit('changeClickWhere',val);
    },
    clickLi: function(e) {
      this.saveNum = e.currentTarget.dataset.where + "px";
      // this.$store.state.clickWhere = this.saveNum;
      this.pageNum = e.currentTarget.dataset.index;
      // this.$store.state.index = e.currentTarget.dataset.index;
      // console.log(e.currentTarget.dataset.index);
      this.changeStore(this.saveNum);
      this.autoPath();
      this.ifClick = true;
      if (e.currentTarget.dataset.path !== this.$route.path) {
        this.$router.push({ path: e.currentTarget.dataset.path });
      }
      let liDom = document.getElementsByClassName("sideLi");
      for (var i = 0; i < liDom.length; i++) {
        liDom[i].style.color = "rgba(255,255,255,0.9)";
        liDom[i].children[0].style.opacity = "";
        liDom[i].children[0].style.left = "";
      }
      liDom[e.currentTarget.dataset.index].style.color = "rgba(0,0,0,0.9)";
      liDom[e.currentTarget.dataset.index].children[0].style.opacity = "1";
      liDom[e.currentTarget.dataset.index].children[0].style.left = "-18px";

      localStorage.setItem("localData", [
        e.currentTarget.dataset.where,
        e.currentTarget.dataset.index
      ]);
    },
    autoPath: function() {
      var that = this;
      if (that.$store.state.index == 0) {
        that.pageArr = ["/index", "/show", "/music", "/see", "/eat"];
        that.$router.push({ path: that.pageArr[0] });
        that.pageNum = 0;
      } else if (that.$store.state.index == 1) {
        that.pageArr = ["/show", "/music", "/see", "/eat", "/index"];
        that.$router.push({ path: that.pageArr[0] });
        that.pageNum = 1;
      } else if (that.$store.state.index == 2) {
        that.pageArr = ["/music", "/see", "/eat", "/index", "/show"];
        that.$router.push({ path: that.pageArr[0] });
        that.pageNum = 2;
      } else if (that.$store.state.index == 3) {
        that.pageArr = ["/see", "/eat", "/index", "/show", "/music"];
        that.$router.push({ path: that.pageArr[0] });
        that.pageNum = 3;
      } else if (that.$store.state.index == 4) {
        that.pageArr = ["/eat", "/index", "/show", "/music", "/see"];
        that.$router.push({ path: that.pageArr[0] });
        that.pageNum = 4;
      }
    },
    throttle(fn, gapTime) {
      if (gapTime == null || gapTime == undefined) {
        gapTime = 1500;
      }

      let _lastTime = null;

      // 返回新的函数
      return function() {
        let _nowTime = +new Date();
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn.apply(this, arguments); //将this和参数传给原函数
          _lastTime = _nowTime;
        }
      };
    },
    mouseing() {
      var that = this;
      var whereArr = [7, 62, 117, 172, 227];
      window.onmousewheel = this.throttle(function(e) {
        // console.log(e);
        if(that.pageNum == 4) {
          that.pageNum = 4;
          that.pageArr = that.pageArr = ["/eat", "/index", "/show", "/music", "/see"];
          return false;
        }  


        if (e.deltaY > 0) {
          that.pageNum++;
          if (that.pageNum >= 5) {
            that.pageNum = 0;
          }

          // console.log(that.pageNum);
          //获得数组第一个元素并删除
          var first = that.pageArr.shift();

          //把第一位添加到最后一位
          that.pageArr.push(first);
          // that.$router.push({ path: that.pageArr[0] });
        } else if (e.deltaY < 0) {
          if (that.pageNum != 0) {
            that.pageNum--;
            var end = that.pageArr.pop();
            that.pageArr.unshift(end);
            // that.$router.push({ path: that.pageArr[0] });
          }
        }

        console.log(that.pageNum,that.pageArr)
        that.autoClick(that, whereArr[that.pageNum], that.pageNum);
      }, 500);
    },
    autoClick(t, val1, index) {
      t.$router.push({ path: t.pageArr[0] });
      val1 = parseInt(val1);
      
      t.saveNum = val1 + "px";
      // console.log(index);
      // t.$store.state.clickWhere = t.saveNum;
      t.changeStore(t.saveNum);
      
      let liDom = document.getElementsByClassName("sideLi");
      for (var i = 0; i < liDom.length; i++) {
        liDom[i].style.color = "rgba(255,255,255,0.9)";
        liDom[i].children[0].style.opacity = "";
        liDom[i].children[0].style.left = "";
      }
      liDom[index].style.color = "rgba(0,0,0,0.9)";
      liDom[index].children[0].style.opacity = "1";
      liDom[index].children[0].style.left = "-18px";

      localStorage.setItem("localData", [val1, index]);
    }

  },
  computed: {
    ...mapState([])
  },
  mounted: function() {
    // console.log(axios);
    var that = this;
    axios.get("../static/json/music.json").then(
      response => {
        // console.log(response);
        that.musicData = response.data;
        that.$store.state.musicData = response.data;
      },
      response => {
        console.log(response);
      }
    );

    document.getElementById("audio").addEventListener("timeupdate", function() {
      console.log(this.currentTime);
    });
    

    // window.addEventListener('mousewheel', throttle(function(e) {
    //   console.log(e);
    //   if(e.deltaY > 0) {
    //     that.pageNum++;
    //     if (that.pageNum >= 5) {
    //       that.pageNum = 0;
    //     }

    //     // console.log(that.pageNum);
    //     //获得数组第一个元素并删除
    //     var first = that.pageArr.shift();

    //     //把第一位添加到最后一位
    //     that.pageArr.push(first);
    //     that.$router.push({path: that.pageArr[0]})
    //   }
    //   else if(e.deltaY < 0) {
    //     if (that.pageNum != 0) {
    //       that.pageNum--;
    //       var end = that.pageArr.pop();
    //       that.pageArr.unshift(end);
    //       that.$router.push({path: that.pageArr[0]});

    //     }
    //   }

    //   autoClick(that,whereArr[that.pageNum],that.pageNum)
    // },500))


    that.mouseing();
    that.pageNum = that.$store.state.index;
    that.autoClick(that, that.$store.state.clickWhere, that.$store.state.index);
    that.autoPath();

    function mouseCanvas() {
      //canvas鼠标点击烟花特效

      document.getElementById("fireworks").width = window.innerWidth;
      document.getElementById("fireworks").height = window.innerHeight;

      let endpos = (x, y) => {
        let angle = random(0, 360) * Math.PI / 180,
          value = random(22, 150),
          radius = [-1, 1][random(0, 1)] * value;

        return {
          x: x + radius * Math.cos(angle),
          y: y + radius * Math.sin(angle)
        };
      };

      let random = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

      class Circle {
        constructor(x, y) {
          this.r = random(9, 13);
          this.opos = {};
          this.x = this.opos.x = x;
          this.y = this.opos.y = y;

          this.colors = [
            "#FF1461",
            "#18FF92",
            "#5A87FF",
            "#FBF38C",
            "#f25da0",
            "#fb9627",
            "#d23be7",
            "#a3e048",
            "#4355db",
            "#ffb6bb",
            "#95d5ee",
            "#ffe691"
          ];
          this.color = this.colors[random(0, this.colors.length)];
          this.tpos = endpos(x, y);
        }

        creatCircle(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fillStyle = this.color;
          ctx.fill();
        }

        //根据不同距离段设置前行的步伐，分为3个阶段，离出发点近的那一段为速度最快，中间为速度一般，最远为速度最慢
        //区分目标点小于出发点的情况
        //ratio为两点之间的距离的行走比例，比例数值越大，行走越慢
        moveFun(start, end, current) {
          let s = random(26, 35),
            m = random(20, 25),
            f = random(15, 20),
            ff = start.x + ~~((end.x - start.x) / 3),
            mm = ff + ~~((end.x - start.x) / 3),
            ratio =
              end.x >= start.x
                ? Math.max(current, ff) == current
                  ? Math.max(current, mm) == current ? s : m
                  : f
                : Math.max(current, ff) == current
                  ? f
                  : Math.max(current, mm) == current ? m : s,
            mp = {
              x: end.x - start.x,
              y: end.y - start.y
            };

          return {
            x: Math.abs(mp.x / ratio),
            y: Math.abs(mp.y / ratio)
          };
        }

        //根据计算出来的移动值去移动
        //如果目标坐标大于原始坐标则向右移动，最大不能超过目标坐标，反之向左移动最小不能小于目标坐标
        move() {
          var movepos = this.moveFun(this.opos, this.tpos, this.x);

          this.x =
            this.opos.x > this.tpos.x
              ? Math.max(this.x - movepos.x, this.tpos.x)
              : Math.min(this.x + movepos.x, this.tpos.x);
          this.y =
            this.opos.y > this.tpos.y
              ? Math.max(this.y - movepos.y, this.tpos.y)
              : Math.min(this.y + movepos.y, this.tpos.y);
          this.r = Math.max(
            Math.abs((this.r - Math.random() / 1.2).toFixed(2)),
            0
          );
        }
      }

      class BigCircle {
        constructor(x, y) {
          this.bR = random(16, 32);
          this.overR = random(60, 100);
          this.x = x;
          this.y = y;
          this.op = 1;
        }

        creatBigCircle(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.bR, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.strokeStyle = "rgba(128, 128, 128, " + this.op + ")";
          ctx.stroke();
        }

        changeR() {
          this.bR = Math.min((this.bR += random(1, 4)), this.overR);
          this.op = Math.max((this.op - Math.random() / 12).toFixed(2), 0);
        }

        //检查是否运行完毕，以大圆为标准清空屏幕
        complete() {
          return this.bR >= this.overR && this.op <= 0;
        }
      }

      window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;

      window.clearRequestTimeout =
        window.cancelAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame;

      let c = document.getElementById("fireworks"),
        w = (c.width = c.offsetWidth),
        h = (c.height = c.offsetHeight),
        ctx = c.getContext("2d"),
        nums = 28,
        circles = [],
        bCircle = null,
        animationId = false;

      let int = function(x, y) {
        circles = [];

        if (animationId) clearRequestTimeout(animationId);

        for (let i = nums; i-- > 0; ) {
          circles.push(new Circle(x, y));
        }

        bCircle = new BigCircle(x, y);
        creat();
      };

      let creat = function() {
        ctx.clearRect(0, 0, w, h);

        circles.forEach(function(v) {
          v.move();
          v.creatCircle(ctx);
        });

        bCircle.changeR();
        bCircle.creatBigCircle(ctx);

        animationId = requestAnimationFrame(creat);

        if (bCircle.complete()) {
          //以大圆为标准，清空屏幕停止动画
          ctx.clearRect(0, 0, w, h);
          clearRequestTimeout(animationId);
        }
      };

      document.body.onclick = function(e) {
        // console.log(e);
        e = e || window.event;
        int(e.clientX, e.clientY);
      };
    }
    mouseCanvas();
    
  },
  watch: {
    $route(to, from) {
      // console.log(to,from)
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-top";
      } else {
        this.transitionName = "slide-bottom";
      }
    },
    // pageArr() {
    //   console.log(this.pageArr)
    //   if(this.pageArr[0] == '/eat') {
    //     window.onmousewheel = null;
    //     console.log(window.onmousewheel)
    //   }else {
    //     if(window.onmousewheel == null) {
    //       this.mouseing();
    //     }
    //   }
    // }
  }
};
</script>

<style>
@import "./assets//style/reset.css";
@import "./assets/style/animate.css";
@import "./assets/style/fontawesome-all.css";
@import "./assets/style/load.css";
@import "./assets/style/hoverlogo.css";
</style>

<style>
@font-face {
  font-family: "seemdream";
  src: url("http://p6bweflo3.bkt.clouddn.com/%E6%96%B9%E6%AD%A3%E5%AE%8B%E5%88%BB%E6%9C%AC%E7%A7%80%E6%A5%B7%E7%AE%80%E4%BD%93.TTF");
}

.bounceIn {
  animation-duration: 1.5s !important;
}

#app {
  font-family: "seemdream";
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  /* background: url('./assets/images/music_big.jpg'); */
  /* background-size: cover; */
  /* background-color: rgba(12,22,32,0.2); */
}

#bg-image {
  /* background: url("./assets/images/qi_mini.jpg"); */
  background: url('http://p46wrelzu.bkt.clouddn.com/qi_mini.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -10;
}

#fireworks {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -9;
}

#main-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0;
  height: auto;
}

.hover-music {
  background-color: rgba(25, 25, 25, 0.3);
  width: 260px;
  height: 160px;
  position: fixed;
  bottom: 100px;
  left: 50px;
  cursor: move;
  z-index: 999;
  color: white;
}

.hm-top {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: left;
  box-sizing: border-box;
  padding-left: 10px;
  /* border-bottom: 2px solid rgba(25, 25, 25, 0.1); */
  background-color: rgba(25, 25, 25, 0.15);
  /* cursor: pointer; */
  position: relative;
}

.hm-top > span {
  margin-left: 2px;
}

.hm-list {
  position: absolute;
  /* width: 105px; */
  height: 100%;
  line-height: 36px;
  left: 32px;
  right: 100px;
  top: 0;
  box-sizing: border-box;
  padding-left: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hm-list:hover {
  background-color: rgba(25, 25, 25, 0.15);
}

/* .hm-list:hover ul {
    display: 'block';
    opacity: 1;
  } */

.hm-list ul {
  position: absolute;
  bottom: 36px;
  list-style: none;
  left: 0;
  right: 0;
  box-sizing: border-box;
  /* padding-left: 16px; */
  background-color: rgba(25, 25, 25, 0.15);
  /* z-index: -999; */
  display: "none";
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 16px;
  /* text-align: center; */
}

.hm-list ul li {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 16px;
  transition: all 0.3s ease;
}

.hm-list ul li:nth-of-type(odd) {
  background-color: rgba(25, 25, 25, 0.1);
}

.hm-list ul li:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hm-num {
  position: absolute;
  width: 50px;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 10px;
  line-height: 36px;
  text-align: right;
  cursor: pointer;
}

.hm-wrap {
  width: 100%;
  height: 124px;
  box-sizing: border-box;
}

.hm-name {
  width: 100%;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.hm-name-icon {
  position: absolute;
  left: 14px;
  top: 11px;
}

.hm-name-text {
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 0;
  right: 0;
  text-align: left;
  box-sizing: border-box;
  padding-left: 10px;
}

.hm-musicLeft {
  width: 170px;
  height: 100%;
}

.hm-time {
  width: 100%;
  height: 43px;
  line-height: 43px;
  box-sizing: border-box;
  position: relative;
  /* border-bottom: 2px solid rgba(25, 25, 25, 0.1); */
  background-color: rgba(25, 25, 25, 0.15);
}

.hm-time .hm-havetime {
  position: absolute;
  height: 30px;
  width: 88px;
  right: 1px;
  top: 9px;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
}

.hm-time .hm-long {
  position: absolute;
  width: 150px;
  height: 3px;
  left: 13px;
  top: 22px;
  background-color: rgba(25, 25, 25, 0.3);
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 1px;
}

.hm-time .hm-long .hm-circle {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  /* left: -5px; */
  left: 44px;
  top: -5px;
  cursor: pointer;
}

.hm-time .hm-comp {
  position: absolute;
  width: 50px;
  left: 0;
  top: 0;
  background-color: white;
  height: 3px;
}

.hm-control {
  width: 100%;
  height: 43px;
  line-height: 43px;
  box-sizing: border-box;
  cursor: pointer;
}

.hm-control .hm-icon {
  width: 155px;
  height: 100%;
  float: left;
  display: inline-block;
}

.hm-control .hm-icon span {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  font-size: 22px;
  margin: 7px 1px 0 1px;
  transition: all 0.3s;
}

.hm-control .hm-icon span:hover {
  /* color: rgb(240, 240, 240); */
  color: orange;
}

.hm-control .hm-volume {
  width: 105px;
  height: 100%;
  float: left;
  display: inline-block;
  cursor: pointer;
}

.hm-control .hm-volume .hm-vlong {
  width: 90px;
  height: 2px;
  display: block;
  background-color: rgba(25, 25, 25, 0.3);
  margin-top: 20px;
  margin-left: 8px;
  position: relative;
  cursor: pointer;
}

.hm-volume .hm-vlong .hm-circle {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  /* left: -4px; */
  left: 25px;
  top: -4px;
  cursor: pointer;
}

.hm-volume .hm-vlong .hm-comp {
  position: absolute;
  width: 80px;
  left: 0;
  top: 0;
  background-color: white;
  height: 2px;
}

.page-img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* z-index: 99; */
  filter: blur(0.1px);
}

.control {
  position: absolute;
  left: 0;
  right: 0;
  height: 60px;
  top: 0;
  width: 100%;
}

.side-right {
  width: 70px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(60, 60, 60, 0);
  z-index: 200;
}

.side-right-ul {
  width: 100%;
  height: 275px;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -150px;
  padding: 0;
  margin-bottom: 0;
}

.side-choose {
  position: absolute;
  /* width: 40px; */
  right: 0;
  /* top: 8px; */
  height: 40px;
  /* bottom: 8px; */
  left: -30px;
  background-color: rgba(255, 255, 255, 0.35);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  /* opacity: 0; */
  transform: translateX(0px);
  transition: all 0.2s ease;
}

.side-right-ul li {
  position: relative;
  width: 100%;
  height: 20%;
  line-height: 48px;
  float: left;
  list-style: none;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  transition: all 0.5s linear;
  font-size: 18px;
  margin: 0px auto;
  box-sizing: border-box;
  padding: 4px 4px;
}

.sideIcon {
  position: absolute;
  left: -50px;
  /* left: -18px; */
  top: 18px;
  height: 18px;
  width: 18px;
  transition: left 0.3s ease;
  opacity: 0;
  /* opacity: 1; */
}

.side-right-ul li:hover i {
  left: -18px;
  opacity: 1;
}

.sideLi img {
  position: absolute;
  left: -70px;
  /* left: -70px; */
  top: 15px;
  height: 20px;
  widows: 20px;
  opacity: 0;
  transition: all 0.3s ease;
}

.side-right-ul li:hover img {
  left: -25px;
  opacity: 1;
}

.side-right-ul li:hover {
  /* color: rgba(0,0,0,0.9); */
}

.side-right-ul li:hover .side-choose {
  opacity: 1;
  transform: translateX(0px);
}

/* 可以设置不同的进入和离开动画 */

/* 设置持续时间和动画函数 */

.slide-fade-enter-active {
  transition: all 1s ease;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  /* transform: translate3d(100%,50%,50%); */
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active,
.slide-top-enter-active,
.slide-top-leave-active {
  will-change: transform;
  transition: all 0.4s ease-in;
  position: absolute;
}
.slide-bottom-enter {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
.slide-bottom-leave-active {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-top-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}
.slide-top-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}

/* 动画 */
@keyframes bot_to_mid {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  to {
    transform: translateZ(0);
  }
}

@keyframes mid_to_top {
  0% {
    transform: translateZ(0);
  }
  to {
    transform: translate3d(0, -100%, 0);
  }
}
</style>