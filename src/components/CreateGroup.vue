<template>
  <q-item
    clickable
    @click="toggleCreateGroupDialog = true"
  >
    <q-item-section avatar>
      <q-avatar
        color="primary"
        icon="add"
        size="42px"
        rounded
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>Create Group</q-item-label>
    </q-item-section>
  </q-item>

  <q-dialog
    v-model="toggleCreateGroupDialog"
    @before-hide="resetInput"
  >
    <q-card style="width: 700px">
      <q-card-section class="row items-center q-pa-md">
        <div class="text-h5 text-bold">Create a group</div>
        <div class="text-h6" style="opacity:.4">
          Your group is where you and your friends collab.</div>
      </q-card-section>
        
      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            v-model="groupName"
            filled
            type="text"
            label="Name"
            label-color="white"
            :rules="[val => val && val.length > 0 || 'Please type the group name.']"
          />
          <q-input
            v-model="groupDesc"
            filled
            type="textarea"
            label="Description"
            label-color="white"
            rows="3"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn 
          label="Cancel" 
          color="negative"
          rounded 
          no-caps
          unelevated
          v-close-popup
        />
        <q-btn 
          label="Create" 
          color="primary" 
          rounded
          no-caps
          unelevated
          v-close-popup
          @click="createGroup"
          :disable="groupName == ''"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuasar, Cookies } from 'quasar'
import { api } from 'boot/axios'
import { backend } from 'src/config/config'

export default defineComponent({
  name: 'CreateGroup',

  data () {
    return {
      toggleCreateGroupDialog: false,
      groupName: '',
      groupDesc: '',
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
    createGroup: function () {
      // fix me: api.post

      //for debug, remove this
      this.$emit('updateGroupMenu', this.groupName)
      this.$q.dialog({
        html: true,
        title: '<span class="text-positive">Success</span>',
        message: 
        `<span class="text-grey">
          The group <b>${this.groupName}</b> has been successfully created.
        </span>`,
        ok:{
          label: 'Ok',
          color: 'primary',
          'no-caps': true,
          rounded: true
        },
      })
    },
    resetInput: function () {
      this.groupName = ''
      this.groupDesc = ''
    },
  },
});
</script>
