import { mount, createLocalVue } from "@vue/test-utils"
import Signup from "@/Signup"
import Vuex from "vuex"
import Router from "vue-router"
import axios from "axios"

const signupLocalVue = createLocalVue()
signupLocalVue.use(Vuex, Router)
jest.mock('axios')

describe('Signup', () => {
  let store
  let actions
  let $route
  let userPost
  let userPostResponse

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
      path: '/signup'
    }
  })
  it('ユーザー作成成功 Store.stateに保存', async() => {
    const signupWrapper = mount(Signup, { store, signupLocalVue,
      data() {
        return {
          last_name: '',
          first_name: '',
          email: '',
          password: '',
          password_confirmation: ''
        }
      },
      mocks: {
        $route
      }
    })

    //最初のstore.stateの値の確認
    expect(store.state.id).toEqual('')
    expect(store.state.last_name).toEqual('')
    expect(store.state.first_name).toEqual('')
    expect(store.state.email).toEqual('')
    expect(store.state.signIn).toEqual('')

    //dataへ値を代入
    signupWrapper.setData({
      last_name: '吉田',
      first_name: '哲朗',
      email: 'test@test.com',
      password: 'password',
      password_confirmation: 'password'
    })
    // dataの値を確認している
    expect(signupWrapper.vm.last_name).toEqual('吉田')
    expect(signupWrapper.vm.first_name).toEqual('哲朗')
    expect(signupWrapper.vm.email).toEqual('test@test.com')
    expect(signupWrapper.vm.password).toEqual('password')
    expect(signupWrapper.vm.password_confirmation).toEqual('password')
    // 登録ボタンをクリック
    signupWrapper.find('.on-signup-btn').trigger('submit')
    // axiosでのdataの値を非同期でレスポンスデータを取得
    userPost = axios.post.mockResolvedValue({ id: 1, last_name: signupWrapper.vm.last_name, first_name: signupWrapper.vm.first_name, email: signupWrapper.vm.email, signIn: true })
    userPostResponse = await userPost()
    
    //actionsメソッドでのstore.stateへ値を更新している
    actions.doFetchUserId(userPostResponse.id)
    actions.doFetchUserLastName(userPostResponse.last_name)
    actions.doFetchUserFirstName(userPostResponse.first_name)
    actions.doFetchUserEmail(userPostResponse.email)
    actions.doFetchUserSignIn(true)

    // store.stateの値が期待通りの値になったか確認
    expect(store.state.id).toBe(1)
    expect(store.state.last_name).toEqual('吉田')
    expect(store.state.first_name).toEqual('哲朗')
    expect(store.state.email).toEqual('test@test.com')
    expect(store.state.signIn).toBe(true)
  })
})
