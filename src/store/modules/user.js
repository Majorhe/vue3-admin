const state = () => ({
    isLogin: localStorage.getItem('userinfo') ? true : false,
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : undefined,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : undefined,
})

const getters = {
    isLogin: (state) => {
        return state.isLogin
    },
    userinfo: (state) => {
        return state.userinfo
    },
    token: (state) => {
        return state.token
    }
}

const actions = {
    set ({ commit }, value) {
        commit('set', value)
    },
    setToken({ commit }, value) {
        commit('setToken', value)
    },
    logout ({ commit }) {
        commit('logout')
    }
}

const mutations = {
    set (state, value) {
        localStorage.setItem('userinfo', JSON.stringify(value))
        state.isLogin = true
        state.userinfo = value
    },
    setToken (state, value) {
        localStorage.setItem('token', value)
        state.token = value
    },
    logout (state) {
        localStorage.removeItem('userinfo')
        localStorage.removeItem('token')
        state.isLogin = false
        state.userinfo = undefined
        state.token = undefined
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
