<template>
  <v-dialog
      v-model="isShow"
      persistent
      max-width="600"
  >
    <v-card>
      <v-card-title class="text-h5">
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text>
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="red darken-1"
            text
            @click="hide"
        >
          Отмена
        </v-btn>
        <slot name="btn"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from "vuex";
import {MODAL_HIDE, OPEN_CREATE_POST_MODAL, OPEN_DELETE_POST_MODAL, OPEN_EDIT_POST_MODAL} from "@/store/actions/modal";

export default {
  name: "the-modal",
  computed: {
    ...mapGetters({
      isShow: 'isModalShow',
    })
  },
  methods: {
    hide: function() {
      this.$store.dispatch(MODAL_HIDE);
      this.$store.dispatch(OPEN_CREATE_POST_MODAL, false);
      this.$store.dispatch(OPEN_EDIT_POST_MODAL, false);
      this.$store.dispatch(OPEN_DELETE_POST_MODAL, false);
    },
  }
}
</script>

<style scoped>

</style>