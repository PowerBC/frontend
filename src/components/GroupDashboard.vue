<template>
  <q-card class="my-card full-height">
    <q-card-section class="row bg-primary">
      <div class="text-h5 text-bold">{{ this.name }}</div>
      <q-space />
      <q-btn flat icon="person_add" round></q-btn>
      <q-btn flat icon="settings" round></q-btn>
    </q-card-section>
    
    <q-card-section class="">
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
          @click="updateCurrentChannel(index)"
        />
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar, Cookies } from 'quasar'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'

import ChannelMenuItem from 'components/ChannelMenuItem.vue'

export default defineComponent({
  name: 'GroupDashboard',

  components : {
    ChannelMenuItem,
  },

  props: {
    id:{
      type: String,
      required: true,
    },
    name:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
    }
  },
  
  setup (props, { emit }) {
    const $q = useQuasar()
    $q.dark.set(true)

    const channelList = ref(Array<{id: string, name: string}>())
    const currentChannel = ref(0)

    const updateCurrentChannel = function (index : number) {
      currentChannel.value = index
      emit('UpdateCurrentChannel', (channelList.value)[index].id)
      
    }

    const updateChannelList = function () {
      api.get(
        `${backend}/api/Group/channelList/${props.id}`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      .then(response => {
        channelList.value = response.data
      })
    }

    // First getting group list
    updateChannelList()

    return {
      channelList,
      currentChannel,
      updateCurrentChannel,
    }
  },

  methods: {
  },
});
</script>
