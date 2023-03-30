const parseStore = store => {
    return {
        owner: store[0],
        tokenId: store[1],
        storeNumber: store[2],
        price: store[3],
        rent: store[4],
        isSaleable: store[5],
        isRentable: store[6],
        user: store[7],
        expires: store[8],
    }
}

export { parseStore };