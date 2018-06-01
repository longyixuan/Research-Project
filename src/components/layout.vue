<template>
    <div id="app">
        <div class="yxl-layout">
            <yxl-header></yxl-header>
            <div class="yxl-main">
                <router-view v-wechat-title="$route.meta.title"/>
            </div>
        </div>
        <yxlLoading :loading="isLoading"></yxlLoading>
    </div>
</template>
<script>
    import yxlHeader from './header'
    import yxlLoading from './loading'
    export default {
        name: 'Layout',
        components: {
            yxlHeader,
            yxlLoading
        },
        computed: {
            isLoading () {
                return this.$store.state.isloading
            }
        }
    }
</script>