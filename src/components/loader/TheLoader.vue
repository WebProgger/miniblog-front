<template>
  <v-progress-circular indeterminate color="#ccc" :size="size"></v-progress-circular>
</template>

<script>
export default {
  name: "the-loader",
  props: {
    size: String,
  }
}
</script>

<style scoped>

</style>