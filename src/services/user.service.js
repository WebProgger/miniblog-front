import { httpHook } from "@/hooks/http.hook";

export const userService = () => {
    const { httpGet, httpPatch } = httpHook();

    const me = () => {
        return httpGet("/user/me").then((response) => {
            return response;
        });
    }

    const userSettings = (credentials) => {
        return httpPatch("/user/me", credentials).then((response) => {
            return response;
        });
    }

    const getUser = (id) => {
        return httpGet(`/user/${id}`).then((response) => {
           return response;
        });
    }

    const getFollows = (id) => {
        return httpGet(`/user/${id}/follows?count=6`).then((response) => {
           return response;
        });
    }

    const getFollowsAll = (id) => {
        return httpGet(`/user/${id}/follows?count=*`).then((response) => {
            return response;
        });
    }

    const getFollowers = (id) => {
        return httpGet(`/user/${id}/followers?count=6`).then((response) => {
            return response;
        });
    }

    const isFollowed = (id) => {
        return httpGet(`/user/${id}/isfollowed`).then((response) => {
            return response;
        });
    }

    const follow = (id) => {
        return httpGet(`/user/${id}/follow`).then((response) => {
            return response;
        });
    }

    const unFollow = (id) => {
        return httpGet(`/user/${id}/unfollow`).then((response) => {
            return response;
        });
    }

    return { me, userSettings, getFollows, getFollowsAll, getUser, getFollowers, isFollowed, follow, unFollow }
}