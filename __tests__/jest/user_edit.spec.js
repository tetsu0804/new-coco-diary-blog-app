import { shallowMount, createLocalVue } from '@vue/test-utils'
import UserEdit from '@/UserEdit'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'

let userEditLocalVue = createLocalVue()
userEditLocalVue.use(Vuex, Router)
jest.mock('axios')

describe('store.stateの値の変更', () => {
  let store
  let actions
  let $route
  let get_user
  let response_get_user
  let async_get_user
  let patch_user
  let response_patch_user
  let async_patch_user

  get_user = {
    id: 1,
    last_name: '吉田',
    first_name: '哲朗',
    email: 'test@test.com'
  }

  beforeEach( async() => {

    actions = {
      doFetchUserId: jest.fn(id => store.state.id = id),
      doFetchUserLastName: jest.fn(last_name => store.state.last_name = last_name),
      doFetchUserFirstName: jest.fn(first_name => store.state.first_name = first_name),
      doFetchUserEmail: jest.fn(email => store.state.email = email),
    }

    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        email: 'test@test.com',
        signIn: true
      },
      actions
    })

    $route = {
      path: '/user/1/edit',
      params: { id: 1}
    }

    response_get_user = axios.get.mockResolvedValue(get_user)
    async_get_user = await response_get_user()
  })

  it('store.stateの値変更成功', async() => {
    const user_edit_wrapper = shallowMount(UserEdit, { store, userEditLocalVue, async_get_user,
      data() {
        return {
          user: async_get_user
        }
      },
      mocks: {
        $route
      }
    })

    //store.stateの値を確認
    expect(store.state.id).toBe(1)
    expect(store.state.last_name).toEqual('吉田')
    expect(store.state.first_name).toEqual('哲朗')
    expect(store.state.email).toEqual('test@test.com')
    // user_edit_wrapper.vmのuser.fitst_nameの値だけ変更
    user_edit_wrapper.setData({user: {first_name: '太郎' } })
    // first_nameの値が変わっていることの確認
    expect(user_edit_wrapper.vm.user.first_name).toEqual('太郎')
    // last_nameとemailの値は変更していないことを確認
    expect(user_edit_wrapper.vm.user.last_name).toEqual('吉田')
    expect(user_edit_wrapper.vm.user.email).toEqual('test@test.com')
    // axios.patchでレスポンスをuser_edit_wrapper.vm.userにしている
    patch_user = axios.patch.mockResolvedValue(user_edit_wrapper.vm.user)
    // 非同期通信をしている
    response_patch_user = await patch_user()
    // actionsメソッドでstore.stateの値を変更している
    actions.doFetchUserId(response_patch_user.id)
    actions.doFetchUserLastName(response_patch_user.last_name)
    actions.doFetchUserFirstName(response_patch_user.first_name)
    actions.doFetchUserEmail(response_patch_user.email)
    // store.stateの値が変更しているか確認
    expect(store.state.id).toBe(1)
    expect(store.state.last_name).toEqual('吉田')
    expect(store.state.first_name).toEqual('太郎')
    expect(store.state.email).toEqual('test@test.com')
  })
})
