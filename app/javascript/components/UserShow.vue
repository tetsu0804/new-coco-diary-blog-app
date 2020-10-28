<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <h4 class="text-center user-show-top text-info">プロフィール画面</h4>

          <b-row class="user-show-top">
            <b-col offset="1" cols="10" offset-sm="0" sm="6" class="user-show-border">
              名前
            </b-col>
            <b-col offset="1" cols="10" offset-sm="0" sm="6" class="user-show-border">
              {{ user.last_name + user.first_name }}
            </b-col>
          </b-row>

          <b-row>
            <b-col offset="1" cols="10" offset-sm="0" sm="6" class="user-show-border">
              email
            </b-col>
            <b-col offset="1" cols="10" offset-sm="0" sm="6" class="user-show-border">
              {{ user.email }}
            </b-col>
          </b-row>

          <b-row id="user_match" v-if="user.id === user_id">
            <b-col offset="1" cols="10" offset-sm="0" sm="4">
              <router-link :to="{ name: 'Home'}" class="btn btn-info user-show-child-btn">トップページ</router-link>
            </b-col>

            <b-col offset="1" cols="10" offset-sm="0" sm="4">
              <router-link :to="{ name: 'UserEdit', params: { id: user.id }}" class="btn btn-info user-show-child-btn">編集</router-link>
            </b-col>

            <b-col offset="1" cols="10" offset-sm="0" sm="4">
              <b-button id="delete-user-show-btn" v-on:click="deleteUserSubmit" class="btn btn-danger user-show-child-btn">削除</b-button>
            </b-col>
          </b-row>
          <b-row v-else>
            <b-col cols="12">
              <router-link :to="{ name: 'Home'}" class="btn btn-info user-show-child-btn">トップページ</router-link>
            </b-col>
          </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

  export default {
    data() {
      return {
        user: {}
      }
    },
    computed: mapState({
      user_id: (state) => state.id
    }),
    created() {
      axios.get(`/api/v1/users/${this.$route.params.id}`)
      .then(response => {
        this.user = response.data.user
      })
    },
    mounted() {
    },
    methods: {
      deleteUserSubmit() {
        axios.delete(`/api/v1/users/${this.user.id}`)
        .then(response => {
          document.cookie = "cookie=; max-age=0"
          document.cookie = "signIn=; max-age=0"
          this.$store.dispatch('doFetchUserId', "")
          this.$store.dispatch('doFetchUserLastName', "")
          this.$store.dispatch('doFetchUserFirstName', "")
          this.$store.dispatch('doFetchUserEmail', "")
          this.$store.dispatch('doFetchUserSignIn', "")
          this.$router.push({ name: 'Home' })
        })
      }
    }
  }
</script>

<style scoped>
  .user-show-top {
    margin-top: 15px;
  }
  .user-show-border {
    border-bottom: solid 1px rgb(224, 224, 224);
    height: 50px;
    line-height: 50px;
  }
  .user-show-child-btn {
    width: 100%;
    margin: 5px 0;
  }
</style>
