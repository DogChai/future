<template>
  <div id="music" class="music">
    <img src="../assets/images/music_2k.jpg" alt="" class="page-img">
    <div @click="toshow" class="up animated infinite" :class="{bounceIn: upName}" :style="{opacity: upOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
    <div @click="tosee" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
      <img src="../assets/images/down.png" alt="">
    </div>
    <div class="music-main">
      <div class="music-topscroll">
        <div class="music-long">
          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>

          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>


          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>

          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>

          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>

          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>

          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>

          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>
          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>
          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>
          <div class="music-list">
            <div class="music-smList">
              <div class="music-mask"></div>
              <img src="../assets/images/my.png" class="music-img" alt="">
            </div>
            <div class="music-text">
              <p>打开音乐的大门啦啦啦啦</p>
              <p>一起来听吧</p>
            </div>
          </div>
        </div>
      </div>
      <div class="music-leftbtn music-btn" data-num='0' @click='toRight'> ‹ </div>
      <div class="music-rightbtn music-btn" data-num="5" @click='toLeft'> › </div>
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
      toshow: function () {
        this.sideColor(1)
        this.$router.push({ path: "/show" });
        this.$store.state.clickWhere = '62px';
      },
      toLeft: function () {
        var musicBtn = document.getElementsByClassName('music-btn');
        var musicList = document.getElementsByClassName('music-list');
        var musicLong = document.getElementsByClassName('music-long')[0];

        /*
            获取data-num的值，减去musicList的数量 / 5  得到的值 ，
            如果可以除尽那么data-num += 5; left值 = data-num - 1 * 158 + 138 + 'px'
            不能除尽那就data-num += 余数; left值 = data-num - 1 * 158 + 138 + 'px'
        */
        var musicLength = musicList.length = musicList.length;
        var dataNum = this.getAttribute('data-num');
        var chuNum = ((musicLength - dataNum) / 5).toString();
        var chuArr = chuNum.split('.');

        console.log(musicLength)

        if (dataNum > musicLength) {

        } else {
          if (chuArr[0] >= 1) {
            dataNum -= 0;
            dataNum += 5;
            console.log(chuArr[0])
            this.setAttribute('data-num', dataNum);
          } else {
            var moNum = ((musicLength - dataNum) % 5).toString();
            dataNum -= 0;
            dataNum += Number(moNum);
            this.setAttribute('data-num', dataNum);
          }
        }

        var musicLongLeft = -musicLong.offsetLeft;

        if (this.getAttribute('data-num') == 5) {

        } else {
          musicLong.style.left = - ((this.getAttribute('data-num') - 5) * 158) - 28 + 'px';
        }
      },
      toRgith: function () {

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
    background-color: rgb(96, 70, 241);
    /* background-color: gray; */
  }

  .music-main {
    width: 850px;
    position: absolute;
    top: 150px;
    /* bottom: 100px; */
    height: 205px;
    left: 50%;
    margin-left: -425px;
    background-color: #f5f5f5;
  }

  .music-list {
    width: 118px;
    height: 150px;
    position: relative;
    margin: 36px 20px 0 20px;
    /* overflow: hidden; */
    background: url('https://s2.music.126.net/style/web2/img/index/index.png?4f9401cc364f3bee7c51d11e371b8b4d') no-repeat 0 9999px #f5f5f5;
    background-position: -260px 100px;
    display: inline-block;
    cursor: pointer;
  }

  .music-list:nth-of-type(1) {
    margin-left: 0;
  }

  .music-smList {
    position: absolute;
    width: 118px;
    height: 100px;
  }

  .music-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url('https://s2.music.126.net/style/web2/img/coverall.png?9c056aa4df49a66f01df23a92eb22092') no-repeat;
    background-position: 0 -570px;
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
    bottom: 0;
    left: 0;
    width: 100px;
    /* background-color: antiquewhite; */
  }

  .music-text p {
    width: 100%;
    height: 21px;
    line-height: 21px;
    font-size: 13px;
    /* text-align: center; */
    box-sizing: border-box;
    padding-left: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .music-topscroll {
    position: absolute;
    height: 200px;
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
    overflow-y: auto;
    white-space: nowrap;
    transition: all .3s ease;
  }

  .music-btn {
    position: absolute;
    width: 40px;
    top: 0;
    height: 200px;
    text-align: center;
    line-height: 200px;
    font-size: 30px;
    color: rgb(135, 135, 135);
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