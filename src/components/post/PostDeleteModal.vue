<template>
  <the-modal v-if="!isLoading">
    <template v-slot:title>
      Удаление поста
    </template>
    <template v-slot:content>
      Вы действительно хотите удалить пост: {{ post.title }}
    </template>
    <template v-slot:btn>
      <v-btn
          color="red"
          plain
          @click="submit"
      >Удалить</v-btn>
    </template>
  </the-modal>
</template>

<script>
import {MODAL_HIDE, MODAL_SHOW, OPEN_DELETE_POST_MODAL} from "@/store/actions/modal";
import {mapGetters} from "vuex";
import {DELETE_POST_REQUEST} from "@/store/actions/post";

export default {
  name: "post-delete-modal",
  computed: {
    ...mapGetters({
      isLoading: 'isPostsLoading',
      post: 'getPost',
    })
  },
  methods: {
    submit: function() {
      this.$store.dispatch(MODAL_HIDE);
      this.$store.dispatch(OPEN_DELETE_POST_MODAL, false);
      this.$store.dispatch(DELETE_POST_REQUEST, this.$store.getters.getPost.id);
    }
  },
  created() {
    this.$store.dispatch(MODAL_SHOW);
  },
}
</script>

<style scoped>

</style>