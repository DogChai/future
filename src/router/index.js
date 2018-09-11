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
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      meta: { index: 0 },
      component: index
    },
    {
      path: '/show',
      name: 'show',
      meta: { index: 1 },
      component: show
    },
    {
      path: '/music',
      name: 'music',
      meta: { index: 2 },
      component: music
    },
    {
      path: '/see',
      name: 'see',
      meta: { index: 3 },
      component: see
    },
    {
      path: '/eat',
      name: 'eat',
      meta: { index: 4 },
      component: eat
    },
    {
      path: '/spectrum',
      name: 'spectrum',
      component: spectrum
    }
  ]
})
