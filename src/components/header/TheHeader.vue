<template>
  <v-app-bar
      app
      color="white"
      flat
  >
    <v-container class="py-0 fill-height flex-nowrap">

      <v-toolbar-title class="mr-10">EasyBlog</v-toolbar-title>

      <the-menu />

      <v-spacer></v-spacer>

      <div class="mini-profile">
        <the-loader v-if="!!isProfileLoading" />
        <mini-profile v-show="isProfileShow" v-else-if="!!isAuth & !isProfileLoading" />
        <v-item-group v-if="!isAuth">
          <v-item>
            <v-btn
                x-small
                plain
                to="/login"
            >
              Войти
            </v-btn>
          </v-item>
          <v-item>
            <span>/</span>
          </v-item>
          <v-item>
            <v-btn
                x-small
                plain
                to="/register"
            >
              Регистрация
            </v-btn>
          </v-item>
        </v-item-group>
      </div>

    </v-container>
  </v-app-bar>
</template>

<script>

import TheMenu from "@/components/menu/TheMenu";
import { mapGetters } from "vuex";
import MiniProfile from "@/components/mini-profile/MiniProfile";
import TheLoader from "@/components/loader/TheLoader";

export default {
  components: {
    TheMenu,
    MiniProfile,
    TheLoader
  },
  computed: {
    ...mapGetters({
        isAuth: 'isAuthenticated',
        isProfileLoading: 'isProfileLoading',
        isProfileShow: 'isProfileLoadedSuccess'
    }),
  }
}
</script>

<style scoped>
  .mini-profile {
    display: flex;
    justify-content: end;
    min-width: 200px;
  }
</style>