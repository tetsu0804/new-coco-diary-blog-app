<template>
  <div class="sticky-top">
    <b-row v-if="signIn === true">
      <b-col cols="12">
        <b-alert show variant="danger" v-if="errorMsg">{{ errorMsg }}</b-alert>
        <b-navbar toggleable="lg" type="dark" variant="info">
          <router-link :to="{name: 'Home'}" class="text-white"> COCO Diary</router-link>
          <router-link v-if="last_name" :to="{ name: 'UserShow', params: {id: id}}" class="text-white" style="margin-left: 15px;">{{ last_name + first_name + 'さん'}}</router-link>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->

            <b-dropdown id="dropdown-grouped" text="年月別" variant="outline-light" class="m-2">
              <b-dropdown-group v-if="by_year_and_month[0][0].length || by_year_and_month[0][10].length" id="dropdown-group-1" header="2020">
                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[0][10])" v-if="by_year_and_month[0][10].length">11月</b-dropdown-item-button>
                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[0][11])" v-if="by_year_and_month[0][11].length">12月</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown-group>

              <b-dropdown-group v-if="by_year_and_month[1].length" id="dropdown-group-2" header="2021">
                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][0])" v-if="by_year_and_month[1][0].length">1月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][1])" v-if="by_year_and_month[1][1].length">2月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][2])" v-if="by_year_and_month[1][2].length">3月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][3])" v-if="by_year_and_month[1][3].length">4月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][4])" v-if="by_year_and_month[1][4].length">5月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][5])" v-if="by_year_and_month[1][5].length">6月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][6])" v-if="by_year_and_month[1][6].length">7月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][7])" v-if="by_year_and_month[1][7].length">8月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][8])" v-if="by_year_and_month[1][8].length">9月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][9])" v-if="by_year_and_month[1][9].length">10月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][10])" v-if="by_year_and_month[1][10].length">11月</b-dropdown-item-button>

                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][11])" v-if="by_year_and_month[1][11].length">12月</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown-group>

              <b-dropdown-group v-if="by_year_and_month[2].length" id="dropdown-group-2" header="2022">
                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[2][0])" v-if="by_year_and_month[2][0].length">1月</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown-group>

              <b-dropdown-group v-if="by_year_and_month[3].length" id="dropdown-group-2" header="2023">
                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][0])" v-if="by_year_and_month[2][0].length">1月</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown-group>

              <b-dropdown-group v-if="by_year_and_month[3].length" id="dropdown-group-2" header="2024">
                <b-dropdown-item-button v-on:click="changeMonth(by_year_and_month[1][0])" v-if="by_year_and_month[2][0].length">1月</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown-group>
            </b-dropdown>

            <div>
              <b-button id="show-btn" variant="outline-light" class="left-btn" @click="$bvModal.show('bv-modal-example')">ステータス</b-button>
            </div>

            <b-modal ref="my-modal" id="bv-modal-example" hide-footer>
              <template #modal-title>
                今月のステータス
              </template>
              <div class="d-block text-center">
                <GChart
                  type="PieChart"
                  :data="chartData"
                  :options="chartOptions"
                />
              </div>
              <b-button class="mt-3" block @click="goToStatus">詳細</b-button>
            </b-modal>

            <b-navbar-nav class="ml-auto">
              <b-nav-item class="text-white left-btn" v-on:click="userLogout">ログアウト</b-nav-item>
              <router-link class="blog-new header-user-name left-btn" :to="{ name: 'BlogNew' }">ブログ作成</router-link>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { GChart } from 'vue-google-charts'

let by_year_and_month = []
for(let year_five = 0; year_five < 5; year_five++) {
  let year_num = []
  by_year_and_month.push(year_num)
  for(let month_twelve = 0; month_twelve < 12; month_twelve++) {
    let month_num = []
    by_year_and_month[year_five].push(month_num)
  }
}

  export default {
    components: {
      GChart
    },
    data() {
      return {
        loginDocumentCookies: '',
        login_cookie_trim_box: [],
        by_year_and_month,
        chartData: [
          ['氏名', '今月のステータス'],
        ],
        chartOptions: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          chartArea:{left: 120, top:0,width:'100%', height:'100%'}
        },
        thisMonthBlogs: [],
        errorMsg: ''
      }
    },
    computed: mapState({
      id: state => state.id,
      last_name: state => state.last_name,
      first_name: state => state.first_name,
      signIn: state => state.signIn
    }),
    created() {
      this.getYear()
      this.chartThisBlogs()
    },
    mounted(){

    },
    methods: {
      userLogout() {
        this.$http.plan.delete('/api/v1/logout')
        .then(response => {
          this.$store.dispatch('doFetchUserId', '')
          this.$store.dispatch('doFetchUserLastName', '')
          this.$store.dispatch('doFetchUserFirstName', '')
          this.$store.dispatch('doFetchUserEmail', '')
          this.$store.dispatch('doFetchUserSignIn', '')
          document.cookie = "cookie=; max-age=0"
          document.cookie = "signIn=; max-age=0"
          this.$router.push({ name: 'Login' })
        }).catch(error => {
          this.errorMsg = "エラーが発生しました"
        })
      },
      getYear() {
        axios.get('/api/v1/blogs')
        .then(response => {
          let blogs = response.data.blogs
          this.sortingYear(blogs)
        }).catch(error => {

        })
      },
      sortingYear(blogs) {
        for(let i = 0; i < blogs.length; i++) {
          let date = new Date(blogs[i].created_at)
          this.forYear(date, blogs[i])
        }
      },
      forYear(date, blog) {
       if(date.getFullYear() === 2020) {
         this.forTwentyMonth(date, blog)
       } else if(date.getFullYear() === 2021) {
         this.forTwentyOneMonth(date, blog)
       } else if(date.getFullYear() === 2022) {
         this.forTwentyTwoMonth(date, blog)
       } else if(date.getFullYear() === 2023) {
         this.forTwentyThreeMonth(date, blog)
       } else {
         this.forTewntyFourMonth(date, blog)
       }
     },
     forTwentyMonth(date, blog) {
      if(date.getMonth() === 0) {
        this.by_year_and_month[0][0].push(blog)
      } else if(date.getMonth() === 1) {
        this.by_year_and_month[0][1].push(blog)
      } else if(date.getMonth() === 2) {
        this.by_year_and_month[0][2].push(blog)
      } else if(date.getMonth() === 3) {
        this.by_year_and_month[0][3].push(blog)
      } else if(date.getMonth() === 4) {
        this.by_year_and_month[0][4].push(blog)
      } else if(date.getMonth() === 5) {
        this.by_year_and_month[0][5].push(blog)
      } else if(date.getMonth() === 6) {
        this.by_year_and_month[0][6].push(blog)
      } else if(date.getMonth() === 7) {
        this.by_year_and_month[0][7].push(blog)
      } else if(date.getMonth() === 8) {
        this.by_year_and_month[0][8].push(blog)
      } else if(date.getMonth() === 9) {
        this.by_year_and_month[0][9].push(blog)
      } else if(date.getMonth() === 10) {
        this.by_year_and_month[0][10].push(blog)
      } else {
        this.by_year_and_month[0][11].push(blog)
      }
     },
     forTwentyOneMonth(date, blog) {
       if(date.getMonth() === 0) {
         this.by_year_and_month[1][0].push(blog)
       } else if(date.getMonth() === 1) {
         this.by_year_and_month[1][1].push(blog)
       } else if(date.getMonth() === 2) {
         this.by_year_and_month[1][2].push(blog)
       } else if(date.getMonth() === 3) {
         this.by_year_and_month[1][3].push(blog)
       } else if(date.getMonth() === 4) {
         this.by_year_and_month[1][4].push(blog)
       } else if(date.getMonth() === 5) {
         this.by_year_and_month[1][5].push(blog)
       } else if(date.getMonth() === 6) {
         this.by_year_and_month[1][6].push(blog)
       } else if(date.getMonth() === 7) {
         this.by_year_and_month[1][7].push(blog)
       } else if(date.getMonth() === 8) {
         this.by_year_and_month[1][8].push(blog)
       } else if(date.getMonth() === 9) {
         this.by_year_and_month[1][9].push(blog)
       } else if(date.getMonth() === 10) {
         this.by_year_and_month[1][10].push(blog)
       } else {
         this.by_year_and_month[1][11].push(blog)
       }
     },
     forTwentyTwoMonth(date, blog) {
       if(date.getMonth() === 0) {
         this.by_year_and_month[2][0].push(blog)
       } else if(date.getMonth() === 1) {
         this.by_year_and_month[2][1].push(blog)
       } else if(date.getMonth() === 2) {
         this.by_year_and_month[2][2].push(blog)
       } else if(date.getMonth() === 3) {
         this.by_year_and_month[2][3].push(blog)
       } else if(date.getMonth() === 4) {
         this.by_year_and_month[2][4].push(blog)
       } else if(date.getMonth() === 5) {
         this.by_year_and_month[2][5].push(blog)
       } else if(date.getMonth() === 6) {
         this.by_year_and_month[2][6].push(blog)
       } else if(date.getMonth() === 7) {
         this.by_year_and_month[2][7].push(blog)
       } else if(date.getMonth() === 8) {
         this.by_year_and_month[2][8].push(blog)
       } else if(date.getMonth() === 9) {
         this.by_year_and_month[2][9].push(blog)
       } else if(date.getMonth() === 10) {
         this.by_year_and_month[2][10].push(blog)
       } else {
         this.by_year_and_month[2][11].push(blog)
       }
     },
     forTwentyThreeMonth(date, blog) {
       if(date.getMonth() === 0) {
         this.by_year_and_month[3][0].push(blog)
       } else if(date.getMonth() === 1) {
         this.by_year_and_month[3][1].push(blog)
       } else if(date.getMonth() === 2) {
         this.by_year_and_month[3][2].push(blog)
       } else if(date.getMonth() === 3) {
         this.by_year_and_month[3][3].push(blog)
       } else if(date.getMonth() === 4) {
         this.by_year_and_month[3][4].push(blog)
       } else if(date.getMonth() === 5) {
         this.by_year_and_month[3][5].push(blog)
       } else if(date.getMonth() === 6) {
         this.by_year_and_month[3][6].push(blog)
       } else if(date.getMonth() === 7) {
         this.by_year_and_month[3][7].push(blog)
       } else if(date.getMonth() === 8) {
         this.by_year_and_month[3][8].push(blog)
       } else if(date.getMonth() === 9) {
         this.by_year_and_month[3][9].push(blog)
       } else if(date.getMonth() === 10) {
         this.by_year_and_month[3][10].push(blog)
       } else {
         this.by_year_and_month[3][11].push(blog)
       }
     },
     forTewntyFourMonth(date, blog) {
       if(date.getMonth() === 0) {
         this.by_year_and_month[4][0].push(blog)
       } else if(date.getMonth() === 1) {
         this.by_year_and_month[4][1].push(blog)
       } else if(date.getMonth() === 2) {
         this.by_year_and_month[4][2].push(blog)
       } else if(date.getMonth() === 3) {
         this.by_year_and_month[4][3].push(blog)
       } else if(date.getMonth() === 4) {
         this.by_year_and_month[4][4].push(blog)
       } else if(date.getMonth() === 5) {
         this.by_year_and_month[4][5].push(blog)
       } else if(date.getMonth() === 6) {
         this.by_year_and_month[4][6].push(blog)
       } else if(date.getMonth() === 7) {
         this.by_year_and_month[4][7].push(blog)
       } else if(date.getMonth() === 8) {
         this.by_year_and_month[4][8].push(blog)
       } else if(date.getMonth() === 9) {
         this.by_year_and_month[4][9].push(blog)
       } else if(date.getMonth() === 10) {
         this.by_year_and_month[4][10].push(blog)
       } else {
         this.by_year_and_month[4][11].push(blog)
       }
      },
     changeMonth(blogs) {
      this.$router.push({ name: 'BlogMonth', params: { month: blogs[0].created_at }})
     },
     chartThisBlogs() {
       axios.get('/api/v1/blogs/thismounth').then(response => {
         let this_blogs = []
         let this_users = []
         this_blogs = response.data.blogs
         this_users = response.data.users
         this.getThisMonthBlog(this_users, this_blogs)
         this.chartSetting(this.thisMonthBlogs)
       }).catch(error => {
        
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
     },
     goToStatus() {
      this.$refs['my-modal'].hide()
      this.$router.push({ name: 'BlogStatus' })
     }
    }
  }
</script>

<style scoped>
  .header-user-name {
    margin-top: 9px;
    margin-left: 15px;
    color:  white;
  }
  .left-btn {
    margin-left: 8px;
  }
  .right-btn {
    margin-left: 8px;
  }
</style>
