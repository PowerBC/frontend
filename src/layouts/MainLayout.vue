<template>
  <q-layout view="hHh Lpr fFf"> <!--lHh Lpr lFf-->

    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="primary"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="text-primary"><b>PowerBC</b></q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      
      :mini="miniState"
      mini-to-overlay
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      elevated
      bordered
    >
      <CreateGroup />
      
      <q-separator />
      
      <GroupMenuItem
        v-for="(group, index) in groupList"
        :key="index"
        v-bind="group"
        @click="changeGroup(index)"
      />
      
    </q-drawer>

    <q-page-container>
      <GroupPage 
        v-if="currentGroupId"
        v-bind="{
          id: currentGroupId, 
          name: currentGroupName, 
          description: currentGroupDesc}"
      />
    </q-page-container>

    <q-footer>
    </q-footer>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useQuasar, Cookies } from 'quasar'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'
import * as signalR from '@microsoft/signalr'

import GroupMenuItem from 'src/components/GroupMenuItem.vue'
import CreateGroup from 'src/components/CreateGroup.vue'
import GroupPage from 'pages/GroupPage.vue'


export default defineComponent({
  name: 'MainLayout',

  components: {
    GroupMenuItem,
    CreateGroup,
    GroupPage,
  },

  setup () {
    const $q = useQuasar()
    $q.dark.set(true)

    const leftDrawerOpen = ref(true)
    
    const groupList = ref(Array<{id: string, name: string, description: string}>())
    const currentGroupId = ref('')
    const currentGroupName = ref('')
    const currentGroupDesc = ref('')

    const updateGroupList = async function () {
      const { data } = await api.get(
        `${backend}/api/Group/groupList`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      groupList.value = data
      if (groupList.value.length > 0)
      {
        currentGroupId.value = groupList.value[0].id
        currentGroupName.value = groupList.value[0].name
        currentGroupDesc.value = groupList.value[0].description
      }
    }

    onMounted(async () => {
      console.log('mainlayout mounted')
      const { data } = await api.get(
        `${backend}/api/Group/groupList`,
        {headers: {Authorization: 'Bearer ' + Cookies.get('token')}}
      )
      groupList.value = data

      if (groupList.value.length > 0)
      {
        currentGroupId.value = groupList.value[0].id
        currentGroupName.value = groupList.value[0].name
        currentGroupDesc.value = groupList.value[0].description
      }
      console.log(groupList.value)
    })
    
    // 
    const connection = 
      new signalR.HubConnectionBuilder()
      .withUrl(`${backend}/hub/GroupService`).build()
    connection.on('UpdateGroupList', updateGroupList)
    connection.start()

    return {
      leftDrawerOpen,
      miniState: ref(true),
      groupList,
      currentGroupId,
      currentGroupName,
      currentGroupDesc,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      changeGroup (index: number) {
        currentGroupId.value = groupList.value[index].id
        currentGroupName.value = groupList.value[index].name
        currentGroupDesc.value = groupList.value[index].description
        console.log(`Current Group: ${groupList.value[index].id}`)
      }
    }
  },


});
</script>
