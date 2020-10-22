<template>
  <div>
    <b-col cols="12" offset-sm="1" sm="10">
      <div class="text-center text-info h4 blog-new-form-top">ブログ作成</div>
      <b-form @submit="onBlogNewSubmit" class="blog-new-form">
        <b-form-group
          id="blog-new-input-group-1"
          label="タイトル"
          label-for="blog-new-input-1"
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

        <b-button class="on-blog-new-btn" block variant="info" type="submit">ブログ作成</b-button>
      </b-form>
    </b-col>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

  export default {
    data() {
      return {
        title: '',
        content: '',
        user_id: this.$store.state.id,
        uploadImage: '',
        file: ''
      }
    },
    mounted() {
debugger
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
        axios.post('/api/v1/blog_new', { title: this.title, content: this.content, user_id: this.user_id, image: this.file })
        .then(response => {
          this.$store.dispatch('doFetchBlogs', { id: response.data.blog.id, title: response.data.blog.title, content: response.data.blog.content, user_id: response.data.blog.user_id, created_at: response.data.blog.created_at })
          this.$router.push('/')
        })
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
