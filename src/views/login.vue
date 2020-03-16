<template>
  <div>
    <v-row dense>
      <v-col align="center" justify="center">
        <v-card
          class="mx-2 mt-1 mb-2"
          color="green daraken-1"
          max-width="400">
          <v-form id="login">
            <v-list-item>
              <v-list-item-content>
                <v-card-title class="display-3 bold ml-0 pl-0">Login</v-card-title>
                <v-text-field
                  v-model="input.secret"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="secret"
                  label="Secret"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions class="justify-center">
              <v-btn depressed large class="bold" color="primary darken-1" type="button" v-on:click="login()">submit login</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      input: {
        secret: ''
      },
      show1: false,
      // password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        // min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  methods: {
    login () {
      if (this.input.secret !== '') {
        var crypto = require('crypto')
        var name = this.input.secret
        var hash = crypto.createHash('md5').update(name).digest('hex')
        if (hash === '5fac2767303478f04d8712579feb0361') {
          localStorage.authenticated = true
          this.$router.replace({ name: 'home' })
        } else {
          // console.log('The username and / or password is incorrect')
        }
      } else {
        // console.log('A secret must be present')
      }
    }
  }
}
</script>
