<template>
  <v-sheet class="px-1 mt-4" elevation="2" rounded>
    <the-loader class="ma-16" v-if="!!isLoading" />
    <v-card v-else-if="!isLoading" elevation="0">
      <v-card-title>
        <span class="subtitle-1">{{ blockName }}</span>
        <span class="ml-1 caption">{{ itemsCount }}</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <people-item v-for="(item, index) in itemsList" :key="index" :name="item.login" :url="`/profile/${item.id}`" />
        </v-row>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script>
import PeopleItem from "@/components/people-block/PeopleItem";
import TheLoader from "@/components/loader/TheLoader";

export default {
  name: "people-block",
  props: {
    blockName: String,
    itemsCount: Number,
    itemsList: [],
    isLoading: Boolean
  },
  components: {
    PeopleItem,
    TheLoader
  },
}
</script>

<style scoped>

</style>