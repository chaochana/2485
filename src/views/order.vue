<template>
  <div class="medication_order">
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
