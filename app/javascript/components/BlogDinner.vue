<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" offset-sm="2" sm="8" class="blog-dinner-top">
            <b-card-group deck>
              <b-card
                border-variant="info"
                header="夕食のグラム数のパーセンテージ (グラム)"
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
        dinners: [],
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
        axios.get('/api/v1/blog_dinner')
        .then(response => {
          let self = this
          self.dinners = response.data.dinners
          this.get_dinner_count(self.dinners)
          this.chartSetting(this.thisBlogEats)
        })
      },
      get_dinner_count(dinners) {
        for(let i = 0; i < dinners.length; i++) {
          let dinners_object = { gram: null, count: null }
          for(let key in dinners[i]) {
            dinners_object.gram = key
            dinners_object.count = dinners[i][key]
            this.thisBlogEats.push(dinners_object)
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
  .blog-dinner-top {
    margin-top: 30px;
  }
</style>
