<template>
  <div id="app">
    <Nav/>
    <div id="view-container" class="mx-2">
      <router-view/>
    </div>
    <a href='https://www.freepik.com/vectors/background' style="display: none;">Background vector created by upklyak - www.freepik.com</a>
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
}
</script>