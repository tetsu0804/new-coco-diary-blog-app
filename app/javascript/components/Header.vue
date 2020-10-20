<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link :to="{name: 'Home'}" class="text-white"> COCO Diary</router-link>
      <p v-if="last_name" class="header-user-name">{{ last_name + first_name + 'さん'}}</p>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <router-link :to="{name: 'Signup'}">ユーザー登録</router-link>
        <router-link :to="{name: 'Login'}">ログイン</router-link>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="text-white" v-on:click="userLogout">ログアウト</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    computed: mapState({
      last_name: state => state.last_name,
      first_name: state => state.first_name
    }),
    methods: {
      userLogout() {
        this.$http.plan.delete('/api/v1/logout')
        .then(response => {
          this.$store.dispatch('doFetchUserId', '')
          this.$store.dispatch('doFetchUserLastName', '')
          this.$store.dispatch('doFetchUserFirstName', '')
          this.$store.dispatch('doFetchUserEmail', '')
          this.$store.dispatch('doFetchUserSignIn', '')
          document.cookie = "cookie=; max-age=0"
          document.cookie = "signIn=; max-age=0"
          this.$router.push({ name: 'Login' })
        })
      }
    }
  }
</script>
