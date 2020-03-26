<template>
  <div>
    <v-row dense>
      <v-col align='right'>
        {{ this.order_date }}
      </v-col>
    </v-row>
    <v-row dense>
      <v-col>
        <span style="font-size:10vw" class="bold">{{ session }}</span>
      </v-col>
    </v-row>

    <v-row dense v-for="order in orders" v-bind:key="order.queue" v-bind:index="order.queue" >
      <v-col class="px-4">
        <v-btn color="teal" text-color="white" class="title" large block :to="{path: '/order/' + order.session + '/' + order.queue}">
          คิวที่ {{ order.queue }} / สมาชิก {{ order.member_id }} {{ typeToThai(order.type) }}
          <!-- <v-icon>mdi-arrow-right</v-icon> -->
        </v-btn>
      </v-col>
    </v-row>

    <v-btn color="amber" light large fixed bottom left fab to="/order">
      <v-icon>mdi-home</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'order-list',
  data: () => ({
    url: 'http://www.2485.in:8080/v1/graphql',
    order_date: '2020-03-26',
    orders: null
  }),
  props: {
    session: null
  },
  components: {
  },
  methods: {
    typeToThai (type) {
      switch (type) {
        case 'TwoWeeks':
          return '/ สองสัปดาห์'
        case 'Represent':
          return '/ รับแทน'
        case 'Represent_TwoWeeks':
          return '/ รับแทน-สองสัปดาห์'
        default:
          return ''
      }
    }
  },
  // methods: {
  //   getFullName (memberID) {
  //     var member = ''
  //     console.log(memberID)
  //     axios({
  //       url: this.url,
  //       method: 'post',
  //       headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
  //       data: {
  //         variables: { member_id: memberID },
  //         query: `
  //           query getMemberByID($member_id: bigint) {
  //             member(where: {id: {_eq: $member_id}}) {
  //               title
  //               name
  //               lastname
  //             }
  //           }
  //         `
  //       }
  //     }).then((result) => {
  //       member = result.data.data.member[0]
  //       console.log(member)
  //     }).catch(err => {
  //       /* eslint-disable no-console */
  //       console.log(err)
  //       /* eslint-enable no-console */
  //     })

  //     const fullName = member.title + ' ' + member.name + ' ' + member.lastname

  //     return fullName
  //   }
  // },
  // computed: {
  //   ordersMembers () {
  //     var ordersMembers = this.orders.map(order => {
  //       console.log(order.member_id)
  //       var fullName = this.getFullName(order.member_id)

  //       return Object.assign({}, order, { fullName })
  //     })

  //     return ordersMembers
  //   }
  // },
  created () {
    axios({
      url: this.url,
      method: 'post',
      headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
      data: {
        variables: { date: this.order_date, session: this.session },
        query: `
          query getQueueByDate($date: date, $session: String) {
            order(where: {session: {_ilike: $session}, order_date: {_eq: $date}}) {
              id
              member_id
              order
              order_date
              queue
              session
              type
              created_at
              updated_at
            }
          }
        `
      }
    }).then((result) => {
      this.orders = result.data.data.order
    }).catch(err => {
      /* eslint-disable no-console */
      console.log(err)
      /* eslint-enable no-console */
    })
  }
}
</script>
