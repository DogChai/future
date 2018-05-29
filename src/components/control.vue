<template>
    <div id="control">
        <div class="control-wrap">
            <div class="control-left">
                <span class="fa fa-step-backward"></span>
                <span class="fa fa-pause"></span>
                <span class="fa fa-step-forward"></span>
            </div>
            <div class="control-center">
                <div class="control-name"></div>
                <div class="control-set"></div>
            </div>
            <div class="control-right">
                <span class="fa fa-"></span>
                <span></span>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'control',
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    #control {
        background-color: bisque;
    }

    .control-wrap {
        width: 1060px;
        height: 100%;
        margin: 0 auto;
    }

    .control-left {
        width: 170px;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }

    .control-center {
        width: 710px;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }

    .control-right {
        width: 200px;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }

    .control-left span {
        font-size: 28px;
        display: inline-block;
        width: 50px;
        height: 100%;
        line-height: 60px;
        text-align: center;
        box-sizing: border-box;
        float: left;
        color: rgba(0, 0, 0, 0.5);
        transition: all .3s ease;
        cursor: pointer;
    }

    .control-left span:hover {
        color: rgba(0, 0, 0, 1);
    }

    .control-left span:nth-of-type(1) {
        font-size: 32px;
        margin-right: 10px;
    }

    .control-left span:nth-of-type(2) {
        margin-right: 10px;
    }

    .control-left span:nth-of-type(3) {
        font-size: 32px;
    }

    .control-right span {

    }

    .control-right div {

    }
</style>