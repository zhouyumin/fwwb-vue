import { createStore } from 'vuex'
const store = createStore({
  state: {
    identify: '',
    company: {},
    employee: {},
    archive: {},
    aut: {},
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
    setAut(state, aut) {
      state.aut = aut
    },
    setArchive(state, archive) {
      state.archive = archive
    },
    addArchive(state, archive) {
      state.archive.push(archive)
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
    Archive(state) {
      return state.archive
    },
    Aut(state) {
      return state.aut
    },
  },
  actions: {},
})

export default store
