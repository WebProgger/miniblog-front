<template>
  <div class="mt-5">
    <slot></slot>
    <v-btn
        v-if="to < total"
        plain
        @click="loadPosts"
    >
      Загрузить еще
    </v-btn>
  </div>
</template>

<script>
import {
  GET_ANY_POSTS_REQUEST,
  GET_FOLLOWED_POSTS_REQUEST, GET_LIKED_POSTS_REQUEST,
  GET_MY_POSTS_REQUEST,
  GET_POSTS_REQUEST
} from "@/store/actions/post";

export default {
  name: "post-list",
  props: {
    type: String,
    to: Number,
    total: Number,
  },
  methods: {
    loadPosts: function() {
      switch(this.type) {
        case "posts":
          this.$store.state.post.pagePosts += 1;
          this.$store.dispatch(GET_POSTS_REQUEST, this.$store.getters.getUserMe)
        break;
        case "anyPosts":
          this.$store.state.post.pageAnyPosts += 1;
          this.$store.dispatch(GET_ANY_POSTS_REQUEST, this.$store.getters.getUserMe)
        break;
        case "myPosts":
          this.$store.state.post.pageMyPosts += 1;
          this.$store.dispatch(GET_MY_POSTS_REQUEST, this.$store.getters.getUserMe)
        break;
        case "followedPosts":
          this.$store.state.post.pageFollowedPosts += 1;
          this.$store.dispatch(GET_FOLLOWED_POSTS_REQUEST, this.$store.getters.getUserMe)
        break;
        case "likedPosts":
          this.$store.state.post.pageLikedPosts += 1;
          this.$store.dispatch(GET_LIKED_POSTS_REQUEST, this.$store.getters.getUserMe)
        break;
      }
    },
  },
}
</script>

<style scoped>

</style>