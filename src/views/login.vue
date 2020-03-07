<template>
    <div>
      <v-row justify="center">
        <v-col md="3" sm="6" xs="12">
          <v-form id="login">
            <v-row>
              <h1>Login</h1>
            </v-row>
            <v-row justify="center">
              <!-- <input type="password" name="secret" v-model="input.secret" placeholder="secret" /><br /> -->
              <v-col>
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
              </v-col>
            </v-row>
            <v-row>
              <v-btn depressed small color="primary" type="button" v-on:click="login()">Login</v-btn>
            </v-row>
          </v-form>
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
          console.log('The username and / or password is incorrect')
        }
      } else {
        console.log('A secret must be present')
      }
    }
  }
}
</script>

<style scoped>
    #login {
        /* width: 500px; */
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
