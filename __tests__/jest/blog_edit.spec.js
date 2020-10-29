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
  let axios_object
  let $route
  let edit_blog
  let axios_edit_blog

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
      })
    }

    store = {
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        email: 'test@test.com',
        signIn: true,
        blogs: [ { id: 1, title: '昨日のここちゃん', content: '昨日も可愛かったよ', user_id: 1, created_at: new Date('2020-10-29T03:24:00')} ]
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
          blog: axios_object.blog
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
    // blog_edit_wrapper.vmの値を変更する
    blog_edit_wrapper.setData({ blog: { title: '今日のここちゃん', content: '今日も可愛かったよ'}})
    // ブログ編集完了ボタンをクリック
    blog_edit_wrapper.find('.on-blogedit-btn').trigger('submit')
    // let delete_blog
    // let axios_delete_blog
    // blog_edit_warpper.vmの値でaxiosでのレスポンスの値をいれる
    edit_blog = axios.patch.mockResolvedValue({id: blog_edit_wrapper.vm.blog.id, title: blog_edit_wrapper.vm.blog.title, content: blog_edit_wrapper.vm.blog.content, user_id: blog_edit_wrapper.vm.blog.user_id, created_at: blog_edit_wrapper.vm.blog.created_at})
    // 非同期通信している
    axios_edit_blog = await edit_blog()
    // actionsメソッドでstore.state.blogsの値を変更する
     actions.doFetchEditBlogs(axios_edit_blog.id, axios_edit_blog.title, axios_edit_blog.content, axios_edit_blog.user_id, axios_edit_blog.created_at)
    // store.state.blogsの値が変更された確認
    expect(store.state.blogs[0].id).toBe(1)
    expect(store.state.blogs[0].title).toEqual('今日のここちゃん')
    expect(store.state.blogs[0].content).toEqual('今日も可愛かったよ')
    expect(store.state.blogs[0].user_id).toBe(1)
    expect(store.state.blogs[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
  })
})
