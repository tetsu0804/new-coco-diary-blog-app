import { shallowMount, createLocalVue } from '@vue/test-utils'
import BlogEdit from '@/BlogEdit'
import Vuex from 'vuex'
import Router from 'vue-router'
import axios from 'axios'

const blogEditLocalVue = createLocalVue()
blogEditLocalVue.use(Vuex, Router)

jest.mock('axios')

describe('BlogEdit', () => {
  let store
  let actions
  let get_user
  let get_blog
  let response_get_object
  let response_patch_object
  let axios_object
  let $route
  let edit_blog
  let axios_edit_blog
  let edit_hour_options
  let edit_minute_options
  let hour_edit_first_value
  let minute_edit_first_value

  edit_hour_options = []
  edit_minute_options = []
  hour_edit_first_value = { value: null, text: 'hour'}
  minute_edit_first_value = { value: null, text: 'minute'}

  for(let i = 0; i < 60; i++) {
    const edit_hour = { value: '', text: ''}
    const edit_minute = { value: '', text: ''}

    if(i < 24 ) {
      edit_hour.value = i + 1
      edit_hour.text = i + 1
      edit_hour_options.push(edit_hour)
    }

    edit_minute.value = i + 1
    edit_minute.text = i + 1
    edit_minute_options.push(edit_minute)
  }

  edit_hour_options.unshift(hour_edit_first_value)
  edit_minute_options.unshift(minute_edit_first_value)

  get_user = {
    id: 1,
    last_name: '吉田',
    first_name: '哲朗',
    email: 'test@test.com'
  }

  get_blog = {
    id: 1,
    title: '昨日のここちゃん',
    content: '昨日も可愛かったよ',
    user_id: 1,
    created_at: new Date('2020-10-29T03:24:00')
  }

  beforeEach( async() => {
    actions = {
      doFetchEditBlogs: jest.fn((id, title, content, user_id, created_at) => {
        const edit_blog_result = store.state.blogs.filter((result) => {
          return result.id === id
        })

        for(let i = 0; i < store.state.blogs.length; i++) {
          if(store.state.blogs[i].id === edit_blog_result[0].id) {
            store.state.blogs[i].id = id,
            store.state.blogs[i].title = title,
            store.state.blogs[i].content = content,
            store.state.blogs[i].user_id = user_id,
            store.state.blogs[i].created_at = created_at
          }
        }
      }),
      doFetchShits: jest.fn((id, shit_time, blog_id, created_at) => {
        let shit_value = { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at }
        store.state.shits.push(shit_value)
      })
    }

    store = {
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        email: 'test@test.com',
        signIn: true,
        blogs: [ { id: 1, title: '昨日のここちゃん', content: '昨日も可愛かったよ', user_id: 1, created_at: new Date('2020-10-29T03:24:00')} ],
        shits: []
      },
      actions
    }

    $route = {
      path: '/blog/:id/edit',
      params: { id: 1}
    }

    response_get_object = axios.get.mockResolvedValue({user: get_user, blog: get_blog })
    axios_object = await response_get_object()
  })

  it('BlogEditでstore.stateの値を変更成功', async() => {
    const blog_edit_wrapper = shallowMount(BlogEdit, { store, blogEditLocalVue, axios_object,
      data() {
        return {
          user: axios_object.user,
          blog: axios_object.blog,
          shits: [],
          houred: null,
          minuted: null,
          edit_hour_options,
          edit_minute_options,
          edit_time_now: new Date()
        }
      },
      mocks: {
        $route
      }
    })
    // store.state.blogsの値を悪人
    expect(store.state.blogs[0].id).toBe(1)
    expect(store.state.blogs[0].title).toEqual('昨日のここちゃん')
    expect(store.state.blogs[0].content).toEqual('昨日も可愛かったよ')
    expect(store.state.blogs[0].user_id).toBe(1)
    expect(store.state.blogs[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
    // blog_edit_wrapper.vmの値を確認する
    expect(blog_edit_wrapper.vm.blog.id).toBe(1)
    expect(blog_edit_wrapper.vm.blog.title).toEqual('昨日のここちゃん')
    expect(blog_edit_wrapper.vm.blog.content).toEqual('昨日も可愛かったよ')
    expect(blog_edit_wrapper.vm.blog.user_id).toBe(1)
    expect(blog_edit_wrapper.vm.blog.created_at).toEqual(new Date('2020-10-29T03:24:00'))
    // blog_edit_wrapper.vm.houredとminutedの値を変更
    blog_edit_wrapper.setData({
      houred: 11 + 9,
      minuted: 20
    })
    // selectedをchangeする
    blog_edit_wrapper.find('#edit_shit_hour').trigger('change')

    // blog_edit_wrapper.vmの値を変更する
    blog_edit_wrapper.setData({ blog: { title: '今日のここちゃん', content: '今日も可愛かったよ'}})
    // ブログ編集完了ボタンをクリック
    blog_edit_wrapper.find('.on-blogedit-btn').trigger('submit')
    // let delete_blog
    // let axios_delete_blog
    // blog_edit_warpper.vmの値でaxiosでのレスポンスの値をいれる
    response_patch_object = { blog: { id: blog_edit_wrapper.vm.blog.id, title: blog_edit_wrapper.vm.blog.title, content: blog_edit_wrapper.vm.blog.content, user_id: blog_edit_wrapper.vm.blog.user_id, created_at: blog_edit_wrapper.vm.blog.created_at }, shit: { id: 1, shit_time: blog_edit_wrapper.vm.edit_time_now, blog_id: blog_edit_wrapper.vm.blog.id, created_at: new Date('2020-10-29T03:24:00') } }
    edit_blog = axios.patch.mockResolvedValue(response_patch_object)
    // 非同期通信している
    axios_edit_blog = await edit_blog()
    // actionsメソッドでstore.state.blogsの値を変更する
     actions.doFetchEditBlogs(axios_edit_blog.blog.id, axios_edit_blog.blog.title, axios_edit_blog.blog.content, axios_edit_blog.blog.user_id, axios_edit_blog.blog.created_at)
     // actionsメソッドでstore.state.shitsの値を変更する
     actions.doFetchShits(axios_edit_blog.shit.id, axios_edit_blog.shit.shit_time, axios_edit_blog.shit.blog_id, axios_edit_blog.shit.created_at)
    // store.state.blogsの値が変更された確認
    expect(store.state.blogs[0].id).toBe(1)
    expect(store.state.blogs[0].title).toEqual('今日のここちゃん')
    expect(store.state.blogs[0].content).toEqual('今日も可愛かったよ')
    expect(store.state.blogs[0].user_id).toBe(1)
    expect(store.state.blogs[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
    //  store.state.shitsの値を確認
    expect(store.state.shits[0].id).toBe(1)
    expect(store.state.shits[0].shit_time).toEqual(blog_edit_wrapper.vm.edit_time_now)
    expect(store.state.shits[0].blog_id).toBe(1)
    expect(store.state.shits[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
    expect(store.state.shits.length).toBe(1)

  })
})
