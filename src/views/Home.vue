<template>
  <div class="home text-center">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <attendanceCounter/>
  </div>
</template>

<script>
import attendanceCounter from '@/components/attendanceCounter.vue'

export default {
  name: 'Home',
  components: {
    attendanceCounter
  }
}
</script>
