<template>
  <q-layout view="hHh Lpr hFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeLayout',
  data () {
    return {
    }
  }
});
</script>
