<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <b-row>
          <b-col offset="1" cols="10" sm="5" class="blog-show-title text-info">作成日: {{ blog.created_at}}</b-col>
          <b-col offset="1" cols="10" offset-sm="0" sm="5" class="blog-show-title text-info">作成者: {{ user.last_name + user.first_name}}さん</b-col>
          <b-col offset="1" cols="10" class="blog-show-title text-info">タイトル: {{ blog.title}}</b-col>
        </b-row>

        <b-card
          :title="blog.title"
          :img-src="blog.blog_image"
          :img-alt="blog.title"
          img-top
          tag="article"
          style="max-width: 80%; margin: 15px auto"
          class=""
        >
          <b-card-text>
            {{ blog.content }}
          </b-card-text>

          <b-row>
            <b-col cols="12" sm="4" class="blog-show-btn">
              <router-link :to="{ name: 'Home'}" class="btn btn-info blog-show-child-btn">トップページ</router-link>
            </b-col>
            <b-col cols="12" sm="4" class="blog-show-btn">
              <router-link :to="{ name: 'BlogEdit', params: { id: blog.id }}" class="btn btn-info blog-show-child-btn">編集</router-link>
            </b-col>
            <b-col cols="12" sm="4" class="blog-show-btn-delete">
              <b-button v-on:click="blogDelete" variant="danger" class="blog-delete">削除</b-button>
            </b-col>
          </b-row>
        </b-card>
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
    mounted() {
      axios.get(`/api/v1/blogs/${this.$route.params.id}`)
      .then(response => {
        this.blog = response.data.blog
        this.user = response.data.user
      })
    },
    methods: {
      blogDelete() {
        axios.delete(`/api/v1/blogs/${this.blog.id}`)
        .then(response => {
          this.$store.dispatch('doFetchNumberDeleteBlogs', this.blog.id)
          this.$router.push({name: 'Home'})
        })
      }
    }
  }
</script>

<style scoped>
  .blog-show-btn {
  }
  .blog-show-child-btn {
    width: 100%;
    margin: 5px 0;
  }
  .blog-delete {
    width: 100%;
    margin: 5px 0;
  }
  .blog-show-title {
    border: solid 1px #5bc0de;
    margin-top: 10px;
  }
</style>
