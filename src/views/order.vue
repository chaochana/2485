<template>
  <div class="medication_order">
    <h1>นี่คือหน้าจัดสมุนไพร</h1>
    <medicationCounter/>
  </div>
</template>

<script>
import medicationCounter from '@/components/medicationCounter.vue'

export default {
  name: 'Medication',
  components: {
    medicationCounter
  }
}
</script>
