<template>
  <q-page class="q-pa-md full-height">
    <div class="row q-col-gutter-sm" style="height:90vh">
      <div class="col-3 full-height">
        <q-card class="my-card full-height"
          v-if="channelList !== undefined"
        >
          <q-card-section class="row bg-primary">
            <div class="text-h5 text-bold">{{ name }}</div>
            <q-space />
            <q-btn flat icon="person_add" round></q-btn>
            <q-btn flat icon="settings" round></q-btn>
          </q-card-section>
          <q-card-section>
            <div class="row q-pa-xs">
              <div class="text-h6">Channels</div>
              <q-space />
              <q-btn flat icon="add" round></q-btn>
            </div>
            <q-list>
              <ChannelMenuItem 
                v-for="(ch, index) in channelList"
                :key="index"
                :groupId="this.id"
                :id="ch.id"
                :name="ch.name"
                @click="currentChannel = index"
              />
            </q-list>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-9" style="height=90vh;">
        <q-card class="my-card fit q-col-gutter-xs">
          <q-card-section style="height: 80%; overflow: auto;">
            <div >
              <MessageItem 
                v-for="(msg, index) in messageList"
                :key="index"
                :groupId="id"
                :channelId="channelList[currentChannel].id"
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
      </div>
    </div>
    
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch  } from 'vue'
import { Cookies } from 'quasar'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'
import * as signalR from '@microsoft/signalr'

import ChannelMenuItem from 'components/ChannelMenuItem.vue'
import MessageItem from 'components/MessageItem.vue'

export default defineComponent({
  name: 'GroupPage',

  components: { 
    ChannelMenuItem,
    MessageItem,
  },

  props: {
    // Group info
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  setup(props) {
  
    watch(() => props.id, async () => {
      const response = await api.get(
        `${backend}/api/Group/channelList/${props.id}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      channelList.value = response.data

      // Get message list
      const { data } = await api.get(
        `${backend}/api/Group/messageList/${props.id}/${channelList.value[currentChannel.value].id}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      console.log(`groupPage mounted, chid=${channelList.value[currentChannel.value].id}`) 
      messageList.value = data
    });

    const channelList = ref(Array<{id: string, name: string}>())
    const currentChannel = ref(0)
  
    // init
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
    onMounted(async () => {
      // Get channel list
      console.log(`groupPage mounted, gid=${props.id}`) 
      
      const response = await api.get(
        `${backend}/api/Group/channelList/${props.id}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      channelList.value = response.data

      // Get message list
      const { data } = await api.get(
        `${backend}/api/Group/messageList/${props.id}/${channelList.value[currentChannel.value].id}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      console.log(`groupPage mounted, chid=${channelList.value[currentChannel.value].id}`) 
      messageList.value = data
      
    })

    // Handle Input Message
    const inputMessage = ref('')
    const sendMessage = function () {
      api.post(
        `${backend}/api/Group/sendMessage`,
        {
          groupId: props.id,
          channelId: channelList.value[currentChannel.value].id,
          message: inputMessage.value
        },
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      inputMessage.value = ''
    }

    // 
    const connection = new signalR.HubConnectionBuilder().withUrl(`${backend}/hub/GroupService`).build()
    connection.on('ReceiveMessage', async () => {
      const { data } = await api.get(
        `${backend}/api/Group/messageList/${props.id}/${channelList.value[currentChannel.value].id}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      messageList.value = data
    })
    connection.start()

    return {
      channelList,
      currentChannel,
      messageList,
      inputMessage,
      sendMessage,
    };
  },
});
</script>
