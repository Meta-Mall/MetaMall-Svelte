import { parseStoreArray } from ".";

const parseFloors = floors => {
    const parsed = []
    for (let floor of floors) {
        parsed.push(parseStoreArray(floor))
    }
    return parsed;
}

export { parseFloors };