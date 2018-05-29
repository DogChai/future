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
                <input type="text" class="eat-input" placeholder="what you eat?">
                <button class="eat-btn">享用</button>
            </div>
            <div class="eat-list">
                <img src="../assets/images/heart.gif" alt="">
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
                upOpacity: 0
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
            }
        },
        mounted: function () {
            this.downName = true;
            this.downOpacity = 1;
            this.upName = true;
            this.upOpacity = 1;

            console.log(jquery);
            var txt = '红烧肉';
            txt = encodeURIComponent(txt);    
            // axios.get('http://apis.juhe.cn/cook/query?key=&menu=%E8%A5%BF%E7%BA%A2%E6%9F%BF&rn=10&pn=3')
            //      .then(function(response) {
            //          console.log(response);
            //      })
            //      .catch(function(response) {
            //          console.log(response);
            //      })
            jquery.ajax({
                url: 'https://apis.juhe.cn/cook/query?key=092d3c9d359567229b2dca2a9b235628&rn=3&pn=0&dtype=jsonp&menu=' + txt,
                dataType: 'jsonp',
                success: function(data) {
                    console.log(data);
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

    .eat-wrap {
        position: absolute;
        width: 1060px;
        top: 70px;
        bottom: 70px;
        left: 50%;
        margin-left: -530px;
        /* background-color: rgb(243, 204, 131); */
    }

    .eat-top {
        width: 720px;
        height: 50px;
        margin: 10px auto 0 auto;
        color: white;
    }

    .eat-list {
        width: 720px;

    }

    .eat-input {
        width: 500px;
        height: 33px;
        float: left;
        margin-left: 70px;
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
        font-family: 'dogchai'!important;
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