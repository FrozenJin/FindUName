
export const setIsAuthenticated = ({ commit }, data) => {
  commit('setIsAuthenticated', data);
};

export const setUser = ({ commit }, data) => {
  commit('setUser', data);
};

export const setOpenId = ({ commit }, data) => {
  commit('setOpenId', data);
};

export const setSelectGender = ({ commit }, data) => {
  commit('setSelectGender', data);
};

export const setCanGenName = ({ commit }, data) => {
  commit('setCanGenName', data);
};

export const setOneName = ({ commit }, data) => {
  commit('setOneName', data);
};

// import Vue from 'vue'
export const setLanguageIndex = ({ commit }, data) => {
  // Vue.prototype.$T.setLocaleByIndex(data)
  // Vue.prototype.language = Vue.prototype.$T.getLanguage()
  // console.log(Vue.prototype.language)
  commit('setLanguageIndex', data);
};
