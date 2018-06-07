<template>
  <div class="index">
    <img src="../assets/images/index.jpg" alt="" class="page-img">
    <div class="page-blur"></div>
    <div class="index-wrap">
      <h1 class="animated" :class='{fadeInRight: animateName1}'>Hi,大家好</h1>
      <h1 class="animated" :class='{fadeInLeft: animateName2}'>我是 树影下的月光</h1>
      <h1 class="animated" :class='{fadeInRight: animateName3}'>下面将会向大家展示一些令人激动的内容</h1>
    </div>
    <div @click="toshow" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
  </div>
</template>

<script>
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
      toshow: function () {
        this.sideColor(1)
        this.$router.push({ path: "/show" });
        this.$store.state.clickWhere = '62px';
      },
      sideColor: function (num) {
        let liDom = document.getElementsByClassName('sideLi');
        for (var i = 0; i < liDom.length; i++) {
          liDom[i].style.color = 'rgba(255,255,255,0.3)'
          liDom[i].children[0].style.opacity = '';
          liDom[i].children[0].style.left = '';
        }
        liDom[num].style.color = 'rgba(0,0,0,0.9)';
        liDom[num].children[0].style.opacity = '1';
        liDom[num].children[0].style.left = '-18px';
      }
    },
    mounted: function () {
      var that = this;
      var animateTimer = null;
      var animateNum = 0;
      animateTimer = setInterval(function () {
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
      }, 1200);
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
    /* background-color: rgb(32, 98, 240); */
    box-sizing: border-box;

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
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -400px;
    margin-top: -200px;
    z-index: 101;
  }

  .animated {
    width: auto;
    height: 80px;
    line-height: 80px;
    color: white;
    font-size: 48px;
    opacity: 0;
    margin: 0 auto;
    cursor: pointer;
  }

  .down {
    width: 36px;
    height: 32px;
    position: absolute;
    bottom: 30px;
    left: 50%;
    margin-left: -25px;
    cursor: pointer;
    z-index: 200;
  }

  .down img {
    width: 80%;
    height: 80%;
  }
</style>