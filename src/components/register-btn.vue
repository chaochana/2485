<template>
  <v-row>
    <v-col align="center">
      <v-btn v-if="!isRegistered" v-on:click='toRegister' x-large color="success darken-1 display-1">กดเพื่อลงทะเบียน</v-btn>
      <span class='display-1 green--text text--darken-2' v-else>
        <v-icon large color="green darken-2">mdi-account-check-outline</v-icon>
        ลงทะเบียนแล้ว
      </span>
      <PulseLoader v-if="isLoading" />
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'registerBtn',
  components: {
    PulseLoader
  },
  data: () => ({
    isRegistered: false,
    output: null,
    register_output: null,
    url: process.env.VUE_APP_GQL_URL,
    isLoading: false
  }),
  props: {
    model: Object
  },
  methods: {
    toRegister: function () {
      this.isLoading = true
      axios({
        url: this.url,
        method: 'post',
        headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
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
      }).finally(() => (this.isLoading = false))
    }
  },
  created () {
    axios({
      url: this.url,
      method: 'post',
      headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
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
