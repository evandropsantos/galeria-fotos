<template>
	<div class="register-new-picture">
		<h1 class="title">{{ title }}</h1>

		<h2 v-if="foto._id">Alterando <span>{{ foto.titulo }}</span></h2>
		<h2 v-else>Incluindo</h2>

		<form @submit.prevent="grava()" class="form-register">
			<div class="container">
				<label for="titulo">Título</label>
				<input 
				name="titulo" 
				v-model="foto.titulo" 
				id="titulo" 
				autocomplete="off" 
				v-validate 
				data-vv-rules="required|min:3|max:30" 
				data-vv-as="título">

         		<span class="erro" v-show="errors.has('titulo')">{{ errors.first('titulo') }}</span>
			</div>

			<div class="container">
				<label for="url">URL</label>
        		<input 
				name="url" 
				v-model="foto.url" 
				id="url" 
				autocomplete="off"
				v-validate 
				data-vv-rules="required">

        		<span class="erro" v-show="errors.has('url')">{{ errors.first('url') }}</span>

				<div class="picture-box" v-show="foto.url">
					<imagem-responsiva :url="foto.url" :title="foto.titulo"/>
				</div>
			</div>

			<div class="container">
				<label for="descricao">Descrição</label>
				<textarea id="descricao" autocomplete="off" v-model="foto.descricao"></textarea>
			</div>

			<div class="buttons">
				<meu-botao rotulo="GRAVAR" tipo="submit"/>
				
				<router-link :to="{name: 'home'}"><meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
			</div>
		</form>
	</div>
			
</template>

<script>
	import ImageResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
	import Botao from '../shared/botao/Botao.vue';

	import Foto from '../../domain/foto/Foto';
	import FotoService from '../../domain/foto/FotoService';

	export default {
			
		components: {
			'imagem-responsiva': ImageResponsiva,
			'meu-botao': Botao
		},

		data() {
			return {
				title: 'Cadastrar Nova Foto',
				foto: new Foto(),
				id: this.$route.params.id
			}
		},

		methods: {

			grava() {

				this.$validator.validateAll().then(success => {
					if(success) {
						this.service.cadastra(this.foto).then( () => {
							if(this.id) this.$router.push({ name: 'home'});
							this.foto = new Foto();
						}, error => console.log(error) );
					}
				});
			}
		},

		created() {
			this.service = new FotoService(this.$resource);

			if(this.id) this.service.busca(this.id).then( foto => this.foto = foto );
		}
	}
</script>

<style lang="scss" scoped>
	.register-new-picture {
		margin: 0 auto;
		max-width: 700px;
		text-align: center;
	}

	.title { 
		margin: 0 0 3% 0; 
		font-size: 18px; 
	}

	.form-register {
		background-color: #efeaea;
		border-radius: 3px;
		padding: 20px;
	}

	.container, .buttons { display: flex; }

	.container {
		align-items: center;
		flex-direction: column;

		position: relative;
		margin-top: 15px;
	}

	label {
		font-size: 13px;
		top: -8px;
		left: 10px;
		z-index: 10;
		padding: 0 10px;

		&, &::after { position: absolute; }

		&::after {
			content: "";
			width: 100%;
			height: 2px;
			background-color: white;
			top: 8px;
			left: 0;
			z-index: -1;
		}	
	}
	
	input, textarea, .picture-box {
		border-radius: 3px;
		border: 1px solid #b2b2b2;
		width: 100%;
	}

	input, textarea { padding: 5px 15px; }

	input { height: 30px; }

	textarea {
		overflow-x: hidden;
		overflow-y: auto;
		height: 80px;
	}

	.picture-box {
		padding: 10px;
		margin: 5px 0;
		background-color: white;
	} 

	.buttons { justify-content: flex-end; }

	button { margin-left: 10px; }

	.erro {
		color: red;
		font-size: 12px;
		margin: 5px;
	}

</style>
