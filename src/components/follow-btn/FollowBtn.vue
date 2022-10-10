<template>
  <div class="mt-4">
    <the-loader v-if="!!isFollowedLoading" />
    <v-btn
      v-else-if="conditionBtnEdit"
      color="primary"
      block
      to="/settings"
    >
      Редактировать
    </v-btn>
    <v-btn
        v-else-if="conditionBtnFollow"
        @click="follow"
        color="primary"
        block
    >
      Подписаться
    </v-btn>
    <v-btn
        v-else-if="conditionBtnUnFollow"
        @click="unFollow"
        color="error"
        block
    >
      Отписаться
    </v-btn>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import store from "@/store";
import {USER_FOLLOW_REQUEST, USER_ISFOLLOWED_REQUEST, USER_UNFOLLOW_REQUEST} from "@/store/actions/user";
import TheLoader from "@/components/loader/TheLoader";

export default {
  name: "follow-btn",
  components: {
    TheLoader
  },
  computed: {
    ...mapGetters({
      userMeId: 'getUserMe',
      isFollowedLoading: 'isFollowedLoading',
      isFollowed: 'isFollowed',
    }),
    conditionBtnEdit: function() {
      return !this.$route.params.id || (this.$route.params.id === store.getters.getUserMe);
    },
    conditionBtnFollow: function() {
      if(!!this.$route.params.id && (this.$route.params.id !== store.getters.getUserMe)) {
        return !store.getters.isFollowed;
      }
      return false;
    },
    conditionBtnUnFollow: function() {
      if(!!this.$route.params.id && (this.$route.params.id !== store.getters.getUserMe)) {
        return store.getters.isFollowed;
      }
      return false;
    }
  },
  methods: {
    follow: function() {
      this.$store.dispatch(USER_FOLLOW_REQUEST, { userId: this.$route.params.id })
    },
    unFollow: function() {
      this.$store.dispatch(USER_UNFOLLOW_REQUEST, { userId: this.$route.params.id })
    },
  },
  beforeCreate() {
    if(this.$route.params.id) {
      this.$store.dispatch(USER_ISFOLLOWED_REQUEST, { userId: this.$route.params.id });
    }
  },
  watch: {
    $route() {
      if(this.$route.params.id) {
        this.$store.dispatch(USER_ISFOLLOWED_REQUEST, { userId: this.$route.params.id });
      }
    }
  }
}
</script>

<style scoped>

</style>