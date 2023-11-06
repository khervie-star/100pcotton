export const usdConverter = {
    toWei,
    ethToWei,
};


function toWei(usd) {
    const wei = toEth(usd) * 1000000000000000000
    return wei
}

function ethToWei(eth) {
    const wei = eth * 1000000000000000000
    return wei
}