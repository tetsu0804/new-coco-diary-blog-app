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
  let hour_options
  let minute_options
  let hour_first_value
  let minute_first_value

  hour_options = []
  minute_options = []
  hour_first_value = { value: null, text: 'hour'}
  minute_first_value = { value: null, text: 'minute'}

  for(let i = 0; i < 60; i++) {
    const hour_num = { value: '', text: ''}
    const minute_num = { value: '', text: ''}

    if(i < 24 ) {
      hour_num.value = i + 1
      hour_num.text = i + 1
      hour_options.push(hour_num)
    }

    minute_num.value = i + 1
    minute_num.text = i + 1
    minute_options.push(minute_num)
  }

  hour_options.unshift(hour_first_value)
  minute_options.unshift(minute_first_value)

  beforeEach(() => {
    actions = {
      doFetchBlogs: jest.fn((id, title, content, user_id, created_at) => {
        let blog_new = { id: id, title: title, content: content, user_id: user_id, created_at: created_at}
        store.state.blogs.push(blog_new)
      }),
      doFetchShits: jest.fn((id, shit_time, blog_id, created_at) => {
          let shit_new = { id: id, shit_time: shit_time, blog_id: blog_id, created_at: created_at}
          store.state.shits.push(shit_new)
      })
    }

    store = new Vuex.Store({
      state: {
        id: 1,
        last_name: '吉田',
        first_name: '哲朗',
        email: 'test@test.com',
        signIn: true,
        blogs: [],
        shits: []
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
            file: '',
            houred: null,
            minuted: null,
            hour_options,
            minute_options,
            time_now: new Date()
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
    blog_new_wrapper.setData({
      houred: 10 + 9,
      minuted: 10
    })

    blog_new_wrapper.find('#shit_new_hour').trigger('change')
    console.log(blog_new_wrapper.vm.time_now)
    console.log(blog_new_wrapper.vm.houred)
    console.log(blog_new_wrapper.vm.minuted)
    // ブログ作成ボタンを押す
    blog_new_wrapper.find('#new_blog_create').trigger('submit')
    // レスポンスの値を作成
    response_get_blog = { blog: {id: 1, title: blog_new_wrapper.vm.title, content: blog_new_wrapper.vm.content, user_id: blog_new_wrapper.vm.user_id, created_at: new Date('2020-10-29T03:24:00')}, shit: { id: 1, shit_time: blog_new_wrapper.vm.time_now, blog_id: 1, created_at: new Date('2020-10-29T03:24:00')} }
    //  axios.postでのレスポンスを作成
    response_get_bloging = axios.post.mockResolvedValue(response_get_blog)
    // axiosでの非同期通信
    axios_get_blog = await response_get_bloging()
    // actionsメソッドでstore.state.blogsを作成
    actions.doFetchBlogs(axios_get_blog.blog.id, axios_get_blog.blog.title, axios_get_blog.blog.content, axios_get_blog.blog.user_id, axios_get_blog.blog.created_at)
    // actionsメソッドでstore.state.shitsを作成
    actions.doFetchShits(axios_get_blog.shit.id, axios_get_blog.shit.shit_time, axios_get_blog.shit.blog_id, axios_get_blog.shit.created_at)
    // store.state.blogsが作成されたか確認
    expect(store.state.blogs[0].id).toBe(1)
    expect(store.state.blogs[0].title).toEqual('今日も元気なここちゃん')
    expect(store.state.blogs[0].content).toEqual('毎日絵理子と遊んでいることが幸せのようだ')
    expect(store.state.blogs[0].user_id).toBe(1)
    expect(store.state.blogs[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
    // store.state.shitsの値の確認
    expect(store.state.shits[0].id).toBe(1)
    expect(store.state.shits[0].shit_time).toEqual(blog_new_wrapper.vm.time_now)
    expect(store.state.shits[0].blog_id).toBe(1)
    expect(store.state.shits[0].created_at).toEqual(new Date('2020-10-29T03:24:00'))
    expect(store.state.shits.length).toBe(1)

  })
})
