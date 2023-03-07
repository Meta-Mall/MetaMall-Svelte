import { writable } from "svelte/store";

export const store = writable({
    user: null,
    unityInstance: null,
    firebase: null,
    snackbar: {
        instance: null,
        text: '',
        type: '',
    }
})