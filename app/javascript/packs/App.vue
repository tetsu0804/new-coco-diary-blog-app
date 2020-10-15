<template>
  <div id="app">
    <b-container>
      <Header></Header>
      <p>{{ message }}</p>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  data: function () {
    return {
      message: "Hello Vue!"
    }
  },
  components: {
    Header: Header
  }
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
