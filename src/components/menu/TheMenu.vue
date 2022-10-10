<template>
  <v-sheet class="d-flex flex-row">
      <v-btn
          v-for="link in links"
          :key="links.indexOf(link)"
          :to="link.url"
          text
      >
        {{ link.name }}
      </v-btn>
  </v-sheet>
</template>

<script>

export default {
  methods: {
  },
  data: () => ({
    links: [
      {name: 'Главная', url: '/'},
    ],
  }),
}
</script>

<style scoped>

</style>