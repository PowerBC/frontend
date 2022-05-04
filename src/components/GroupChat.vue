<template>
  <q-card class="my-card fit q-col-gutter-xs">
    <q-card-section style="height: 80%; overflow: auto;">
      <div >
        <MessageItem 
          v-for="(msg, index) in messageList"
          :key="index"
          :groupId="this.currentGroup"
          :channelId="this.currentChannel"
          :id="msg.id"
          :sender="msg.sender"
          :content="msg.content"
          :time="msg.time"
        />
      </div>
    </q-card-section>
    <q-card-actions class="q-pa-sm height: 20%">
      <q-input
        v-model="inputMessage"
        type="text"
        filled
        rows="3"
        placeholder="Type message here"
        class="full-width text-h6"
        
      />
      <q-btn @click="sendMessage">Send</q-btn>
    </q-card-actions>
    
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref,  onMounted } from 'vue'
import { useQuasar, Cookies } from 'quasar'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'
//import * as signalR from '@microsoft/signalr'

import MessageItem from 'components/MessageItem.vue'

export default defineComponent({
  name: 'GroupChat',

  components: { 
    MessageItem,
  },

  props: {
    currentGroupId: {
      type: String,
      require: true,
    },
    currentChannelId: {
      type: String,
      require: true,
    },
  },

  setup (props) {
    const $q = useQuasar()
    $q.dark.set(true)

    const messageList = ref(
      Array<{
        id: string,
        sender: {
          id: string,
          name: string
        },
        content: string,
        time: string
      }>()
    )

    // First getting message list
    onMounted(async () => {
      const { data } = await api.get(
        `${backend}/api/Group/messageList/${props.currentGroupId}/${props.currentChannelId}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      messageList.value = data
      console.log(messageList.value)
    })


    const inputMessage = ref('')
    const sendMessage = function () {
      api.post(
        `${backend}/api/Group/sendMessage`,
        {
          groupId: props.currentGroupId,
          channelId: props.currentChannelId,
          message: inputMessage.value
        },
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      inputMessage.value = ''
    }

    return {
      messageList,
      inputMessage,
      sendMessage,
    }
  },

  methods: {
  },
});
</script>
