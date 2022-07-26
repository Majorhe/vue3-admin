<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  created() {
    // 设置深色模式 / 浅色模式
    const config = this.$store.getters['config/config']
    if(config && config.theme == 'dark'){
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/index.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
}
</style>
