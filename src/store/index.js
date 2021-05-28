import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    _id: '',
    admin: '',
    username: '',
    password: '',
    articleList: [],
    commentList: [],
    avatar: '',
  },
  mutations: {
    initUser(state, data) {
      for(let i in data) {
        state[i] = data[i]
      }
      state.isLogin = true
    }
  },
  actions: {
  },
  modules: {
  }
})
