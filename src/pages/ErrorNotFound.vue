<template>
  <div class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center">
    <div>

      <div style="font-size: 30vh">404</div>
      <div class="text-h2" style="opacity:.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="primary"
        unelevated
        rounded
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ErrorNotFound',
  setup () {
    const $q = useQuasar()
    $q.dark.set(true);
  }
});
</script>
