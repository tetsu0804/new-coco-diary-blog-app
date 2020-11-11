<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
      <b-alert show variant="danger" v-if="errorMsg">{{ errorMsg }}</b-alert>
        <b-row>
          <b-col offset="1" cols="10" sm="5" class="blog-show-title text-info">作成日: {{ blog.created_at | moment('YYYY年M月D日')}}</b-col>
          <b-col offset="1" cols="10" offset-sm="0" sm="5" class="blog-show-title">
            <router-link :to="{ name: 'UserShow', params: { id: user.id }}" class="text-info">
              作成者: {{ user.last_name + user.first_name}}さん
            </router-link>
          </b-col>
          <b-col offset="1" cols="10" class="blog-show-title text-info">タイトル: {{ blog.title}}</b-col>

          <b-col v-for="shit in shits" :key="shit.id" offset="1" cols="10" class="blog-show-title text-info">うんち時間: {{ shit.shit_time | moment('kk時mm分') }}</b-col>
          <b-col v-if="blog.break_first" offset="1" cols="10" class="blog-show-title text-info">朝食: {{ blog.break_first}} g</b-col>
          <b-col v-if="blog.dinner" offset="1" cols="10" class="blog-show-title text-info">夕食: {{ blog.dinner}} g</b-col>
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
            <template v-if="blog.user_id === id">
              <b-col cols="12" sm="4" class="blog-show-btn">
                <template v-if="blog">
                  <router-link :to="{ name: 'BlogEdit', params: { id: blog.id }}" class="btn btn-info blog-show-child-btn">編集</router-link>
                </template>
              </b-col>
              <b-col cols="12" sm="4" class="blog-show-btn-delete">
                <b-button v-on:click="blogDelete" variant="danger" class="blog-delete">削除</b-button>
              </b-col>
            </template>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

  export default {
    data() {
      return {
        blog: {},
        user: {},
        shits: [],
        errorMsg: ''
      }
    },
    computed: mapState({
      id: state => state.id,
      last_name: state => state.last_name,
      first_name: state => state.first_name,
      email: state => state.email
    }),
    created() {
      axios.get(`/api/v1/blogs/${this.$route.params.id}`)
      .then(response => {
        let self = this
        self.blog = response.data.blog
        self.user = response.data.user
        self.shits= response.data.shits
      }).catch(error => {
        this.errorMsg = (error.response && error.response.data) || "エラーが発生しました"
      })
    },
    methods: {
      blogDelete() {
        axios.delete(`/api/v1/blogs/${this.blog.id}`)
        .then(response => {
          this.$store.dispatch('doFetchNumberDeleteBlogs', this.blog.id)
          this.$router.push({name: 'Home'})
        }).catch(error => {
          this.errorMsg = (error.response && error.response.data) || "エラーが発生しました"
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
