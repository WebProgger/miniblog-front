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
              v-model="form.password"
              :rules="formRules.password"
              label="Пароль"
              type="password"
              required
              prepend-icon="mdi-lock"
          ></v-text-field>
          <v-text-field
              v-model="form.passwordConfirmation"
              :rules="formRules.passwordConfirmation"
              label="Подтверждение пароля"
              type="password"
              required
              prepend-icon="mdi-lock-reset"
          ></v-text-field>
          <v-card-actions class="justify-center">
            <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
            >
              Подтвердить
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </the-layout>
</template>

<script>
import {AUTH_RESET_PASSWORD_REQUEST} from "@/store/actions/auth";

export default {
  name: "reset-password-view",
  data: function() {
    return {
      valid: true,
      form: {
        password: '',
        passwordConfirmation: ''
      },
      formRules: {
        password: [
          v => !!v || 'Поле пароль должно быть заполнено',
          v => (v && v.length >= 6) || 'Пароль должен содержать как минимум 6 символов'
        ],
        passwordConfirmation: [
          v => !!v || 'Поле подтверждение пароля должно быть заполнено',
        ]
      },
    }
  },
  methods: {
    submit: function() {
      let deserializedForm = {
        email: this.$store.getters.getForgotEmail,
        token: this.$store.getters.getForgotToken,
        password: this.form.password,
        password_confirmation: this.form.passwordConfirmation
      };

      this.$store.dispatch(AUTH_RESET_PASSWORD_REQUEST, deserializedForm).then(() => {
        this.$router.push("/login");
      });
    }
  },
  beforeCreate() {
    if(!this.$store.getters.isForgotToken) {
      this.$router.push("/login");
    }
    if(this.$store.getters.getForgotToken !== this.$route.params.token) {
      this.$router.push("/login");
    }
  }
}
</script>

<style scoped>

</style>