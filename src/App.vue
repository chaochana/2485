<template>
  <v-app>
    <v-app-bar app dense color="DarkGray" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title style='font-weight:900;font-size:2vw;'>2485</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model='drawer' absolute temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <router-link v-if="checkAuthenticated()" to="/login" v-on:click.native="logout()" replace>Logout</router-link>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view @authenticated="checkAuthenticated()" />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: false
  }),
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
