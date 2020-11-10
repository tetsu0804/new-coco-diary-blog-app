<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" offset-sm="2" sm="8" class="blog-braek-first-top">
            <b-card-group deck>
              <b-card
                border-variant="info"
                header="朝食のグラム数のパーセンテージ (グラム)"
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
import { GChart} from 'vue-google-charts'

  export default {
    components: {
      GChart
    },
    data() {
      return {
        break_firsts: [],
        chartData: [
          ['氏名', '全投稿の投稿者比率'],
        ],
        chartOptions: {
          chart: {
            title: '全投稿の投稿者比率',
            subtitle: '投稿数パーセンテージ',
          },
          chartArea:{top:0, left: '25%', width:'100%', height:'100%'}
        },
        thisBlogEats: []
      }
    },
    created() {
      this.getEatGram()
    },
    methods: {
      getEatGram() {
        axios.get('/api/v1/blog_eat_gram')
        .then(response => {
          let self = this
          self.break_firsts = response.data.break_firsts
          this.getBreak_first_count(self.break_firsts)
          this.chartSetting(this.thisBlogEats)
        })
      },
      getBreak_first_count(break_firsts) {
        for(let i = 0; i < break_firsts.length; i++) {
          let break_first_object = { gram: null, count: null }
          for(let key in break_firsts[i]) {
            break_first_object.gram = key
            break_first_object.count = break_firsts[i][key]
            this.thisBlogEats.push(break_first_object)
          }
        }
      },
      chartSetting(thisBlogEats) {

        for(let n = 0; n < thisBlogEats.length; n++ ) {
          let chart_set = []
          chart_set.push(thisBlogEats[n].gram)
          chart_set.push(thisBlogEats[n].count)
          this.chartData.push(chart_set)
        }
      }
    }
  }
</script>

<style scoped>
  .blog-braek-first-top {
    margin-top: 30px;
  }
</style>
