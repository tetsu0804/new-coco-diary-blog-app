<template>
  <div>
    <b-col cols="12" offset-sm="1" sm="10">
    <div class="text-center text-info h4 signin-form-top">ユーザー登録作成</div>
    <b-form @submit="signupSubmit" class="signin-form-top">
      <b-alert show variant="danger" v-show="error">{{ error }}</b-alert>
      <b-form-group
        id="signup-input-group-1"
        label="性"
        label-for="signup-input-1"
      >
        <b-form-input
          id="signup-input-1"
          v-model="last_name"
          type="text"
          required
          placeholder="田中"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="signup-input-group-2" label="名前" label-for="signup-input-2">
        <b-form-input
          id="signup-input-2"
          v-model="first_name"
          type="text"
          required
          placeholder="太郎"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="signup-input-group-3" label="メールアドレス" label-for="signup-input-3">
        <b-form-input
          id="signup-input-3"
          v-model="email"
          type="email"
          required
          placeholder="example@example.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="signup-input-group-4" label="パスワード" label-for="signup-input-4">
        <b-form-input
          id="signup-input-4"
          v-model="password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="signup-input-group-5" label="パスワード入力をもう一度お願いします" label-for="signup-input-5">
        <b-form-input
          id="signup-input-5"
          v-model="password_confirmation"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-row>
        <b-col cols="12" sm="6">
          <router-link class="btn btn-info signup-signup-btn signin-form-top" :to="{name: 'Login'}">ログイン</router-link>
        </b-col>
        
        <b-col cols="12" sm="6">
          <b-button class="on-signup-btn signin-form-top" block variant="info" type="submit">登録</b-button>
        </b-col>
      </b-row>

    </b-form>
    </b-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        last_name: '',
        first_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error: ''
      }
    },
    mounted() {

    },
    created() {
      this.checkSignup()
    },
    updated() {
      this.checkSignup()
    },
    methods: {
      signupSubmit() {
        this.$http.plan.post('/api/v1/user', {last_name: this.last_name, first_name: this.first_name, email: this.email, password: this.password, password_confirmation: this.password_confirmation})
        .then(response => {
          this.fetchSignIn(response)
          this.signInTrue(document.cookie)
          this.last_name = ''
          this.first_name = ''
          this.email = ''
          this.password = ''
          this.password_confirmation = ''
          this.$router.push('/')
        }).catch(error => {
          this.signupFailure(error)
        })
      },
      fetchSignIn(response) {
        if( !response.data.cookie ) {
          this.signupFailure(error)
          return
        }
        document.cookie = `cookie=${response.data.cookie}`
        document.cookie = 'signIn=true'
        this.$store.dispatch('doFetchUserId', response.data.user.id)
        this.$store.dispatch('doFetchUserLastName', response.data.user.last_name)
        this.$store.dispatch('doFetchUserFirstName', response.data.user.first_name)
        this.$store.dispatch('doFetchUserEmail', response.data.user.email)
      },
      signupFailure(error) {
        this.error = (error.response && error.response.data && error.response.data.config) || "ユーザー作成に失敗しました"
        document.cookie = "cookie=; max-age=0"
        document.cookie = "signIn=; max-age=0"
      },
      signInTrue(data) {
        let signin_presents = data.split(';')
        let trim_boxs = []
        for (let i = 0; i < signin_presents.length; i++) {
          trim_boxs.push(signin_presents[i].trim())
        }

        if (trim_boxs.includes('signIn=true')) {
          this.$store.dispatch('doFetchUserSignIn', true)
        } else {
          this.signupFailure(data)
        }
      },
      checkSignup() {
        let check_cookie = document.cookie.split(';')
        let check_trim_box = []
        for (let i = 0; i < check_cookie.length; i++) {
          check_trim_box.push(check_cookie[i].trim())
        }
        if(check_trim_box.includes("signIn=true")) {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>
  .signin-form-top {
    margin-top: 15px;
  }
  .signup-signup-btn {
    width: 100%;
  }
</style>
