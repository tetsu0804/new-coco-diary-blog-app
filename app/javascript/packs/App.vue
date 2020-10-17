<template>
  <div id="app">
    <b-container fluid>
      <Header></Header>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {
    Header: Header
  }
}
</script>

<style scoped>
@import '../bootstrap/scss/_variables.scss'
  p {
    background-color: rgb(254, 103, 20);
  }
  h1 {
    background-color: rgb(134, 115, 252);
  }
  .msg {
    background-color: rgb(11, 79, 43);
    text-align: center;
  }
</style>
