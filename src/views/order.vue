<template>
  <div class="medication_order">
    <orderCounter/>
  </div>
</template>

<script>
import orderCounter from '@/components/orderCounter.vue'

export default {
  name: 'Order',
  components: {
    orderCounter
  }
}
</script>
