<template>
 

    <a-button type="primary" size='large' style="margin:30px 30px;"   @click="Login()">登陆</a-button>
</template>

<script>
  export default {
    methods: {
      Login() {
        this.$router.push('/alvideo')
      }
    }
  }
</script>

 