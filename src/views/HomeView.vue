<template>
  <v-app id="inspire">

    <the-layout>
      <the-tabs v-if="!isAuth" :items="noAuthItems">
        <template v-slot:0>
          <post-list>
            <post-item
                v-for="post in posts"
                :key="post.id"
                :postData="post"
            />
          </post-list>
          <v-sheet v-if="!!isNotPosts" class="pa-4" elevation="2" rounded>
            <p>Пока нету ни одного поста</p>
          </v-sheet>
        </template>
      </the-tabs>

      <the-tabs v-if="!!isAuth" :items="authItems">
        <template v-slot:tools>
          <v-btn
              class="ml-4 mt-2"
              @click="openCreateModal"
              plain
          >Создать пост</v-btn>
        </template>
        <template v-slot:0>
          <post-list>
            <post-item
                v-for="post in anyPosts"
                :key="post.id"
                :postData="post"
            />
          </post-list>
          <v-sheet v-if="!!isNotAnyPosts" class="pa-4" elevation="2" rounded>
            <p>Пока нету ни одного поста</p>
          </v-sheet>
        </template>
        <template v-slot:1>
          <post-list>
            <post-item
                v-for="post in myPosts"
                :key="post.id"
                :postData="post"
            />
          </post-list>
          <v-sheet v-if="!!isNotMyPosts" class="pa-4" elevation="2">
            <span>У вас пока нету ни одного поста,</span>
            <v-btn
                @click="openCreateModal"
                class="link"
                plain
            >
              создать
            </v-btn>
            <span>?</span>
          </v-sheet>
        </template>
        <template v-slot:2>
          <post-list>
            <post-item
                v-for="post in followedPosts"
                :key="post.id"
                :postData="post"
            />
          </post-list>
          <v-sheet v-if="!!isNotFollowedPosts" class="pa-4" elevation="2" rounded>
            <p>Пока нету ни одного поста</p>
          </v-sheet>
        </template>
      </the-tabs>
    </the-layout>

  </v-app>
</template>

<script>

import TheTabs from "@/components/tabs/TheTabs";
import PostList from "@/components/post/PostList";
import PostItem from "@/components/post/PostItem";
import {mapGetters} from "vuex";
import {
  GET_ANY_POSTS_REQUEST,
  GET_FOLLOWED_POSTS_REQUEST,
  GET_MY_POSTS_REQUEST,
  GET_POSTS_REQUEST
} from "@/store/actions/post";
import {OPEN_CREATE_POST_MODAL} from "@/store/actions/modal";
import {websocketHook} from "@/hooks/websocket.hook";

export default {
  name: "home-view",
  components: {
    TheTabs,
    PostList,
    PostItem,
  },
  data () {
    return {
      noAuthItems: [
        {id: 0, name: 'Все посты'},
      ],
      authItems: [
        {id: 0, name: 'Все посты'},
        {id: 1, name: 'Мои посты'},
        {id: 2, name: 'Подписки'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      isAuth: 'isAuthenticated',
      isNotPosts: 'isNotPosts',
      posts: 'getPosts',
      anyPosts: 'getAnyPosts',
      isNotAnyPosts: 'isNotAnyPosts',
      isNotMyPosts: 'isNotMyPosts',
      myPosts: 'getMyPosts',
      followedPosts: 'getFollowedPosts',
      isNotFollowedPosts: 'isNotFollowedPosts',
    })
  },
  methods: {
    openCreateModal: function() {
      this.$store.dispatch(OPEN_CREATE_POST_MODAL, true);
    }
  },
  created() {
    if(!this.$store.getters.isAuthenticated) {
      this.$store.dispatch(GET_POSTS_REQUEST);
    } else {
      this.$store.dispatch(GET_MY_POSTS_REQUEST, this.$store.getters.getUserMe);
      this.$store.dispatch(GET_ANY_POSTS_REQUEST, this.$store.getters.getUserMe);
      this.$store.dispatch(GET_FOLLOWED_POSTS_REQUEST, this.$store.getters.getUserMe);
    }
    websocketHook().postChannel.bind('new-post-event', (data) => {
      this.$store.state.post.posts.unshift(data.message);
      this.$store.state.post.myPosts.unshift(data.message);
      if(parseInt(this.$store.getters.getUserMe) !== data.message.author.id) {
        this.$store.state.post.anyPosts.unshift(data.message);
      }
      this.$store.state.post.followedPosts.unshift(data.message);
    });
    websocketHook().likeChannel.bind('like-event', (data) => {
      this.$store.state.post.anyPosts.splice(
          parseInt(this.$store.state.post.anyPosts.findIndex(el => el.id === data.message.id)),
          1,
          data.message
      );
      this.$store.state.post.myPosts.splice(
          parseInt(this.$store.state.post.myPosts.findIndex(el => el.id === data.message.id)),
          1,
          data.message
      );
      this.$store.state.post.followedPosts.splice(
          parseInt(this.$store.state.post.followedPosts.findIndex(el => el.id === data.message.id)),
          1,
          data.message
      );
    });
  }
}
</script>

<style scoped>
  .link {
    text-transform: inherit;
    font-size: 16px;
    letter-spacing: 0;
    color: #0053ff !important;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    padding: 0 4px 2px 4px;
  }
</style>