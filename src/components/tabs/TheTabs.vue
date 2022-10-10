<template>
  <div>
    <v-sheet class="pa-4 mt-4" elevation="2" rounded>
      <v-tabs
          v-model="tab"
      >

        <v-tab
            v-for="item in items"
            :key="item.id"
        >
          {{ item.name }}
        </v-tab>
        <slot name="tools"></slot>
      </v-tabs>
    </v-sheet>

    <v-tabs-items v-model="tab" class="transparent">
      <v-tab-item
          v-for="item in items"
          :key="item.id"
      >
        <slot :name="item.id"></slot>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: "the-tabs",
  props: {
    items: []
  },
  data () {
    return {
      tab: null,
    }
  },
}
</script>

<style scoped>

</style>