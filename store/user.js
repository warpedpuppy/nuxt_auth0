export const state = () => ({
  authenticated: false
})

export const mutations = {
  CHANGE_AUTHENTICATION: (state, data) => {
    state.authenticated = data || false
  }
}

export const getters = {
  authenticated: state => {return state.authenticated }
}
export const strict = false