import { writable } from "svelte/store";
import { UnityCursorModes } from "../components/unity/unityEvents";

export const store = writable({
    user: null,
    unityInstance: null,
    unityHidden: true,
    unityCursorState: UnityCursorModes.None,
    firebase: null,
    snackbar: {
        instance: null,
        text: '',
        type: '',
    }
})