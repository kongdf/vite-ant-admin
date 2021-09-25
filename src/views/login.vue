<template>
  <p @click="Login()">登陆</p>
</template>

<script>
export default {
methods:{
    Login(){
        this.$router.push('/alvideo')
    }
}
}
</script>

<style>

</style>