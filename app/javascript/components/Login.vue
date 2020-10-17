<template>
  <div>
    <b-col cols="12" offset-sm="1" sm="10">
      <div class="text-center text-info h4 login-form-top">ログイン画面</div>
      <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
      <b-form @submit="loginSubmit" class="login-form-top">
        <b-alert show variant="danger" v-show="error">{{ error }}</b-alert>
        <b-form-group
          id="login-input-group-1"
          label="メールアドレス"
          label-for="login-input-1"
        >
          <b-form-input
            id="login-input-1"
            v-model="email"
            type="email"
            required
            placeholder="example@example.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="login-input-group-2" label="パスワード" label-for="login-input-2">
          <b-form-input
            id="login-input-2"
            v-model="password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>
        <b-row>
          <b-col>
            <b-button  block variant="info" type="submit">ログイン</b-button>
          </b-col>

          <b-col>
            <router-link class="btn btn-info login-login-btn":to="{name: 'Signin'}">ユーザー登録</router-link>
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
        email: '',
        password: '',
        error: ''
      }
    },
    created() {
      this.checkLogin()
    },
    updated() {
      this.checkLogin()
    },
    methods: {
      loginSubmit() {
        this.$http.plan.post('/api/v1/login', { email: this.email, password: this.password})
        .then(response => {
          this.fetchLogin(response)
          this.loginTrue(document.cookie)
          this.email = ''
          this.password = ''
          this.$router.push('/')
        }).catch(error => {
          this.loginFailure(error)
        })
      },
      fetchLogin(response) {
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
      loginFailure(error) {
        this.error = (error.response && error.response.data && error.response.data.config) || "メールアドレスもしくはパスワードが違う為ログインできません"
        document.cookie = "cookie=; max-age=0"
        document.cookie = "signIn=; max-age=0"
      },
      loginTrue(data) {
        let login_presents = data.split(';')
        let login_trim_boxs = []
        for (let i = 0; i < login_presents.length; i++) {
          login_trim_boxs.push(login_presents[i].trim())
        }

        if (login_trim_boxs.includes('signIn=true')) {
          this.$store.dispatch('doFetchUserSignIn', true)
        } else {
          this.loginFailure(data)
        }
      },
      checkLogin() {
        let login_check_cookie = document.cookie.split(';')
        let login_check_trim_box = []
        for (let i = 0; i < login_check_cookie.length; i++) {
          login_check_trim_box.push(login_check_cookie[i].trim())
        }
        if(login_check_trim_box.includes("signIn=true")) {
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>
  .login-form-top {
    margin-top: 15px;
  }
  .login-login-btn {
    width: 100%;
  }
</style>
