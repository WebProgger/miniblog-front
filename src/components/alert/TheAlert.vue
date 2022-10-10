<template>
  <v-alert
      @click="close"
      v-show="isShow"
      class="alert"
      :type="alertData.style"
  >
    {{ alertData.text }}
  </v-alert>
</template>

<script>
import { mapGetters } from "vuex";
import { ALERT_HIDE } from "@/store/actions/alert";

export default {
  name: "the-alert",
  data: function() {
    return {
      timeVisible: 5000
    }
  },
  computed: {
    ...mapGetters({
      isShow: 'isAlertShow',
      alertData: 'getAlertData'
    })
  },
  methods: {
    close: function() {
      this.$store.dispatch(ALERT_HIDE);
    }
  },
  created: function() {
    setTimeout(() => this.$store.dispatch(ALERT_HIDE), this.timeVisible)
  },
}
</script>

<style scoped>
  .alert {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 240px;
    word-break: break-word;
  }
</style>