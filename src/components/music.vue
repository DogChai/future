<template>
  <div id="music" class="music">
    <!-- <img src="../assets/images/music_2k.jpg" alt="" class="page-img"> -->
    <div @click="toshow" class="up animated infinite" :class="{bounceIn: upName}" :style="{opacity: upOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
    <div @click="tosee" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
    <div class="music-main">
      <div class="music-topscroll">
        <div class="music-long" ref="musicLong" :style='{left: longLeft}'>

          <div class="music-list" v-for='(item,index) in musicData' :data-index='index' @click='chooseList'>
            <span class="music-choose fa fa-headphones" style="display: none"></span>
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>{{item.name}}</p>
              <p>{{item.type}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="music-leftbtn music-btn" :data-num='leftBtnText' @click='toRight' ref="leftBtn"> ‹ </div>
      <div class="music-rightbtn music-btn" :data-num="rightBtnText" @click='toLeft' ref="rightBtn"> › </div>
    </div>
    <div class="music-showWrap">
      <div class="music-sTitle">
        <span>播放</span>
        <span>序号</span>
        <span>歌曲名</span>
        <span>歌手</span>
        <span>专辑</span>
        <span>时长</span>
      </div>
      <div class="music-sWrap">
        <GeminiScrollbar>
          <div class="music-sList" v-for='(item,index) in musicData'>
            <span>
              <i class="fa fa-play-circle"></i>
            </span>
            <span>
              {{index+1}}
            </span>
            <span>青鸟</span>
            <span>いきものがかりaaaaaaaaaaa</span>
            <span>火影忍者</span>
            <span>03:36</span>
          </div>
        </GeminiScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';
  import GeminiScrollbar from 'vue-gemini-scrollbar';
  Vue.use(GeminiScrollbar);

  export default {
    name: "music",
    data() {
      return {
        downName: false,
        downOpacity: 0,
        upName: false,
        upOpacity: 0,
        longLeft: '0px',
        musicData: [],
        rightBtnText: 0,
        leftBtnText: 0
      };
    },
    methods: {
      toshow: function () {
        this.sideColor(1)
        this.$router.push({ path: "/show" });
        this.$store.state.clickWhere = '62px';
      },
      chooseList: function (e) {
        console.log(e.currentTarget.dataset.index)
        var thisIndex = e.currentTarget.dataset.index;
        var musicList = document.getElementsByClassName('music-list');
        for (var i = 0; i < musicList.length; i++) {
          musicList[i].children[1].style.opacity = '';
          musicList[i].getElementsByClassName('music-text')[0].getElementsByTagName('p')[0].style.color = '';
          musicList[i].getElementsByClassName('music-choose')[0].style.color = '';
        }
        musicList[thisIndex].children[1].style.opacity = 1;
        musicList[thisIndex].getElementsByClassName('music-text')[0].getElementsByTagName('p')[0].style.color = 'rgba(245, 245, 245, 1)';
        musicList[thisIndex].getElementsByClassName('music-choose')[0].style.color = 'rgba(245, 245, 245, 1)';
      },
      toLeft: function (e) {
        console.log(e);
        let btn = e.target;
        let musicList = document.getElementsByClassName('music-list');
        let dataNum = btn.dataset.num;
        let musicLength = musicList.length;
        let chuNum = (dataNum / 5).toString();
        let chuArr = chuNum.split('.');
        console.log(chuArr);
        if (dataNum != 0) {
          if (chuArr[0] >= 1) {
            dataNum -= 0;
            dataNum -= 5;
            console.log(chuArr[0])
            btn.setAttribute('data-num', dataNum);
          } else {
            var moNum = (dataNum % 5).toString();
            dataNum -= 0;
            dataNum -= Number(moNum);
            btn.setAttribute('data-num', dataNum);
          }
        };

        this.$refs.leftBtn.dataset.num = musicLength - btn.dataset.num - 5;
        this.longLeft = -(musicLength - btn.dataset.num - 5) * 158 + 'px';

      },
      toRight: function (e) {
        let btn = e.target;
        let musicList = document.getElementsByClassName('music-list');
        let dataNum = btn.dataset.num;
        let musicLength = musicList.length;
        let chuNum = (dataNum / 5).toString();
        let chuArr = chuNum.split('.');
        console.log(chuArr);
        if (dataNum != 0) {
          if (chuArr[0] >= 1) {
            dataNum -= 0;
            dataNum -= 5;
            console.log(chuArr[0])
            btn.setAttribute('data-num', dataNum);
          } else {
            var moNum = (dataNum % 5).toString();
            dataNum -= 0;
            dataNum -= Number(moNum);
            btn.setAttribute('data-num', dataNum);
          }
        };
        this.$refs.rightBtn.dataset.num = musicLength - btn.dataset.num - 5;
        this.longLeft = -btn.dataset.num * 158 + 'px';
      },
      tosee: function () {
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
    mounted: function () {
      var that = this;
      this.downName = true;
      this.downOpacity = 1;
      this.upName = true;
      this.upOpacity = 1;
      axios.get('../static/json/music.json').then((response) => {
        console.log(response.data.length)
        that.musicData = response.data;
        that.$store.state.musicData = response.data;
        that.musicData = response.data;
        this.rightBtnText = this.musicData.length - 5;
        this.leftBtnText = 0;
      }, (response) => {
        console.log(response)
      })
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
    background-color: rgb(96, 70, 241);
  }

  .music-main {
    width: 870px;
    position: absolute;
    top: 70px;
    height: 175px;
    left: 50%;
    margin-left: -435px;
    background-color: rgba(245, 245, 245, 0.05);
  }

  .music-showWrap {
    position: absolute;
    top: 255px;
    bottom: 60px;
    width: 870px;
    left: 50%;
    margin-left: -435px;
    background-color: rgba(245, 245, 245, 0.05);
  }

  .music-sTitle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    line-height: 32px;
    box-sizing: border-box;
    background-color: aquamarine;
  }

  .music-sWrap {
    position: absolute;
    top: 37px;
    bottom: 7px;
    left: 0;
    right: 0;
    background-color: blanchedalmond;
  }

  .music-sList {
    width: 100%;
    height: 50px;
    position: relative;
    line-height: 50px;
  }

  .music-sList span {
    display: block;
    float: left;
    height: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* .music-sList span:nth-of-type(1) {
    width: 15%;
  } */

  .music-sList span:nth-of-type(1) i {
    display: inline-block;
    height: 100%;
    width: 50%;
    line-height: 50px;
    float: left;
    box-sizing: border-box;
  }

  .music-sList span:nth-of-type(1) i:nth-of-type(1) {
    text-align: left;
    padding-left : 17px;
    font-size: 22px;
    cursor: pointer;
  }

  .music-sList span:nth-of-type(1) {
    width: 7.5%;
  }

  .music-sList span:nth-of-type(2) {
    width: 7.5%;
  }

  .music-sList span:nth-of-type(3) {
    width: 30%;
  }

  .music-sList span:nth-of-type(4) {
    width: 20%;
  }

  .music-sList span:nth-of-type(5) {
    width: 20%;
  }

  .music-sList span:nth-of-type(6) {
    width: 15%;
  }

  .music-sTitle span {
    display: block;
    float: left;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid rgba(25, 25, 25, 0.6);
  }

  .music-sTitle span:nth-of-type(1) {
    width: 7.5%;
  }

  .music-sTitle span:nth-of-type(2) {
    width: 7.5%;
  }

  .music-sTitle span:nth-of-type(3) {
    width: 30%;
  }

  .music-sTitle span:nth-of-type(4) {
    width: 20%;
  }

  .music-sTitle span:nth-of-type(5) {
    width: 20%;
  }

  .music-sTitle span:nth-of-type(6) {
    width: 15%;
  }

  .music-list {
    width: 118px;
    height: 150px;
    position: relative;
    margin: 17px 20px 0 20px;
    float: left;
    cursor: pointer;
  }

  .music-list:hover {
    opacity: 1;
  }

  .music-choose {
    position: absolute;
    height: 22px;
    width: 22px;
    left: 50%;
    margin-left: -18px;
    font-size: 20px;
    top: -28px;
    border-radius: 50%;
    color: rgba(245, 245, 245, 0.5);
    transition: all .3s ease;
    /* background-color: rgba(245, 245, 245, 0.1); */
  }

  .music-smList {
    position: absolute;
    width: 118px;
    height: 100px;
    transition: all .3s ease;
    opacity: 0.5;
  }

  .music-smList:hover {
    opacity: 1;
  }

  .music-list:hover .music-text p:nth-of-type(1) {
    color: rgba(245, 245, 245, 1);
  }

  .music-list:hover .music-choose {
    color: rgba(245, 245, 245, 1);
  }

  .music-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url('../assets/images/coverall.png') no-repeat;
    background-position: 0 -570px;
    box-shadow: 0px 2px 5px rgba(91, 108, 230, 0.8);
  }

  .music-img {
    position: absolute;
    width: 100px;
    height: 100px;
    left: 0px;
    top: 0px;
  }

  .music-text {
    position: absolute;
    height: 42px;
    bottom: 3px;
    left: 0;
    width: 100px;
  }

  .music-text p {
    width: 100%;
    height: 21px;
    line-height: 21px;
    font-size: 16px;
    box-sizing: border-box;
    padding: 2px;
    overflow: hidden;
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    white-space: normal;
    word-wrap: break-word;
    text-align: center;
    /* color: black; */
    color: rgba(245, 245, 245, 0.5);
    transition: all .3s ease;
    /* background-color: rgba(245, 245, 245, 0.01); */
  }

  .music-text p:nth-of-type(2) {
    color: rgba(25, 25, 25, 0.6);
  }

  .music-topscroll {
    position: absolute;
    height: 175px;
    top: 0;
    left: 40px;
    right: 40px;
    overflow: hidden;
  }

  .music-long {
    width: auto;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0;
    /* overflow-y: auto; */
    white-space: nowrap;
    transition: left .3s ease;
    display: flex;
    justify-content: space-between;
  }

  .music-btn {
    position: absolute;
    width: 40px;
    top: 0;
    height: 175px;
    text-align: center;
    line-height: 175px;
    font-size: 38px;
    color: rgba(245, 245, 245, 0.5);
    transition: all .3s ease;
    cursor: pointer;
  }

  .music-btn:hover {
    color: black;
  }

  .music-leftbtn {
    left: 0;
  }

  .music-rightbtn {
    right: 0;
  }


  .down {
    width: 36px;
    height: 32px;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -18px;
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
    margin-left: -18px;
    cursor: pointer;
  }

  .up img {
    width: 80%;
    height: 80%;
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
  }
</style>