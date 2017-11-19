import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


const state = {  // 状态声明
	header:true,
	loading:false
}

const getters = {   // 被认为是store的计算属性，本例使用map
	headerShow:(state) => {
		return state.header;
	},
	loading:(state) => {
		return state.loading;
	}
}

const mutations = {   // 更改store状态，同步的
	showHeader(state){
		state.header = true;
	},
	hideHeader(state){
		state.header = false;
	},
	showLoading(state){
		state.loading = true;
	},
	hideLoading(state){
		state.loading = false;
	}
}

const actions = {  // 更改store状态的唯一方法是提交mutation,包含异步操作
	showHeader:({commit}) => {
		commit('showHeader');
	},
	hideHeader:({commit}) => {
		commit('hideHeader');
	},
	showLoading:({commit}) => {
		commit('showLoading');
	},
	hideLoading:({commit}) => {
		commit('hideLoading');
	}
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})











