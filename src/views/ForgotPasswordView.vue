<template>
  <the-layout>
    <v-card width="450" class="px-4 mt-16 mx-auto">
      <v-card-title class="justify-center">Восстановление пароля</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent
            lazy-validation
        >
          <v-text-field
              v-model="form.email"
              :rules="formRules.email"
              label="Email"
              type="email"
              required
              prepend-icon="mdi-at"
          ></v-text-field>
          <v-card-actions class="justify-center">
            <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
            >
              Восстановить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

    </v-card>
  </the-layout>
</template>

<script>
import {AUTH_FORGOT_PASSWORD_REQUEST} from "@/store/actions/auth";

export default {
  name: "forgot-password-view",
  data: function() {
    return {
      valid: true,
      form: {
        email: '',
      },
      formRules: {
        email: [
          v => !!v || 'Поле email должно быть заполнено',
          v => /.+@.+\..+/.test(v) || 'Email должен быть действительным'
        ],
      },
    }
  },
  methods: {
    submit: function() {
      this.$store.dispatch(AUTH_FORGOT_PASSWORD_REQUEST, this.form).then(resp => {
        this.$router.push(`/reset-password/${resp.data.token}`);
      });
    }
  }
}
</script>

<style scoped>

</style>