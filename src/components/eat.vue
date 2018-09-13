<template>
    <div id="eat" class="eat">
        <!-- <img src="../assets/images/eat.jpg" alt="" class="page-img"> -->
        <div @click="tosee" class="up animated infinite" :class="{bounceIn: upName}" :style="{opacity: upOpacity}">
            <img src="../assets/images/down.png" alt="">
        </div>
        <div @click="toindex" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
            <img src="../assets/images/down.png" alt="">
        </div>

        <div class="eat-top">
            <input type="text" v-model='foodName' class="eat-input" @keyup.enter="getFood" placeholder="客官，要来点什么？">
            <button class="eat-btn" @click='getFood'>搜一搜</button>
            <div class="eat-return" @click='gotolist' :style='{display: backDisplay, opacity:backOpacity}'>
                <i class="fa fa-chevron-left"></i>
            </div>
        </div>

        <!-- 加载动画 -->
        <div class="lds-css ng-scope load-animate" :style="{opacity: loadOpacity}">
            <!-- <div style="width:100%;height:100%" class="lds-ellipsis">
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div> -->
            <img src="../assets/images/loading1.svg" alt="">
        </div>

        <GeminiScrollbar class="my-scroll-bar">
            <div class="eat-list">

                <!-- 未找到菜肴 -->
                <div class="no-menu" :style="{display: noMenu}">小可爱，伦家找不到相关菜肴嘛~</div>


                <!-- 菜肴数量 -->
                <!-- :style="{opacity: arr.opacity}" -->
                <div v-show='foodShow' class="eat-lists" :data-index='index' @click='showDetail(index)' v-for='(arr,index) in foodData'>
                    <p class="eat-headertext">{{arr.title}}</p>
                    <img :src="arr.albums[0]" alt="" class="eat-headerimg">
                </div>

                <!-- 菜肴详细内容 -->
                <!-- v-show='index==0' -->
                <div class="eat-details-wrap" v-show='!foodShow'>
                    <div class="eat-details" v-show='index==foodIndex' v-for='(item,index) in foodData'>
                        <h1>{{item.title}}</h1>
                        <p>主料: {{item.ingredients}}</p>
                        <p>配料: {{item.burden}}</p>
                        <!-- <p>步骤: </p> -->
                        <ul>
                            <li v-for='arr in item.steps'>
                                <div class="left-img">
                                    <img :src="arr.img" alt="">
                                </div>
                                <div class="right-text">
                                    {{arr.step}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>


            </div>
        </GeminiScrollbar>
    </div>
</template>

<script>
import jquery from "jquery";
import Vue from "vue";
import GeminiScrollbar from "vue-gemini-scrollbar";

Vue.use(GeminiScrollbar);

export default {
  name: "eat",
  components: {},
  data() {
    return {
      downName: false,
      downOpacity: 0,
      upName: false,
      upOpacity: 0,
      foodName: "", //菜肴名称
      saveName: "", //保存的菜肴名称
      foodData: [],
      foodIndex: 0, //需要显示的菜肴索引值
      foodShow: true, //菜肴类别和详情切换
      totalNum: 0,
      loadOpacity: 0, //load opacity显示值
      loadZindex: -1, //load z-index值
      myscrollbar: "",
      noMenu: "none",
      backDisplay: "none",
      backOpacity: 0
    };
  },
  methods: {
    tosee: function() {
      this.sideColor(3);
      this.$router.push({ path: "/see" });
      this.$store.state.clickWhere = "172px";
    },
    toindex: function() {
      this.sideColor(0);
      this.$router.push({ path: "/index" });
      this.$store.state.clickWhere = "7px";
    },
    showDetail: function(myindex) {
      // console.log(myindex);
      var timer = null;
      var that = this;
      clearTimeout(timer);
      for (
        var i = 0;
        i < document.getElementsByClassName("eat-lists").length;
        i++
      ) {
        document.getElementsByClassName("eat-lists")[i].style.opacity = 0;
      }
      that.foodShow = false;
      that.foodIndex = myindex;
      that.backDisplay = "block";
      document.getElementsByClassName("eat-details-wrap")[0].style.opacity = 0;
      // this.myscrollbar.update();
      this.loadOpacity = 1;
      this.loadZindex = 99;
      timer = setTimeout(function() {
        clearTimeout(timer);
        that.loadOpacity = 0;
        that.loadZindex = -1;
        that.backOpacity = 1;
        document.getElementsByClassName(
          "eat-details-wrap"
        )[0].style.opacity = 1;
      }, 1000);
    },
    gotolist: function() {
      var timer = null;
      var that = this;
      clearTimeout(timer);

      document.getElementsByClassName("eat-details-wrap")[0].style.opacity = 0;
      // this.myscrollbar.update();
      this.loadOpacity = 1;
      this.loadZindex = 99;
      this.backOpacity = 0;
      timer = setTimeout(function() {
        clearTimeout(timer);
        that.loadOpacity = 0;
        that.loadZindex = -1;
        that.backDisplay = "none";
        if (!that.foodShow) {
          that.foodShow = true;
        }
        for (
          var i = 0;
          i < document.getElementsByClassName("eat-lists").length;
          i++
        ) {
          document.getElementsByClassName("eat-lists")[i].style.opacity = 1;
        }
      }, 500);
    },
    sideColor: function(num) {
      let liDom = document.getElementsByClassName("sideLi");
      for (var i = 0; i < liDom.length; i++) {
        liDom[i].style.color = "rgba(255,255,255,0.3)";
        liDom[i].children[0].style.opacity = "";
        liDom[i].children[0].style.left = "";
      }
      liDom[num].style.color = "rgba(0,0,0,0.9)";
      liDom[num].children[0].style.opacity = "1";
      liDom[num].children[0].style.left = "-18px";
    },
    getFood: function() {
      var txt = encodeURIComponent(this.foodName);
      var that = this;
      var timer = null;
      clearTimeout(timer);
      timer = setTimeout(function() {
        clearTimeout(timer);
        if (that.saveName == that.foodName) {
          that.loadOpacity = 0;
          that.loadZindex = -1;
        } else {
          that.foodData = [];
          that.noMenu = "none";
          that.loadOpacity = 1;
          that.loadZindex = 99;
          that.foodShow = true;
          jquery.ajax({
            url:
              "https://apis.juhe.cn/cook/query?key=092d3c9d359567229b2dca2a9b235628&rn=30&pn=0&dtype=jsonp&menu=" +
              txt,
            dataType: "jsonp",
            success: function(data) {
              that.saveName = that.foodName;

              if (data.resultcode != 200) {
                // console.log('未找到该菜肴');
                that.loadOpacity = 0;
                that.loadZindex = -1;
                that.noMenu = "block";
              } else {
                that.noMenu = "none";
                if (data.result.totalNum == that.totalNum) {
                  return;
                } else {
                  that.totalNum = data.result.totalNum;
                  let mydata = data.result.data;
                  let datatimer = null;
                  let timer2 = null;
                  let detailBol = false;
                  clearInterval(datatimer);
                  clearTimeout(timer2);
                  that.foodData = mydata;

                  timer2 = setInterval(function() {
                    if (document.getElementsByClassName("eat-lists")) {
                      that.loadOpacity = 0;
                      that.loadZindex = -1;
                      clearInterval(timer2);
                      detailBol = true;
                      showLists();
                    }
                  }, 100);

                  function showLists() {
                    var listsLength =
                      document.getElementsByClassName("eat-lists").length - 1;
                    var listsNum = 0;

                    datatimer = setInterval(function() {
                      if (listsNum == listsLength + 1) {
                        clearInterval(datatimer);
                      } else {
                        document.getElementsByClassName("eat-lists")[
                          listsNum
                        ].style.opacity = 1;
                        listsNum++;
                      }
                    }, 150);
                  }
                }
              }
            }
          });
        }
      }, 0);
    }
  },
  mounted: function() {
    this.downName = true;
    this.downOpacity = 1;
    this.upName = true;
    this.upOpacity = 1;
    var that = this;

    // document
    //   .getElementsByClassName("my-scroll-bar")[0]
    //   .addEventListener("mousewhell", function() {
    //     console.log(1);
    //   });

    // document.getElementsByClassName('my-scroll-bar')[0].addEventListener('mouseover', function() {
    //   console.log('over');
    //   window.onmousewheel = null;
    //   console.log(that)
    //   document.addEventListener('mouseleave', function() {
    //     console.log('leave')
    //   })
    // })  
  },
  destroyed: function() {}
};
</script>

<style scoped>
.eat {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  /* background-color: rgba(0, 0, 0, 0.1); */
}

.no-menu {
  width: 300px;
  height: 60px;
  line-height: 30px;
  font-size: 20px;
  margin: 10px auto;
  margin-top: 20px;
  text-align: center;
  color: white;
}

.my-scroll-bar {
  position: absolute;
  width: 80%;
  top: 115px;
  bottom: 40px;
  height: auto !important;
  /* left: 50%; */
  margin-left: 10%;
  /* background-color: rgba(25, 25, 25, .2); */
  background-color: rgba(25, 25, 25, 0.01);
  color: black;
}

.eat-details {
  width: 80%;
  margin: 0 auto;
  height: auto;
  color: black;
  padding-top: 10px;
}

.eat-details h1 {
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: white;
  /* text-shadow: 0 0 2px white; */
}

.eat-details p {
  text-align: center;;
  width: 80%;
  height: auto;
  margin: 16px auto;
  font-size: 22px;
  /* font-weight: bold; */
  color: white;
  /* text-shadow: 0 0 2px white; */
  line-height: 25px;
}

.eat-details ul {
  list-style: none;
  width: 100%;
  height: auto;
  /* margin-top: 20px; */
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}

.eat-details li {
  width: 50%;
  margin: 10px 0;
  /* max-height: 250px; */
  overflow: hidden;
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  color: white;
}

.eat-details-wrap {
  width: 100%;
  transition: all 0.3s;
}

.eat-details .left-img {
  /* height: 110%; */
  width: 50%;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  top: 0;
  left: 0;
  bottom: 0; */
}

.eat-details .left-img img {
  width: 80%;
  height: 100%;
}

.eat-details .right-text {
  height: auto;
  /* min-height: 150px; */
  width: 50%;
  /* float: left; */
  box-sizing: border-box;
  /* padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-right: 15px; */
  /* text-align: left; */
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* margin-left: 230px; */
  color: white;
  font-size: 22px;
  /* text-shadow: 0 0 2px white; */
}

.eat-wrap {
  position: absolute;
  width: 1060px;
  top: 40px;
  bottom: 40px;
  left: 50%;
  margin-left: -530px;
  /* background-color: rgb(243, 204, 131); */
  background: hsla(0, 0%, 100%, 0.3);
  /* overflow-y: auto; */
}

.eat-wrap::after {
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  filter: blur(20px);
  margin-top: -30px;
}

.eat-list {
  width: 100%;
  min-height: 0px;
  height: auto;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: baseline;
  background-color: rgba(0, 0, 0, 0.35);
}

.eat-lists {
  width: 170px;
  height: 170px;
  border: 1px solid transparent;
  float: left;
  margin: 15px;
  box-sizing: border-box;
  line-height: 170px;
  position: relative;
  cursor: pointer;
  opacity: 0;
  transition: all 0.5s ease;
  overflow: hidden;
}

.eat-return {
  width: 8%;
  height: 38px;
  position: absolute;
  top: 2px;
  line-height: 38px;
  left: 5%;
  font-size: 25px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  transition: all 0.3s;
}

.eat-return:hover {
  color: rgba(25, 25, 25, 1);
}

.eat-lists:hover .eat-headerimg {
  top: -7px;
  left: -7px;
  right: -7px;
  bottom: -7px;
  width: 184px;
  height: 184px;
}

.eat-headerimg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transition: all 0.25s ease;
  z-index: 9;
}

.eat-headertext {
  position: absolute;
  height: 38px;
  width: 100%;
  bottom: 0;
  z-index: 10;
  line-height: 38px;
  background-color: rgba(25, 25, 25, 0.46);
  color: white;
  font-size: 18px;
}

.eat-top {
  position: absolute;
  width: 80%;
  height: 50px;
  /* left: 50%; */
  margin-left: 10%;
  top: 60px;
  color: white;
}

.eat-input {
  width: 60%;
  height: 42px;
  float: left;
  margin-left: 15%;
  margin-right: 2px;
  outline: none;
  box-sizing: border-box;
  padding-left: 18px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.35);
  /* border: none; */
  /* border: 2px solid rgb(138, 181, 255); */
  border: 2px solid rgba(0,0,0,0.8);
  /* border-right: none; */
  font-family: "dogchai";
  letter-spacing: 1px;
  color: white;
  transition: all 0.3s ease;
}

.eat-btn {
  width: 10%;
  height: 42px;
  line-height: 22px;
  text-align: center;
  float: left;
  /* margin-left: 50px; */
  font-family: "dogchai" !important;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.3s ease;
  font-size: 16px;
  letter-spacing: 2px;
}

.eat-input:focus {
  box-shadow: 0 0 2px rgba(25, 25, 25, 0.3);
}

.eat-btn:hover {
  background-color: rgba(0, 0, 0, 0.66);
  box-shadow: 0 0 2px rgba(25, 25, 25, 0.3);
}

.down {
  width: 36px;
  height: 32px;
  position: absolute;
  bottom: 0px;
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
  top: 5px;
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