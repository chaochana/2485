<template>
  <v-app>
    <v-app-bar app dense color="DarkGray" dark flat>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title style='font-weight:900;font-size:24pt;'>2485</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model='drawer' absolute temporary v-if="checkAuthenticated()" darK>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="amber--text text--accent-4">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link to="/home" class='drawer-link'>Home</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-clipboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/order" class='drawer-link'>จัดสมุนไพร</router-link>
            </v-list-item-title>
          </v-list-item>

          <!-- <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link to="/event-register" class='drawer-link'>ลงทะเบียนวันงาน</router-link>
            </v-list-item-title>
          </v-list-item> -->

          <v-divider></v-divider>

          <v-list-item link v-if="checkAuthenticated()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              <router-link v-if="checkAuthenticated()" to="/login" v-on:click.native="logout()" replace class='drawer-link'>Logout</router-link>
            </v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-content>
      <transition name="fade" mode="out-in">
        <!-- <router-view :key="$route.params.queue" class="view" @authenticated="checkAuthenticated()" /> -->
        <router-view :key="$route.params.queue" class="view" />
      </transition>
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: false,
    group: null
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
