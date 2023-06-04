import {
    ABI,
    contractAddress
} from "./ContractInfo";
import {
    ethers
} from "ethers";

async function connectWallet() {
    if (!window.ethereum) {
        return false;
    }

    const addressesArray = await window.ethereum.request({
        method: "eth_requestAccounts"
    });
    return addressesArray[0];
};

async function checkWallet() {
    if (!window.ethereum) {
        return false;
    }

    const accounts = await window.ethereum.request({
        method: 'eth_accounts'
    });
    return accounts[0];
}

const createBooking = (booking) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    return contract.addBooking(booking._id,
        "0x68c3569d19fC209c3c25fc5d14783E9Cd1800301",
        "0xb8D8850d0829C4877eB1460aeBAf3f5464868deA",
        ethers.utils.parseUnits("0.16", "ether"),
        ethers.utils.parseUnits("0.2", "ether"), {
            gasLimit: 3000000
        });
}

const payForService = (booking) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const value = 0.16 + 0.2;
    return contract.proceedPayment(booking._id, {
        value: ethers.utils.parseUnits(String(value), "ether"),
        gasLimit: 3000000
    });
}

const returnPledgeToClient = (booking) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    return contract.returnPledgeToClient(booking._id, {
        gasLimit: 3000000
    });
}

const fundPledgeToDriver = (booking) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);;
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    return contract.returnPledgeToDriver(booking._id, {
        gasLimit: 3000000
    });
}

export {
    connectWallet,
    checkWallet,
    createBooking,
    payForService,
    returnPledgeToClient,
    fundPledgeToDriver
};