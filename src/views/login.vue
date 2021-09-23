<template>
  <p @click="Login()">登陆</p>
</template>

<script>
export default {
methods:{
    Login(){
        this.$router.push('/layout')
    }
}
}
</script>

<style>

</style>