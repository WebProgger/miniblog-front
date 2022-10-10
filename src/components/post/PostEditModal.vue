<template>
  <the-modal>
    <template v-slot:title>
      Редактирование поста
    </template>
    <template v-slot:content>
      <v-form
          ref="form"
          @submit.prevent
          lazy-validation
      >
        <v-text-field
            v-model="form.title"
            label="Заголовок"
            type="text"
            required
        ></v-text-field>
        <v-textarea
            v-model="form.text"
            label="Текст"
            required
        ></v-textarea>
      </v-form>
    </template>
    <template v-slot:btn>
      <v-btn
          color="green"
          plain
          @click="submit"
      >Сохранить</v-btn>
    </template>
  </the-modal>
</template>

<script>
import {MODAL_HIDE, MODAL_SHOW, OPEN_EDIT_POST_MODAL} from "@/store/actions/modal";
import {EDIT_POST_REQUEST} from "@/store/actions/post";

export default {
  name: "post-edit-modal",
  data: function() {
    return {
      form: {
        title: this.$store.getters.getPost.title,
        text: this.$store.getters.getPost.text,
      },
    }
  },
  methods: {
    submit: function() {
      this.$store.dispatch(MODAL_HIDE);
      this.$store.dispatch(OPEN_EDIT_POST_MODAL, false);
      let deserializedForm = {
        id: this.$store.getters.getPost.id,
        title: this.form.title,
        text: this.form.text,
        author: this.$store.getters.getUserMe
      };
      this.$store.dispatch(EDIT_POST_REQUEST, deserializedForm);
    }
  },
  created() {
    this.$store.dispatch(MODAL_SHOW);
  },
}
</script>

<style scoped>

</style>