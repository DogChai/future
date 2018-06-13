import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 变量
const state = {
    sideWhere: '7px',
    clickWhere: '7px',
    eatData: {},
    musicData: []
}

// 计算方法
const mutations = {

}

//在显示之前进行计算
const getters = {
    getSideWhere: function(state) {
        return state.sideWhere;
    }
}

//
const actions = {

}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})