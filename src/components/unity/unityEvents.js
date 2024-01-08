import axios from "axios";
import { store } from '../../stores/store'
import { blockchain } from "../../blockchain";
import { get, writable } from "svelte/store";
import { apis } from "../../utils/apis";

const CursorModes = {
    None: 'None',
    Locked: 'Locked',
    Confined: 'Confined',
};

export const unityEvents = {
    "PrintSomething": (arg1, arg2, arg3) => {
		console.log(arg1, arg2, arg3);
	},
    "RequestStores": async () => {
        let floors = await axios.get(apis.getAllStores);
        for (const floor of floors) {
            const stores = floor.map(s => JSON.stringify(s));
            const storesString = stores.join(';;');
    
            const unity = get(store).unityInstance;
            unity?.callFunction?.("ShopsManager", "ReceiveStores", storesString);
        }
    },
    "CursorMode": cursorMode => {
        const storeSnapshot = get(store);
        if (cursorMode === CursorModes.Locked) {
            document.getElementById(storeSnapshot.unityInstance.canvasId).requestPointerLock();
        }
    },
    "GetCursorInfo_Returned": cursorMode => {
        console.log('getcursor returned: ', cursorMode)
        const storeSnapshot = get(store);
        storeSnapshot.unityInstance.returnValuePromises['GetCursorInfo_Returned']?.resolve(cursorMode);
        // storeSnapshot.unityInstance.returnValuePromises['GetCursorInfo_Returned']?.resolve({
        //     '0': 'None',
        //     '1': 'Locked',
        //     '2': 'Confined'
        // }[cursorMode])
    },
    "OpenLink" : product_link => {
        console.log("open product link")
        window.open('https://' + product_link, '_blank');
    }
}
