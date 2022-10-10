<template>
  <the-layout>
    <v-card width="450" class="px-4 mt-16 mx-auto">
      <v-card-title class="justify-center">Регистрация</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent
            lazy-validation
        >
          <v-text-field
              v-model="form.fullName"
              :rules="formRules.fullName"
              label="ФИО"
              type="text"
              required
              prepend-icon="mdi-account-supervisor"
          ></v-text-field>
          <v-text-field
              v-model="form.login"
              :rules="formRules.login"
              label="Логин"
              type="text"
              required
              prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
              v-model="form.email"
              :rules="formRules.email"
              label="Email"
              type="email"
              required
              prepend-icon="mdi-at"
          ></v-text-field>
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
          <v-card-actions class="justify-space-between">
            <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
            >
              Зарегистрироваться
            </v-btn>
            <v-btn
                x-small
                plain
                to="/login"
            >
              Авторизизация
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

    </v-card>
  </the-layout>
</template>

<script>
import {AUTH_REGISTER_REQUEST} from "@/store/actions/auth";

export default {
  name: "register-view",
  data: () => ({
    valid: true,
    form: {
      fullName: '',
      login: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    formRules: {
      fullName: [
          v => !!v || 'Поле ФИО должно быть заполнено',
          v => (v && v.length <= 255) || 'ФИО может содержать максимум 255 символов'
      ],
      login: [
          v => !!v || 'Поле логин должно быть заполнено',
          v => (v && v.length >= 6) || 'Логин должен содержать минимум 6 символов',
          v => (v && v.length <= 255) || 'Логин может содержать максимум 255 символов',
          v => /^\w+$/.test(v) || 'Логин может содержать только латинские буквы и цифры'
      ],
      email: [
          v => !!v || 'Поле email должно быть заполнено',
          v => /.+@.+\..+/.test(v) || 'Email должен быть действительным'
      ],
      password: [
          v => !!v || 'Поле пароль должно быть заполнено',
          v => (v && v.length >= 6) || 'Пароль должен содержать как минимум 6 символов'
      ],
      passwordConfirmation: [
          v => !!v || 'Поле подтверждение пароля должно быть заполнено',
      ]
    },
  }),
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        const deserializedForm = {
          full_name: this.form.fullName,
          login: this.form.login,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.passwordConfirmation
        }
        this.$store.dispatch(AUTH_REGISTER_REQUEST, deserializedForm).then(() => {
          this.$router.push("/");
        }).catch(() => {});
      }
    }
  }
}
</script>

<style scoped>

</style>