<template>
  <div>
    <v-row dense>
      <v-col>
        <span style="font-size:10vw" class="bold">{{ order.session }} # คิว {{ order.queue }} </span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col align="right" justify="right">
        <span style="font-size:7vw" class="">{{ member.title }}{{ member.name }} {{ member.lastname }} [{{ order.member_id }}]</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col class="ma-0 pa-0" cols="6" xs="6" sm="4" v-for="item in totalItems" v-bind:key="item.medicine_id">
        <v-card
          v-bind="item"
          :color="medicineIDToColor(item.medicine_id)"
          class="ma-1"
          >
          <v-row dense>
            <v-col align='center'>
              <span style='font-size:8vw' class="">{{ medicineIDToThai(item.medicine_id) }}</span>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col align='center'>
              <span class="bold transition display-4"> {{ item.amountTotal }} </span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-btn color="amber" light large fixed bottom left fab :to="{path: '/order/' + order.session}">
      <v-icon class="bold">mdi-clipboard-list</v-icon>
    </v-btn>

    <v-btn style="margin-right:80px" color="amber" light x-large fixed bottom right fab :to="{path: '/order/' + order.session + '/' + Number(order.queue-1)}">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn color="amber" light x-large fixed bottom right fab :to="{path: '/order/' + order.session + '/' + Number(order.queue+1)}">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'order-item',
  data: () => ({
    url: 'http://www.2485.in:8080/v1/graphql',
    order_date: '2020-03-05',
    order: null,
    items: null,
    member: null
  }),
  props: {
    session: null,
    queue: null
  },
  components: {
  },
  computed: {
    totalItems () {
      var totalItems = this.items.map(item => {
        var amountTotal = Number(item.amount) + Number(item.add_amount)

        return Object.assign({}, item, { amountTotal })
      })

      return totalItems
    }
  },
  methods: {
    goBack () {
      return this.$router.go(-1)
    },
    medicineIDToThai (type) {
      switch (type) {
        case '001':
          return 'เขียว'
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
          return 'กระดูกหมู'
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
    },
    medicineIDToColor (medicineID) {
      switch (medicineID) {
        case '001':
          return 'green darken-3'
        case '002':
          return 'brown darken-3'
        case '003':
          return 'brown darken-3'
        case '004':
          return 'pink darken-3'
        case '005':
          return 'yellow darken-3'
        case '006':
          return 'darkGrey darken-3'
        case '007':
          return 'lime darken-3'
        case '008':
          return 'grey darken-3'
        case '009':
          return 'green darken-1'
        case '010':
          return 'light-green'
        case '011':
          return 'red darken-2'
        case '012':
          return 'red darken-4'
        case '013':
          return 'brown darken-4'
        case '014':
          return 'amber darken-4'
        case '015':
          return 'amber darken-3'
        case '016':
          return 'teal'
        case '017':
          return 'blue-grey darken-2'
        case '018':
          return 'light-blue darken-2'
        case '019':
          return 'grey darken-2'
        default:
          return 'teal'
      }
    },
    getOrderItems () {
      axios({
        url: this.url,
        method: 'post',
        headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
        data: {
          variables: { session: this.session, queue: this.queue, order_date: this.order_date },
          query: `
            query getQueueByDate($session: String, $queue: Int, $order_date: date) {
              order(where: {session: {_ilike: $session}, queue: {_eq: $queue}, order_date: {_eq: $order_date}}) {
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
        this.getFullName()
      }).catch(err => {
        /* eslint-disable no-console */
        console.log(err)
        /* eslint-enable no-console */
      })
    },
    getFullName () {
      axios({
        url: this.url,
        method: 'post',
        headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
        data: {
          variables: { member_id: this.order.member_id },
          query: `
            query getMemberByID($member_id: bigint) {
              member(where: {id: {_eq: $member_id}}) {
                title
                name
                lastname
              }
            }
          `
        }
      }).then((result) => {
        this.member = result.data.data.member[0]
      }).catch(err => {
        /* eslint-disable no-console */
        console.log(err)
        /* eslint-enable no-console */
      })
    }
  },
  created () {
    this.getOrderItems()
  },
  watch: {
    $route () {
      this.getOrderItems()
    }
  }
}
</script>
