<template>
  <div id="app">
    <show-at breakpoint="smallAndAbove">
      <NavMobile/>
    </show-at>
    <hide-at breakpoint="small">
      <Nav/>
    </hide-at>
    <div id="view-container" class="m-2">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav'
import NavMobile from './components/NavMobile'
import {showAt, hideAt} from 'vue-breakpoints'

export default {
  name: 'App',
  components: {
    Nav,
    NavMobile,
    hideAt,
    showAt
  },
  beforeCreate: function() {
    this.$store.dispatch('authenticate')
  }
}
</script>