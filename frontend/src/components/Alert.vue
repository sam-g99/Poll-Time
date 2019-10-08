<template>
	<div :class="{ show: alert.length > 0 }" class="alert" @click="closeAlert">
		{{ alert }}
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['alert']),
	},
	methods: {
		closeAlert() {
			this.$store.state.alert = '';
		},
	},
};
</script>

<style lang="scss" scoped>
.alert {
	background: red;
	color: white;
	position: absolute;
	top: 0;
	right: 0;
	padding: 10px;
	box-shadow: 0px 3px 3px #ccc;
	width: 100%;
	cursor: pointer;
	opacity: 0;
	transition-duration: 0.2s;
}
.show {
	opacity: 1;
}
</style>
