<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-row>
          <b-col cols="12" offset-sm="2" sm="8" class="blog-status-shit-table-top">
          <b-card-group deck>
            <b-card
              border-variant="info"
              header="1日の平均うんち回数"
              header-bg-variant="white"
              header-text-variant="info"
              align="center"
            >
              <b-card-body>
              <table class="table table-bordered">
                  <thead  class="table-info">
                    <tr>
                      <th>日数</th>
                      <th>うんち回数</th>
                      <th>1日のうんち平均回数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ days_count }}</td>
                      <td>{{ count }}</td>
                      <td>{{ average }}</td>
                    </tr>
                  </tbody>
              </table>
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

  export default {
    data() {
      return {
        days_count: 0,
        count: 0,
        average: 0,
      }
    },
    created() {
      this.getShitCount()
    },
    methods: {
      getShitCount() {
        axios.get('/api/v1/shits_all_count')
        .then(response => {
           this.days_count =  response.data.all_count[0].days_count
           this.count =  response.data.all_count[0].count
           this.average =  response.data.all_count[0].average
        })
      }
    }
  }
</script>

<style scoped>
  .blog-status-shit-table-top {
    margin-top: 30px;
    margin-bottom: 100px;
  }
</style>
