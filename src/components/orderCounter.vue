<template>
  <div>
    <v-row dense>
      <v-col align='right'>
        {{ this.order_date }}
      </v-col>
    </v-row>
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
                ref="allQueue"
                :from="numberFrom"
                :format="theFormat"
                :to="allQueue"
                :duration=1
                easing="Power4.easeOut"
                @complete="completed"/>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content class="title justify-center font-prompt">
              รวมคิวรับสมุนไพรวันนี้
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="center">
      <v-col md=3 xs=6 v-for="queue in queues" v-bind:key="queue.id" v-bind:index="queue.id">
        <v-card
          color="brown darken-2"
          class="pa-1"
          :to="{path: '/order/' + queue.session_eng}">
          <v-row>
            <v-col align='center'> {{ queue.session }} </v-col>
          </v-row>
          <v-row dense>
            <v-col align='center'>
              <span class="bold transition display-3"> {{ queue.count }} </span>
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
  name: 'orderCounter',
  data: () => ({
    allQueue: 0,
    queues: [],
    scaleClass: false,
    output: null,
    url: process.env.VUE_APP_GQL_URL,
    order_date: '2020-03-26'
  }),
  computed: {
    numberFrom () {
      if (this.queue > 10) return this.queue - 10
      else return 0
    }
  },
  created () {
    this.countQueue()
    this.countQueueBySession()
  },
  methods: {
    theFormat (number) {
      return number.toFixed(0)
    },
    completed () {
      this.scaleClass = true
    },
    countQueue () {
      axios({
        url: this.url,
        method: 'post',
        headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
        data: {
          variables: { date: this.order_date },
          query: `
            query getQueueByDate($date: date) {
              order_aggregate(where: {order_date: {_eq: $date}}) {
                aggregate {
                  count
                }
              }
            }
          `
        }
      }).then((result) => {
        this.output = result.data
        this.allQueue = result.data.data.order_aggregate.aggregate.count
        this.$refs.allQueue.play() // Play animation
      }).catch(err => {
        /* eslint-disable no-console */
        console.log(err)
        /* eslint-enable no-console */
      })
    },
    countQueueBySession () {
      var sessions = ['1:Morning:สมาชิก', '2:Volunteer1:จิตอาสา', '3:Cancer:มะเร็ง', '4:VIP:VIP', '5:Stroke:อัมพฤก', '6:Afternoon:บ่าย']

      sessions.forEach(session => {
        axios({
          url: this.url,
          method: 'post',
          headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
          data: {
            variables: { date: this.order_date, session: session.split(':')[1] },
            query: `
              query getQueueByDate($date: date, $session: String) {
                order_aggregate(where: {order_date: {_eq: $date}, session: {_eq: $session}}) {
                  aggregate {
                    count
                  }
                }
              }
            `
          }
        }).then((result) => {
          this.output = result.data
          // this.queue[session.toLowerCase()] = result.data.data.order_aggregate.aggregate.count
          this.queues.push({ id: session.split(':')[0], session_eng: session.split(':')[1], session: session.split(':')[2], count: result.data.data.order_aggregate.aggregate.count })
        }).catch(err => {
          /* eslint-disable no-console */
          console.log(err)
          /* eslint-enable no-console */
        })
      })

      this.queues.sort()
    }
  }
}
</script>
