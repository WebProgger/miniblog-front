<template>
  <v-col @click="update" cols="4">
    <router-link class="d-flex flex-column" :to="url">
      <v-avatar class="mx-auto" color="grey darken-1" size="48" />
      <p class="text-center text-no-wrap text">{{ name }}</p>
    </router-link>
  </v-col>
</template>

<script>
import {USER_FOLLOWERS_REQUEST, USER_FOLLOWS_REQUEST, USER_REQUEST} from "@/store/actions/user";
import store from "@/store";

export default {
  name: "people-item",
  props: {
    name: String,
    url: String
  },
  methods: {
    update: function() {
      if(this.$route.params.id) {
        this.$store.dispatch(USER_REQUEST, { userId: this.$route.params.id });
        this.$store.dispatch(USER_FOLLOWS_REQUEST, { userId: this.$route.params.id });
        this.$store.dispatch(USER_FOLLOWERS_REQUEST, { userId: this.$route.params.id });
      } else {
        this.$store.dispatch(USER_FOLLOWS_REQUEST, { userId: store.getters.getUserMe });
        this.$store.dispatch(USER_FOLLOWERS_REQUEST, { userId: store.getters.getUserMe });
      }
    }
  }
}
</script>

<style scoped>
  .text {
    color: rgba(0, 0, 0, 0.6);
  }
</style>