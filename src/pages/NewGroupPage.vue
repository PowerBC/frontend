<template>
  <q-page class="bg-dark text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 10vh">PowerBC</div>

      <div class="text-h3" style="opacity:.4">A Powerful Business Communication Platform</div>
      <div class="text-h3" style="opacity:.4">Chat · Meeting · Collaboration</div>

      <div class="q-pa-md">
        <div class="row justify-center">
          <div class="col">
            <q-card class="my-card" flat dark>
              <q-card-section>
                <div class="text-h4">Join us now!</div>
                <div class="text-subtitle1 text-grey">Create a new account.</div>
              </q-card-section>

              <q-card-actions align="center">
                <q-btn
                  align="around"
                  label="Sign Up"
                  icon="person_add"
                  unelevated
                  color="primary"
                  to="/signup"
                  rounded
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>
          
          <div class="col">
            <q-card class="my-card" flat dark>
              <q-card-section>
                <div class="text-h4">Already have an account?</div>
                <div class="text-subtitle1 text-grey">Login and explore more.</div>
              </q-card-section>
              
              <q-card-actions align="center">
                <q-btn
                  align="around"
                  label="Log In"
                  icon="login"
                  unelevated
                  color="primary"
                  to="/login"
                  rounded
                  no-caps
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage'
});
</script>