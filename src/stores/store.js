import { writable } from "svelte/store";

export const store = writable({
    user: null,
    unityInstance: null,
    unityHidden: true,
    firebase: null,
    snackbar: {
        instance: null,
        text: '',
        type: '',
    }
})