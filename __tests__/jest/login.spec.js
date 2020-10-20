import { mount, createLocalVue } from "@vue/test-utils"
import Login from "@/Login"
import Vuex from "vuex"
import Router from "vue-router"
import axios from "axios"

const loginLocalVue = createLocalVue()
loginLocalVue.use(Vuex, Router)

jest.mock("axios")

describe('Login', () => {
  let store
  let actions
  let $route
  let userPost
  let userPostResponse
  let user_database

  user_database = {
    id: 1,
    last_name: '吉田',
    first_name: '哲朗',
    email: 'test@test.com',
    password: 'password',
    password_confirmation: 'password'
  }

  beforeEach(() => {
    actions = {
      doFetchUserId: jest.fn(id => store.state.id = id),
      doFetchUserLastName: jest.fn(last_name => store.state.last_name = last_name),
      doFetchUserFirstName: jest.fn(first_name => store.state.first_name = first_name),
      doFetchUserEmail: jest.fn(email => store.state.email = email),
      doFetchUserSignIn: jest.fn(signIn => store.state.signIn = signIn),
    }

    store = new Vuex.Store({
      state: {
        id: '',
        last_name: '',
        first_name: '',
        email: '',
        signIn: ''
      },
      actions
    })

    $route = {
      path: '/login'
    }
  })

  it('Login成功', async() => {
    const loginWrapper = mount(Login, { store, loginLocalVue,
      data() {
        return {
          email: '',
          password: ''
        }
      },
      mocks: {
        $route
      }
    })

    // storeの中身の確認
    expect(store.state.id).toEqual('')
    expect(store.state.last_name).toEqual('')
    expect(store.state.first_name).toEqual('')
    expect(store.state.email).toEqual('')
    expect(store.state.signIn).toEqual('')

    // dataの値を代入する
    loginWrapper.setData({
      email: 'test@test.com',
      password: 'password'
    })
    // ログインボタンをクリック
    loginWrapper.find('.on-login-btn').trigger('submit')

    // axiosでのレスポンスdataを取得
    userPost = axios.post.mockResolvedValue({id: user_database.id, last_name: user_database.last_name, first_name: user_database.first_name, email: user_database.email, password: user_database.password, password_confirmation: user_database.password_confirmation})

    userPostResponse = await userPost()

    // actionsメソッドでstore.stateへ値を代入する
    actions.doFetchUserId(userPostResponse.id)
    actions.doFetchUserLastName(userPostResponse.last_name)
    actions.doFetchUserFirstName(userPostResponse.first_name)
    actions.doFetchUserEmail(userPostResponse.email)
    actions.doFetchUserSignIn(true)

    // store.stateの値を検証する
    expect(store.state.id).toBe(1)
    expect(store.state.last_name).toEqual('吉田')
    expect(store.state.first_name).toEqual('哲朗')
    expect(store.state.email).toEqual('test@test.com')
    expect(store.state.signIn).toBe(true)
  })
})
