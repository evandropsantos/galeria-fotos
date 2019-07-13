<template>
    <button class="botao" :class="estiloDoBotao" @click="disparaAcao()" :type="tipo">{{ rotulo }}</button>    
</template>

<script>
    export default {
        props: {
            tipo: {
                required: true,
                type: String
            },
            rotulo: {
                required: true,
                type: String
            },
            confirmacao: {
                required: false,
                type: Boolean,
                default: false
            },
            estilo: {
                required: false,
                default: 'padrao',
                type: String
            }
        },

        methods: {
            disparaAcao() {
                if(this.confirmacao) {
                    if( confirm('Confirma?') ) this.$emit('botaoAtivado');
                    return;
                }

                this.$emit('botaoAtivado');
            }
        },

        computed: {
            estiloDoBotao() {
                if(this.estilo === 'padrao' || !this.estilo) { return 'botao-padrao'; }

                if(this.estilo === 'perigo') { return 'botao-perigo'; }
            }
        }
    }
</script>

<style lang="scss" scoped>
   @import './Botao.scss';
</style>
