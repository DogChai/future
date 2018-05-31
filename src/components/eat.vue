<template>
    <div id="eat" class="eat">
        <div @click="tosee" class="up animated infinite" :class="{fadeInUp: upName}" :style="{opacity: upOpacity}">
            <img src="../assets/images/down3.png" alt="">
        </div>
        <div @click="toindex" class="down animated infinite" :class="{fadeInDown: downName}" :style="{opacity: downOpacity}">
            <img src="../assets/images/down3.png" alt="">
        </div>

        <div class="eat-wrap">
            <div class="eat-top">
                <input type="text" v-model='foodName' class="eat-input" placeholder="what you eat?">
                <button class="eat-btn" @click='getFood'>享用</button>
            </div>
            <div class="eat-list" >
                <div class="eat-return">
                    <i class="fa fa-chevron-left"></i>
                </div>
                
                <!-- 菜肴数量 -->
                <div class="eat-lists" style="display: none" v-for='arr in foodData'>
                    <p class="eat-headertext">{{arr.title}}</p>
                    <img :src="arr.albums[0]" alt="" class="eat-headerimg">
                </div>

                <!-- 菜肴详细内容 -->
                <div class="eat-details" v-for='(item,index) in foodData' v-show='index==0'>
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

    </div>
</template>

<script>
    import jquery from 'jquery';
    export default {
        name: "eat",
        data() {
            return {
                downName: false,
                downOpacity: 0,
                upName: false,
                upOpacity: 0,
                foodName: '',   //菜肴名称
                foodData: '',
                foodShow: false
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
                console.log(txt)
                jquery.ajax({
                    url: 'https://apis.juhe.cn/cook/query?key=092d3c9d359567229b2dca2a9b235628&rn=3&pn=0&dtype=jsonp&menu=' + txt,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.resultcode != 200) {
                            console.log('未找到该菜肴')
                        } else {
                            console.log(data.result.data);
                            that.foodData = data.result.data;
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
            var txt = encodeURIComponent('豆腐');
            jquery.ajax({
                    url: 'https://apis.juhe.cn/cook/query?key=092d3c9d359567229b2dca2a9b235628&rn=3&pn=0&dtype=jsonp&menu=' + txt,
                    dataType: 'jsonp',
                    success: function (data) {
                        if (data.resultcode != 200) {
                            console.log('未找到该菜肴')
                        } else {
                            console.log(data.result.data);
                            that.foodData = data.result.data;
                        }
                    }
                })
        }
    };
</script>

<style scoped>
    .eat {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgb(238, 78, 198);
    }

    .eat-details {
        width: 100%;
        height: auto;
    }

    .eat-details h1 {
        font-size: 28px;
        margin-bottom: 12px;
    }

    .eat-details p {
        text-align: left;
        width: 80%;
        height: auto;
        margin: 10px auto;
        font-size: 20px;
    }

    .eat-details ul {
        list-style: none;
        width: 100%;
        height: auto;
        margin-top: 20px;
    }

    .eat-details li {
        width: 85%;
        margin: 0 auto;
        height: 150px;
    }

    .eat-details .left-img {
        height: 145px;
        width: 195px;
        float: left;
    }

    .eat-details .right-text {
        height: 145px;
        width: 300px;
        float: left;
        /* line-height: 50px; */
        box-sizing: border-box;
        padding-top: 25px;
        padding-left: 20px;
        text-align: left;
    }

    .eat-wrap {
        position: absolute;
        width: 1060px;
        top: 40px;
        bottom: 40px;
        left: 50%;
        margin-left: -530px;
        background-color: rgb(243, 204, 131);
        overflow-y: auto;
    }

    .eat-list {
        width: 600px;
        min-height: 10px;
        height: auto;
        margin: 0 auto;
        margin-top: 20px;
        position: relative;
    }

    .eat-lists {
        width: 170px;
        height: 170px;
        border: 1px solid white;
        float: left;
        margin: 15px;
        box-sizing: border-box;
        line-height: 170px; 
        position: relative;
        cursor: pointer;
    }

    .eat-return {
        width: 32px;
        height: 25px;
        position: absolute;
        top: -20px;
        left: -30px;
        font-size: 23px;
        color: white;
        cursor: pointer;
    }

    .eat-headerimg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
    }

    .eat-headertext {
        position: absolute;
        height: 35px;
        width: 100%;
        bottom: 0;
        z-index: 10;
        line-height: 35px;
        background-color: rgba(25, 25, 25, 0.5);
        color: white;
    }

    .eat-top {
        width: 720px;
        height: 50px;
        margin: 10px auto 0 auto;
        color: white;
    }


    .eat-input {
        width: 490px;
        height: 33px;
        float: left;
        margin-left: 78px;
        margin-right: 10px;
        outline: none;
        box-sizing: border-box;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 2px;
        padding-bottom: 3px;
        font-size: 18px;
        background-color: transparent;
        border: none;
        border: 2px solid #ad69ec;
        font-family: 'dogchai';
        letter-spacing: 2px;
        color: #ad69ec;
    }

    .eat-btn {
        width: 60px;
        height: 33px;
        line-height: 20px;
        float: left;
        font-family: 'dogchai' !important;
        cursor: pointer;
        background-color: transparent;
        border: none;
        /* box-shadow: 0 0 5px rgba(255, 255, 255, 0.6); */
        border: 2px solid #ad69ec;
        outline: none;
        color: #ad69ec;
    }

    .eat-input:focus {
        box-shadow: 0 0 2px rgba(238, 78, 198, 0.8);
    }

    .eat-btn:hover {
        box-shadow: 0 0 2px rgba(238, 78, 198, 0.8);
    }

    .down {
        width: 36px;
        height: 32px;
        position: absolute;
        bottom: 5px;
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