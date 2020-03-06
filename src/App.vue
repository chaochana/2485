<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="checkAuthenticated()" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
    </div>
  <router-view @authenticated="checkAuthenticated()" />
</div>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
    }
  },
  mounted () {
    if (!localStorage.authenticated) {
      this.$router.replace({ name: 'login' })
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status
    },
    logout () {
      localStorage.authenticated = false
      localStorage.removeItem('authenticated')
      this.$router.replace({ name: 'login' })
    },
    checkAuthenticated () {
      if (localStorage.getItem('authenticated') === null) {
        return false
      } else {
        return localStorage.authenticated
      }
    }
  }
}
</script>

<style>
    body {
        background-color: #F0F0F0;
    }
    h1 {
        padding: 0;
        margin-top: 0;
    }
    #app {
        width: 1024px;
        margin: auto;
    }
</style>
