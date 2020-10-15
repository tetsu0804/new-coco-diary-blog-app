<template>
  <div>
    <form v-on:submit="onSubmit">
      登録
      <p>性</p>
      <input v-model="last_name">
      <p>名前</p>
      <input v-model="first_name">
      <p>email</p>
      <input v-model="email">

      <button type="submit">登録</button>
    </form>

    <div v-for="user in users" :key="user.id">
      <p>{{ user.last_name }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        last_name: '',
        first_name: '',
        email: '',
        users: []
      }
    },
    mounted() {
      axios.get('/api/v1/users')
      .then(response => {
        this.users = response.data.users
      })
    },
    methods: {
      onSubmit() {
        axios.post('/api/v1/user', { last_name: this.last_name, first_name: this.first_name, email: this.email})
        .then(response => {
          this.last_name = ""
          this.first_name = ""
          this.email = ""
        })
      }
    }
  }
</script>
