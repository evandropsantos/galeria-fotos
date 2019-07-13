<template>
  	<article class="container-home">
    	<h1 class="title">{{ titulo }}</h1>

		<p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

		<input type="search" class="filter" placeholder="Filtrar pelo título da foto" @input="filter = $event.target.value">

    	<ul class="picture-list">
      		<li class="picture-list-item" v-for="foto of filterPictures" v-bind:key="foto._id">
				<my-panel :title="foto.titulo">
					<imagem-responsiva :url="foto.url" :title="foto.titulo" v-meu-transform:rotate.animate="15" />

					<ul class="list-buttons">
						<li>
							<router-link :to="{ name: 'altera', params: { id: foto._id} }">
								<meu-botao tipo="button" rotulo="Alterar" />
							</router-link>
						</li>
						<li>
							<meu-botao 
								tipo="button" 
								rotulo="Remover"
								:confirmacao="true"
								estilo="perigo" 
								@botaoAtivado="remove(foto)"
							/>
						</li>
					</ul>
				</my-panel>
			</li>
    	</ul>
  	</article>
</template>

<script>
	import Painel from '../shared/painel/Painel.vue';
	import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
	import Botao from '../shared/botao/Botao.vue';

	import FotoService from '../../domain/foto/FotoService';

	export default {
		components: {
			'my-panel': Painel,
			'imagem-responsiva': ImagemResponsiva,
			'meu-botao': Botao
		},

		data() {
			return {
				titulo: 'Galeria de fotos',
				fotos: [],
				filter: '',
				mensagem: ''
			}
		},

		computed: {
			
			filterPictures() {
				if( this.filter ) {
					let exp = new RegExp( this.filter.trim(), 'i' );

					return this.fotos.filter( foto => exp.test(foto.titulo) );
				} else {
					return this.fotos;
				}
			}
		},

		methods: {
			remove(foto) {
				
				this.service
				.apaga(foto._id)
				.then( 
					() => {
						let indice = this.fotos.indexOf(foto);
						this.fotos.splice(indice, 1);
						this.mensagem = 'Foto removida com sucesso!'
					}, 
					error => this.mensagem = error.message
				)
			}
		},

		created() {

			this.service = new FotoService(this.$resource);

			this.service
			.lista()
			.then( fotos => this.fotos = fotos, error => this.mensagem = error.message )
		}	
	}
</script>

<style lang="scss">
	.container-home, .picture-list, .list-buttons {
		display: flex;
		justify-content: center;
	}
	
	.container-home { 
		flex-direction: column;
		align-items: center;
	}

	.title {
		font-size: 18px;
		margin: 0;
	}

	.filter {
		width: 50%;
		min-width: 212px;
		height: 35px;
		border-radius: 3px;
		border: 1px solid #CCC;
		padding: 0 3%;
		text-align: center;
		margin: 3%;
	}
	
  	.picture-list { 
		list-style: none;
		padding: 0;
		margin: 0; 

		flex-wrap: wrap;
	}

	.list-buttons {
		list-style: none;
		justify-content: space-between;
		padding: 0;
		width: 100%;
	}

</style>
