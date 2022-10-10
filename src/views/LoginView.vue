<template>
  <the-layout>
    <v-card width="450" class="px-4 mt-16 mx-auto">
      <v-card-title class="justify-center">Авторизация</v-card-title>
      <v-card-text>
        <v-form
            ref="form"
            v-model="valid"
            @submit.prevent
            lazy-validation
        >
          <v-text-field
              v-model="form.login"
              :rules="formRules.login"
              label="Логин"
              type="text"
              required
              prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
              v-model="form.password"
              :rules="formRules.password"
              label="Пароль"
              type="password"
              required
              prepend-icon="mdi-lock"
          ></v-text-field>
          <v-card-actions class="justify-space-between">
            <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
            >
              Войти
            </v-btn>
            <v-item-group>
              <v-item>
                <v-btn
                    x-small
                    plain
                    to="/register"
                >
                  Регистрация
                </v-btn>
              </v-item>
              <v-item>
                <span>/</span>
              </v-item>
              <v-item>
                <v-btn
                    x-small
                    plain
                    to="forgot-password"
                >
                  Забыли пароль?
                </v-btn>
              </v-item>
            </v-item-group>
          </v-card-actions>
        </v-form>
      </v-card-text>

    </v-card>
  </the-layout>
</template>

<script>
import { AUTH_LOGIN_REQUEST } from "@/store/actions/auth";

export default {
  name: "login-view",
  data: () => ({
    valid: true,
    form: {
      login: '',
      password: '',
    },
    formRules: {
      login: [
        v => !!v || 'Поле логин должно быть заполнено',
        v => (v && v.length <= 255) || 'Логин может содержать максимум 255 символов',
      ],
      password: [
        v => !!v || 'Поле пароль должно быть заполнено',
      ],
    }
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const deserializedForm = {
          login: this.form.login,
          password: this.form.password,
        }
        this.$store.dispatch(AUTH_LOGIN_REQUEST, deserializedForm).then(() => {
          this.$router.push("/");
        }).catch(() => {});
      }
    }
  }
}
</script>

<style scoped>

</style>