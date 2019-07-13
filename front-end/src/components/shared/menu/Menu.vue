<template>
    <nav class="menu">
        <ul>
            <li v-for="route in routes" v-bind:key="route.titulo">
                <router-link :to=" route.path ? route.path : '/' ">{{ route.titulo }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        props: {
            routes: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu {
		position: fixed;
		left: 0;
		top: 0;
		background-color: #CCC;
		width: 100px;
		height: 100%;

		ul { 
			list-style: none;
			padding: 10% 0;
			margin: 0;

			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		a {
			text-decoration: none;
			font-size: 12px;
			color: #666;
			transition: all 0.2s ease-in;
			line-height: 30px;
			text-align: center;
			display: block;
		}

		.router-link-exact-active {
			color: #FFF;
			text-decoration: underline;
			background-color: #666; 
		}
	}
</style>

