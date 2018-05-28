import Vue from 'vue'
import Router from 'vue-router'

// 主页
import index from '@/components/index'

// 展示
import show from '../components/show'

// 音乐
import music from '../components/music'

//菜谱
import eat from '../components/eat'

//歌词
import see from '../components/see'

//全局频谱
import spectrum from '../components/spectrum'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index/'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/show',
      name: 'show',
      component: show
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/eat',
      name: 'eat',
      component: eat
    },
    {
      path: '/see',
      name: 'see',
      component: see
    },
    {
      path: '/spectrum',
      name: 'spectrum',
      component: spectrum
    }
  ]
})
