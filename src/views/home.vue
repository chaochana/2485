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
  }
}
</script>
