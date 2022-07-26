const state = () => ({
    config: localStorage.getItem('config') ? JSON.parse(localStorage.getItem('config')) : {}
})

const getters = {
    config: (state) => {
        return state.config
    }
}

const actions = {
    set ({ commit }, value) {
        commit('set', value)
    }
}

const mutations = {
    set (state, value) {
        localStorage.setItem('config', JSON.stringify(value))
        state.config = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
