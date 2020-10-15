<template>
  <div id="app">

    <b-container>
      <Header></Header>
      <p class="msg">{{ message }}</p>
      <h1>H1タグ</h1>
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
