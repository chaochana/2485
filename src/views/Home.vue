<template>
  <div class="home text-center">
    <attendanceCounter/>
  </div>
</template>

<script>
import attendanceCounter from '@/components/attendanceCounter.vue'

export default {
  name: 'Home',
  components: {
    attendanceCounter
  },
  created () {
    /* eslint-disable no-console */
    console.log('Created')
    console.log(process.env.VUE_APP_HASURA_GQL_KEY)
    console.log(process.env.VUE_APP_THEME_COLOR)
    console.log(process.env.VUE_APP_TITLE)
    /* eslint-disable no-console */
  }
}
</script>
