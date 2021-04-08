<template>
  <div id="app">
    <Nav/>
    <div id="view-container"  class="mx-2">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav'
// import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Nav
    // Footer
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  }
};
</script>