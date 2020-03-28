<template>
  <div>
    <v-row dense>
      <v-col align="center" justify="center">
        <v-card
          color="cyan lighten-2"
          light
          class="mx-2 my-1"
          flat
          max-width="400"
        >
          <v-card-title class="headline cyan lighten-1 black--text bold" style="font-family: 'Prompt', sans-serif !important;">
            ลงทะเบียนสมาชิก
          </v-card-title>
          <v-card-text>
            <form>
              <v-text-field
                v-model="inputID"
                label="รหัสสมาชิก"
                required
                type="number"
                ref="input"
                autofocus
              />

              <v-alert
                dense
                type="error"
                v-if="isError"
              >
                {{this.message}}
              </v-alert>

              <v-btn
                color="success darken-1" x-large
                :disabled="!inputID"
                v-on:click="submit()"
                @click="model = null">
                <v-icon>mdi-magnify</v-icon>
                ค้นหา
              </v-btn>
              <v-btn
                color="warning" small
                v-on:click="clear()"
                @click="model = null"
                :disabled="!inputID"
                absolute right>
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
            </form>
          </v-card-text>
          <v-divider></v-divider>
          <v-expand-transition>
            <v-list v-if="model" class="cyan lighten-3 black--text">
              <v-list-item>
                <v-row>
                  <v-col align="center" justify="center">
                    <span class="display-2 bold">
                      {{model.title}}{{model.name}} {{model.lastname}} [{{model.id}}]
                    </span>
                  </v-col>
                </v-row>
              </v-list-item>
              <v-list-item>
                <registerBtn :model="{id: model.id, name: model.name, }"/>
              </v-list-item>
            </v-list>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col align="center" justify="center">
        <router-link to="/event-register-full-search">ไม่พบหมายเลขสมาชิก / ค้นหาจากชื่อ</router-link>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import registerBtn from '@/components/register-btn.vue'
import axios from 'axios'

export default {
  name: 'Event-Register',
  components: {
    registerBtn
  },
  data: () => ({
    isLoading: false,
    model: null,
    isRegistered: false,
    inputID: null,
    message: null,
    isError: false,
    output: null
  }),
  methods: {
    submit () {
      axios({
        url: 'https://www.2485.in:8080/v1/graphql',
        method: 'post',
        headers: { 'content-type': 'application/json', 'x-hasura-admin-secret': process.env.VUE_APP_HASURA_GQL_KEY },
        data: {
          variables: { inputID: this.inputID },
          query: `
            query getMemberByID($inputID: bigint) {
              member(limit: 1, where: {id: {_eq: $inputID}}) {
                id
                title
                name
                lastname
                gender
                note
                date_applied
              }
            }
            `
        }
      }).then((result) => {
        if (result.data.data.member.length) {
          this.model = result.data.data.member[0]
        } else {
          this.isError = true
          this.message = 'ไม่พบสมาชิก ' + this.inputID
        }
      }).catch(err => {
        /* eslint-disable no-console */
        console.log(err)
        /* eslint-enable no-console */
        this.isError = true
        this.message = 'ไม่พบสมาชิก/มีข้อผิดพลาด'
      }).finally(() => (this.isLoading = false))
    },
    clear () {
      this.inputID = null
      this.isError = false
      this.message = null
      this.$refs.input.$el.focus()
    }
  }
}
</script>
