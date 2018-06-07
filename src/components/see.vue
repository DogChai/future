<template>
  <div id="music" class="music">
    <img src="../assets/images/lrc.jpg" alt="" class="page-img">
    <div @click="tomusic" class="up animated infinite" :class="{bounceIn: upName}" :style="{opacity: upOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
    <div @click="toeat" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "music",
    data() {
      return {
        downName: false,
        downOpacity: 0,
        upName: false,
        upOpacity: 0
      };
    },
    methods: {
      tomusic: function () {
        this.sideColor(2)
        this.$router.push({ path: "/music" });
        this.$store.state.clickWhere = '117px';
      },

      toeat: function () {
        this.sideColor(4)
        this.$router.push({ path: "/eat" });
        this.$store.state.clickWhere = '227px';
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
      this.downName = true;
      this.downOpacity = 1;
      this.upName = true;
      this.upOpacity = 1;
    }
  };
</script>

<style scoped>
  .music {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    /* background-color: rgb(153, 241, 70); */
  }

  .down {
    width: 36px;
  height: 32px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -25px;
    cursor: pointer;
  }

  .down img {
    width: 80%;
    height: 80%;
  }

  .up {
    width: 36px;
  height: 32px;
    position: absolute;
    top: 10px;
    left: 50%;
    margin-left: -25px;
    cursor: pointer;
  }

  .up img {
    width: 80%;
    height: 80%;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
</style>