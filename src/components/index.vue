<template>
  <div class="index">
    <div class="index-wrap">
      <h1 class="animated" :class='{lightSpeedIn: animateName1}'>Hello everybody</h1>
      <h1 class="animated" :class='{fadeInLeft: animateName2}'>Welcome to my home</h1>
      <h1 class="animated" :class='{lightSpeedIn: animateName3}'>I will show something interesting</h1>
    </div>
    <div @click="toshow" class="down animated infinite" :class="{fadeInDown: downName}" :style="{opacity: downOpacity}"><img src="../assets/images/down3.png" alt=""></div>
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
    toshow: function() {
      this.$router.push({ path: "/show" });
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
    }, 1200);
  }
};
</script>

<style scoped>
@font-face {
  font-family: "dogchai";
  src: url('../assets/font/type.ttf');
}

.index {
  font-family: 'dogchai';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgb(32, 98, 240);
  box-sizing: border-box;
  padding-top: 260px;
}

.index-wrap {
  width: 800px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -400px;
  margin-top: -200px;
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
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -25px;
  cursor: pointer;
}

.down img {
  width: 100%;
  height: 100%;
}
</style>
