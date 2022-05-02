<template>
  <q-item
    clickable
    v-ripple
  >
    <q-item-section avatar>
      <q-avatar
        color="primary"
        :icon="icon"
        size="42px"
        rounded
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ groupName }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GroupMenuItem',
  props: {
    groupName: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      default: 'group'
    }
  }
});
</script>
