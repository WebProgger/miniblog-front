<template>
  <the-modal>
    <template v-slot:title>
      Создание поста
    </template>
    <template v-slot:content>
      <v-form
          ref="form"
          v-model="valid"
          @submit.prevent
          lazy-validation
      >
        <v-text-field
            v-model="form.title"
            :rules="formRules.title"
            label="Заголовок"
            type="text"
            required
        ></v-text-field>
        <v-textarea
            v-model="form.text"
            :rules="formRules.text"
            label="Текст"
            required
        ></v-textarea>
      </v-form>
    </template>
    <template v-slot:btn>
      <v-btn
          :disabled="!valid"
          color="green"
          plain
          @click="submit"
      >Сохранить</v-btn>
    </template>
  </the-modal>
</template>

<script>
import {MODAL_HIDE, MODAL_SHOW, OPEN_CREATE_POST_MODAL} from "@/store/actions/modal";
import {CREATE_POST_REQUEST} from "@/store/actions/post";

export default {
  name: "post-create-modal",
  data: () => ({
    valid: true,
    form: {
      title: '',
      text: '',
    },
    formRules: {
      title: [
        v => !!v || 'Поле заголовок должно быть заполнено',
      ],
      text: [
        v => !!v || 'Поле текст должно быть заполнено',
      ],
    }
  }),
  methods: {
    submit: function() {
      this.$store.dispatch(MODAL_HIDE);
      this.$store.dispatch(OPEN_CREATE_POST_MODAL, false);
      let deserializedForm = {
        title: this.form.title,
        text: this.form.text,
        author: this.$store.getters.getUserMe
      };
      this.$store.dispatch(CREATE_POST_REQUEST, deserializedForm);
    }
  },
  created() {
    this.$store.dispatch(MODAL_SHOW);
  },
}
</script>

<style scoped>

</style>