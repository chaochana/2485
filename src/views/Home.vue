<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-if="isAuthenticated">
      <h1 class="mb-4">
        Articles written by me
      </h1>
      <div v-for="a in article" :key="a.id">
        {{a.id}}. {{ a.title }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import gql from 'graphql-tag'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  apollo: {
    // Simple query that will update the 'article' vue property
    article: gql`query {
      article {
        id
        title
      }
    }`
  },
  methods: {
    handleLoginEvent (data) {
      this.isAuthenticated = data.loggedIn
      this.isLoading = false
    }
  }
}
</script>
