<template>
  <div>
    <h1>ลงทะเบียน</h1>
    <v-card
      color="indigo lighten-2"
      light
    >
      <v-card-title class="headline indigo lighten-1 black--text" style="font-family: 'Prompt', sans-serif !important;">
        ค้นหาสมาชิก
      </v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="black"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="id"
          label="ระบุข้อมูลสมาชิก"
          placeholder="พิมพ์เพื่อเริ่มการค้นหา"
          prepend-icon="mdi-database-search"
          return-object
          autofocus
          clearable
          disable-lookup
          cache-items
        ></v-autocomplete>
      </v-card-text>
      <v-divider></v-divider>
      <v-expand-transition>
        <v-list v-if="model" class="indigo lighten-3 black--text">
          <v-list-item>
            <registerBtn :model="{id: model.id, name: model.name, }"/>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!model"
          color="grey darken-3 white--text"
          @click="model = null"
        >
          ย่อหน้าต่าง
          <v-icon right>mdi-close-circle</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
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
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    isRegistered: false
  }),
  method: {
  },
  computed: {
    fields () {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items () {
      var items = this.entries.map(entry => {
        var title
        if (entry.title != null) {
          title = entry.title
        } else {
          title = ''
        }
        const Description = '[' + entry.id + '] ' + title + ' ' + entry.name + ' ' + entry.lastname

        return Object.assign({}, entry, { Description })
      })

      return items
    }
  },
  watch: {
    search (val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      axios({
        url: 'http://www.2485.in:8080/v1/graphql',
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': 'Karuna2485'
        },
        data: {
          query: `
              query {
                member {
                  id,
                  title,
                  name,
                  lastname
                }
              }
            `
        }
      }).then((result) => {
        this.entries = result.data.data.member
        this.count = this.entries.length
      }).catch(err => {
        /* eslint-disable no-console */
        console.log(err)
        /* eslint-enable no-console */
      }).finally(() => (this.isLoading = false))
    }
  }
}
</script>
