<template>
  <div class="sticky-top">
    <b-row v-if="signIn === true">
      <b-col cols="12">
        <b-navbar toggleable="lg" type="dark" variant="info">
          <router-link :to="{name: 'Home'}" class="text-white"> COCO Diary</router-link>
          <router-link v-if="last_name" :to="{ name: 'UserShow', params: {id: id}}" class="text-white" style="margin-left: 15px;">{{ last_name + first_name + 'さん'}}</router-link>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item class="text-white" v-on:click="userLogout">ログアウト</b-nav-item>
              <router-link class="blog-new header-user-name" :to="{ name: 'BlogNew' }">ブログ作成</router-link>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

  export default {
    computed: mapState({
      id: state => state.id,
      last_name: state => state.last_name,
      first_name: state => state.first_name,
      signIn: state => state.signIn
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

<style scoped>
  .header-user-name {
    margin-top: 9px;
    margin-left: 15px;
    color:  white;
  }
</style>
