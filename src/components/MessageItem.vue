<template>
  <q-item class="full-width">
    <div class="full-width q-col-gutter-sm">
      <div class="q-gutter-sm">
          <q-avatar color="primary" icon="person" size="lg"/>
          <span class="text-h5 text-secondary">{{ this.sender.name }}</span>
          <span class="text-h6 text-grey"> • </span>
          <span class="text-h6 text-grey">{{ this.time }}</span>
      </div>
      <div >
        <span class="text-h6 text-white">{{ this.content }}</span>
      </div>
    </div>
    
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageItem',
  props: {
    groupId: {
      type: String,
      required: true
    },
    channelId: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    sender: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      required: true
    },
    content: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
  }
});
</script>
