/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import {
  Box,
  Card,
  Chip,
  Grid,
  Paper,
  Typography,
  Modal,
  Backdrop,
} from "@mui/material";
import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";
import withAuth from "../../../../helpers/withAuth";
import { auctionActions, tokenActions } from "../../../../redux/actions";
import img from "/public/static/red_flag.png";
import { HashLoader, BeatLoader } from "react-spinners";
import Web3 from "web3";

import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import smartContractTokenABI from "../../../../contract/HUNDREDPERCENTNFT.json";
import { Contract } from "ethers";

import GppGoodIcon from "@mui/icons-material/GppGood";

import {
  OutlinedButton,
  SolidButton,
  SolidGrayButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
  SolidYellowButton,
} from "../../../../Components/Buttons";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import { FaWindowClose } from "react-icons/fa";
import { parseCommission } from "../../../../helpers/commission";
import { useWallet } from "../../../../Provider/WalletContext";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
    overflow: "none",
    height: "10em",
    width: "100%",
    padding: "1em 3em",
    borderRadius: "20px",
    boxShadow: theme.palette.boxShadow.main,
    [theme.breakpoints.down("md")]: {
      borderRadius: "2em",
      marginBottom: "1.5em",
      padding: "1em 2em",
      height: "7em",
    },
  },
  headerDesc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    // color: "red",
    "& .MuiTypography-h5": {
      color: theme.palette.textColor.main,
      fontWeight: "bold",
    },
    "& .MuiTypography-caption": {
      color: theme.palette.textGray.main,
      fontSize: ".75em",
    },
  },
  headerImg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image1: {
    width: "100px",
    height: "100px",
    [theme.breakpoints.down("md")]: {
      width: "75px",
      height: "75px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  },
  image2: {
    width: "125px",
    height: "125px",
    [theme.breakpoints.down("md")]: {
      width: "100px",
      height: "100px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "75px",
      height: "75px",
    },
  },
  singleBidAuctionCard: {
    position: "relative",
    overflow: "none",
    padding: "1.5em",
    borderRadius: "1em",
    boxShadow: theme.palette.boxShadow.main,
  },
  auctions: {
    margin: "2em 0",
    borderRadius: "2em",
    padding: "2em",
    margin: "3em 0",
    boxShadow: theme.palette.boxShadow.main,
    width: "100%",
    display: "flex",
  },
  tokenName: {
    color: theme.palette.textColor.main,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: "1em",
    padding: ".2em 0",
    borderBottom: `2px solid ${theme.palette.dividerYellow.main}`,
  },
  collected: {
    color: theme.palette.textColor.main,
    textAlign: "left",
    fontWeight: "bold",
    padding: ".2em 0",
  },
  desc: {
    color: "#707070",
    textAlign: "left",
    fontWeight: "500",
    fontSize: ".875em",
  },
  descValue: {
    color: theme.palette.textColor.main,
    fontWeight: "bold",
    fontSize: ".9em",
  },
  card: {
    width: "100%",
    // height: "150px",
    paddingRight: " 1em",
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  },
  cardMain: {
    width: "100%",
    // height: "100%",
    padding: ".5em",
    borderRadius: "2em",
    boxShadow: theme.palette.boxShadow.main,
  },
  imageWrapper: {
    // background: "linear-gradient(180deg, #b22222, #b22222)",
    background: "white",
    borderRadius: "2em",
    width: "100%",
    height: "100%",
    position: "relative",
    textAlign: "center",
  },
  spinnerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "2em 0",
    borderRadius: "2em",
    padding: "2em",
    margin: "4em 0",
    boxShadow: theme.palette.boxShadow.main,
  },
  spinner: {
    margin: "1em auto",
    textAlign: "center",
  },
  style: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bgcolor: "transparent",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100vh",
      margin: "0 2em",
    },
  },
  addressStyle: {
    width: 600,
    bgcolor: "transparent",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: "2em",
      transform: "none",
      position: "relative",
      top: "0",
      left: "0",
    },
  },
  secure: {
    background: "linear-gradient(180deg, #E25822, #D94D22, #B22222)",
    color: "#fafafa",
    fontSize: ".85em",
    fontWeight: "bold",
    boxShadow: theme.palette.boxShadow.main,
    padding: "0.5em 1em",
    borderRadius: "2em",
  },
  secureText: {
    color: "#707070",
    fontSize: ".5em",
    fontWeight: "bold",
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "center",
    "& h6": {
      fontWeight: "bold",
    },
    [theme.breakpoints.down("md")]: {
      "& h6": {
        display: "none",
      },
    },
  },
  style: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    bgcolor: "transparent",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "100vh",
      margin: "0 2em",
    },
  },
  addressStyle: {
    width: 600,
    bgcolor: "transparent",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      padding: "2em",
      transform: "none",
      position: "relative",
      top: "0",
      left: "0",
    },
  },
  headerText: {
    color: theme.palette.textColor.main,
    textAlign: "left",
    fontWeight: "bold",
    // marginBottom: "1em",
    "& h6": {
      fontWeight: "bold",
    },
  },
  secure: {
    background: "linear-gradient(180deg, #E25822, #D94D22, #B22222)",
    color: "#fafafa",
    fontSize: ".85em",
    fontWeight: "bold",
    boxShadow: theme.palette.boxShadow.main,
    padding: "0.5em 1em",
    borderRadius: "2em",
  },
  secureText: {
    color: "#707070",
    fontSize: ".5em",
    fontWeight: "bold",
    marginTop: "1em",
    marginBottom: "1em",
    textAlign: "center",
    "& h6": {
      fontWeight: "bold",
    },
    [theme.breakpoints.down("md")]: {
      "& h6": {
        display: "none",
      },
    },
  },
  loginbox: {
    padding: "1.5em",
    width: "50vw",
    height: "50vh",
    borderRadius: "2em",
    display: "flex,",
    position: "relative",
    boxSizing: "border-box",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      // height: "100%",
      borderRadius: "2em",
      margin: "0 2em",
    },
  },
}));

function MyBids(props) {
  const classes = useStyles();
  const router = useRouter();
  const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const [userName, setUserName] = React.useState();
  const [userData, setUserData] = React.useState();
  const [userAuctions, setUserAuctions] = React.useState([]);
  const [txStatus, setTxStatus] = React.useState("");
  const [statusText, setStatusText] = React.useState("");
  const [collectModal, setCollectModal] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
  // const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
  const contractABI = smartContractTokenABI.abi;

  React.useEffect(() => {
    props.getAuctionBids();
  }, []);

  const { wallet, connectWallet, connectingWallet, disconnectWallet } =
    useWallet();

  const handleCollectToken = async (
    nftId,
    bidPrice,
    tokenId,
    original,
    name,
    image,
    commission
  ) => {
    if (wallet.isConnected) {
      //Get user account
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log(original);

      const collectedTokenOwner = await provider
        .send("eth_requestAccounts", [])
        .then((accounts) => {
          if (accounts.length > 0) return accounts[0];
        });

      const collected = await collectToken(
        nftId,
        bidPrice,
        tokenId,
        original,
        name,
        image,
        commission
      );
    } else {
      toast.error("Please connect wallet");
      setTxStatus("error");
      setStatusText("Transaction cancelled");
    }
  };

  const collectToken = async (
    NFTId,
    bidPrice,
    tokenId,
    original,
    name,
    image,
    commission
  ) => {
    if (wallet.isConnected) {
      setCollectModal(true);
      setTxStatus("loading");
      setStatusText("Connecting to metamask");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const smartContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const pcomm = parseCommission(commission);

      const currentAccount = await provider
        .send("eth_requestAccounts", [])
        .then((accounts) => {
          if (accounts.length > 0) return accounts[0];
        });

      const gasPriceFromProvider = await provider.getGasPrice();

      const options = {
        from: currentAccount,
        value: parseEther(bidPrice.toString()).toString(10),
        gasLimit: 1000000,
        gasPrice: gasPriceFromProvider,
      };

      const fromAddress = await smartContract.ownerOf(NFTId);

      // set up transaction
      try {
        const tokenReceipt = await smartContract
          .collectToken(
            fromAddress,
            NFTId,
            parseEther(bidPrice.toString()).toString(10),
            20,
            options
          )
          .then((tr) => {
            console.log(`TransactionResponse TX hash: ${tr.hash}`);
            setStatusText("Generated hash");
            setStatusText("Waiting for transaction to be mined");

            props.collectTokenHash({
              hash: tr.hash,
              bidId: tokenId,
              userWalletAddress: currentAccount,
              bidType: original ? "original" : "proposed",
              auctionName: name,
              designUrl: image,
            });
            setTxStatus("success");
            setStatusText(
              "Your payment is being validated and your token would be collected when the payment is complete"
            );

            setCompleted(true);
          });
      } catch (error) {
        console.log(error);
        setTxStatus("error");
        setStatusText("Transaction cancelled");
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  // const collectToken = async (
  //   NFTId,
  //   bidPrice,
  //   tokenId,
  //   original,
  //   name,
  //   image
  // ) => {
  //   setCollectModal(true);
  //   setTxStatus("loading");

  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const signer = provider.getSigner();
  //   // const smartContract = new ethers.Contract(
  //   //   contractAddress,
  //   //   contractABI,
  //   //   signer
  //   // );

  //   const currentAccount = await provider
  //     .send("eth_requestAccounts", [])
  //     .then((accounts) => {
  //       if (accounts.length > 0) return accounts[0];
  //     });

  //   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  //   const ether = (n) => {
  //     return new web3.utils.BN(web3.utils.toWei(n.toString(), "ether"));
  //   };

  //   window.contract = await new web3.eth.Contract(contractABI, contractAddress);
  //   const fromAddress = await window.contract.methods.ownerOf(NFTId).call();

  //   const gas = await window.contract.methods
  //     .collectToken(fromAddress, NFTId, ether(bidPrice))
  //     .estimateGas({
  //       from: await web3.eth.getAccounts()[0],
  //       value: ether(bidPrice),
  //     });
  //   const gasPrice = await web3.eth.getGasPrice();

  //   //set up transaction
  //   try {
  //     const tokenReceipt = await window.contract.methods
  //       .collectToken(fromAddress, NFTId, ether(bidPrice))
  //       .send({
  //         from: currentAccount,
  //         value: ether(bidPrice),
  //         gas: gas,
  //         gasPrice: gasPrice,
  //       })
  //       .once("transactionHash", (hash) => {
  //         console.log(hash);
  //         console.log(`TransactionResponse TX hash: ${hash}`);
  //         setStatusText("Generated hash");
  //         setStatusText("Waiting for transaction to be mined");

  //         props.collectTokenHash({
  //           hash: hash,
  //           bidId: tokenId,
  //           userWalletAddress: currentAccount,
  //           bidType: original ? "original" : "proposed",
  //           auctionName: name,
  //           designUrl: image,
  //         });
  //         setTxStatus("success");
  //         setStatusText(
  //           "Your payment is being validated and your token would be collected when the payment is complete"
  //         );

  //         setCompleted(true);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //     setTxStatus("error");
  //     setStatusText("Transaction cancelled");
  //   }
  // };

  const { auctionBids, loading, collectedToken, changing } = props;
  console.log(collectedToken);

  var options = { year: "numeric", month: "short", day: "numeric" };
  // // const format = new Date(expiryDate).toLocaleDateString("en-US", options);
  // console.log(format);

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="  ">
          <div>
            <div className="rounded-[20px] p-4 bg-[white] relative w-full h-[7em] md:h-full mb-16">
              <div className="w-full flex justify-between">
                <div className="flex flex-col justify-evenly">
                  <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent font-bold font-sora text-[24px]">
                    My Bids
                  </div>

                  <div className="text-textGray text-[14px] font-sora w-2/3 hidden md:block">
                    Check out the status of auctions you&apos;ve bidded on here.
                    You might also be lucky to win the auction.
                  </div>
                </div>
                <div className="flex justify-end items-center gap-4">
                  <div className="relative w-[50px] md:w-[100px]">
                    <Image src={img} alt="Picture of the author" fill />
                  </div>
                  <div className="relative w-[50px] md:w-[100px]">
                    <Image src={img} alt="Picture of the author" fill />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Grid container component="div" className={classes.auctionsMain}>
            {loading && (
              <div className="my-8 rounded-[20px] w-full flex shadow-paper p-8 bg-[white]">
                <ClapSpinner
                  size={30}
                  frontColor="#707070"
                  backColor="#707070"
                  className="my-4 mx-auto text-center "
                />
              </div>
            )}
            <div className="my-8 md:my-12">
              {!loading && auctionBids && (
                <Grid container direction="row" spacing={4}>
                  {auctionBids?.map((value, i) => (
                    <Grid item xs={12} md={6} key={i}>
                      <div className="relative p-6 rounded-[18px] shadow-paper bg-[white]">
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="baseline">
                          <div>
                            <h5 className="font-bold font-sora text-primary2 text-[24px] mb-4">
                              {value?.auction?.tokenId?.nftName ||
                                value?.auction?.originalId?.nftName}
                            </h5>
                          </div>
                          <div>
                            <Chip
                              size="small"
                              label={
                                value?.auction?.isClose ? "Closed" : "Active"
                              }
                              color={
                                value?.auction?.isClose ? "error" : "success"
                              }
                              icon={
                                value?.auction?.isClose ? (
                                  <CloseIcon fontSize="small" />
                                ) : (
                                  <DoneIcon fontSize="small" />
                                )
                              }
                            />
                          </div>
                        </Grid>
                        <Grid container direction="row">
                          <Grid item md={4} xs={12}>
                            <div className={classes.card}>
                              <div className="bg-[white] rounded-[8px] p-4 shadow-paper">
                                <div className={classes.imageWrapper}>
                                  <img
                                    src={
                                      value?.auction?.tokenId?.DesignUrl ||
                                      value?.auction?.originalId?.DesignUrl
                                    }
                                    alt="product"
                                    width="100%"
                                  />
                                </div>
                              </div>
                            </div>
                          </Grid>
                          <Grid
                            item
                            md={8}
                            xs={12}
                            style={{ padding: "1em 0" }}>
                            <div>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                style={{ margin: ".75em 0" }}>
                                <div>
                                  <div className="text-textGray font-bold font-sora text-[16px]">
                                    Proposed bid
                                  </div>
                                </div>
                                <div>
                                  <div className="text-primary2 font-bold font-sora text-[18px]">
                                    {value.price}
                                    <span className="text-textGray font-light font-sora text-[10px]">
                                      MATIC
                                    </span>
                                  </div>
                                </div>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                style={{ margin: ".75em 0" }}>
                                <div>
                                  <div className="text-textGray font-bold font-sora text-[16px]">
                                    Expiry date
                                  </div>
                                </div>
                                <div>
                                  <Typography
                                    component="div"
                                    variant="body1"
                                    className={classes.descValue}
                                    gutterBottom
                                    color="text.secondary">
                                    {!value?.auction?.expiryDate
                                      ? "Expired"
                                      : new Date(
                                          value?.auction?.expiryDate
                                        ).toLocaleDateString("en-US", options)}
                                  </Typography>
                                </div>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                style={{ margin: ".75em 0" }}>
                                <div>
                                  <div className="text-textGray font-bold font-sora text-[16px]">
                                    Status
                                  </div>
                                </div>
                                <div>
                                  {!value?.auction?.isClose &&
                                    !value?.auction?.highestBider && (
                                      <span className="text-textGray font-bold font-sora text-[14px]">
                                        Pending
                                      </span>
                                    )}
                                  {value?.auction?.isClose &&
                                    value?.auction?.highestBider?._id ==
                                      value?._id && (
                                      <span className="text-[#439243] font-bold font-sora text-[14px]">
                                        Accepted
                                      </span>
                                    )}
                                  {value?.auction?.isClose &&
                                    value?.auction?.highestBider?._id !=
                                      value?._id && (
                                      <span className="text-[crimson] font-bold font-sora text-[14px]">
                                        Not Accepted
                                      </span>
                                    )}
                                </div>
                              </Grid>
                              <Grid
                                container
                                direction="row-reverse"
                                justifyContent="space-between"
                                alignItems="center"
                                style={{ margin: ".75em 0" }}>
                                <div>
                                  {value?.auction?.isClose &&
                                    value?.auction?.highestBider?._id ==
                                      value?._id &&
                                    value?.auction?.status != "sold" && (
                                      <>
                                        {/* <CustomLoadingButton
                                        onClick={() =>
                                          handleCollectToken(
                                            value?.auction?.tokenId?.tokenId ||
                                              value?.auction?.originalId
                                                ?.tokenId,
                                            value?.price,
                                            value?._id,
                                            !!value?.auction?.originalId,
                                            value?.auction?.tokenId?.nftName ||
                                              value?.auction?.originalId
                                                ?.nftName,
                                            value?.auction?.tokenId
                                              ?.DesignUrl ||
                                              value?.auction?.originalId
                                                ?.DesignUrl
                                          )
                                        }>
                                        Collect
                                      </CustomLoadingButton> */}
                                        <SolidPurpleGradientButton
                                          onClick={() =>
                                            handleCollectToken(
                                              value?.auction?.tokenId
                                                ?.tokenId ||
                                                value?.auction?.originalId
                                                  ?.tokenId,
                                              value?.price,
                                              value?._id,
                                              !!value?.auction?.originalId,
                                              value?.auction?.tokenId
                                                ?.nftName ||
                                                value?.auction?.originalId
                                                  ?.nftName,
                                              value?.auction?.tokenId
                                                ?.DesignUrl ||
                                                value?.auction?.originalId
                                                  ?.DesignUrl,
                                              value?.auction?.tokenId
                                                ?.commission ||
                                                value?.auction?.originalId
                                                  ?.commission
                                            )
                                          }>
                                          Collect
                                        </SolidPurpleGradientButton>
                                        {/* <CustomLoadingButton
                                        onClick={() =>
                                          changeTokenOwner(
                                            value?.auction?.tokenId?.tokenId,
                                            value?.price,
                                            value?._id,
                                            getSavedWalletInfo().account
                                          )
                                        }
                                      >
                                        Change Owner
                                      </CustomLoadingButton> */}
                                      </>
                                    )}

                                  {value?.auction?.isClose &&
                                    value?.auction?.highestBider?._id ==
                                      value?._id &&
                                    value?.auction?.status == "sold" && (
                                      <Grid
                                        container
                                        direction="row"
                                        display="flex"
                                        flexDirection="row"
                                        alignItems="baseline">
                                        <h6 className="text-primary2 text-[20px] font-sora ">
                                          Collected
                                          <DoneIcon
                                            fontSize="small"
                                            style={{ margin: ".5em" }}
                                          />
                                        </h6>
                                      </Grid>
                                    )}
                                </div>
                              </Grid>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </Grid>
        </div>
        <Modal
          aria-labelledby="Login Modal"
          aria-describedby="login-modal-description"
          open={collectModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            backdropFilter: "blur(5px)",
          }}>
          <>
            <div className="w-full flex justify-center items-center">
              <Box className={classes.style}>
                {/* <Paper elevation={24} className={classes.loginbox}> */}
                <div className="relative rounded-[20px] p-6 bg-[white] w-full md:w-[50vw] h-[80%] md:h-[50vh] box-border    ">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-main text-[18px] md:text-[28px] font-bold font-sora text-primary2">
                      {/* <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent font-sora font-bold text-[28px]  "> */}
                      Collecting Token
                    </div>
                    <div className="flex items-center justify-center gap-1 bg-gradient-to-br from-primary2 via-[#D94D22] to-primary1 text-[#fafafa] font-bold py-1 md:py-2 px-2 md:px-4 text-[12px] md:text-[14px] rounded-[2em] shadow-paper">
                      <GppGoodIcon />
                      <div>Secure</div>
                    </div>
                  </div>

                  <div className="w-full h-full flex flex-col justify-center items-center gap-4 ">
                    {txStatus === "loading" && (
                      <BeatLoader color=" rgb(236 67 82)" size={40} />
                    )}
                    {txStatus === "error" && (
                      <div className="text-primary2">
                        <FaWindowClose size={60} />
                      </div>
                    )}
                    {txStatus === "success" && (
                      <div>
                        <svg
                          className="checkmark"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 52 52">
                          <circle
                            className="checkmark__circle"
                            cx="26"
                            cy="26"
                            r="25"
                            fill="none"
                          />
                          <path
                            className="checkmark__check"
                            fill="none"
                            d="M14.1 27.2l7.1 7.2 16.7-16.8"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="mt-4 text-main text-[14px] md:text-[20px] font-semibold text-center font-sora text-primary2">
                      {statusText}
                    </div>
                    {txStatus === "error" && (
                      <div className="w-full flex justify-center items-center my-4 gap-2 md:gap-4">
                        <OutlinedButton onClick={() => setCollectModal(false)}>
                          Close
                        </OutlinedButton>
                        {/* <SolidButton onClick={handleProceedToBuy}>
                        Try Again
                      </SolidButton> */}
                      </div>
                    )}

                    {txStatus === "success" && (
                      <div className="w-full flex justify-center items-center my-4 gap-2 md:gap-4">
                        <OutlinedButton onClick={() => setCollectModal(false)}>
                          Close
                        </OutlinedButton>
                        <SolidButton
                          onClick={() =>
                            router.push("/dashboard/orders?tab=auctions")
                          }>
                          Check status
                        </SolidButton>
                      </div>
                    )}
                  </div>
                </div>
              </Box>
            </div>
          </>
        </Modal>
      </DashboardLayout>
    </React.Fragment>
  );
}

function mapState(state) {
  const { auctionBids, loading } = state.auction;
  const { collectedToken, changing } = state.token;
  return { auctionBids, loading, collectedToken, changing };
}

const actionCreators = {
  getAuctionBids: auctionActions.getAuctionBids,
  changeTokenOwnerShip: tokenActions.changeTokenOwnerShip,
  changeTokenOwnerShipOriginal: tokenActions.changeTokenOwnerShipOriginal,
  collectTokenHash: auctionActions.collectTokenHash,
};

const connectedMyBids = connect(mapState, actionCreators)(MyBids);
export default withAuth(connectedMyBids);
