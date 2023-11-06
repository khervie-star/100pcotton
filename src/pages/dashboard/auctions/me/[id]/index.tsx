/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import {
  OutlinedButton,
  SolidButton,
  SolidOrangeButton,
} from "../../../../../Components/Buttons";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { connect } from "react-redux";
import withAuth from "../../../../../helpers/withAuth";
import { userActions, auctionActions } from "../../../../../redux/actions";
import DashboardLayout from "../../../../../Layouts/DashboardLayout";
import {
  Backdrop,
  Box,
  Chip,
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
import {
  CheckCircleOutline,
  GppGood,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import _ from "lodash";
import Web3 from "web3";

import { ethers } from "ethers";
import smartContractTokenABI from "../../../../../contract/HUNDREDPERCENTNFT.json";
import { useWallet } from "../../../../../Provider/WalletContext";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { FaWindowClose } from "react-icons/fa";
import { DotLoader } from "react-spinners";
import { auctionService } from "../../../../../services";

function BiddersDialog(props: any) {
  const { onClose, open, bidList, handleListItemClick } = props;

  console.log(bidList);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{ padding: "1em" }}
      fullWidth={true}
      maxWidth={"xs"}>
      <DialogTitle
        className="text-[21px] text-primary2 font-sora px-4 font-bold"
        sx={{ padding: "12px" }}>
        Select Preferred bidder
      </DialogTitle>
      {bidList && (
        <List sx={{ px: 2 }}>
          {bidList?.length > 0 ? (
            _.orderBy(bidList, ["price"], ["desc"])?.map((bid, i) => (
              <ListItem
                button
                onClick={() => handleListItemClick(bid._id)}
                //   onClick={() => handleBidClick(selectedAuction, bid._id)}
                key={i}>
                <ListItemText
                  primary={
                    <p className="font-bold text-base text-primary2">
                      {bid.price}{" "}
                      <span className="font-bold text-[14px] text-[#707070] mx-1">
                        MATIC
                      </span>
                    </p>
                  }
                  secondary={
                    <p className="font-light text-[14px] text-[#707070] mx-1">
                      {bid.user._id}
                    </p>
                  }
                />
              </ListItem>
            ))
          ) : (
            <div className="w-full flex justify-center">
              <p className="text-textGray text-[14px]">
                No bids has been placed yet!
              </p>
            </div>
          )}
        </List>
      )}
    </Dialog>
  );
}

const SingleAuctionDetails = (props: any) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    user,
    loading,
    notified,
    deleted,
    singleAuction,
    gettingSingleAuction,
  } = props;

  const [selectedAuction, setSelectedAuction] = React.useState(null);
  const [selectedBid, setSelectedBid] = React.useState<any>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const [orderModal, setOrderModal] = React.useState(false);
  const [txStatus, setTxStatus] = React.useState("");
  const [statusText, setStatusText] = React.useState("");

  const [apiApproved, setApiApproved] = React.useState(false);

  const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
  // const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
  const contractABI: any = smartContractTokenABI.abi;

  const { wallet, connectWallet, connectingWallet, disconnectWallet }: any =
    useWallet();

  const deleteAuction = (id: any) => {
    // e.preventDefault();
    props.deleteAuction(id);
  };

  const handleConfirmSale = async (tId: any, original: boolean) => {
    console.log("Hi");
    if (wallet.isConnected) {
      // const approveToast = toast.loading("Approving...");

      setOrderModal(true);
      setTxStatus("loading");
      setStatusText("Connecting to metamask");

      console.log("Three");

      const approved = await approveToCollectOnBlockChain(tId);

      console.log("Four");
      if (approved) {
        // toast.success("Auction sale approved", { approveToast });
        if (original) {
          props.sendMailToAuctionWinnerOriginal(selectedBid);
          setApiApproved(true);
        } else {
          // const sendMail = await props.sendMailToAuctionWinner(selectedBid);
          const bidToast = toast.loading("Sending notice to bid winner...");

          auctionService
            .sendMailToAuctionWinner(selectedBid)
            .then((res: any) => {
              toast.success("User notified successfully", {
                id: bidToast,
              });

              setApiApproved(true);
              props.getSingleAuction(id);
            })
            .catch((error: any) => {
              // dispatch(failure(error.toString()));
              toast.error(error, { id: bidToast });
            });

          // console.log(sendMail);
        }
      } else {
        // toast.error("Approval failed", { approveToast });
        setApiApproved(false);
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const approveToCollectOnBlockChain = async (tId: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const smartContract = new ethers.Contract(
    //   contractAddress,
    //   contractABI,
    //   signer
    // );

    console.log(1);

    const currentAccount = await provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) return accounts[0];
      });

    console.log(2);

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
    console.log(3, contractAddress, tId);

    const gas = await smartContract.methods
      .approve(contractAddress, tId)
      .estimateGas({ from: currentAccount });

    console.log(4);

    const gasPrice = await web3.eth.getGasPrice();

    setStatusText("Approving");

    try {
      const approved = await smartContract.methods
        .approve(contractAddress, tId)
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
      // router.reload();
      return approved;
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
      setTxStatus("error");
      setStatusText("Token approval failed");
    }
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setSelectedAuction(null);
    setOpenModal(false);
  };

  const handleListItemClick = (bid: any) => {
    setSelectedBid(bid);
    handleModalClose();
  };

  const goBack = () => {
    router.back();
  };

  React.useEffect(() => {
    if (id) {
      props.getSingleAuction(id);
    }
  }, [id]);

  //   React.useEffect(() => {
  //     setUserId(authTokenService.getUserId());
  //     props.getUser(authTokenService.getUserId());
  //   }, [txStatus]);

  var options: any = { year: "numeric", month: "short", day: "numeric" };
  //   const format = new Date(expiryDate).toLocaleDateString("en-US", options);

  console.log(singleAuction);
  return (
    <DashboardLayout>
      <div className="mb-3">
        <SolidOrangeButton onClick={goBack}>
          <HiOutlineArrowLongLeft />
          Back
        </SolidOrangeButton>
      </div>
      {!gettingSingleAuction && (
        <div className="flex flex-col md:flex-row items-start md:justify-between  gap-4">
          <div className="bg-white w-full md:w-[550px] shadow-paper rounded-[12px] md:rounded-[20px] p-6 md:p-8">
            <img
              src={
                singleAuction?.tokenId?.DesignUrl ||
                singleAuction?.originalId?.DesignUrl
              }
              alt="product"
              width="100%"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="bg-white w-full shadow-paper rounded-[12px] md:rounded-[20px] p-6 md:p-8 flex justify-between items-center">
              <div>
                <div className="font-sora text-[18px] md:text-[22px] text-primary2 font-bold">
                  {singleAuction?.tokenId?.nftName ||
                    singleAuction?.originalId?.nftName}
                </div>
              </div>
              <div>
                <Chip
                  label={singleAuction?.isClose ? "Closed" : "Active"}
                  color={singleAuction?.isClose ? "error" : "success"}
                  icon={<CheckCircleOutline fontSize="small" />}
                />
              </div>
            </div>
            <div className="bg-white w-full shadow-paper rounded-[12px] md:rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
              <div className="text-[16px] text-textGray font-sora font-semibold">
                Total Bids :{" "}
                <span className="text-primary1 text-[20px]">
                  {singleAuction?.allBids?.length}
                </span>
              </div>

              <div className="w-full flex items-center justify-between">
                <div>
                  <div className="text-[14px] text-textGray font-sora font-semibold">
                    Starting price
                  </div>
                </div>
                <div>
                  <div className="text-primary2 font-sora font-semibold text-base">
                    <span className="mx-[3px]">{singleAuction?.price}</span>
                    <span className="text-textGray text-[12px]">MATIC</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center justify-between">
                <div>
                  <div className="text-[14px] text-textGray font-sora font-semibold">
                    Auction expiry date
                  </div>
                </div>
                <div>
                  <div className="text-primary2 font-sora font-semibold text-base">
                    {!singleAuction?.expiryDate
                      ? "Expired"
                      : new Date(singleAuction?.expiryDate).toLocaleDateString(
                          "en-US",
                          options
                        )}
                  </div>
                </div>
              </div>

              {!singleAuction?.highestBider ? (
                <div className="flex justify-between items-center my-3">
                  <div>
                    <div className="text-[14px] text-textGray font-sora font-semibold">
                      Selected bid:{" "}
                    </div>
                    <span className="text-primary2 font-bold text-[14px] my-4">
                      {!selectedBid ? "No bid yet" : selectedBid?.slice(0, 15)}
                      ...
                    </span>
                    <BiddersDialog
                      handleListItemClick={handleListItemClick}
                      // selectedValue={selectedValue}
                      open={openModal}
                      onClose={handleModalClose}
                      bidList={singleAuction?.allBids}
                    />
                  </div>
                  <div>
                    <Button
                      variant="text"
                      onClick={handleModalOpen}
                      style={{
                        borderRadius: "3em",
                        marginTop: "2em",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}>
                      <KeyboardArrowDownRounded fontSize="small" />
                      Open bid list
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center my-3">
                    <div>
                      <p className="text-gray-700 font-bold text-[12px]">
                        Selected bid:{" "}
                      </p>
                      <span className="text-primary2 font-bold text-[14px] my-4">
                        {singleAuction?.highestBider?.user.slice(0, 15)}...
                      </span>
                      <span className="text-[#707070] text-[15px] font-bold mx-2">
                        $ {singleAuction?.highestBider?.price}{" "}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-white w-full shadow-paper rounded-[12px] md:rounded-[20px] p-6 md:p-8 flex flex-col gap-3">
              <div className="flex mt-0">
                <div>
                  {!singleAuction?.allBids?.length && (
                    <SolidButton
                      onClick={() => deleteAuction(singleAuction?._id)}>
                      Delete Auction
                    </SolidButton>
                  )}
                </div>

                <div>
                  <div className="flex justify-end text-center mx-auto">
                    {selectedBid && !singleAuction?.highestBider?._id && (
                      <SolidButton
                        onClick={() =>
                          handleConfirmSale(
                            singleAuction?.tokenId?.tokenId ||
                              singleAuction?.originalId?.tokenId,
                            !!singleAuction?.originalId
                          )
                        }>
                        Confirm sale
                      </SolidButton>
                    )}
                    {(singleAuction?.highestBider?._id || apiApproved) && (
                      <div>
                        <p className="flex gap-3 w-full items-center text-base font-sora font-bold text-success">
                          Approved
                          <CheckCircleOutline fontSize="small" />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {gettingSingleAuction && (
        <>
          <div className="bg-white w-full shadow-paper rounded-[12px] md:rounded-[20px] p-6 md:p-8 flex justify-between items-center">
            <div className="w-full h-full flex items-center justify-center">
              <DotLoader size={24} color="#F1BC31" />
            </div>
          </div>
        </>
      )}
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
                      {/* <SolidButton onClick={handleProceedToBuy}>
                        Try Again
                      </SolidButton> */}
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
  );
};

function mapState(state: any) {
  const { loading, user } = state.users;
  const { notified, deleted, singleAuction, gettingSingleAuction } =
    state.auction;
  // console.log(state, user);
  return {
    loading,
    user,
    notified,
    deleted,
    singleAuction,
    gettingSingleAuction,
  };
}

const actionCreators = {
  getUser: userActions.getUser,
  deleteAuction: auctionActions.deleteAuction,
  sendMailToAuctionWinner: auctionActions.sendMailToAuctionWinner,
  sendMailToAuctionWinnerOriginal:
    auctionActions.sendMailToAuctionWinnerForOriginal,
  getSingleAuction: auctionActions.getSingleAuction,
};

const connectedSingleAuctions = connect(
  mapState,
  actionCreators
)(SingleAuctionDetails);
export default withAuth(connectedSingleAuctions);
