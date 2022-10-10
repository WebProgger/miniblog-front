<template>
  <router-view></router-view>
</template>

<script>

import {USER_ME_REQUEST} from "@/store/actions/user";

export default {
  name: 'app',
  beforeCreate: function() {
    if(this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_ME_REQUEST);
    }
  }
}
</script>

<style>
  .text {
    color: rgba(0, 0, 0, 0.6);
  }
  .link {
    color: #424242;
  }
  .pointer {
    cursor: pointer;
  }
</style>