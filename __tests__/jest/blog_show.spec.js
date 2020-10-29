import { shallowMount, createLocalVue } from '@vue/test-utils'
import BlogShow from '@/BlogShow'
import Vuex from 'vuex'
import axios from 'axios'

const blogShowLocalVue = createLocalVue()
blogShowLocalVue.use(Vuex)

jest.mock('axios')

describe('BlogShow', () => {
  let store
  let actions
  let $route
  let get_user
  let get_blog
  let response_get_user
  let response_get_blog
  let axios_get_user
  let axios_get_blog
  let response_get_object
  let axios_get_object
  let delete_blog
  let delete_axios

  get_user = {
    id: 1,
    last_name: '吉田',
    first_name: '哲朗',
    email: 'test@test.com'
  }

  get_blog = {
    id:1,
    title: '今日のここすけ',
    content: '元気に遊びまわるここ助である',
    user_id: 1,
     created_at: new Date('2020-10-29T03:24:00')
  }

  beforeEach( async() => {
    actions = {
      doFetchNumberDeleteBlogs: jest.fn(id => {
        const filter_blog = store.state.blogs.filter((result) => {
          return result.id === id
        })

        for(let i = 0; i < store.state.blogs.length; i++) {
          if(store.state.blogs[i].id === filter_blog[0].id) {
            store.state.blogs.splice(i, 1)
          }
        }
      })
    }

    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        email: 'test@test.com',
        signIn: true,
        blogs: [{id:1, title: '今日のここすけ', content: '元気に遊びまわるここ助である', user_id: 1, created_at: new Date('2020-10-29T03:24:00')} ]
      },
      actions
    })

    $route = {
      path: '/blog/1',
      params: { id: 1}
    }

    response_get_object = axios.get.mockResolvedValue({user: get_user, blog: get_blog})
    axios_get_object = await response_get_object()

  })

  it('store.state.blog.user_idとcomputedでのidが合致していると削除ボタンがありblogの削除成功', async() => {
    const blog_show_wrapper = shallowMount(BlogShow, { store, axios_get_object,
      data() {
        return {
          blog: axios_get_object.blog,
          user: axios_get_object.user
        }
      },
      mocks: {
        $route,
      },
      computed: {
        id: () => store.state.id,
        last_name: () => store.state.last_name,
        first_name: () => store.state.first_name,
        email: () => store.state.email,
      }
    })

    // store.state.blogがあるか確認
    expect(store.state.blogs[0].id).toBe(1)
    expect(store.state.blogs[0].title).toEqual('今日のここすけ')
    expect(store.state.blogs[0].content).toEqual('元気に遊びまわるここ助である')
    expect(store.state.blogs[0].user_id).toBe(1)
    expect(store.state.blogs[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
    expect(store.state.blogs.length).toBe(1)
    // axios.getの値がblog_show_wrapper.vm.に入ってる事を確認
    expect(blog_show_wrapper.vm.blog.id).toBe(1)
    expect(blog_show_wrapper.vm.blog.title).toEqual('今日のここすけ')
    expect(blog_show_wrapper.vm.blog.content).toEqual('元気に遊びまわるここ助である')
    expect(blog_show_wrapper.vm.blog.user_id).toBe(1)
    expect(blog_show_wrapper.vm.blog.created_at).toEqual(new Date('2020-10-29T03:24:00'))
    expect(blog_show_wrapper.vm.user.id).toBe(1)
    expect(blog_show_wrapper.vm.user.last_name).toEqual('吉田')
    expect(blog_show_wrapper.vm.user.first_name).toEqual('哲朗')
    expect(blog_show_wrapper.vm.user.email).toEqual('test@test.com')

    // blog削除ボタンを取得
    let blog_delete_btn = blog_show_wrapper.find('.blog-delete')
    // blog削除ボタンがあるか確認
    expect(blog_delete_btn.text()).toEqual('削除')
    // blog削除ボタンをクリック
    blog_delete_btn.trigger('click')
    // axiosでブログを削除している
    delete_blog = axios.delete.mockClear()
    delete_axios = await delete_blog()
    // actionsメソッドでstore.state.blogsのblogを削除
    actions.doFetchNumberDeleteBlogs(blog_show_wrapper.vm.blog.id)
    // store.state.blogsの値の確認
    expect(store.state.blogs[0]).toBe(undefined)
    expect(store.state.blogs.length).toBe(0)
    })
})
