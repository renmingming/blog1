import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articleInfo: {
      'type': ''
    },
    loginState: false,
    collectState: false
  },
  actions: {
    setArticleInfo ({commit}, articleInfo) {
      commit('SETARTICLEINFO', articleInfo)
    },
    setLoginState ({commit}) {
      commit('SETLOGINSTATE')
    },
    setCollectState ({commit}) {
      commit('SETCOLLECTSTATE')
    }
  },
  mutations: {
    // 设置文章信息
    SETARTICLEINFO (state, articleInfo) {
      state.articleInfo.type = articleInfo.type
    },
    SETLOGINSTATE (state) {
      state.loginState = true
    },
    SETCOLLECTSTATE (state) {
      state.collectState = !state.collectState
    }
  }
})

export default store
