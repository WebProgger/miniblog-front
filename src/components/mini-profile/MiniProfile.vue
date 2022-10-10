<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-card elevation="0" class="d-flex pt-3 pl-2 pr-2" v-bind="attrs" v-on="on">
        <p class="font-weight-medium mt-1 mr-4">{{ profile.login }}</p>
        <v-avatar
            color="grey darken-1"
            size="32"
        ></v-avatar>
      </v-card>
    </template>
    <v-list>
      <router-link
          v-for="(item, index) in items"
          :key="index"
          class="black--text"
          :to="item.url"
      >
          <v-list-item class="hover">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
      </router-link>
      <v-list-item class="hover" @click="logout">
        <v-list-item-title>
          Выйти
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {mapGetters} from "vuex";
import {AUTH_LOGOUT_REQUEST} from "@/store/actions/auth";

export default {
  name: "mini-profile",
  computed: {
    ...mapGetters({
      profile: 'getProfile'
    }),
  },
  data: () => ({
    items: [
      { title: 'Профиль', url: `/profile` },
      { title: 'Настройки', url: '/settings' },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT_REQUEST);
    }
  },
}
</script>

<style scoped>
  .hover:hover {
    background: #e6e6e6;
  }
</style>