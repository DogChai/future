<template>
        <div id="music">
          <div @click="tomusic" class="up animated infinite" :class="{fadeInUp: upName}" :style="{opacity: upOpacity}"><img src="../assets/images/down3.png" alt=""></div>
          <div @click="toeat" class="down animated infinite" :class="{fadeInDown: downName}" :style="{opacity: downOpacity}"><img src="../assets/images/down3.png" alt=""></div>
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
        tomusic: function() {
          this.$router.push({ path: "/music" });
        },
    
        toeat: function() {
          this.$router.push({ path: "/eat" });
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
    #music {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgb(153, 241, 70);
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
    
    .down img {
      width: 100%;
      height: 100%;
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
    
    .up img {
      width: 100%;
      height: 100%;
      transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
    </style>