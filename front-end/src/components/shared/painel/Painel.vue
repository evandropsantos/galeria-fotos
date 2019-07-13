<template>
    <section class="panel">
        <h2 class="panel-title" @dblclick="visivel = !visivel">{{ title }}</h2>

        <transition name="panel-fade">
            <div class="panel-content" v-show="visivel">
                <slot></slot> 
            </div>
        </transition>
    </section>
</template>

<script>
    export default {
        props: ['title'],

        data() {

            return {
                visivel: true
            }
        }
    }
</script>

<style lang="scss" scoped>

    $color-border: #CCC;
    $radius: 3px;
    
    .panel, .panel-title { padding: 5px; }
    
    .panel, .panel-title, img { border-radius: $radius; }

    .panel {
        border: 1px solid $color-border;
        margin: 5px;
        width: 200px;
    }

    .panel-title {
        font-size: 14px;
        font-weight: 400;
        margin: 0;
        background-color: $color-border;
        text-align: center;
        cursor: pointer;
    }

    .panel-content {
        margin-top: 5px;
        min-height: 210px;
        overflow: hidden;
        
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
    }

    .panel-fade-{
        &enter, &leave-active { height: 0; }
        
        &enter-active, &leave-active { transition: height .4s; }
    }

</style>

