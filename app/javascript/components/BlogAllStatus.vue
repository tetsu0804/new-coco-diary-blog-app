<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" class="h3 text-info blog-status-title text-center">
            トータルカウント パーセンテージ
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" offset-sm="2" sm="8" class="blog-status-top">
          <b-card-group deck>
            <b-card
              border-variant="info"
              header="全投稿のパーソナルパーセンテージ"
              header-bg-variant="white"
              header-text-variant="info"
              align="center"
            >
              <b-card-body>
                <GChart
                  type="PieChart"
                  :data="chartData"
                  :options="chartOptions"
                />
              </b-card-body>
            </b-card>
          </b-card-group>

          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import { GChart } from 'vue-google-charts'

  export default {
    components: {
      GChart
    },
    data() {
      return {
        blogs: [],
        users: [],
        chartData: [
          ['氏名', '今月のステータス'],
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          chartArea:{top:0, left: '25%', width:'100%', height:'100%'}
        },
        thisMonthBlogs: []
      }
    },
    created() {
      this.chartThisBlogs()
    },
    methods: {
      chartThisBlogs() {
        axios.get('/api/v1/blogs')
        .then(response => {
          this.users = response.data.users
          this.blogs = response.data.blogs
          this.getThisMonthBlog(this.users, this.blogs)
          this.chartSetting(this.thisMonthBlogs)
        })

      },
      getThisMonthBlog(users, blogs) {
        for(let i = 0; i < users.length; i++) {
          let user_blogs_count = 0

          for(let n = 0; n < blogs.length; n++) {
            if(users[i].id === blogs[n].user_id) {
              user_blogs_count++
            }
          }
          this.sortingBlogs(user_blogs_count, users[i])
        }
      },
      sortingBlogs(count, user) {
        let sorting_user = {id: user.id, first_name: user.first_name, count: count}
        this.thisMonthBlogs.push(sorting_user)
      },
      chartSetting(thisMonthBlogs) {

        for(let n = 0; thisMonthBlogs.length; n++ ) {
          let chart_set = []
          chart_set.push(thisMonthBlogs[n].first_name)
          chart_set.push(thisMonthBlogs[n].count)
          this.chartData.push(chart_set)
        }
      }
    }
  }
</script>

<style scoped>
  .blog-status-title {
    margin-top: 15px;
  }
  .blog-status-top {
    margin-top: 100px;
  }
</style>
