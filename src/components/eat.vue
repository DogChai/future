<template>
    <div id="eat" class="eat">
        <img src="../assets/images/mai_eat.png" alt="" class="page-img">
        <div @click="tosee" class="up animated infinite" :class="{bounceIn: upName}" :style="{opacity: upOpacity}">
            <img src="../assets/images/down3.png" alt="">
        </div>
        <div @click="toindex" class="down animated infinite" :class="{bounceIn: downName}" :style="{opacity: downOpacity}">
            <img src="../assets/images/down3.png" alt="">
        </div>

        <div class="eat-top">
            <input type="text" v-model='foodName' class="eat-input" placeholder="what you eat?">
            <button class="eat-btn" @click='getFood'>享用</button>
            <div class="eat-return" @click='gotolist'>
                <i class="fa fa-chevron-left"></i>
            </div>
        </div>
        <GeminiScrollbar class="my-scroll-bar">
            <div class="eat-list">
                <!-- 菜肴数量 -->
                <div v-show='foodShow' class="eat-lists" :style="{opacity: arr.opacity}" :data-index='index' @click='showDetail(index)' v-for='(arr,index) in foodData'>
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
                        <p>步骤: </p>
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
    import jquery from 'jquery';
    import Vue from 'vue'
    import GeminiScrollbar from 'vue-gemini-scrollbar'

    Vue.use(GeminiScrollbar)

    export default {
        name: "eat",
        components: {
            // GeminiScrollbar
        },
        data() {
            return {
                downName: false,
                downOpacity: 0,
                upName: false,
                upOpacity: 0,
                foodName: '',   //菜肴名称
                foodData: [],
                foodIndex: 0,   //需要显示的菜肴索引值
                foodShow: true,  //菜肴类别和详情切换
                totalNum: 0,
            };
        },
        methods: {
            tosee: function () {
                this.sideColor(3)
                this.$router.push({ path: "/see" });
                this.$store.state.clickWhere = '172px';
            },

            toindex: function () {
                this.sideColor(0)
                this.$router.push({ path: "/index" });
                this.$store.state.clickWhere = '7px';
            },
            showDetail: function (myindex) {
                console.log(myindex)
                this.foodShow = false;
                this.foodIndex = myindex;
            },
            gotolist: function () {
                if (!this.foodShow) {
                    this.foodShow = true;
                }
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
            },
            getFood: function () {
                var txt = encodeURIComponent(this.foodName);
                var that = this;
                this.foodShow = true;
                jquery.ajax({
                    url: 'https://apis.juhe.cn/cook/query?key=092d3c9d359567229b2dca2a9b235628&rn=30&pn=0&dtype=jsonp&menu=' + txt,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.resultcode != 200) {
                            console.log('未找到该菜肴')
                        } else {
                            console.log(data);
                            if (data.result.totalNum == that.totalNum) {
                                return;
                            } else {
                                that.foodData = [];
                                that.totalNum = data.result.totalNum;
                                let mydata = data.result.data;
                                let datatimer = null;
                                let datalength = mydata.length;
                                let addnum = 0;

                                clearInterval(datatimer);

                                for (let i = 0; i < mydata.length; i++) {
                                    mydata[i].opacity = '1';
                                }
                                datatimer = setInterval(function () {
                                    if (addnum == datalength) {
                                        clearInterval(datatimer)
                                    } else {
                                        that.$set(that.foodData, addnum, mydata[addnum])
                                        addnum++;
                                    }
                                }, 200);
                            }
                        }
                    }
                })
            }
        },
        mounted: function () {
            this.downName = true;
            this.downOpacity = 1;
            this.upName = true;
            this.upOpacity = 1;
            var that = this;
            var eatData = localStorage.getItem('eatData');
            console.log(eatData);
            this.foodName = eatData[0];
            this.foodData = eatData[1];
            this.foodIndex = eatData[2];
            this.foodShow = eatData[3];
            this.totalNum = eatData[4];
        },
        destroyed: function () {
            console.log("我已经离开了！");
            console.log(this);
            var eatData = [
                this.foodName,
                this.foodData,
                this.foodIndex,
                this.foodShow,
                this.totalNum
            ]
            localStorage.setItem('eatData', eatData);
        },
    };
</script>

<style scoped>
    .eat {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    .my-scroll-bar {
        position: absolute;
        width: 900px;
        top: 115px;
        bottom: 34px;
        height: auto !important;
        left: 50%;
        margin-left: -450px;
        /* background-color: rgba(25, 25, 25, .2); */
        background-color: rgba(25, 25, 25, .5);
    }

    .eat-details {
        width: 100%;
        height: auto;
        color: white;
    }

    .eat-details h1 {
        font-size: 30px;
        margin-top: 5px;
        margin-bottom: 14px;
        text-shadow: 0 0 2px black;
    }

    .eat-details p {
        text-align: left;
        width: 80%;
        height: auto;
        margin: 10px auto;
        font-size: 20px;
        text-shadow: 0 0 2px black;
        line-height: 25px;
    }

    .eat-details ul {
        list-style: none;
        width: 100%;
        height: auto;
        margin-top: 20px;
    }

    .eat-details li {
        width: 80%;
        margin: 10px auto;
        height: 150px;
    }

    .eat-details .left-img {
        height: 150px;
        width: 215px;
        float: left;
    }

    .eat-details .left-img img {
        width: 100%;
        height: 100%;
    }

    .eat-details .right-text {
        height: 150px;
        width: 405px;
        float: left;
        box-sizing: border-box;
        padding-top: 35px;
        padding-left: 35px;
        padding-right: 15px;
        text-align: left;
        background-color: rgba(255, 255, 255, 0.2);
        margin-left: 10px;
        color: white;
        font-size: 20px;
        text-shadow: 0 0 2px black;
    }

    .eat-wrap {
        position: absolute;
        width: 1060px;
        top: 40px;
        bottom: 40px;
        left: 50%;
        margin-left: -530px;
        /* background-color: rgb(243, 204, 131); */
        background: hsla(0, 0%, 100%, .3);
        /* overflow-y: auto; */
    }

    .eat-wrap::after {
        position: absolute;
        content: '';
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        filter: blur(20px);
        margin-top: -30px;
    }

    .eat-list {
        width: 805px;
        min-height: 10px;
        height: auto;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        margin-top: 5px;
        margin-bottom: 10px;
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
        transition: all .5s ease;
        overflow: hidden;
    }

    .eat-return {
        width: 60px;
        height: 38px;
        position: absolute;
        top: 1px;
        line-height: 38px;
        left: -90px;
        font-size: 23px;
        color: rgba(25, 25, 25, 0.6);
        cursor: pointer;
        transition: all .2s;
    }

    .eat-return:hover {
        color: rgba(25, 25, 25, 0.9);
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
        transition: all .25s ease;
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
        width: 720px;
        height: 50px;
        left: 50%;
        margin-left: -360px;
        top: 60px;
        color: white;
    }


    .eat-input {
        width: 550px;
        height: 38px;
        float: left;
        margin-left: 52px;
        margin-right: 10px;
        outline: none;
        box-sizing: border-box;
        padding-left: 30px;
        padding-right: 10px;
        padding-top: 2px;
        padding-bottom: 3px;
        font-size: 18px;
        background-color: rgba(25, 25, 25, 0.12);
        border: none;
        border: 2px solid rgba(25, 25, 25, 0.3);
        font-family: 'dogchai';
        letter-spacing: 2px;
        color: black;
    }

    .eat-btn {
        width: 80px;
        height: 38px;
        line-height: 20px;
        float: left;
        font-family: 'dogchai' !important;
        cursor: pointer;
        background-color: transparent;
        border: none;
        /* box-shadow: 0 0 5px rgba(255, 255, 255, 0.6); */
        /* border: 2px solid rgba(25,25,25,0.3); */
        outline: none;
        color: white;
        background-color: rgba(25, 25, 25, 0.3);
    }

    .eat-input:focus {
        box-shadow: 0 0 2px rgba(25, 25, 25, 0.3);
    }

    .eat-btn:hover {
        box-shadow: 0 0 2px rgba(25, 25, 25, 0.3);
    }

    .down {
        width: 36px;
        height: 32px;
        position: absolute;
        bottom: 0px;
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
        top: 5px;
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