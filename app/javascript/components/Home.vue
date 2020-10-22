<template>
  <div>
    <b-col cols="12" offset-sm="1" sm="10">
      <div v-for="blog in blogs" :key="blog.id">
        <p>{{blog.title}}</P>
        <b-card
          :img-src="blog.blog_image"
          :img-alt="blog.blog_image"
          img-top
          img-height="360px"
          img-width="320px"
          tag="article"
          style="width: 20rem;"
          border-variant="info"
          >
        </b-card>
      </div>
    </b-col>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        blogs: []
      }
    },
    mounted() {
      axios.get('/api/v1/blogs')
      .then(response => {
        this.blogs = response.data.blogs
      })
    }
  }
</script>
