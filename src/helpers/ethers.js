import Web3 from "web3"

export const ether = (n) => {
    return new Web3.utils.isBN(
        web3.utils.toWei(n.toString(), 'ether')
    )
}