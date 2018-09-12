import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


var state = {};

var localData = '';
if (localStorage.getItem('localData')) {
  localData = localStorage.getItem('localData').split(',');
  console.log(localStorage.getItem('localData'),localData)
  // 变量
  state = {
    sideWhere: localData[0] + 'px',
    clickWhere: localData[0] + 'px',
    index: localData[1],
    eatData: {},
    musicData: [],
    // 公共音乐变量
    gMusicValue: {
      // 播放状态
      playBol: false,
      // 名称
      name: '暂无歌曲',
      // 时间
      time: '00:00',
      // 位置index
      // 数量


    }
  }

} else {
  // 变量
  state = {
    sideWhere: '7px',
    clickWhere: '7px',
    index: 0,
    eatData: {},
    musicData: [],
    // 公共音乐变量
    gMusicValue: {
      // 播放状态
      playBol: false,
      // 名称
      name: '暂无歌曲',
      // 时间
      time: '00:00',
      // 位置index
      // 数量


    }
  }
}


// 计算方法
const mutations = {

}

//在显示之前进行计算
const getters = {
  getSideWhere: function (state) {
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
