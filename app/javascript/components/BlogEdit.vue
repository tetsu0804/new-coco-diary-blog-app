<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <div class="text-center text-info h4 blog-edit-form-top">ブログ編集</div>

        <b-row>
          <b-col offset="1" cols="10" sm="6" class="blog-show-edit-title text-info blog-edit-form-top" style="margin: 10px auto;">作成日: {{ blog.created_at | moment('YYYY年M月D日')}}</b-col>
          <b-col offset="1" cols="10" sm="6" class="blog-show-edit-title text-info blog-edit-form-top" style="margin: 10px auto;">作成者: {{ user.last_name + user.first_name}}さん</b-col>
        </b-row>

        <b-row>
          <b-col v-for="shit in shits" :key="shit.id" offset="1" cols="10" offset-sm="0" sm="12" class="blog-show-edit-title text-info blog-edit-form-top" style="margin: 10px auto; height: 40px; line-height: 40px;">
          うんち時間: {{ shit.shit_time | moment('kk時mm分') }}
          <div v-on:click="shitDelete(shit.id)" class="btn btn-danger shit-delete-btn">削除</div>
          </b-col>
        </b-row>

        <b-form @submit="onBlogEditSubmit" class="blog-edit-form-top">
          <b-row>
            <b-col cols="12">
              <b-card>
                <b-col cols="12">
                  うんち時間:
                </b-col>
                <b-row>
                  <b-col cols="12" sm="6">
                    <b-form-select id="edit_shit_hour" v-on:change="changeTimeEdit" v-model="houred" :options="edit_hour_options" class="blog-edit-form-top"></b-form-select>
                  </b-col>
                  <b-col cols="12" sm="6">
                    <b-form-select id="edit_shit_minute" v-on:change="changeTimeEdit" v-model="minuted" :options="edit_minute_options" class="blog-edit-form-top"></b-form-select>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>

          <b-row class="blog-edit-form-top">
            <b-col cols="6">
              <b-card>
                <b-col cols="12">
                  朝食
                </b-col>
                <b-col cols="12">
                  <b-form-select id="blog_edit_break_first"  v-model="blog.break_first" :options="edit_weight_options" class="blog-new-form-top"></b-form-select>
                </b-col>
              </b-card>
            </b-col>

            <b-col cols="6">
              <b-card>
                <b-col cols="12">
                  夕食
                </b-col>
                <b-col cols="12">
                  <b-form-select id="blog_edit_dinner"  v-model="blog.dinner" :options="edit_weight_options" class="blog-new-form-top"></b-form-select>
                </b-col>
              </b-card>
            </b-col>
          </b-row>

          <b-form-group
            id="blog-edit-input-group-1"
            label="タイトル"
            label-for="blog-edit-input-1"
            class="blog-edit-form-top"
          >
            <b-form-input
              id="blog-edit-input-1"
              v-model="blog.title"
              type="text"
              required
              placeholder="今日のここちゃん"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="blog-edit-input-group-2"
            label="日記"
            label-for="blog-edit-input-2"
          >
            <b-form-textarea
              id="blog-edit-input-2"
              v-model="blog.content"
              placeholder="今日のここちゃんはりっこから新しいおもちゃを買ってもらってご満悦な1日でした"
              rows="9"
              max-rows="12"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            id="blog-edit-input-3"
            label-for="blog-edit-input-3"
          >
            <b-form-input type="hidden" class="sr-only" id="blog-new-input-3" v-model="blog.user_id"></b-form-input>
          </b-form-group>

          <b-row>
            <b-col cols="12" sm="6">
              <router-link :to="{ name: 'BlogShow', params: { id: blog.id}}" class="btn btn-info blog-edit-show-btn blog-edit-form-top">詳細画面</router-link>
            </b-col>
            <b-col cols="12" sm="6">
              <b-button class="on-blogedit-btn blog-edit-form-top" block variant="info" type="submit">ブログ編集完了</b-button>
            </b-col>
          </b-row>

        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

const edit_hour_options = []
const edit_minute_options = []
const edit_weight_options = []
const first_edit_hour_value = { value: null, text: 'hour'}
const first_edit_minute_value = { value: null, text: 'minute'}
const first_edit_weight_value = { value: null, text: 'グラム'}

  for(let i = 0; i < 60; i++) {
    let edit_hour = { value: '', text: '' }
    let edit_minute = { value: '', text: '' }
    let edit_weight = { value: '', text: '' }

    if(i < 24) {
      edit_hour.value = i + 1
      edit_hour.text = i + 1
      edit_hour_options.push(edit_hour)
    }

    edit_minute.value = i + 1
    edit_minute.text = i + 1
    edit_minute_options.push(edit_minute)

    edit_weight.value = i + 1
    edit_weight.text = i + 1
    edit_weight_options.push(edit_weight)
  }
  edit_hour_options.unshift(first_edit_hour_value)
  edit_minute_options.unshift(first_edit_minute_value)
  edit_weight_options.unshift(first_edit_weight_value)

  export default {
    data() {
      return {
        blog: {},
        user: {},
        shits: [],
        houred: null,
        minuted: null,
        edit_hour_options,
        edit_minute_options,
        edit_weight_options,
        edit_time_now: new Date()
      }
    },
    created() {
      axios.get(`/api/v1/blogs/${this.$route.params.id}`)
      .then(response => {
        let self = this
        self.blog = response.data.blog
        self.user = response.data.user
        self.shits = response.data.shits
      })
    },
    mounted() {
    },
    methods: {
      onBlogEditSubmit() {
        return new Promise((resolve, _) => {
          axios.patch(`/api/v1/blogs/${this.blog.id}`, { title: this.blog.title, content: this.blog.content, user_id: this.blog.user_id, break_first: this.blog.break_first, dinner: this.blog.dinner, shit_time: this.edit_time_now })
          .then(response => {
            this.$store.dispatch('doFetchEditBlogs', { id: response.data.blog.id, title: response.data.blog.title, content: response.data.blog.content, user_id: response.data.blog.user_id, created_at: response.data.blog.created_at, break_first: response.data.blog.break_first, dinner: response.data.blog.dinner })

            this.$store.dispatch('doFetchShits', {id: response.data.shit.id, shit_time: response.data.shit.shit_time, blog_id: response.data.shit.blog_id, created_at: response.data.shit.created_at })

            this.$router.push({ name: 'BlogShow', params: { id: response.data.blog.id }})
          })
        })
      },
      shitDelete(shit) {
        axios.delete(`/api/v1/shits/${shit}`)
        .then(response => {
          this.$store.dispatch('doFetchDeleteShit', shit)
          this.$router.push({ name: 'BlogShow', params: { id: this.blog.id }})
        })
      },
      changeTimeEdit() {
        this.changeNumberEdit(this.houred, this.minuted)
      },
      changeNumberEdit(hour, minute) {
        this.edit_time_now.setHours(hour, minute).toDateString()
      }
    }
  }
</script>

<style scoped>
  .blog-edit-form-top {
    margin-top: 15px;
  }
  .blog-show-edit-title {
    border: solid 1px #5bc0de;
  }
  .blog-edit-show-btn {
    width: 100%;
  }
  .shit-delete-btn {
    float: right;
    width: 100px;
    height: 35px;
    margin-top: 1px;
  }
</style>
