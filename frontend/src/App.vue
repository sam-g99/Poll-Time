<template>
	<div id="App">
		<Alert />
		<router-view></router-view>
	</div>
</template>

<script>
import Alert from '@/components/Alert';

export default {
	name: 'App',
	components: { Alert },
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/main.scss';
</style>
