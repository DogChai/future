<template>
  <div id="app">
    <div class="side-right">
      <ul class="side-right-ul">
        <div class="side-choose" :style="{top: chooseTop}"></div>
        <li class="sideLi" data-index='0' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/index' data-where="5">
          萌萌哒
          
        </li>
        <li class="sideLi" data-index='1' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/show' data-where="60">
          新世界
          <!-- <div class="side-choose"></div> -->
        </li>
        <li class="sideLi" data-index='2' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/music' data-where="115">
          用心听
          <!-- <div class="side-choose"></div> -->
        </li>
        <li class="sideLi" data-index='3' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/see' data-where="170">
          用眼看
          <!-- <div class="side-choose"></div> -->
        </li>
        <li class="sideLi" data-index='4' @mouseover='moveChoose' @mouseout='leaveLi' @click='clickLi' data-path='/eat' data-where="225">
          用嘴吃
          <!-- <div class="side-choose"></div> -->
        </li>
      </ul>
    </div>
    <transition name='slide-fade'>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      chooseTop: '5px',
      ifClick: false,
      clickTop: '5px',
    }
  },
  methods: {
    moveChoose: function(e) {
      this.chooseTop = e.currentTarget.dataset.where + 'px';
    },
    leaveLi: function(e) {
      if(this.ifClick) {
        this.chooseTop = this.clickTop;
      }else {
        this.chooseTop = e.currentTarget.dataset.where + 'px';
      }
    },
    clickLi: function(e) {
      this.clickTop = e.currentTarget.dataset.where + 'px';
      this.ifClick = true;
      if(e.currentTarget.dataset.path !== this.$route.path) {
        this.$router.push({path: e.currentTarget.dataset.path})
      }
      let liDom = document.getElementsByClassName('sideLi');
      for(var i=0; i<liDom.length; i++) {
        liDom[i].style.color = 'rgba(255,255,255,0.3)'
      }
      liDom[e.currentTarget.dataset.index].style.color = 'rgba(0,0,0,0.9)'
    }
  },
  mounted: function() {

  }
}
</script>

<style>
@import "./assets/style/animate.css";
</style>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

}

.side-right {
  width: 70px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(60,60,60,0);
  z-index: 99;
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
  left: -40px;
  background-color: rgba(255,255,255,0.6);
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
  line-height: 45px;
  float: left;
  list-style: none;
  text-align: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.2);
  transition: all .5s linear;
  font-size: 18px;
  margin: 0px auto;
  box-sizing: border-box;
  padding: 4px 4px;
}

.side-right-ul li:hover {
  color: rgba(0,0,0,0.9);
  /* background-color: rgba(23,23,23,0.6); */
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
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>
