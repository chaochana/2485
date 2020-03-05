<template>
    <div id="login">
        <h1>Login</h1>
        <!-- <input type="text" name="username" v-model="input.username" placeholder="Username" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" /> -->
        <input type="password" name="secret" v-model="input.secret" placeholder="secret" />
        <button type="button" v-on:click="login()">Login</button>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.input.secret !== '') {
        var crypto = require('crypto')
        var name = this.input.secret
        var hash = crypto.createHash('md5').update(name).digest('hex')
        console.log(hash) // 9b74c9897bac770ffc029102a200c5de

        if (hash === '5fac2767303478f04d8712579feb0361') {
          localStorage.authenticated = true
          this.$router.replace({ name: 'secure' })
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
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
