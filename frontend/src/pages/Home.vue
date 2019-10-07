<template>
	<div class="container">
		<div>
			<h1>Sam's Vue Boilerplate</h1>
			<p>Airbnb style guide</p>
			<p>{{ this.$store.state.hello }}</p>
			<p>{{ mapped }}</p>
			<router-link to="page2"> Page 2 </router-link> <br />
			<a
				href="https://github.com/sam-g99/personal-vue-boilerplate"
				target="_blank"
				rel="noopener noreferrer"
			>
				Go to Repo
			</a>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: {
		...mapState(['mapped']),
	},
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';
</style>
