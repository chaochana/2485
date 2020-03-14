<template>
  <v-row>
    <v-col>
      <v-btn v-if="!isRegistered" v-on:click='toRegister'>Register {{ model.id }} {{ this.isRegistered }}</v-btn>
      <span v-else>สมาชิกลงทะเบียนแล้ว</span>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'registerBtn',
  data: () => ({
    isRegistered: false,
    output: null,
    register_output: null,
    url: 'http://www.2485.in:8080/v1/graphql'
  }),
  props: {
    model: Object
  },
  methods: {
    toRegister: function () {
      axios({
        url: this.url,
        method: 'post',
        headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': 'Karuna2485' },
        data: {
          variables: {
            member_id: this.model.id,
            date_attend: moment().format('YYYY-MM-DD')
          },
          query: `
            mutation upsert_member_attend( 
              $member_id: bigint,
              $date_attend: date
            ) { insert_member_attend(
              objects: {
                member_id: $member_id,
                date_attend: $date_attend,
                event: "งานแม่ชีเมี้ยน63"
              }, on_conflict: {
                constraint: member_attend_pkey,
                update_columns: updated_at}) {
                returning {
                  event
                  member_id
                  date_attend
                }
              }
            }
          `
        }
      }).then((result) => {
        this.register_output = result.data.data.insert_member_attend.returning
        if (this.register_output.length > 0) {
          this.isRegistered = true
        }
      }).catch(err => {
        /* eslint-disable no-console */
        console.log(err)
        /* eslint-enable no-console */
      })
    }
  },
  created () {
    axios({
      url: this.url,
      method: 'post',
      headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': 'Karuna2485' },
      data: {
        variables: {
          id: this.model.id
        },
        query: `
          query member_attend($id : bigint) {
            member_attend(where: {member_id: {_eq: $id}, event: {_eq: "งานแม่ชีเมี้ยน63"}}) {
              event
              id
              member_id
              date_attend
            }
          }
        `
      }
    }).then((result) => {
      this.output = result.data.data.member_attend
      if (this.output.length > 0) {
        this.isRegistered = true
      }
    }).catch(err => {
      /* eslint-disable no-console */
      console.log(err)
      /* eslint-enable no-console */
    })
  }
}
</script>
