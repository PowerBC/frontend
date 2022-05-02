<template>
  <q-layout view="hHh Lpr hFf"> <!--lHh Lpr lFf-->

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
      <CreateGroup v-on:updateGroupMenu="addGroupMenuItem"/>
      
      <q-separator />
      
      <GroupMenuItem
        v-for="(group, index) in groupList"
        :key="index"
        v-bind="group"
      />
      
      
      
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

import GroupMenuItem from 'src/components/GroupMenuItem.vue'
import CreateGroup from 'src/components/CreateGroup.vue'

const linksList = [
  {
    groupName: 'OOAD專題',
  },
  {
    groupName: '攝影Workshop',
  },
  {
    groupName: '公司群組',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    GroupMenuItem,
    CreateGroup,
  },

  setup () {
    const leftDrawerOpen = ref(true)

    const $q = useQuasar()
    $q.dark.set(true)

    return {
      $q,
      leftDrawerOpen,
      miniState: ref(true),
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },

  data () {
    return {
      groupList: Array<object>(),
    }
  },

  methods: {
    addGroupMenuItem: function (name: string) {
      this.groupList.push({groupName: name,})
    },
  },


});
</script>
