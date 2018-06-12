<template>
  <div id="app">
    <audio id="audio" src="http://ohx9cuj3d.bkt.clouddn.com/%E5%AE%89%E7%94%B0%E3%83%AC%E3%82%A4%20-%20Brand%20New%20Day.mp3"></audio>
    <div class="side-right">
      <ul class="side-right-ul">
        <div class="side-choose" :style="{top: this.$store.state.clickWhere}"></div>
        <li class="sideLi" style="color: rgba(0, 0, 0, 0.9);" data-index='0' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi'
          data-path='/index' data-where="7">
          柴柴柴
          <i class="fa fa-moon sideIcon"></i>
        </li>
        <li class="sideLi" data-index='1' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/show' data-where="62">
          秀秀秀
          <i class="fa fa-sun sideIcon"></i>
        </li>
        <li class="sideLi" data-index='2' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/music' data-where="117">
          听听听
          <i class="fa fa-headphones sideIcon"></i>
        </li>
        <li class="sideLi" data-index='3' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/see' data-where="172">
          看看看
          <i class="fa fa-bullseye sideIcon"></i>
        </li>
        <li class="sideLi" data-index='4' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/eat' data-where="227">
          吃吃吃
          <i class="fa fa-utensils sideIcon"></i>
        </li>
      </ul>
    </div>
    <transition name='slide-fade'>
      <keep-alive>
        <router-view id="main-page"></router-view>
      </keep-alive>
    </transition>
    <div class="hover-music" v-on:mousedown.stop='moveMusic' :style="{top: hoverTop, left: hoverLeft}">
      <div class="hm-top">
        <span class="fa fa-music"></span>
        <span class="hm-list" @click='openList'>
          纯音乐
          <ul data-bol='false'>
            <li v-for='(item,index) in musicData'>{{item.name}}</li>
          </ul>
        </span>
        <span class="hm-num">
          <i class="fa fa-angle-double-right"></i> 999</span>
      </div>
      <div class="hm-wrap">
        <div class="hm-name" title="正在播放">
          <i class="fa fa-play hm-name-icon"></i>
          <span class="hm-name-text">コネクト - xxxx</span>
        </div>
        <div class="hm-time">
          <span class="hm-long">
            <span class="hm-circle"></span>
            <span class="hm-comp"></span>
          </span>
          <span class="hm-havetime">00:00/04:29</span>
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
          <div class="hm-volume">
            <span class="hm-vlong">
              <span class="hm-circle"></span>
              <span class="hm-comp"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters, mapState } from 'vuex';

  //控制
  import control from './components/control'

  export default {
    name: 'App',
    components: {
      control
    },
    data() {
      return {
        // chooseTop: '5px',
        ifClick: true,
        clickTop: '7px',
        saveNum: '',
        hoverTop: '0px',
        hoverLeft: '0px',
        musicData: [],      //音乐数组
        playBol: false,     //是否正在播放
      }
    },
    methods: {
      //显示分类
      openList: function(e) {
        var myUl = e.target.children[0];
        var ulBol = myUl.getAttribute('data-bol');
        if(ulBol == 'true') {
          myUl.style.display = 'none';
          myUl.style.opacity = 0;
          myUl.setAttribute('data-bol','false');
        }else {
          myUl.style.display = 'block';
          myUl.style.opacity = 1;
          myUl.setAttribute('data-bol','true');
        }
        
      },
      //播放音乐
      playMusic: function (e) {
        var target = document.getElementsByClassName('hm-icon')[0].children[1];
        //正在播放 则暂停，切换按钮
        if (this.playBol) {
          this.playBol = false;
          target.children[0].className = 'fa fa-play-circle';
          document.getElementById('audio').pause();
        }
        //没有播放 则播放，切换按钮 
        else {
          this.playBol = true;
          target.children[0].className = 'fa fa-pause-circle';
          document.getElementById('audio').play();
        }

      },
      //拖动音乐框
      moveMusic: function (e) {
        var that = this;
        var target = document.getElementsByClassName('hover-music')[0];
        var x = e.clientX - target.offsetLeft;
        var y = e.clientY - target.offsetTop;
        var drag = target;
        document.onmousemove = function (e) {
          if (drag) {
            var myapp = document.getElementById('app');
            var left = e.clientX - x;
            var top = e.clientY - y;
            if (left <= 0) {
              left = 0;
            }
            else if (left >= myapp.offsetWidth - drag.offsetWidth) {
              left = myapp.offsetWidth - drag.offsetWidth;
            }
            if (top <= 0) {
              top = 0;
            } else if (top >= myapp.offsetHeight - drag.offsetHeight) {
              top = myapp.offsetHeight - drag.offsetHeight
            }
            that.hoverLeft = left + 'px';
            that.hoverTop = top + 'px';
          }
        }
        document.onmouseup = function () {
          document.onmousemove = null;
          document.onmousedown = null;
        }
      },
      moveChoose: function (e) {
        this.saveNum = this.$store.state.clickWhere;
        // this.chooseTop = e.currentTarget.dataset.where + 'px';

        this.$store.state.clickWhere = e.currentTarget.dataset.where + 'px';
      },
      leaveLi: function (e) {
        if (this.ifClick) {
          // this.clickTop = this.$store.state.sideWhere;
          // this.chooseTop = this.clickTop;
          this.$store.state.clickWhere = this.saveNum;
        } else {
          this.chooseTop = e.currentTarget.dataset.where + 'px';
          this.$store.state.sideWhere = this.chooseTop;
        }
      },
      clickLi: function (e) {
        this.saveNum = e.currentTarget.dataset.where + 'px';
        this.ifClick = true;
        if (e.currentTarget.dataset.path !== this.$route.path) {
          this.$router.push({ path: e.currentTarget.dataset.path })
        }
        let liDom = document.getElementsByClassName('sideLi');
        for (var i = 0; i < liDom.length; i++) {
          liDom[i].style.color = 'rgba(255,255,255,0.3)'
          liDom[i].children[0].style.opacity = '';
          liDom[i].children[0].style.left = '';
        }
        liDom[e.currentTarget.dataset.index].style.color = 'rgba(0,0,0,0.9)'
        liDom[e.currentTarget.dataset.index].children[0].style.opacity = '1'
        liDom[e.currentTarget.dataset.index].children[0].style.left = '-18px'
      }
    },
    computed: {
      ...mapState([

      ])
    },
    mounted: function () {
      // console.log(axios);
      var that = this;
      axios.get('../static/json/music.json').then((response) => {
        console.log(response)
        that.musicData =  response.data;
      }, (response) => {
        console.log(response)
      })
    }
  }
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
    font-family: "dogchai";
    src: url('http://p6bweflo3.bkt.clouddn.com/future.ttf');
  }

  .bounceIn {
    animation-duration: 1.5s !important;
  }

  #app {
    font-family: 'dogchai';
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

  .hm-top>span {
    margin-left: 2px;
  }

  .hm-list {
    position: absolute;
    width: 105px;
    height: 100%;
    line-height: 36px;
    left: 32px;
    top: 0;
    box-sizing: border-box;
    padding-left: 19px;
    cursor: pointer;
    transition: all .3s ease;
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
    /* padding-left: 19px; */
    background-color: rgba(25, 25, 25, 0.15);
    /* z-index: -999; */
    display: 'none';
    opacity: 0;
    transition: all .3s ease;
  }

  .hm-list ul li {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 19px;
    transition: all .3s ease;
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
    left: 15px;
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
    transition: all .3s;
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
    width: 30px;
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
    background-color: rgba(255, 255, 255, 0.6);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    /* opacity: 0; */
    transform: translateX(0px);
    transition: all .2s ease;
  }

  .side-right-ul li {
    position: relative;
    width: 100%;
    height: 20%;
    line-height: 44px;
    float: left;
    list-style: none;
    text-align: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.3);
    transition: all .5s linear;
    font-size: 18px;
    margin: 0px auto;
    box-sizing: border-box;
    padding: 4px 4px;
  }

  .sideIcon {
    position: absolute;
    left: -50px;
    top: 18px;
    height: 18px;
    width: 18px;
    transition: left .3s ease;
    opacity: 0;
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
    transition: all .3s ease;
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
    transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    /* transform: translate3d(100%,50%,50%); */
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>