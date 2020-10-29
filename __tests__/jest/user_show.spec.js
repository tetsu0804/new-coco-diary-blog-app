import { shallowMount, createLocalVue } from '@vue/test-utils'
import UserShow from '@/UserShow'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'

const userShowLocalVue = createLocalVue()
userShowLocalVue.use(Vuex, Router)
jest.mock('axios')

describe('UserShowでのstore.stateのidとaxiosでのuser.idが一致する為削除ボタンがありstoreのデータを削除する', () => {
  let store
  let states
  let $route
  let get_user
  let response_get_user
  let async_get_user
  let actions
  // データベース上にあるデータ
  get_user = {
    id: 1,
    last_name: '吉田',
    first_name: 'こて',
    email: 'test@test.com'
  }

  beforeEach( async() => {
    actions = {
      doFetchUserId: jest.fn(id => store.state.id = id),
      doFetchUserLastName: jest.fn(last_name => store.state.last_name = last_name),
      doFetchUserFirstName: jest.fn(first_name => store.state.first_name = first_name),
      doFetchUserEmail: jest.fn(email => store.state.email = email),
      doFetchUserSignIn: jest.fn(signIn => store.state.signIn = signIn)
    }

    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '吉田',
        first_name: 'こて',
        email: 'test@test.com',
        signIn: true
      },
      actions
    })

    $route =  {
      path: '/user/1',
      params: { id: 1}
    }
    response_get_user = axios.get.mockResolvedValue(get_user)
    async_get_user = await response_get_user()
  })

  it('削除ボタンを押すとstore.stateが削除される', async() => {
    const user_show_wrapper = shallowMount(UserShow, { store, userShowLocalVue, async_get_user,
      data() {
        return {
          user: async_get_user
        }
      },
      computed: {
        user_id: () => store.state.id
      },
      mocks: {
        $route
      }
    })

    expect(user_show_wrapper.vm.user.id).toBe(1)
    //dataのlast_nameがaxios.getした時の値になっているのかを確認
    expect(user_show_wrapper.vm.user.last_name).toEqual('吉田')
    //dataのfirst_nameがaxios.getした時の値になっているのかを確認
    expect(user_show_wrapper.vm.user.first_name).toEqual('こて')
    //dataのemailがaxios.getした時の値になっているのかを確認
    expect(user_show_wrapper.vm.user.email).toEqual('test@test.com')
    // store.stateのidの値を確認
    expect(store.state.id).toBe(1)
    // store.stateのlast_nameの値を確認
    expect(store.state.last_name).toEqual('吉田')
    // store.stateのfirst_nameの値を確認
    expect(store.state.first_name).toEqual('こて')
    // store.stateのemailの値を確認
    expect(store.state.email).toEqual('test@test.com')
    // store.stateのsignInの値を確認
    expect(store.state.signIn).toBe(true)
    // user_idがdata.user.idと位置しているはずなので削除ボタンがあるか確認
    user_show_wrapper.find('#delete-user-show-btn').trigger('click')
    let delete_user = axios.delete.mockClear()
    let axios_delete_user = await delete_user()
    // actionsのメソッドを使用してstore.stateの値を変更している
    actions.doFetchUserId("")
    actions.doFetchUserLastName("")
    actions.doFetchUserFirstName("")
    actions.doFetchUserEmail("")
    actions.doFetchUserSignIn("")
    // actionsしてからのstore.stateの値を確認する
    expect(store.state.id).toBe("")
    expect(store.state.last_name).toBe("")
    expect(store.state.first_name).toBe("")
    expect(store.state.email).toBe("")
    expect(store.state.signIn).toBe("")
  })
})

describe('store.state.idとaxios.getでのidが一致しない為削除ボタンが無い', () => {
  let store
  let $route
  let get_user
  let axios_get_user
  let response_get_user

  get_user = {
    id: 1,
    last_name: '吉田',
    first_name: '哲朗',
    email: 'test@test.com'
  }

  beforeEach( async() => {
    store = new Vuex.Store({
      state: {
        id: 2,
        last_name: '早坂',
        first_name: '絵理子',
        email: 'test1@test.com',
        signIn: true
      }
    })

    $route = {
      path: '/user/1',
      params: { id: 1}
    }

    axios_get_user = axios.get.mockResolvedValue(get_user)
    response_get_user = await axios_get_user()
  })

  it('削除ボタンが無い', () => {
    const user_show_no_store_wrapper = shallowMount(UserShow, { store, userShowLocalVue, response_get_user,
      data() {
        return {
          user: response_get_user
        }
      },
      mocks: {
        $route
      },
      computed: {
        user_id: () => store.state.id
      }
    })
    // 削除ボタンが無いことを確認
    expect(user_show_no_store_wrapper.contains('#delete-user-show-btn')).toBe(false)
  })
})
