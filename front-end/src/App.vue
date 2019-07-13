<template>
  	<section class="container">
		<meu-menu :routes="routes" />

		<transition name="pagina">
			<router-view></router-view>
		</transition>
  	</section>
</template>

<script>
	import { routes } from './routes';
	import Menu from './components/shared/menu/Menu.vue';

	export default {
		components: {
			'meu-menu': Menu
		},
		data() {
			return {
				routes: routes.filter( route => route.menu )
			}
		}
	}
</script>

<style lang="scss">
	* { box-sizing: border-box; }
	
	body {
		font-family: "Helvetica", sans-serif;
		padding: 0;
		margin: 0;
	}

	.container {
		max-width: 750px;
		margin: 0 auto;
	}

	.pagina-{
        &enter, &leave-active { opacity: 0; }
        
        &enter-active, &leave-active { transition: opacity .2s; }
    }

</style>
