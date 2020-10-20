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


        <b-button class="on-blog-new-btn" block variant="info" type="submit">ブログ作成</b-button>
      </b-form>
    </b-col>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        title: '',
        content: ''
      }
    },
    mounted() {
    },
    methods: {
      onBlogNewSubmit() {
        axios.post
        this.$store.dispatch('doFetchBlogs', {id: 2, title: this.title, content: this.content})
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
