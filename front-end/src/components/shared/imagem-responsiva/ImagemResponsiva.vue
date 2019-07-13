<template>
    <img class="response-image" :src="url" :alt="title">
</template>

<script>
    export default {
        props: ['url', 'title']
    }
</script>

<style lang="scss" scoped>
    .response-image { 
        width: 100%; 
        height: auto;
    }

</style>


