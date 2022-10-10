<template>
  <the-layout>
    <v-overlay :value="!!isLoading">
      <the-loader size="64" />
    </v-overlay>
    <v-card v-if="!isLoading" class="mb-5 pointer" elevation="2">
      <v-card-title>
        <v-avatar
            color="grey darken-1"
            size="48"
        ></v-avatar>
        <div class="ml-4 d-flex flex-column">
          <router-link :to="`/profile/${post.author.id}`">
            <h5 class="font-weight-regular link">{{ post.author.full_name }}</h5>
          </router-link>
          <span class="font-weight-regular text-caption">{{ new Date(post.updated_at).toLocaleString() }}</span>
        </div>
        <v-menu v-if="post.author.id === parseInt(me)" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div class="post-settings" v-bind="attrs" v-on="on">
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>
          </template>
          <v-list>
            <v-list-item class="pa-0">
              <v-btn
                class="post-settings-btn"
                block
                plain
                @click="openEditModal"
              >Редактировать</v-btn>
            </v-list-item>
            <v-list-item class="pa-0">
              <v-btn
                  class="post-settings-btn"
                  block
                  plain
                  @click="openDeleteModal"
              >Удалить</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <h3>{{ post.title }}</h3>
        <p>{{ post.text }}</p>
      </v-card-text>
      <v-card-actions class="px-4 d-flex justify-space-between">
        <v-btn v-if="!isLiked" @click="like" elevation="0" rounded>
          <v-icon>mdi-cards-heart-outline</v-icon>
          <span class="ml-1">{{ post.likes_count }}</span>
        </v-btn>
        <v-btn v-else-if="!!isLiked" @click="unLike" elevation="0" rounded>
          <v-icon color="red">mdi-cards-heart</v-icon>
          <span class="ml-1">{{ post.likes_count }}</span>
        </v-btn>
        <div class="d-inline">
          <v-icon size="16">mdi-eye</v-icon>
          <span class="ml-1 text-caption">{{ post.views }}</span>
        </div>
      </v-card-actions>
    </v-card>
  </the-layout>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_POST_REQUEST, POST_LIKE_REQUEST, POST_UNLIKE_REQUEST} from "@/store/actions/post";
import {OPEN_DELETE_POST_MODAL, OPEN_EDIT_POST_MODAL} from "@/store/actions/modal";
import {STATUS_SUCCESS} from "@/store/actions/status";

export default {
  name: "post-view",
  computed: {
    isLiked: function() {
      return !!this.$store.getters.getPost.likes.find(el => el.id === parseInt(this.$store.getters.getUserMe));
    },
    ...mapGetters({
      post: 'getPost',
      isLoading: 'isPostLoading',
      me: 'getUserMe'
    })
  },
  methods: {
    like: function() {
      this.$store.dispatch(POST_LIKE_REQUEST, this.$route.params.id);
      this.$store.dispatch(GET_POST_REQUEST, this.$route.params.id);
    },

    unLike: function() {
      this.$store.dispatch(POST_UNLIKE_REQUEST, this.$route.params.id);
      this.$store.dispatch(GET_POST_REQUEST, this.$route.params.id);
    },

    openEditModal: function() {
      this.$store.dispatch(OPEN_EDIT_POST_MODAL, true);
    },

    openDeleteModal: function() {
      this.$store.dispatch(OPEN_DELETE_POST_MODAL, true);
    },
  },
  beforeCreate() {
    this.$store.dispatch(GET_POST_REQUEST, this.$route.params.id).catch(() => {
      this.$router.push('/');
    });
  },
  watch: {
    '$store.state.post.deletePostStatus': function() {
      if(this.$store.state.post.deletePostStatus === STATUS_SUCCESS) {
        this.$router.push('/');
      }
    },
    '$store.state.post.editPostStatus': function() {
      if(this.$store.state.post.editPostStatus === STATUS_SUCCESS) {
        this.$store.dispatch(GET_POST_REQUEST, this.$route.params.id);
      }
    }
  }
}
</script>

<style scoped>
.post-settings {
  position: absolute;
  right: 1%;
  top: 2%;
}

.post-settings-btn {
  font-size: 10px;
}
</style>