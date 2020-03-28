<template>
  <div>
    <v-row dense>
      <v-col align='center'>
        <v-card
            class="mx-2 mt-1 mb-2"
            color="amber darken-2"
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
                    :to="attendance"
                    :duration=1
                    easing="Power4.easeOut"
                    @complete="completed"/>
                </v-col>
            </v-row>
            <v-row>
                <v-col align='center'>
                    ผู้ลงทะเบียนร่วมงานปีแม่ชีเมี้ยน 2563
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
  name: 'attendanceCounter',
  data: () => ({
    attendance: 0,
    scaleClass: false,
    output: null,
    url: 'https://www.2485.in:8080/v1/graphql'
  }),
  computed: {
    numberFrom () {
      if (this.attendance > 10) return this.attendance - 10
      else return 0
    }
  },
  created () {
    axios({
      url: this.url,
      method: 'post',
      headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
      data: {
        query: `
          query getAttendance {
            member_attend_aggregate(where: {event: {_eq: "งานแม่ชีเมี้ยน63"}}) {
              aggregate {
                count
              }
            }
          }
        `
      }
    }).then((result) => {
      this.output = result.data
      this.attendance = result.data.data.member_attend_aggregate.aggregate.count
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
