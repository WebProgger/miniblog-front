<template>
  <the-layout>
    <v-row>
      <v-col cols="3">
        <v-sheet class="pa-4" elevation="2" rounded>
          <v-img src="@/assets/images/blank-avatar.png" />
          <follow-btn />
        </v-sheet>
        <people-block
            :is-loading="isFollowsLoading"
            block-name="Подписки"
            :items-count="followsCount"
            :items-list="follows"
        />
        <people-block
            :is-loading="isFollowersLoading"
            block-name="Подписчики"
            :items-count="followersCount"
            :items-list="followers"
        />
      </v-col>
      <v-col cols="9">
        <v-sheet class="pa-4" elevation="2" rounded>
          <v-col>
            <v-row>
              <the-loader v-if="!!isUserLoading" />
              <h2 v-else-if="!!this.$route.params.id" class="font-weight-regular">{{ user.full_name }}</h2>
              <h2 v-else-if="!this.$route.params.id" class="font-weight-regular">{{ profile.full_name }}</h2>
            </v-row>
          </v-col>
        </v-sheet>



        <the-tabs v-if="!this.$route.params.id" :items="items">
          <template v-slot:0>
            <post-list type="myPosts" :to="toMyPosts" :total="totalMyPosts">
              <post-item
                  v-for="post in myPosts"
                  :key="post.id"
                  :postData="post"
              />
              <v-sheet v-if="!!isNotMyPosts" class="pa-4" elevation="2">
                <span>У вас пока нету ни одного поста,</span>
                <v-btn
                    class="link"
                    plain
                    @click="openCreateModal"
                >
                  создать
                </v-btn>
                <span>?</span>
              </v-sheet>
            </post-list>
          </template>
          <template v-slot:1>
            <post-list type="likedPosts" :to="toLikedPosts" :total="totalLikedPosts">
              <post-item
                  v-for="post in likedPosts"
                  :key="post.id"
                  :postData="post"
              />
              <v-sheet v-if="!!isNotLikedPosts" class="pa-4" elevation="2" rounded>
                <p>У вас пока нету ни одного понравившегося поста</p>
              </v-sheet>
            </post-list>
          </template>
        </the-tabs>

        <the-tabs v-else-if="!!this.$route.params.id" :items="userItems">
          <template v-slot:0>
            <post-list>
              <post-item
                  v-for="post in myPosts"
                  :key="post.id"
                  :postData="post"
              />
              <v-sheet v-if="!!isNotMyPosts" class="pa-4" elevation="2" rounded>
                <p>У пользователя пока нету постов</p>
              </v-sheet>
            </post-list>
          </template>
          <template v-slot:1>
            <post-list type="likedPosts" :to="toLikedPosts" :total="totalLikedPosts">
              <post-item
                  v-for="post in likedPosts"
                  :key="post.id"
                  :postData="post"
              />
              <v-sheet v-if="!!isNotLikedPosts" class="pa-4" elevation="2" rounded>
                <p>У пользователя пока нету понравившихся постов</p>
              </v-sheet>
            </post-list>
          </template>
        </the-tabs>
      </v-col>
    </v-row>
  </the-layout>
</template>

<script>
import TheLayout from "@/components/layout/TheLayout";
import {mapGetters} from "vuex";
import PeopleBlock from "@/components/people-block/PeopleBlock";
import store from "@/store";
import {
  USER_FOLLOWERS_REQUEST,
  USER_FOLLOWS_REQUEST,
  USER_REQUEST
} from "@/store/actions/user";
import FollowBtn from "@/components/follow-btn/FollowBtn";
import TheLoader from "@/components/loader/TheLoader";
import TheTabs from "@/components/tabs/TheTabs";
import {GET_LIKED_POSTS_REQUEST, GET_MY_POSTS_REQUEST} from "@/store/actions/post";
import PostList from "@/components/post/PostList";
import PostItem from "@/components/post/PostItem";
import {OPEN_CREATE_POST_MODAL} from "@/store/actions/modal";

export default {
  name: "ProfileView",
  components: {
    TheLayout,
    PeopleBlock,
    FollowBtn,
    TheLoader,
    TheTabs,
    PostList,
    PostItem,
  },
  data () {
    return {
      items: [
        {id: 0, name: 'Мои посты'},
        {id: 1, name: 'Понравившиеся посты'}
      ],
      userItems: [
        {id: 0, name: 'Посты'},
        {id: 1, name: 'Понравившиеся посты'}
      ],
    }
  },
  computed: {
    ...mapGetters({
      profile: 'getProfile',
      isFollowsLoading: 'isFollowsLoading',
      follows: 'getFollows',
      isFollowersLoading: 'isFollowersLoading',
      followsCount: 'getFollowsCount',
      followers: 'getFollowers',
      followersCount: 'getFollowersCount',
      isUserLoading: 'isUserLoading',
      user: 'getUser',
      userMeId: 'getUserMe',
      isFollowed: 'isFollowed',
      myPosts: 'getMyPosts',
      isNotMyPosts: 'isNotMyPosts',
      isMyPostLoading: 'isMyPostsLoading',
      likedPosts: 'getLikedPosts',
      isNotLikedPosts: 'isNotLikedPosts',
      isLikedPostsLoading: 'isLikedPostsLoading',

      toMyPosts: 'getToMyPosts',
      totalMyPosts: 'getTotalMyPosts',
      toLikedPosts: 'getToLikedPosts',
      totalLikedPosts: 'getTotalLikedPosts',
    })
  },
  methods: {
    openCreateModal: function() {
      this.$store.dispatch(OPEN_CREATE_POST_MODAL, true);
    }
  },
  beforeCreate() {
    if(this.$route.params.id) {
      this.$store.dispatch(USER_REQUEST, { userId: this.$route.params.id });
      this.$store.dispatch(USER_FOLLOWS_REQUEST, { userId: this.$route.params.id });
      this.$store.dispatch(USER_FOLLOWERS_REQUEST, { userId: this.$route.params.id });

      this.$store.dispatch(GET_MY_POSTS_REQUEST, this.$route.params.id).catch(() => {});
      this.$store.dispatch(GET_LIKED_POSTS_REQUEST, this.$route.params.id).catch(() => {});
    } else {
      this.$store.dispatch(USER_FOLLOWS_REQUEST, { userId: store.getters.getUserMe });
      this.$store.dispatch(USER_FOLLOWERS_REQUEST, { userId: store.getters.getUserMe });

      this.$store.dispatch(GET_MY_POSTS_REQUEST, store.getters.getUserMe).catch(() => {});
      this.$store.dispatch(GET_LIKED_POSTS_REQUEST, store.getters.getUserMe).catch(() => {});
    }
  },
  beforeUpdate() {
    if(this.$store.getters.isUserLoadedError) {
      this.$router.push('/profile');
    }
  },
  watch: {
    $route() {
      if(this.$route.params.id) {
        this.$store.dispatch(USER_REQUEST, { userId: this.$route.params.id });
        this.$store.dispatch(USER_FOLLOWS_REQUEST, { userId: this.$route.params.id });
        this.$store.dispatch(USER_FOLLOWERS_REQUEST, { userId: this.$route.params.id });

        this.$store.dispatch(GET_MY_POSTS_REQUEST, this.$route.params.id).catch(() => {});
        this.$store.dispatch(GET_LIKED_POSTS_REQUEST, this.$route.params.id).catch(() => {});
      } else {
        this.$store.dispatch(USER_FOLLOWS_REQUEST, { userId: store.getters.getUserMe });
        this.$store.dispatch(USER_FOLLOWERS_REQUEST, { userId: store.getters.getUserMe });

        this.$store.dispatch(GET_MY_POSTS_REQUEST, store.getters.getUserMe).catch(() => {});
        this.$store.dispatch(GET_LIKED_POSTS_REQUEST, store.getters.getUserMe).catch(() => {});
      }
    }
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