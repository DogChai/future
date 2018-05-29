<template>
    <div id="music" class="music">
      <div @click="toshow" class="up animated infinite" :class="{fadeInUp: upName}" :style="{opacity: upOpacity}"><img src="../assets/images/down3.png" alt=""></div>
      <div @click="tosee" class="down animated infinite" :class="{fadeInDown: downName}" :style="{opacity: downOpacity}"><img src="../assets/images/down3.png" alt=""></div>
      <div>
        
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
    toshow: function() {
      this.sideColor(1)
      this.$router.push({ path: "/show" });
      this.$store.state.clickWhere = '62px'; 
    },

    tosee: function() {
      this.sideColor(3)
      this.$router.push({ path: "/see" });
      this.$store.state.clickWhere = '172px';
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
  mounted: function() {
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
  /* background-color: rgb(96, 70, 241); */
  background-color: gray;
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
