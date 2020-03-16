<template>
  <div>
    <v-row dense align="center" justify="center">
      <v-col align='center' md=6>
        <v-card
          class="justify-center"
          color="blue-grey">
          <v-list-item>
            <v-list-item-content>
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
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="justify-center">
              รวมคิวรับสมุนไพรวันนี้
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="center">
      <v-col md=3 xs=6>
        <v-card
          color="brown">
          <v-row>
            <v-col align='center'>สมาชิก</v-col>
          </v-row>
          <v-row dense>
            <v-col align='center'>
              <span class="bold transition display-3">
              600
              </span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col md=3 xs=6>
        <v-card
          color="teal">
          <v-row><v-col align='center'>จิตอาสา</v-col></v-row>
          <v-row dense>
            <v-col align='center'>
              <span class="bold transition display-3">
              108
              </span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
