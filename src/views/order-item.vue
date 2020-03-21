<template>
  <div>
    <v-row dense align="center" justify="center">
      <v-col cols="6" sm="6" v-for="item in items" v-bind:key="item.medicine_id">
        <v-card
          color="teal darken-2"
          class="pa-1 ma-1"
          >
          <v-row>
            <v-col align='center'>
              <span class="title bold">{{ medicineIDToThai(item.medicine_id) }}</span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col align='center'>
              <span class="bold transition display-4"> {{ item.amount }} </span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-btn color="amber" light large fixed bottom left fab v-on:click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'order-item',
  data: () => ({
    url: 'http://www.2485.in:8080/v1/graphql',
    order_date: '2020-03-19',
    order: null,
    items: null
  }),
  props: {
    transaction_id: null
  },
  components: {
  },
  methods: {
    goBack () {
      return this.$router.go(-1)
    },
    medicineIDToThai (type) {
      switch (type) {
        case '001':
          return 'สมุนไพรเขียว'
        case '002':
          return 'ฟอก'
        case '003':
          return 'ปอด'
        case '004':
          return 'เบาหวาน'
        case '005':
          return 'มะกรูด'
        case '006':
          return 'น้ำผึ้ง'
        case '007':
          return 'น้ำมะนาว'
        case '008':
          return 'น้ำกระดูกหมู'
        case '009':
          return 'มะพร้าว'
        case '010':
          return 'ตำลึง'
        case '011':
          return 'หยอดตา'
        case '012':
          return 'ตัด'
        case '013':
          return 'ดูดหนอง'
        case '014':
          return 'ไพลประคบ'
        case '015':
          return 'ไพลน้ำ'
        case '016':
          return 'ทาผิว'
        case '017':
          return 'ระบาย'
        case '018':
          return 'รมตา'
        case '019':
          return 'พริกไทย'
        default:
          return '???'
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
        variables: { transaction_id: this.transaction_id },
        query: `
          query getQueueByDate($transaction_id: bigint) {
            order(where: {id: {_eq: $transaction_id}}) {
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
      this.order = result.data.data.order[0]
      this.items = JSON.parse(this.order.order)
    }).catch(err => {
      /* eslint-disable no-console */
      console.log(err)
      /* eslint-enable no-console */
    })
  }
}
</script>
