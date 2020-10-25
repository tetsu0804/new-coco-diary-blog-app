<template>
  <div>
    <b-row>
      <b-col cols="12" offset-sm="1" sm="10">
        <b-card-group deck :key="i" class="home-top">
          <div v-for="blog in prossingBlogs" :key="blog.id">
            <b-card
              :img-src="blog.blog_image"
              :img-alt="blog.blog_image"
              img-top
              img-height="360px"
              img-width="320px"
              tag="article"
              style="width: 20rem;"
              border-variant="info"
              class="home-top"
              >
              <router-link :to="{ name: 'BlogShow', params: { id: blog.id }}">{{ blog.title }}</router-link>
            </b-card>
          </div>
        </b-card-group>

        <b-col offset="4"  offset-sm="5" ofsset-md="6">
          <paginate
            :page-count="pagesAllNumber"
            :clickHandler="clickCallback"
            :containerClass="'pagination'"
            :prev-text="'前'"
            :next-text="'次'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :prev-link-class="'page-link'"
            :next-class="'page-item'"
            :next-link-class="'page-link'"
            class="home-top"
            >
          </paginate>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        prossingBlogs: [],
        blogs: [],
        pageNumber: 1
      }
    },
    computed: {
      pagesAllNumber() {
        return Math.ceil(this.blogs.length / 9)
      }
    },
    created() {
      axios.get('/api/v1/blogs')
      .then(response => {
        this.blogs = response.data.blogs
        let currentPage = this.pageNumber * 9
        this.prossingBlogs = this.blogs.slice(currentPage - 9, currentPage)
      })
    },
    mounted() {
    },
    methods: {
      clickCallback(n) {
        this.pageNumber = n
        let clickPage = this.pageNumber * 9
        this.prossingBlogs = this.blogs.slice(clickPage -9, clickPage)
      }
    }
  }
</script>

<style scoped>
  .pagination {
    text-align: center;
  }
  .home-top {
    margin: 15px auto;
  }
</style>
