import Web3 from "web3"
import { get, writable } from "svelte/store";

const CONTRACT_ABI = './MetaMall.json'
const LOCAL_BLOCKCHAIN_URL = 'ws://localhost:7545'

const blockchain = writable({
    contractJSON: null,
    web3: null,
    accounts: null,
    networkID: null,
    contract: null
})

const loadContract = async () => {
    const web3 = new Web3(Web3.givenProvider || LOCAL_BLOCKCHAIN_URL)
    const networkID = await web3.eth.net.getId()
    
    const contractJSON = await import(/* @vite-ignore */CONTRACT_ABI)
    const { abi } = contractJSON
    
    let address, contract
    try {
        address = contractJSON.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);

        blockchain.update(() => {
            return { contractJSON, web3, networkID, contract }
        })
    }
    catch (e) { console.error(e); }
}

const login = async () => {
    const web3 = get(blockchain).web3;
    const accounts = await web3.eth.requestAccounts();

    blockchain.update(value => {
        return { ...value, accounts }
    })
}

export { blockchain, loadContract, login }