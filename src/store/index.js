import { createStore } from 'vuex'
const store = createStore({
  state: {
    identify: '',
    company: {},
    employee: {},
  },
  mutations: {
    setIdentify(state, identify) {
      state.identify = identify
    },
    setCompany(state, company) {
      state.company = company
    },
    setEmployee(state, employee) {
      state.employee = employee
    },
  },
  getters: {
    Identify(state) {
      return state.identify
    },
    Company(state) {
      return state.company
    },
    Employee(state) {
      return state.employee
    },
  },
  actions: {},
})

export default store
