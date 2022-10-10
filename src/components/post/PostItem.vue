<template>
  <v-card class="mb-5 pointer" elevation="2">
    <v-card-title>
      <v-avatar
          color="grey darken-1"
          size="48"
      ></v-avatar>
      <div class="ml-4 d-flex flex-column">
        <router-link :to="`/profile/${postData.author.id}`">
          <h5 class="font-weight-regular link">{{ postData.author.full_name }}</h5>
        </router-link>
        <span class="font-weight-regular text-caption">{{ new Date(postData.updated_at).toLocaleString() }}</span>
      </div>
      <v-menu v-if="postData.author.id === parseInt(me)" offset-y>
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
      <h3>{{ postData.title }}</h3>
      <p>{{ postData.text }}</p>
      <router-link :to="`/post/${postData.id}`">подробнее</router-link>
    </v-card-text>
    <v-card-actions class="px-4 d-flex justify-space-between">
      <v-btn v-if="!isLiked" @click="like" elevation="0" rounded>
        <v-icon>mdi-cards-heart-outline</v-icon>
        <span class="ml-1">{{ postData.likes_count || postData.likes.length }}</span>
      </v-btn>
      <v-btn v-else-if="!!isLiked" @click="unLike" elevation="0" rounded>
        <v-icon color="red">mdi-cards-heart</v-icon>
        <span class="ml-1">{{ postData.likes_count || postData.likes.length }}</span>
      </v-btn>
      <div class="d-inline">
        <v-icon size="16">mdi-eye</v-icon>
        <span class="ml-1 text-caption">{{ postData.views }}</span>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import {GET_POST_REQUEST, POST_LIKE_REQUEST, POST_UNLIKE_REQUEST} from "@/store/actions/post";
import {mapGetters} from "vuex";
import {OPEN_DELETE_POST_MODAL, OPEN_EDIT_POST_MODAL} from "@/store/actions/modal";

export default {
  name: "post-item",
  props: {
    postData: {
      id: Number,
      title: String,
      text: String,
      author: {
        id: Number,
        full_name: String,
      },
      likes_count: Number,
      likes: [],
      views: Number,
      updated_at: Date,
    }
  },
  computed: {
    isLiked: function() {
      return !!this.postData.likes.find(el => el.id === parseInt(this.$store.getters.getUserMe));
    },
    ...mapGetters({
      me: 'getUserMe',
    })
  },
  methods: {
    like: function() {
      this.$store.dispatch(POST_LIKE_REQUEST, this.postData.id);
    },

    unLike: function() {
      this.$store.dispatch(POST_UNLIKE_REQUEST, this.postData.id);
    },

    openEditModal: function() {
      this.$store.dispatch(GET_POST_REQUEST, this.postData.id).then(() => {
        this.$store.dispatch(OPEN_EDIT_POST_MODAL, true);
      });
    },

    openDeleteModal: function() {
      this.$store.dispatch(GET_POST_REQUEST, this.postData.id).then(() => {
        this.$store.dispatch(OPEN_DELETE_POST_MODAL, true);
      });
    },
  },
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