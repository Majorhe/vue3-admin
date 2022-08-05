const state = () => ({
    isLogin: localStorage.getItem('userinfo') ? true : false,
    userinfo: localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')) : undefined,
})

const getters = {
    isLogin: (state) => {
        return state.isLogin
    },
    userinfo: (state) => {
        return state.userinfo
    },
    token: (state) => {
        return state.userinfo ? state.userinfo.token : ''
    }
}

const actions = {
    set ({ commit }, value) {
        commit('set', value)
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
    logout (state) {
        localStorage.removeItem('userinfo')
        state.isLogin = false
        state.userinfo = undefined
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
