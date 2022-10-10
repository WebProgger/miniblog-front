import Pusher from "pusher-js";

export const websocketHook = () => {
    const pusher = new Pusher('62de41db3524193eb970', {
        cluster: 'eu',
        useTLS: false,
    });

    const postChannel = pusher.subscribe('post');
    const likeChannel = pusher.subscribe('like');

    return {
        postChannel,
        likeChannel
    }
}