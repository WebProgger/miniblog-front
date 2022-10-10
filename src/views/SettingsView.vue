<template>
  <the-layout>
    <v-overlay v-if="!!isLoading" :value="isLoading">
      <the-loader size="64" />
    </v-overlay>
    <v-card v-else-if="!isLoading" width="450" class="px-4 mt-16 mx-auto">
      <v-card-title class="justify-center">Настройки</v-card-title>
        <v-card-text>
          <v-form
              ref="form"
              v-model="valid"
              @submit.prevent
              lazy-validation
          >
            <v-text-field
                v-model="form.fullName"
                label="ФИО"
                type="text"
                required
                prepend-icon="mdi-account-supervisor"
            ></v-text-field>
            <v-text-field
                v-model="form.login"
                label="Логин"
                type="text"
                required
                prepend-icon="mdi-account"
            ></v-text-field>
            <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                required
                prepend-icon="mdi-at"
            ></v-text-field>
            <v-text-field
                v-model="form.password"
                label="Пароль"
                type="password"
                required
                prepend-icon="mdi-lock"
            ></v-text-field>
            <v-text-field
                v-model="form.passwordConfirmation"
                label="Подтверждение пароля"
                type="password"
                required
                prepend-icon="mdi-lock-reset"
            ></v-text-field>
          </v-form>
          <v-card-actions class="justify-center">
            <v-btn
                :disabled="!valid"
                color="primary"
                @click="submit"
            >
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card-text>
    </v-card>
  </the-layout>
</template>

<script>
import {mapGetters} from "vuex";
import TheLoader from "@/components/loader/TheLoader";
import {USER_SETTINGS_REQUEST} from "@/store/actions/user";

export default {
  name: "settings-view",
  components: {
    TheLoader
  },
  data: function() {
    return {
      valid: true,
      form: {
        fullName: '',
        login: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile',
      isLoading: 'isProfileLoading'
    })
  },
  methods: {
    submit() {
      let profile = this.$store.getters.getProfile;
      if(this.$refs.form.validate()) {
        const deserializedForm = {};
        if(this.form.fullName && this.form.fullName !== profile.full_name) {
          deserializedForm.full_name = this.form.fullName;
        }
        if(this.form.login && this.form.login !== profile.login) {
          deserializedForm.login = this.form.login;
        }
        if(this.form.email && this.form.email !== profile.email) {
          deserializedForm.email = this.form.email;
        }
        if(this.form.password) {
          deserializedForm.password = this.form.password;
          deserializedForm.password_confirmation = this.form.passwordConfirmation
        }
        this.$store.dispatch(USER_SETTINGS_REQUEST, deserializedForm);
      }
    }
  },
}
</script>

<style scoped>

</style>