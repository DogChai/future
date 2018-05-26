<template>
    <div id="show">
        <div @click="toindex" class="up animated infinite" :class="{fadeInUp: upName}" :style="{opacity: upOpacity}"><img src="../assets/images/down3.png" alt=""></div>
        <div @click="tomusic" class="down animated infinite" :class="{fadeInDown: downName}" :style="{opacity: downOpacity}"><img src="../assets/images/down3.png" alt=""></div>
    </div>
</template>

<script>
export default {
  name: "show",
  data() {
    return {
        downName: false,
        downOpacity: 0,
        upName: false,
        upOpacity: 0
    };
  },
  methods: {
      tomusic: function() {
          this.$router.push({path: '/music'})
      },
      toindex: function() {
          this.$router.push({path: '/index'})
      }
  },
  mounted: function() {
    this.downName = true;
    this.downOpacity = 1;
    this.upName = true;
    this.upOpacity = 1;
  }
};
</script>

<style scoped>
#show {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgb(23, 23, 23);
}

.down {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -25px;
  cursor: pointer;
}

.up {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 50%;
  margin-left: -25px;
  cursor: pointer;
}

.down img {
  width: 100%;
  height: 100%;
}

.up img {
  width: 100%;
  height: 100%;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
</style>
