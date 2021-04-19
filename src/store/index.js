import { createStore } from 'vuex'
const store = createStore({
  state: {
    identify: '',
    company: {},
    employee: {},
    archive: {},
  },
  mutations: {
    USER_OUT(state,n){
      state.identify = n
      state.company = n
      state.employee = n
      state.archive = n
    },
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
  },
  actions: {},
})

export default store
