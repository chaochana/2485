<template>
    <v-card
        class="ma-2"
        color="blue-grey lighten-2"
        max-width="400"
    >
        <v-row dense>
            <v-col align='center'>
                <number
                  class="bold transition display-4"
                  :class="{scaleBig: scaleClass}"
                  ref="number2"
                  :from="numberFrom"
                  :format="theFormat"
                  :to="queue"
                  :duration=1
                  easing="Power4.easeOut"
                  @complete="completed"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col align='center'>
                รวมคิวรับสมุนไพรวันนี้
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'medicationCounter',
  data: () => ({
    queue: 0,
    scaleClass: false,
    output: null,
    url: 'http://www.2485.in:8080/v1/graphql'
  }),
  computed: {
    numberFrom () {
      if (this.queue > 10) return this.queue - 10
      else return 0
    }
  },
  created () {
    axios({
      url: this.url,
      method: 'post',
      headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
      data: {
        variables: { date: '2020-02-27' },
        query: `
          query getQueueByDate($date: date) {
            medication_aggregate(where: {order_date: {_eq: $date}}) {
              aggregate {
                count
              }
            }
          }
        `
      }
    }).then((result) => {
      this.output = result.data
      this.queue = result.data.data.medication_aggregate.aggregate.count
      this.$refs.number2.play() // Play animation
    }).catch(err => {
      /* eslint-disable no-console */
      console.log(err)
      /* eslint-enable no-console */
    })
  },
  methods: {
    theFormat (number) {
      return number.toFixed(0)
    },
    completed () {
      this.scaleClass = true
    }
  }
}
</script>
