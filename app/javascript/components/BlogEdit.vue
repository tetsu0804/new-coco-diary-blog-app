<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <div class="text-center text-info h4 blog-edit-form-top">ブログ編集</div>

        <b-row>
          <b-col offset="1" cols="10" sm="6" class="blog-show-edit-title text-info blog-edit-form-top" style="margin: 10px auto;">作成日: {{ blog.created_at}}</b-col>
          <b-col offset="1" cols="10" sm="6" class="blog-show-edit-title text-info blog-edit-form-top" style="margin: 10px auto;">作成者: {{ user.last_name + user.first_name}}さん</b-col>
        </b-row>

        <b-form @submit="onBlogEditSubmit" class="blog-edit-form-top">
          <b-form-group
            id="blog-edit-input-group-1"
            label="タイトル"
            label-for="blog-edit-input-1"
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
  export default {
    data() {
      return {
        blog: {},
        user: {}
      }
    },
    created() {
      axios.get(`/api/v1/blogs/${this.$route.params.id}`)
      .then(response => {
        let self = this
        self.blog = response.data.blog
        self.user = response.data.user
      })
    },
    mounted() {
    },
    methods: {
      onBlogEditSubmit() {
        return new Promise((resolve, _) => {
          axios.patch(`/api/v1/blogs/${this.blog.id}`, { title: this.blog.title, content: this.blog.content, user_id: this.blog.user_id})
          .then(response => {
            this.$router.push({ name: 'BlogShow', params: { id: response.data.blog.id }})
          })
        })
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
</style>
