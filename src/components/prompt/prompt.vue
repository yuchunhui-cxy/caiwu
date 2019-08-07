<template>
    <div>
        <img v-if="prompt" src="@/assets/logo.png" alt="" style="position: fixed;bottom: 0;right: 0;">
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                prompt:false
            }
        },
        created(){
            setTimeout(()=>{
                this.prompt = true
            },5000)
        },
    }
</script>

<style scoped>

</style>