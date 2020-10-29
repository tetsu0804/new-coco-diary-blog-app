import { shallowMount, createLocalVue } from '@vue/test-utils'
import BlogNew from '@/BlogNew'
import Vuex from 'vuex'
import axios from 'axios'

let blogNewLocalVue = createLocalVue()
blogNewLocalVue.use(Vuex)

jest.mock('axios')

describe('Blogの作成', () => {
  let store
  let actions
  let $route
  let response_get_blog
  let response_get_bloging
  let axios_get_blog

  beforeEach(() => {
    actions = {
      doFetchBlogs: jest.fn((id, title, content, user_id, created_at) => {
        let blog_new = { id: id, title: title, content: content, user_id: user_id, created_at: created_at}
        store.state.blogs.push(blog_new)
      })
    }

    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        email: 'test@test.com',
        signIn: true,
        blogs: []
      },
      actions
    })

    $route = {
      path: '/blog_new'
    }



  })

  it('作成成功', async() => {

    const blog_new_wrapper = shallowMount(BlogNew, { store, blogNewLocalVue,
        data() {
          return {
            title: '',
            content: '',
            user_id: store.state.id,
            uploadImage: '',
            file: ''
          }
        },
        mocks: {
          $route,
          $store: store
        }
      })
    //dataへ値をいれる
    blog_new_wrapper.setData({
      title: '今日も元気なここちゃん',
      content: '毎日絵理子と遊んでいることが幸せのようだ',
    })
    // ブログ作成ボタンを押す
    blog_new_wrapper.find('#new_blog_create').trigger('submit')
    // レスポンスの値を作成
    response_get_blog = { id: 1, title: blog_new_wrapper.vm.title, content: blog_new_wrapper.vm.content, user_id: blog_new_wrapper.vm.user_id, created_at: new Date('2020-10-29T03:24:00') }
    //  axios.postでのレスポンスを作成
    response_get_bloging = axios.post.mockResolvedValue(response_get_blog)
    // axiosでの非同期通信
    axios_get_blog = await response_get_bloging()

    // doFetchBlogs: jest.fn((id, title, content, user_id, created_at) => {
    //   let blog_new = { id: id, title: title, content: content, user_id: user_id, created_at: created_at}
    //   store.state.blogs.push(blog_new)
    // actionsメソッドでstore.state.blogsを作成

    actions.doFetchBlogs(axios_get_blog.id, axios_get_blog.title, axios_get_blog.content, axios_get_blog.user_id, axios_get_blog.created_at)
    // store.state.blogsが作成されたか確認
    expect(store.state.blogs[0].id).toBe(1)
    expect(store.state.blogs[0].title).toEqual('今日も元気なここちゃん')
    expect(store.state.blogs[0].content).toEqual('毎日絵理子と遊んでいることが幸せのようだ')
    expect(store.state.blogs[0].user_id).toBe(1)
    expect(store.state.blogs[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
  })
})
