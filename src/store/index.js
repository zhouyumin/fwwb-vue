import { createStore } from 'vuex'
const store = createStore({
  state: {
    identify: '',
    company: {},
    employee: {},
    archive:{}
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
    setArchive(state, archive) {
      state.archive = archive
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
    Archive(state){
      return state.archive
    }
  },
  actions: {},
})

export default store
