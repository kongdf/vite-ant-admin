<template>
  <router-view></router-view>
</template>
<script  >
export default {
  name: "App",
  components: {},
};
</script>
<style  >
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  height: 100%;
  width: 100%;
}
.f14 {
  font-size: 14px;
}
#nprogress .bar {
  background: #1890ff !important;
}
</style>