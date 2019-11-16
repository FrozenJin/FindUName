import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

const state = {
  isAuthenticated: false,
  user: {},
  openId: '',
	selectGender:'',//选中的性别
	canGenName: '',//是否可以生成名字
  oneName:'',//历史内的单个名字选择
  languageIndex: 0,//多语言Index
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
