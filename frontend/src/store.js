import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		hello: 'Hey I am a state from the Vuex store!',
		mapped: 'Hey I am a mapped state from the vuex store!',
	},
});

export default store;
