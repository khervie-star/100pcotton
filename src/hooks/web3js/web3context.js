/* eslint-disable react-hooks/exhaustive-deps */

import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
// import { BehaviorSubject } from "rxjs";
import Web3 from "web3";
import smartContractTokenABI from "../../contract/HUNDREDPERCENTNFT.json";
import { pinJSONToIPFS } from "./pinata.js";
import { orderService } from "../../services";
import axios from "axios";
import AuthTokenService from "../../services/authToken.service";
import { ethers } from "ethers";

export const Web3Context = React.createContext();

export const Web3Provider = ({ children }) => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [ethBalance, setEthBalance] = React.useState(null);
  const [currentAccount, setCurrentAccount] = React.useState(null);
  const [web3Enabled, setWeb3Enabled] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [connectError, setConnectError] = React.useState(false);
  const [tokenCollected, setTokenCollected] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [transactionHash, setTransactionHash] = React.useState("");
  const [originalTokenId, setOriginalTokenId] = React.useState("");
  const [replicaTokenId, setReplicaTokenId] = React.useState("");
  const [helperText, setHelperText] = React.useState("");

  const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
  // const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
  const contractABI = smartContractTokenABI.abi;
  const url =
    "https://eth-rinkeby.alchemyapi.io/v2/MSxm491yG4v6Kq1Vqsepogi8N-xp67Aa";
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const smartContract = new web3.eth.Contract(contractABI, contractAddress);

  const authToken = AuthTokenService.getLocalAccessToken();

  var BN = web3.utils.BN;

  const ether = (n) => {
    return new web3.utils.BN(web3.utils.toWei(n.toString(), "ether"));
  };

  React.useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }
    checkConnectedWallet();
  }, []);

  // console.log(isConnected)

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      setConnectError(true);
      toast.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    return provider;
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        if (currentProvider !== window.ethereum) {
          console.log(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }

        const connectId = toast.loading("Connecting metamask...");

        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        const account = userAccount[0];
        let balance = await web3.eth.getBalance(account);
        console.log(balance); // Get wallet balance
        balance = web3.utils.fromWei(balance, "ether");
        setEthBalance(balance);
        saveUserInfo(balance, account, chainId);
        toast.success("Wallet connected successfully", {
          id: connectId,
        });
        if (userAccount.length === 0) {
          console.log("Please connect to meta mask");
        }
      }
    } catch (err) {
      toast.error(
        "There was an error fetching your accounts.Make sure your Ethereum client is configured correctly.",
        {
          id: connectId,
        }
      );
      setConnectError(true);
    }
  };

  const onDisconnect = () => {
    // window.localStorage.removeItem('userAccount');
    setUserInfo({});
    setIsConnected(false);
    setEthBalance(null);
    toast("wallet disconnected");
  };

  const saveUserInfo = (balance, account, chainId) => {
    const userAccount = {
      account: account,
      balance: balance,
      connectionid: chainId,
    };
    window.localStorage.setItem("userAccount", JSON.stringify(userAccount)); //user persisted data
    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData);
    setIsConnected(true);
    setIsActive(true);
  };

  const getSavedWalletInfo = () => {
    let userAccount;
    if (userAccount == undefined) {
      return null;
    }
    let userWallet;
    !userAccount
      ? toast.error("Please connect wallet!")
      : userAccount._value != null
      ? (userWallet = {
          account: userAccount._value.account,
          balance: userAccount._value.balance,
          chainId: userAccount._value.connectionid,
        })
      : (userWallet = null);
    // React.useEffect(() => {
    //   setEthBalance(userAccount._value.balance),
    //     setCurrentAccount(userAccount._value.account)
    // }, [userAccount])
    return userWallet;
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  // MINT ORIGINAL NFT
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  const proposeNewDesign = async (url, name, nftId) => {
    const mintAlert = toast.loading("Minting design as NFT...");
    //error handling
    if (url.trim() == "" || name.trim() == "") {
      toast.error(
        "❗Please make sure all fields are completed before minting.",
        {
          id: mintAlert,
        }
      );
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      };
    }

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const smartContract = new ethers.Contract(
    //   contractAddress,
    //   contractABI,
    //   signer
    // );

    // const currentAccount = await provider
    //   .send("eth_requestAccounts", [])
    //   .then((accounts) => {
    //     if (accounts.length > 0) return accounts[0];
    //   });

    //make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      toast.error("😢 Something went wrong while uploading your tokenURI.", {
        id: mintAlert,
      });
      return {
        success: false,
        status: "😢 Something went wrong while uploading your tokenURI.",
      };
    }
    const tokenURI = pinataResponse.pinataUrl;

    //load smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress); //loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
      to: contractAddress, // Required except during contract publications.
      from: window.ethereum.selectedAddress, // must match user's active address.
      data: window.contract.methods
        .propose(window.ethereum.selectedAddress, tokenURI)
        .encodeABI(), //make call to NFT smart contract
    };

    const contractOwner = await window.contract.methods.contractOwner().call();
    console.log(contractOwner);

    function checkAdmin(arg) {
      var Id;
      if (currentAccount == contractOwner) {
        Id = 0;
      } else {
        Id = arg;
      }
      return Id;
    }

    const gas = await window.contract.methods
      .propose(checkAdmin(nftId), tokenURI)
      .estimateGas({ from: currentAccount });
    const gasPrice = await web3.eth.getGasPrice();

    try {
      const tx = await window.contract.methods
        .propose(checkAdmin(nftId), tokenURI)
        .send({
          from: currentAccount,
          gas: gas,
          gasPrice: gasPrice,
        })
        .once("transactionHash", (hash) => {
          console.log(hash);
          toast.loading("Confirming transaction", {
            id: mintAlert,
          });
        })
        .then((receipt) => {
          console.log(receipt.events.Transfer.returnValues);
          setOriginalTokenId(receipt.events.Transfer.returnValues.tokenId);
          toast.success("Transaction Completed! Token mint successful!", {
            id: mintAlert,
          });
          return receipt.events.Transfer.returnValues.tokenId;
        });
      return {
        success: true,
        status: "✅ Transaction receipt: " + tx,
        tx,
      };
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        id: mintAlert,
      });
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  // APPROVE COLLECT
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  const approveCollect = async (id) => {
    const gas = await smartContract.methods
      .approve(contractAddress, id)
      .estimateGas({ from: getSavedWalletInfo().account });
    const gasPrice = await web3.eth.getGasPrice();

    try {
      const approved = await smartContract.methods
        .approve(contractAddress, id)
        .send({
          from: getSavedWalletInfo().account,
          gas: gas,
          gasPrice: gasPrice,
        });
      return approved;
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  // COLLECT TOKEN
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  const collectToken = async (NFTId, bidPrice) => {
    const collectAlert = toast.loading("Collecting...");

    if (!localStorage?.getItem("isWalletConnected") === "true") {
      toast.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!",
        {
          id: collectAlert,
        }
      );
    }

    try {
      window.contract = await new web3.eth.Contract(
        contractABI,
        contractAddress
      ); //loadContract();
      const fromAddress = await smartContract.methods.ownerOf(NFTId).call();

      const gas = await window.contract.methods
        .collectToken(fromAddress, NFTId, ether(bidPrice))
        .estimateGas({
          from: getSavedWalletInfo().account,
          value: ether(bidPrice),
        });
      const gasPrice = await web3.eth.getGasPrice();

      //set up transaction
      try {
        const tokenReceipt = await window.contract.methods
          .collectToken(fromAddress, NFTId, ether(bidPrice))
          .send({
            from: getSavedWalletInfo().account,
            value: ether(bidPrice),
            gas: gas,
            gasPrice: gasPrice,
          })
          .once("transactionHash", (hash) => {
            console.log(hash);
            toast.loading("Confirming transaction", {
              id: collectAlert,
            });
          })
          .then((receipt) => {
            console.log(receipt);
            toast.success("Transaction successful!", {
              id: collectAlert,
            });
            setTokenCollected(true);
            return receipt.events.Transfer.returnValues.tokenId;
          });
        return {
          success: true,
          status: "✅ Transaction receipt: " + tokenReceipt,
        };
      } catch (error) {
        console.log(error);
        toast.error(error.error, {
          id: collectAlert,
        });
        setConnectError(true);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        id: collectAlert,
      });
      setConnectError(true);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////
  // BUY REPLICA NFT
  /////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////

  const buyReplica = async (
    url,
    name,
    originalTokenId,
    commission,
    originalTokenOwner,
    price,
    rate
  ) => {
    console.log(
      url,
      name,
      originalTokenId,
      commission,
      originalTokenOwner,
      price,
      rate
    );

    if (ethBalance) {
      if (url.trim() == "" || name.trim() == "") {
        toast.error(
          "Please make sure all fields are completed before minting."
        );
        return {
          success: false,
          status: "❗Please make sure all fields are completed before minting.",
        };
      }

      const parseCommission = (commission) => {
        let pc = commission.slice(0, commission.length - 1);
        if (pc >= 100) {
          pc = 100;
        } else if (pc <= 0) {
          pc = 0;
        } else {
          pc = pc;
        }
        return pc;
      };

      //make metadata
      const metadata = new Object();
      metadata.name = name;
      metadata.image = url;

      //pinata pin request
      const pinataResponse = await pinJSONToIPFS(metadata);
      if (!pinataResponse.success) {
        toast.error("😢 Something went wrong while uploading your tokenURI.");
        return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
        };
      }
      const replicaURI = pinataResponse.pinataUrl;

      console.log(originalTokenId);
      console.log(await smartContract.methods.ownerOf(originalTokenId).call());

      // const buyingReplica = toast.loading('Processing...');
      setHelperText("Connecting to Metamask");

      try {
        if (!getSavedWalletInfo()) {
          console.log(
            "Non-Ethereum browser detected. You should consider trying MetaMask!",
            getSavedWalletInfo()
          );
          toast.error("Please Connect to Metamask");
        }
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!",
          getSavedWalletInfo()
        );
        console.log(originalTokenId);

        // toast.loading("Confirming transaction... ", {
        //   id: buyingReplica,
        // });
        setHelperText("Confirming transaction on Metamask...");
        console.log(originalTokenOwner, originalTokenId);
        console.log(
          await smartContract.methods.ownerOf(originalTokenId).call()
        );

        // Estimating Gas and Gas price

        const gas = await smartContract.methods
          .buyReplicaNFT(
            originalTokenId,
            ether(parseFloat(price / rate)),
            parseCommission(commission),
            originalTokenOwner,
            replicaURI
          )
          .estimateGas({
            from: getSavedWalletInfo().account,
            value: ether(parseFloat(price / rate)),
          });

        const gasPrice = await web3.eth.getGasPrice();

        // Setup transaction
        try {
          const tokenReceipt = await smartContract.methods
            .buyReplicaNFT(
              originalTokenId,
              ether(parseFloat(price / rate)),
              parseCommission(commission),
              originalTokenOwner,
              replicaURI
            )
            .send({
              from: getSavedWalletInfo().account,
              value: ether(parseFloat(price / rate)),
              gas: gas,
              gasPrice: gasPrice,
            })
            .on("transactionHash", (hash) => {
              console.log(hash);
              setHelperText("Generated transaction hash => " + hash);
              setHelperText("Checking hash for payment verification");
              setTransactionHash(hash);
              return hash;
            })
            .then((receipt) => {
              console.log(receipt);
              setReplicaTokenId(receipt.events.Transfer.returnValues.tokenId);
              setHelperText(
                "Transaction Successful! Check your metamask wallet for details"
              );
              setTokenCollected(true);
              return receipt.events.Transfer.returnValues.tokenId;
            });
          return {
            success: true,
            status: "✅ Transaction hash: " + tokenReceipt,
            receipt: tokenReceipt,
          };
        } catch (error) {
          console.log(error);
          // toast.error(error.message, {
          //   id: buyingReplica,
          // });
          setConnectError(true);
        }
      } catch (error) {
        console.log(error);
        if (error.message.includes("insufficient")) {
          // toast.error("Insufficient funds to process transaction");
          setHelperText("Insufficient funds to process transaction");
        } else {
          toast.error(error.message, {
            id: buyingReplica,
          });
        }
        // toast.error(error.message, {
        //   id: buyingReplica,
        // });
      }
    } else {
      toast.error("Please connect to metamask");
    }
  };

  const values = React.useMemo(
    () => ({
      isActive,
      // isConnected,
      connectError,
      tokenCollected,
      currentAccount,
      isLoading,
      onConnect,
      onDisconnect,
      ethBalance,
      proposeNewDesign,
      collectToken,
      buyReplica,
      getSavedWalletInfo,
      contractAddress,
      approveCollect,
      helperText,
      transactionHash,
    }),
    [
      isActive,
      isConnected,
      connectError,
      tokenCollected,
      currentAccount,
      isLoading,
      onConnect,
      onDisconnect,
      ethBalance,
      proposeNewDesign,
      collectToken,
      buyReplica,
      getSavedWalletInfo,
      contractAddress,
      approveCollect,
      helperText,
      transactionHash,
    ]
  );

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};

export default function useWeb3() {
  const context = React.useContext(Web3Context);

  if (context === undefined) {
    console.log(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}
