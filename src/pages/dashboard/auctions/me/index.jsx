/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Backdrop,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";

import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import withAuth from "../../../../helpers/withAuth";
import { userActions, auctionActions } from "../../../../redux/actions";
import img from "/public/static/red_flag.png";
import {
  CheckCircleOutline,
  DeleteForever,
  GppGood,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import { ClapSpinner } from "react-spinners-kit";
import useWeb3 from "../../../../hooks/web3js/web3context";
import toast from "react-hot-toast";

import { HashLoader, BeatLoader } from "react-spinners";

import Web3 from "web3";

import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import smartContractTokenABI from "../../../../contract/HUNDREDPERCENTNFT.json";

import authTokenService from "../../../../services/authToken.service.js";

import { OutlinedButton, SolidButton } from "../../../../Components/Buttons";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import { FaWindowClose } from "react-icons/fa";

import _ from "lodash";
import { useWallet } from "../../../../Provider/WalletContext";

const useStyles = makeStyles((theme) => ({
  auctions: {
    margin: "1em 0",
    borderRadius: "2em",
    padding: "2em",
    margin: "3em 0",
    boxShadow: theme.palette.boxShadow.main,
    width: "100%",
  },
  empty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  emptyMain: {
    color: theme.palette.textColor.main,
    fontWeight: "bold",
  },
  emptySub: {
    color: theme.palette.textGray.main,
    fontSize: ".875em",
  },

  main: {
    borderRadius: ".75em",
    padding: "1em 0",
    margin: "0",
    height: "80%",
    width: "100%",
    boxShadow: theme.palette.boxShadow.main,
  },

  card: {
    width: "100%",
    // height: "150px",
    paddingRight: " 1em",
    [theme.breakpoints.down("md")]: {
      // height: "100%",
      padding: "0",
    },
  },

  imageWrapper: {
    // background: "linear-gradient(180deg, #b22222, #b22222)",
    background: "white",
    borderRadius: "2em",
    padding: ".5em",
    width: "100%",
    height: "100%",
    position: "relative",
    textAlign: "center",
    boxShadow: theme.palette.boxShadow.main,
    "& img": {
      // borderRadius: "1.4em 1.4em 0 0",
      // marginLeft: "-35px",
      // marginTop: "-15px",
    },
  },
  productName: {
    color: theme.palette.text.main,
    fontWeight: "bold",
  },
  tokenName: {
    color: theme.palette.buttonBackground.main,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: "1em",
    padding: ".2em 0",
    borderBottom: `2px solid ${theme.palette.dividerYellow.main}`,
  },
  approved: {
    color: theme.palette.buttonBackground.main,
    textAlign: "left",
    fontWeight: "bold",
    padding: ".2em 0",
    margin: "0",
  },

  desc: {
    color: "#707070",
    textAlign: "left",
    fontWeight: "500",
    fontSize: ".875em",
  },

  selectedBid: {
    color: "grey",
    fontWeight: "bold",
    fontSize: ".75em",
    // margin: "1em 0",
  },
  selectedBidValue: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    fontSize: ".75em",
    margin: "1em 0",
  },

  finalBtn: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "center",
    float: "right",
    margin: "0 auto",
    fontSize: ".875em",
  },
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function BiddersDialog(props) {
  const {
    onClose,
    selectedValue,
    open,
    bidList,
    selectedAuction,
    handleBidClick,
  } = props;
  const classes = useStyles();

  // const handleClose = () => {
  //   onClose(selectedValue);
  // };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ padding: "1em" }}
      fullWidth={true}
      maxWidth={"xs"}>
      <DialogTitle className={classes.tokenName} sx={{ padding: "12px" }}>
        Select Preferred bidder
      </DialogTitle>
      {selectedAuction && (
        <List sx={{ px: 2 }}>
          {selectedAuction?.allBids?.length > 0 ? (
            _.orderBy(selectedAuction?.allBids, ["price"], ["desc"])?.map(
              (bid, i) => (
                <ListItem
                  button
                  // onClick={() => handleListItemClick(value._id)}
                  onClick={() => handleBidClick(selectedAuction, bid._id)}
                  key={i}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        color="primary"
                        style={{ fontWeight: "bold" }}>
                        {bid.price}
                        <span
                          style={{
                            fontWeight: "bold",
                            fontSize: ".6em",
                            color: "#f1bc31",
                            padding: "0 2px",
                          }}>
                          MATIC
                        </span>
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        component="div"
                        gutterBottom
                        color="#707070"
                        style={{ fontWeight: "light" }}>
                        {bid.user}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            )
          ) : (
            <div className={classes.empty}>
              <Typography
                variant="caption"
                component="div"
                gutterBottom
                className={classes.emptySub}>
                No bids has been placed yet!
              </Typography>
            </div>
          )}
        </List>
      )}
    </Dialog>
  );
}

BiddersDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function MyAuctions(props) {
  const classes = useStyles();
  const router = useRouter();
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState();
  const [userData, setUserData] = React.useState();
  const [userAuctions, setUserAuctions] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [tokenName, setTokenName] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [startingPrice, setStartingPrice] = React.useState("");
  const [expiryDate, setExpiryDate] = React.useState();
  const [bidList, setBidList] = React.useState([]);
  const [bidCount, setBidCount] = React.useState("");
  const [closed, setClosed] = React.useState();
  const { ethBalance, getSavedWalletInfo, approveCollect } = useWeb3();

  const [orderModal, setOrderModal] = React.useState(false);
  const [txStatus, setTxStatus] = React.useState("");
  const [statusText, setStatusText] = React.useState("");

  const [selectedAuction, setSelectedAuction] = React.useState(null);
  const [selectedBid, setSelectedBid] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleBidClick = (auction, bid) => {
    setSelectedBid(bid);
    handleModalClose();
  };

  const handleModalOpen = (auction) => {
    setSelectedAuction(auction);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setSelectedAuction(null);
    setOpenModal(false);
  };

  const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
  // const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
  const contractABI = smartContractTokenABI.abi;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const deleteAuction = (id) => {
    // e.preventDefault();
    props.deleteAuction(id);
  };

  const { wallet, connectWallet, connectingWallet, disconnectWallet } =
    useWallet();

  const handleConfirmSale = async (id, original) => {
    if (wallet.isConnected) {
      // const approveToast = toast.loading("Approving...");
      setOrderModal(true);
      setTxStatus("loading");
      setStatusText("Connecting to metamask");

      const approved = await approvetoCollectonBlockChain(id);
      if (approved) {
        // toast.success("Auction sale approved", { approveToast });
        if (original) {
          props.sendMailToAuctionWinnerOriginal(selectedBid);
        } else {
          props.sendMailToAuctionWinner(selectedBid);
        }
      } else {
        // toast.error("Approval failed", { approveToast });
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const approvetoCollectonBlockChain = async (id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const smartContract = new ethers.Contract(
    //   contractAddress,
    //   contractABI,
    //   signer
    // );

    const currentAccount = await provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) return accounts[0];
      });

    // const gasPriceFromProvider = await provider.getGasPrice();

    // const options = {
    //   gasLimit: 1000000,
    //   gasPrice: gasPriceFromProvider,
    // };

    // try {
    //   const approved = await smartContract.approve(
    //     contractAddress,
    //     id,
    //     options
    //   );
    //   return approved;
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.message);
    // }

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    const smartContract = new web3.eth.Contract(contractABI, contractAddress);

    const gas = await smartContract.methods
      .approve(contractAddress, id)
      .estimateGas({ from: currentAccount });

    const gasPrice = await web3.eth.getGasPrice();

    console.log(await smartContract.methods.ownerOf(id).call());
    setStatusText("Approving");

    try {
      const approved = await smartContract.methods
        .approve(contractAddress, id)
        .send({
          from: currentAccount,
          gas: gas,
          gasPrice: gasPrice,
        });
      setTxStatus("success");
      setStatusText("Token approved for collection");
      setTimeout(() => {
        setOrderModal(false);
      }, 2000);
      router.reload();
      return approved;
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
      setTxStatus("error");
      setStatusText("Token approval failed");
    }
  };

  const viewAuctionDetails = (auctionId) => {
    router.push(`/dashboard/auctions/me/${auctionId}`);
  };

  var options = { year: "numeric", month: "short", day: "numeric" };
  const format = new Date(expiryDate).toLocaleDateString("en-US", options);

  const { user, loading, notified, deleted } = props;

  React.useEffect(() => {
    setUserId(authTokenService.getUserId());
    props.getUser(authTokenService.getUserId());
  }, [txStatus]);

  return (
    <React.Fragment>
      <DashboardLayout>
        <Grid container direction="row">
          <div className="rounded-[20px] p-4 bg-[white] relative w-full h-[7em] md:h-full">
            <div className="w-full flex justify-between">
              <div className="flex flex-col justify-evenly">
                <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent font-bold font-sora text-[24px]">
                  My Auctions
                </div>

                <div className="hidden md:block text-textGray text-[14px] font-sora w-2/3 ">
                  Check out and update your auctioned tokens here
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

          <div className="my-8 md:my-12 w-full">
            {user?.auctions?.length > 0 && (
              <Grid container direction="row" spacing={4}>
                {user?.auctions?.length > 0 &&
                  user?.auctions?.map((value, i) => (
                    <Grid item xs={12} md={6} key={i}>
                      <Grid container>
                        {loading && (
                          <div className="my-8 rounded-[20px] w-full flex shadow-paper p-8 bg-[white]">
                            <ClapSpinner
                              size={30}
                              frontColor="#707070"
                              backColor="#707070"
                              className="my-4 mx-auto text-center"
                            />
                          </div>
                        )}
                        {!loading && (
                          <div
                            className="bg-white shadow-paper rounded-[12px] md:rounded-[20px] p-6 md:p-8 cursor-pointer"
                            onClick={() => viewAuctionDetails(value._id)}>
                            <>
                              <Grid container justifyContent="space-between">
                                <div>
                                  <div className="font-sora text-[18px] md:text-[22px] text-primary2 font-bold">
                                    {value?.tokenId?.nftName ||
                                      value?.originalId?.nftName}
                                  </div>
                                </div>
                                <div>
                                  <Chip
                                    label={value?.isClose ? "Closed" : "Active"}
                                    color={value?.isClose ? "error" : "success"}
                                    icon={
                                      <CheckCircleOutline fontSize="small" />
                                    }
                                  />
                                </div>
                              </Grid>
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Grid
                                  item
                                  md={4}
                                  xs={12}
                                  style={{ padding: "1em 0" }}>
                                  <div className={classes.card}>
                                    <div className={classes.imageWrapper}>
                                      <img
                                        src={
                                          value?.tokenId?.DesignUrl ||
                                          value?.originalId?.DesignUrl
                                        }
                                        alt="product"
                                        width="100%"
                                      />
                                    </div>
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  md={8}
                                  xs={12}
                                  style={{ padding: "1em 0" }}>
                                  <div>
                                    <div className="text-[16px] text-textGray font-sora font-semibold">
                                      Total Bids :{" "}
                                      <span className="text-primary1 text-[20px]">
                                        {value?.allBids?.length}
                                      </span>
                                    </div>

                                    <div className="w-full flex items-center justify-between my-3">
                                      <div>
                                        <div className="text-[14px] text-textGray font-sora font-semibold">
                                          Starting price
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-primary2 font-sora font-semibold text-base">
                                          <span className="mx-[3px]">
                                            {value?.price}
                                          </span>
                                          <span className="text-textGray text-[12px]">
                                            MATIC
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="w-full flex items-center justify-between my-3">
                                      <div>
                                        <div className="text-[14px] text-textGray font-sora font-semibold">
                                          Auction expiry date
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-primary2 font-sora font-semibold text-base">
                                          {!value?.expiryDate
                                            ? "Expired"
                                            : new Date(
                                                value?.expiryDate
                                              ).toLocaleDateString(
                                                "en-US",
                                                options
                                              )}
                                        </div>
                                      </div>
                                    </div>

                                    {/* {!value.highestBider ? (
                                      <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        style={{ margin: ".75em 0" }}>
                                        <div>
                                          <div className="text-[14px] text-textGray font-sora font-semibold">
                                            Selected bid:{" "}
                                          </div>
                                          <span
                                            className={
                                              classes.selectedBidValue
                                            }>
                                            {!!selectedValue &&
                                            _.some(
                                              value?.allBids,
                                              selectedValue
                                            )
                                              ? selectedValue
                                              : "No bidders selected"}
                                            {selectedBid &&
                                            selectedAuction === value
                                              ? selectedBid || "No bid yet"
                                              : "No bid yet"}
                                          </span>
                                          <BiddersDialog
                                            selectedAuction={selectedAuction}
                                            // selectedValue={selectedValue}
                                            open={openModal}
                                            onClose={handleModalClose}
                                            handleBidClick={handleBidClick}
                                            // bidList={value?.allBids}
                                          />
                                        </div>
                                        <div>
                                          <Button
                                            variant="text"
                                            onClick={() =>
                                              handleModalOpen(value)
                                            }
                                            style={{
                                              borderRadius: "3em",
                                              marginTop: "2em",
                                              textTransform: "none",
                                              fontWeight: "bold",
                                            }}>
                                            <KeyboardArrowDownRounded fontSize="sm" />
                                            Open bid list
                                          </Button>
                                        </div>
                                      </Grid>
                                    ) : (
                                      <>
                                        <Grid
                                          container
                                          direction="row"
                                          justifyContent="space-between"
                                          alignItems="center"
                                          style={{ margin: ".75em 0" }}>
                                          <div>
                                            <Typography
                                              variant="subtitle1"
                                              component="div"
                                              className={classes.selectedBid}>
                                              Selected bid:{" "}
                                            </Typography>
                                            <span
                                              className={
                                                classes.selectedBidValue
                                              }>
                                              {value?.highestBider}
                                            </span>
                                          </div>
                                        </Grid>
                                      </>
                                    )} */}
                                  </div>
                                </Grid>
                                {/* <Grid
                                  container
                                  justifyContent="space-between"
                                  style={{ marginTop: "0" }}>
                                  <div>
                                    {!value?.allBids?.length && (
                                      <SolidButton
                                        onClick={() =>
                                          deleteAuction(value?._id)
                                        }>
                                        Delete Auction
                                      </SolidButton>
                                    )}
                                  </div>
                                  {selectedValue && (
                                    <div>
                                      <div className={classes.finalBtn}>
                                        {!value?.highestBider ? (
                                          <SolidButton
                                            onClick={() =>
                                              handleConfirmSale(
                                                value?.tokenId?.tokenId ||
                                                  value?.originalId?.tokenId,
                                                !!value?.originalId
                                              )
                                            }>
                                            Confirm sale
                                          </SolidButton>
                                        ) : (
                                          <Grid direction="column">
                                            <Typography
                                              variant="h6"
                                              componentapproved="div"
                                              color="text.primary"
                                              className={classes.approved}>
                                              Approved
                                              <CheckCircleOutline fontSize="sm" />
                                            </Typography>
                                          </Grid>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Grid> */}
                              </Grid>
                            </>
                            <SolidButton>
                              Click to see auction details
                            </SolidButton>
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  ))}

                {/* <Dialog
                  // onClose={handleClose}
                  // open={open}
                  sx={{ padding: "1em" }}
                  fullWidth={true}
                  maxWidth={"xs"}>
                  <DialogTitle
                    className={classes.tokenName}
                    sx={{ padding: "12px" }}>
                    Select Preferred bidder
                  </DialogTitle>
                  <List sx={{ px: 2 }}>
                    {bidList.length > 0 ? (
                      _.orderBy(bidList, ["price"], ["desc"])?.map(
                        (value, i) => (
                          <ListItem
                            button
                            // onClick={() => handleListItemClick(value._id)}
                            onClick={() => handleBidClick(auction.id, bid)}
                            key={i}>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="h6"
                                  component="div"
                                  gutterBottom
                                  color="primary"
                                  style={{ fontWeight: "bold" }}>
                                  {value.price}
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: ".6em",
                                      color: "#f1bc31",
                                      padding: "0 2px",
                                    }}>
                                    MATIC
                                  </span>
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  variant="caption"
                                  component="div"
                                  gutterBottom
                                  color="#707070"
                                  style={{ fontWeight: "light" }}>
                                  {value.user}
                                </Typography>
                              }
                            />
                          </ListItem>
                        )
                      )
                    ) : (
                      <div className={classes.empty}>
                        <Typography
                          variant="caption"
                          component="div"
                          gutterBottom
                          className={classes.emptySub}>
                          No bids has been placed yet!
                        </Typography>
                      </div>
                    )}
                  </List>
                </Dialog> */}
              </Grid>
            )}
            {user?.auctions?.length <= 0 && (
              <div className={classes.empty}>
                <div style={{ textAlign: "center", marginTop: "8em" }}>
                  <Typography
                    variant="h6"
                    component="h6"
                    gutterBottom
                    className={classes.emptyMain}>
                    You do not have any auctions yet!
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    gutterBottom
                    className={classes.emptySub}>
                    Auction one of your tokens to get started!
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Grid>

        <div className="">
          <Modal
            aria-labelledby="Login Modal"
            aria-describedby="login-modal-description"
            open={orderModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            sx={{
              backdropFilter: "blur(5px)",
            }}>
            <>
              <div className="w-screen h-screen flex justify-center items-center">
                <div className="relative rounded-[20px] p-6 bg-[white] w-full md:w-[500px] h-[80%] md:h-[50vh] box-border">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-main text-[18px] md:text-[28px] font-bold font-sora text-primary2">
                      Approving Token
                    </div>
                    <div className="flex items-center justify-center gap-1 bg-gradient-to-br from-primary2 via-[#D94D22] to-primary1 text-[#fafafa] font-bold py-1 md:py-2 px-2 md:px-4 text-[12px] md:text-[14px] rounded-[2em] shadow-paper">
                      <GppGood />
                      <div className="hidden md:block">Secure</div>
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
                        <OutlinedButton onClick={() => setOrderModal(false)}>
                          Close
                        </OutlinedButton>
                        <SolidButton onClick={handleProceedToBuy}>
                          Try Again
                        </SolidButton>
                      </div>
                    )}

                    {txStatus == "success" && (
                      <div className="w-full flex justify-center items-center my-4 gap-2 md:gap-4">
                        {/* <OutlinedButton onClick={() => setOrderModal(false)}>
                          Close
                        </OutlinedButton> */}
                        <SolidButton onClick={() => setOrderModal(false)}>
                          Close
                        </SolidButton>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          </Modal>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}

function mapState(state) {
  const { loading, user } = state.users;
  const { notified, deleted } = state.auction;
  // console.log(state, user);
  return { loading, user, notified, deleted };
}

const actionCreators = {
  getUser: userActions.getUser,
  deleteAuction: auctionActions.deleteAuction,
  sendMailToAuctionWinner: auctionActions.sendMailToAuctionWinner,
  sendMailToAuctionWinnerOriginal:
    auctionActions.sendMailToAuctionWinnerForOriginal,
};

const connectedMyAuctions = connect(mapState, actionCreators)(MyAuctions);
export default withAuth(connectedMyAuctions);
