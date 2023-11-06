export const checkAdmin = (arg, currentAccount, contractOwner) => {
    var Id;
    if (currentAccount == contractOwner) {
        Id = 0;
    } else {
        Id = arg;
    }
    return Id;
}