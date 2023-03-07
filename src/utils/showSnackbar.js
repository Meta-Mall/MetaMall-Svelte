import { store } from "../stores/store"

const showSnackbar = (text, type = '') => {
    type = type ? `snackbar-${type}` : type;
    console.log("type: ", type);

    store.update(store => {
        store.snackbar.instance.open();
        return {
            ...store,
            snackbar: {
                instance: store.snackbar.instance,
                text,
                type
            }
        }
    })
}

export { showSnackbar }