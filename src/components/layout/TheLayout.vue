<template>
  <v-app class="" id="inspire">
    <the-header />
    <v-main class="grey lighten-3">
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
    <the-alert />
    <post-create-modal v-if="!!isOpenCreateModal" />
    <post-delete-modal v-if="!!isOpenDeleteModal" />
    <post-edit-modal v-if="!!isOpenEditModal" />
    <v-overlay :value="isLoading">
        <the-loader size="64" />
    </v-overlay>
  </v-app>
</template>

<script>
import TheHeader from "@/components/header/TheHeader";
import TheAlert from "@/components/alert/TheAlert";
import {mapGetters} from "vuex";
import TheLoader from "@/components/loader/TheLoader";
import PostCreateModal from "@/components/post/PostCreateModal";
import PostDeleteModal from "@/components/post/PostDeleteModal";
import PostEditModal from "@/components/post/PostEditModal";

export default {
  name: 'the-layout',
  props: {},
  components: {
    TheHeader,
    TheAlert,
    TheLoader,
    PostCreateModal,
    PostDeleteModal,
    PostEditModal,
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      isOpenCreateModal: 'isOpenCreatePostModal',
      isOpenDeleteModal: 'isOpenDeletePostModal',
      isOpenEditModal: 'isOpenEditPostModal',
    }),
  }
}
</script>

<style>
  a {
    text-decoration: none;
    color: #000;
  }
</style>