<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navbar from './views/Navbar.vue'
export default {
  name: 'app',
  components: {
    Navbar,
  }
}
</script>

<style lang="scss">
  nav {
    margin-bottom:10px;
  }
</style>