import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import smartContractTokenABI from "../../contract/HUNDREDPERCENTNFT.json";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";
import { parseCommission } from "../commission";
import { pinJSONToIPFS } from "../../hooks/web3js/pinata";
import toast from "react-hot-toast";
import { tempDataActions } from "../../redux/actions";

const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
// const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
const contractABI = smartContractTokenABI.abi;

export async function buyReplicaNFT(
  url,
  name,
  originalTokenId,
  commission,
  originalTokenOwner,
  price,
  rate,
  walletDetails
) {
  event.preventDefault();
  if (!window.ethereum) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const smartContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // Pin data to pinata
  const metadata = new Object();
  metadata.name = name;
  metadata.image = url;

  try {
    const pinataResponse = await pinJSONToIPFS(metadata);
    console.log(pinataResponse);
    const replicaURI = pinataResponse.pinataUrl;

    //Parse Commission
    const pcommission = parseCommission(commission);

    //Setup transaction
    // Get the current average gas price on the Ethereum network
    const gasPriceFromProvider = await provider.getGasPrice();

    const options = {
      gasLimit: 1000000,
      gasPrice: gasPriceFromProvider,
      value: parseEther(parseFloat(price / rate).toString()).toString(10),
    };

    try {
      const receipt = await smartContract
        .buyReplicaNFT(
          originalTokenId,
          parseEther(parseFloat(price / rate).toString()).toString(10),
          pcommission,
          originalTokenOwner,
          replicaURI,
          options
        )
        .then((tr) => {
          console.log(`TransactionResponse TX hash: ${tr.hash}`);
          tr.wait().then((receipt) => {
            console.log("transfer receipt", receipt);
            return receipt;
          });
        })
        .catch((e) => {
          console.log(e);
          return e;
        });
    } catch (err) {
      console.log(err);
      toast.error("😢 Something went wrong while setting up your transaction.");
      return err;
    }
  } catch (err) {
    console.log(err);
    toast.error("😢 Something went wrong while uploading your tokenURI.");
    return err;
  }
}
