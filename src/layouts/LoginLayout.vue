<template>
  <q-layout view="hHh Lpr hFf">
    <q-page-container>
      <q-page class="bg-dark text-white text-center q-pa-md flex flex-center">
        <div>
          <div style="font-size: 10vh">PowerBC</div>

          <div class="text-h3" style="opacity:.4">Log in to PowerBC</div>

          <div class="q-pa-md">
            <div class="row justify-center">
              <div class="q-gutter-y-md col">
                <q-input 
                  dark
                  v-model="email"
                  filled 
                  type="email" 
                  label="Email" 
                  label-color="white"
                  :rules="[val => val && val.length > 0 || 'Please type your email.']"
                />
                <q-input
                  dark
                  v-model="password"
                  filled 
                  type="password" 
                  label="Password"
                  label-color="white"
                  :rules="[val => val && val.length > 0 || 'Please type your password.']"
                />
                <q-btn
                  color="primary"
                  label="Continue"
                  rounded
                  unelevated
                  no-caps
                  @click="login"
                />
              </div>
            </div>
          </div>

        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'
import { Cookies,  useQuasar } from 'quasar'

export default defineComponent({
  name: 'SignUpLayout',
  data () {
    return {
      email : '',
      password: '',
    }
  },

  setup () {
    const $q = useQuasar()
    $q.dark.set(true)

    return {
      $q
    }
  },

  methods: {
    login: function () {

      api.post(
        `${backend}/api/User/login`,
        {
          email: this.email,
          password: this.password
        },)
        .then(response => {
          // 
          const token = response.data.token;
          Cookies.set('token', token)

          // 
          this.$router.push('/main')
        })
        .catch(error => {
          // Alert
          this.$q.dialog({
            html: true,
            title: '<span class="text-negative">Failed</span>',
            message: `<span class="text-grey">${error.response.data}</span>`,
            ok:{
              label: 'Ok',
              color: 'primary',
              'no-caps': true,
              rounded: true
            },
            persistent: true,
          })

          // Clear input
          this.email=''; this.password='';
        })
    }
  },


});
</script>
