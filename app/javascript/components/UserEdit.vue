<template>
  <div>
    <b-col cols="12" offset-sm="1" sm="10">
      <b-row>
        <b-col cols="12">
          <h4 class="text-center text-info user-edit-top">プロフィール編集画面</h4>
        </b-col>
      </b-row>
      <b-form @submit="userEditSubmit" class="user-edit-top">
        <b-alert show variant="danger" v-show="error">{{ error }}</b-alert>

        <b-form-group
          id="user-edit-input-group-1"
          label="性"
          label-for="user-edit-input-1"
        >
          <b-form-input
            id="user-edit-input-1"
            v-model="user.last_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user-edit-input-group-2" label="名前" label-for="user-edit-input-2">
          <b-form-input
            id="user-edit-input-2"
            v-model="user.first_name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user-edit-input-group-3" label="メールアドレス" label-for="user-edit-input-3">
          <b-form-input
            id="user-edit-input-3"
            v-model="user.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user-edit-group-4" label="パスワード" label-for="user-edit-input-4">
          <b-form-input
            id="user-edit-input-4"
            v-model="user.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="user-edit-input-group-5" label="パスワード入力をもう一度お願いします" label-for="user-edit-input-5">
          <b-form-input
            id="user-edit-input-5"
            v-model="user.password_confirmation"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-row>
          <b-col cols="12" sm="6">
            <router-link :to="{ name: 'UserShow', params: { id: user.id }}" class="btn btn-info user-edit-back-btn user-edit-top">戻る</router-link>
          </b-col>

          <b-col cols="12" sm="6">
            <b-button class="user-edit-top" block variant="info" type="submit">登録</b-button>
          </b-col>
        </b-row>

      </b-form>
    </b-col>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        user: {},
        error: ''
      }
    },
    created() {
      axios.get(`/api/v1/users/${this.$route.params.id}`)
      .then(response => {
        this.user = response.data.user
      })
    },
    methods: {
      userEditSubmit() {
        axios.patch(` /api/v1/users/${this.user.id}`, { last_name: this.user.last_name, first_name: this.user.first_name, email: this.user.email, password: this.user.password, password_confirmation: this.user.password_confirmation })
        .then(response => {
          this.$store.dispatch('doFetchUserId', response.data.user.id)
          this.$store.dispatch('doFetchUserLastName', response.data.user.last_name)
          this.$store.dispatch('doFetchUserFirstName', response.data.user.first_name)
          this.$store.dispatch('doFetchUserEmail', response.data.user.email)
          this.$router.push({ name: 'UserShow', params: { id: response.data.user.id }})
        }).catch(error => {
          this.error = error.response.data
        })
      }
    }
  }
</script>

<style scoped>
  .user-edit-back-btn {
    width: 100%;
  }
  .user-edit-top {
    margin-top: 15px;
  }
</style>
