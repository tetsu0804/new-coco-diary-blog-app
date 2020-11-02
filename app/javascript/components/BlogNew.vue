<template>
  <div>
    <b-col cols="12" offset-sm="1" sm="10">
      <div class="text-center text-info h4 blog-new-form-top">ブログ作成</div>
      <b-form @submit="onBlogNewSubmit" class="blog-new-form">

        <b-col cols="12">
          <b-card>
            <b-col cols="12">
              うんち時間
            </b-col>
            <b-row>
              <b-col cols="12" sm="6">
                <b-form-select id="shit_new_hour" v-on:change="changeTime" v-model="houred" :options="hour_options" class="blog-new-form-top"></b-form-select>
              </b-col>
              <b-col cols="12" sm="6">
                <b-form-select id="shit_new_minute" v-on:change="changeTime" v-model="minuted" :options="minute_options" class="blog-new-form-top"></b-form-select>
              </b-col>
            </b-row>
          </b-card>
        </b-col>

        <b-form-group
          id="blog-new-input-group-1"
          label="タイトル"
          label-for="blog-new-input-1"
          class="blog-new-form-top"
        >
          <b-form-input
            id="blog-new-input-1"
            v-model="title"
            type="text"
            required
            placeholder="今日のここちゃん"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="blog-new-input-group-2"
          label="日記"
          label-for="blog-new-input-2"
        >
          <b-form-textarea
            id="blog-new-input-2"
            v-model="content"
            placeholder="今日のここちゃんはりっこから新しいおもちゃを買ってもらってご満悦な1日でした"
            rows="9"
            max-rows="12"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          id="blog-new-input-3"
          label-for="blog-new-input-3"
        >
          <b-form-input type="hidden" class="sr-only" id="blog-new-input-3" v-model="user_id"></b-form-input>
        </b-form-group>

        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          placeholder="ここちゃんの可愛い写真を選んでね"
          drop-placeholder="Drop file here..."
          v-on:change="onFileChange()"
        ></b-form-file>

        <b-row>
          <b-col cols="12" sm="6">
            <router-link :to="{ name: 'Home'}" class="btn btn-info on-blog-new-btn blog-new-form-top" style="width: 100%;">戻る</router-link>
          </b-col>
          <b-col cols="12" sm="6">
            <b-button id="new_blog_create" class="on-blog-new-btn blog-new-form-top" block variant="info" type="submit">ブログ作成</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-col>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

const hour_options = []
const minute_options = []
const hour_first_value = { value: null, text: 'hour'}
const minute_first_value = { value: null, text: 'minute'}
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

  export default {
    data() {
      return {
        title: '',
        content: '',
        user_id: this.$store.state.id,
        uploadImage: '',
        file: '',
        houred: null,
        minuted: null,
        hour_options,
        minute_options,
        time_now: new Date()
      }
    },
    created() {
    },
    methods: {
      onFileChange() {
        let eventFile = event.target.files[0] || event.dataTransfer.files
        let reader = new FileReader()
        let self = this
        reader.onload = () => {
          self.uploadImage = event.target.result
          self.file = this.uploadImage
        }
        reader.readAsDataURL(eventFile)
      },
      onBlogNewSubmit() {
        axios.post('/api/v1/blog_new', { title: this.title, content: this.content, user_id: this.user_id, image: this.file, shit_time: this.time_now })
        .then(response => {

          this.$store.dispatch('doFetchBlogs', { id: response.data.blog.id, title: response.data.blog.title, content: response.data.blog.content, user_id: response.data.blog.user_id, created_at: response.data.blog.created_at })

          this.$store.dispatch('doFetchShits', {id: response.data.shit.id, shit_time: response.data.shit.shit_time, blog_id: response.data.shit.blog_id, created_at: response.data.shit.created_at })

          this.$router.push({ name: 'Home'})
        })
      },
      changeTime() {
        this.changeNumber(this.houred, this.minuted)
      },
      changeNumber(hour, minute) {
        return this.time_now.setHours(hour, minute).toDateString()
      }
    }
  }
</script>

<style scoped>
  .blog-new-form-top {
    margin-top: 15px;
  }
  .blog-new-form {
    margin-top: 15px;
  }
</style>
