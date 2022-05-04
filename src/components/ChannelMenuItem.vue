<template>
  <q-item
    clickable
    v-ripple
  >
    <q-item-section>
      <q-item-label class="text-h6 text-grey" >{{ this.name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChannelMenuItem',
  props: {
    groupId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
  }
});
</script>
