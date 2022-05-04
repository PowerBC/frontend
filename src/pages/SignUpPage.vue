<template>
  <q-page class="bg-dark text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 10vh">PowerBC</div>

      <div class="text-h3" style="opacity:.4">Sign up for your account</div>

      <div class="q-pa-xl">
        <div class="row justify-center">
          <div class="q-gutter-y-md col">
            <q-input 
              dark
              val="123"
              v-model="email" 
              filled 
              type="email" 
              label="Email" 
              label-color="white"
              :error-message="emailErrorMsg"
              :error="isEmailError"
              :rules="[val => val && val.length > 0 || 'Please type your email.']"
            />
            
            <q-input 
              dark 
              v-model="name" 
              filled 
              type="text" 
              label="Name" 
              label-color="white"
              :rules="[val => val && val.length > 0 || 'Please type your name.']"
            />
            <q-input
              dark
              v-model="password"
              filled 
              :type="isPwd ? 'password' : 'text'" 
              label="Password"
              label-color="white"
              :rules="[val => val && val.length > 0 || 'Please type your password.']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Continue"
              rounded
              unelevated
              no-caps
              :disable="email == '' || name == '' || password == ''"
              @click="submitRegistration"
            />
          </div>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'SignUpLayout',
  data () {
    return {
      email : '',
      name: '',
      password: '',
      isEmailError: false,
      emailErrorMsg: '',
      isPwd: true,
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
    submitRegistration: function () {

      api.post(
        `${backend}/api/User/signup`,
        {
          email: this.email,
          name: this.name,
          password: this.password
        },)
        .then(() => {
          
          this.isEmailError = false;
          this.emailErrorMsg = '';

          this.$q.dialog({
            html: true,
            title: '<span class="text-positive">Successful</span>',
            message: '<span class="text-grey">Congratulations, your account has been successfully created.</span>',
            ok:{
              label: 'Login',
              color: 'primary',
              'no-caps': true,
              rounded: true
            },
            cancel:{
              label: 'Go Home',
              color: 'primary',
              'no-caps': true,
              rounded: true
            },
            persistent: true
          })
          .onOk(() => {
            this.$router.push('/login')
          })
          .onCancel(() => {
            this.$router.push('/')
          })
        })
        .catch(error => {
          if (error.response.status == 409) {
            this.isEmailError = true
            this.emailErrorMsg = 'This email is already registed, please try another one.'
          }
          else {
            this.$q.dialog({
              title: 'Error',
              message: 'error.response.data',
              ok:{
                label: 'OK',
                color: 'primary',
                rounded: true
              },
              persistent: true
            })
          }
        })
    }
  }
});
</script>
