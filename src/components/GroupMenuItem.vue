<template>
  <q-item
    clickable
    v-ripple
  >
    <q-item-section avatar>
      <q-avatar
        color="primary"
        icon="group"
        size="42px"
        rounded
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupMenuItem',
  props: {
    id: {
      type: String,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

  }
});
</script>
