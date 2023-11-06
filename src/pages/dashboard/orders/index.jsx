/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import {
  Backdrop,
  Box,
  Card,
  Grid,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";
import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";
import { auctionActions, orderActions } from "../../../redux/actions";

import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
// import CustomLoadingButton from "../../components/customLoadingButton";
import withAuth from "../../../helpers/withAuth";
import _ from "lodash";
import { SolidButton, SolidOrangeButton } from "../../../Components/Buttons";
import DashboardLayout from "../../../Layouts/DashboardLayout";
const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
    overflow: "none",
    height: "10em",
    width: "100%",
    padding: "1em 3em",
    borderRadius: "4em 1em 1em 1em",
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
  searchTitle: {
    color: theme.palette.primary.main,
    textAlign: "center",
    padding: ".5em",
    marginBottom: "1em",
    borderRadius: "5em",
    boxShadow: theme.palette.boxShadow.main,
  },
  searchInputContainer: {
    padding: "1em",
    borderRadius: "2em",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: theme.palette.boxShadow.main,
  },
  searchInput: {
    border: "2px solid",
    width: "100%",
    textAlign: "center",
    borderColor: theme.palette.buttonBackground.main,
    padding: "2px 1em ",
    borderRadius: "inherit",
    "& input": {
      fontSize: ".875em",
      textAlign: "left",
    },
  },
  filter: {
    backgroundColor: "transparent",
    color: "#F1BC31",
    // boxShadow: theme.palette.boxShadow.main,
    border: "none",
    borderColor: "#E25822",
    margin: "0 .5em",
    width: "1.5em",
    height: "1.5em",
    fontSize: "1.5em",
    "&:hover": {
      backgroundColor: theme.palette.buttonBackground.light,
      color: "#fff",
    },
  },

  // NEW STYLES
  singleBidAuctionCard: {
    position: "relative",
    overflow: "none",
    padding: "1.5em",
    borderRadius: "1em",
    boxShadow: theme.palette.boxShadow.main,
  },
  auctions: {
    margin: "1em 0",
    borderRadius: "2em",
    padding: "2em",
    margin: "3em 0",
    boxShadow: theme.palette.boxShadow.main,
    width: "100%",
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
    height: "100%",
    padding: ".5em",
    borderRadius: "2em",
    // boxShadow: theme.palette.boxShadow.main,
  },
  imageWrapper: {
    borderRadius: "2em",
    width: "100%",
    height: "100%",
    position: "relative",
    textAlign: "center",
    "& img": {
      // borderRadius: "1.4em",
      // marginLeft: "-35px",
      // marginTop: "-15px",
    },
    [theme.breakpoints.down("md")]: {
      // marginLeft: "20px",
    },
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
}));

const OrderTracking = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("shirts");

  const {
    loading,
    orders,
    transactions,
    proposedTransactions,
    collected,
    singleBid,
  } = props;

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  React.useEffect(() => {
    props.getAllOrders();
    props.getAllTransactions();
    props.getProposedTx();
    props.getCollectedTx();
    if (!!collected) {
      props.getSingleBid(collected?.bidId);
    }
  }, []);

  React.useEffect(() => {
    // Get the current tab from the URL query string
    const activeTab = router.query.tab;

    // If a tab is specified in the query string, set it as the current tab
    if (activeTab) {
      setActiveTab(activeTab);
    }
  }, []);

  // Update the URL query string when the current tab changes
  React.useEffect(() => {
    router.push(`?tab=${activeTab}`);
  }, [activeTab]);

  var options = { year: "numeric", month: "short", day: "numeric" };

  const handleTrackOrder = () => {
    router.push(`/dashboard/orders/${value._id}`);
  };

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="bg-[#fafafa] shadow-paper relative overflow-hidden h-[7em] md:h-[10em] w-full px-8 md:px-12 py-4 rounded-[20px]   mb-[1.5em] md:mb-0 ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-evenly gap-3">
              <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                Orders
              </div>
              <div className="text-[12px] text-textGray  font-light hidden md:block">
                Track your orders here
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <div className="w-[60px] h-[60px] md:w-[75px] md:h-[75px]  lg:w-[100px] lg:h-[100px]">
                <Image
                  src="/static/navigation_pin.png"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
              <div className="w-[75px] h-[75px] md:w-[100px] md:h-[100px]  lg:w-[125px] lg:h-[125px]">
                <Image
                  src="/static/navigation_pin.png"
                  alt="Picture of the author"
                  width={125}
                  height={125}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full justify-center items-center  text-center ">
          <div className="text-[20px] my-8 bg-[whitesmoke] p-3 inline-flex rounded-md shadow-md ">
            <div
              className={`py-2  px-4 cursor-pointer font-semibold ${
                "shirts" === activeTab
                  ? "bg-gradient-to-tl from-[#A01AEC] via-[#CB527D] to-[#DF9361] text-[#fafafa] rounded-md"
                  : "text-primary2"
              }`}
              onClick={() => handleTabClick("shirts")}>
              Shirts
            </div>
            <div
              className={`py-2 px-4 cursor-pointer font-semibold ${
                "proposed" === activeTab
                  ? "bg-gradient-to-tl from-[#A01AEC] via-[#CB527D] to-[#DF9361] text-[#fafafa] rounded-md"
                  : "text-primary2"
              }`}
              onClick={() => handleTabClick("proposed")}>
              Proposed
            </div>
            <div
              className={`py-2 px-4 cursor-pointer font-semibold ${
                "auctions" === activeTab
                  ? "bg-gradient-to-tl from-[#A01AEC] via-[#CB527D] to-[#DF9361] text-[#fafafa] rounded-md"
                  : "text-primary2"
              }`}
              onClick={() => handleTabClick("auctions")}>
              Auctions
            </div>
          </div>
        </div>

        {!loading && activeTab == "shirts" && (
          <div className="w-full p-8 rounded-[12px] md:rounded-[20px] shadow-paper">
            <Grid container direction="row" spacing={4}>
              {transactions &&
                transactions?.map((value, i) => (
                  <Grid item xs={12} md={6} key={i}>
                    <div className="bg-[white] shadow-paper rounded-[12px] md:rounded-[20px] p-4 md:p-6 relative">
                      <div className="absolute bottom-4 right-4 bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] text-[0.75em] font-semibold shadow-lg flex place-content-center items-center w-[20px] h-[20px]  rounded-full">
                        {value?.orderDetails.tokenType === "original" && "O"}
                        {value?.orderDetails.tokenType === "proposed" && "R"}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold py-[0.2em] border-b-2 border-solid border-[#f1bc31] mb-4 text-left text-primary2">
                          {value?.orderDetails && value?.orderDetails?.nftName}
                        </div>
                        <div
                          className={`w-[18px] h-[18px] rounded-full ${
                            value.paymentStatus === "success" && "bg-success"
                          } ${
                            value.paymentStatus === "pending" &&
                            "bg-[yellow]  animate-pulse "
                          } ${value.paymentStatus === "fail" && "bg-error"}`}
                        />
                      </div>

                      <Grid container direction="row">
                        <Grid item md={4} xs={12}>
                          <div className={classes.card}>
                            <Card elevation={0} className={classes.cardMain}>
                              <div className={classes.imageWrapper}>
                                <img
                                  src={value?.orderDetails.DesignUrl}
                                  alt="product"
                                  width="100%"
                                  // quality={70}
                                />
                              </div>
                            </Card>
                          </div>
                        </Grid>

                        <Grid item md={8} xs={12} style={{ padding: "1em 0" }}>
                          <div>
                            <div className="flex flex-row justify-between items-center my-[0.75em]">
                              <div className="text-textGray font-medium text-[0.875em] text-left">
                                Transaction Hash
                              </div>
                              <div className="text-primary2 font-bold text-[0.9em] underline">
                                <a
                                  href={`https://polygonscan.com/tx/${value?.hash}`}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  {value?.hash?.substring(0, 6)}...
                                  {value?.hash?.substring(
                                    value?.hash.length - 4,
                                    value?.hash.length
                                  )}
                                </a>
                              </div>
                            </div>

                            <div className="flex flex-row justify-between items-center my-[0.75em]">
                              <div>
                                <div className="text-textGray font-medium text-[0.875em] text-left">
                                  Order Id
                                </div>
                              </div>
                              <div className="text-primary2 font-bold text-[0.9em]">
                                {value?.trackingNumber?.substring(0, 8)}...
                              </div>
                            </div>

                            <div className="flex flex-row justify-between items-center my-[0.75em]">
                              <div className="text-textGray font-medium text-[0.875em] text-left">
                                Order Status
                              </div>
                              <div className="text-primary2 font-bold text-[0.9em] capitalize">
                                {value?.paymentStatus}
                              </div>
                            </div>

                            <div className="flex flex-row justify-between items-center my-[0.75em]">
                              <div className="text-textGray font-medium text-[0.875em] text-left">
                                Order Date
                              </div>
                              <div className="text-primary2 font-bold text-[0.9em]">
                                {new Date(value?.createdAt).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </div>
                            </div>

                            {value?.trackingNumber && (
                              <Grid>
                                <SolidButton onClick={handleTrackOrder}>
                                  Track
                                </SolidButton>
                              </Grid>
                            )}
                          </div>
                        </Grid>
                      </Grid>

                      {value?.paymentStatus == "success" && (
                        <div
                          className="text-sm underline text-primary2 cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/dashboard/orders/${
                                _.find(orders, { hash: value?.hash })?._id
                              }`
                            )
                          }>
                          Click to see order details
                        </div>
                      )}
                    </div>
                  </Grid>
                ))}
            </Grid>
          </div>
        )}

        {!loading && activeTab == "proposed" && (
          // <Paper elevation={4} className={classes.auctions}>
          <Grid container direction="row" spacing={4}>
            {proposedTransactions &&
              proposedTransactions?.map((value, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <div className="bg-[white] shadow-paper rounded-[12px] md:rounded-[20px] p-4 md:p-6 relative">
                    <div className="flex items-center justify-between">
                      <div className="font-bold py-[0.2em] border-b-2 border-solid border-[#f1bc31] mb-4 text-left text-primary2">
                        {value?.proposedDetails &&
                          value?.proposedDetails?.nftName}
                      </div>
                      <div
                        className={`w-[18px] h-[18px] rounded-full  ${
                          value.paymentStatus === "success" && "bg-success"
                        } ${
                          value.paymentStatus === "pending" &&
                          "bg-[yellow] animate-pulse"
                        } ${value.paymentStatus === "fail" && "bg-error"}`}
                      />
                    </div>

                    <Grid container direction="row">
                      <Grid item md={4} xs={12}>
                        <div className={classes.card}>
                          <Card elevation={0} className={classes.cardMain}>
                            <div className={classes.imageWrapper}>
                              <img
                                src={value?.proposedDetails.DesignUrl}
                                alt="product"
                                width="100%"
                                // quality={70}
                              />
                            </div>
                          </Card>
                        </div>
                      </Grid>

                      <Grid item md={8} xs={12} style={{ padding: "1em 0" }}>
                        <div>
                          <div className="flex flex-row justify-between items-center my-[0.75em]">
                            <div className="text-textGray font-medium text-[0.875em] text-left">
                              Transaction Hash
                            </div>
                            <div className="text-primary2 font-bold text-[0.9em] underline">
                              <a
                                href={`https://polygonscan.com/tx/${value?.hash}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                {value?.hash?.substring(0, 6)}...
                                {value?.hash?.substring(
                                  value?.hash.length - 4,
                                  value?.hash.length
                                )}
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-row justify-between items-center my-[0.75em]">
                            <div className="text-textGray font-medium text-[0.875em] text-left">
                              Transaction Status
                            </div>
                            <div className="text-primary2 font-bold text-[0.9em] capitalize">
                              {value?.paymentStatus}
                            </div>
                          </div>

                          <div className="flex flex-row justify-between items-center my-[0.75em]">
                            <div className="text-textGray font-medium text-[0.875em] text-left">
                              Order Date
                            </div>
                            <div className="text-primary2 font-bold text-[0.9em]">
                              {new Date(value?.createdAt).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    {value?.paymentStatus == "success" && (
                      <div
                        className="text-sm underline text-primary2 cursor-pointer"
                        onClick={() => router.push(`/dashboard/user/profile`)}>
                        Click to see your proposed shirts
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
          </Grid>
          // {/* </Paper> */}
        )}

        {!loading && activeTab == "auctions" && (
          // <Paper elevation={4} className={classes.auctions}>
          <Grid container direction="row" spacing={4}>
            {collected &&
              collected?.map((value, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <div className="bg-[white] shadow-paper rounded-[12px] md:rounded-[20px] p-4 md:p-6 relative">
                    <div className="absolute bottom-4 right-4 bg-gradient-to-b from-primary2 via-[#D94D22] to-[#B22222] text-[#fafafa] text-[0.75em] font-semibold shadow-lg flex place-content-center items-center w-[20px] h-[20px]  rounded-full">
                      {value?.bidType === "original" && "O"}
                      {value?.bidType === "proposed" && "P"}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="font-bold py-[0.2em] border-b-2 border-solid border-[#f1bc31] mb-4 text-left text-primary2">
                        {value?.auctionName}
                      </div>
                      <div
                        className={`w-[18px] h-[18px] rounded-full  ${
                          value.paymentStatus === "success" && "bg-success"
                        } ${
                          value.paymentStatus === "pending" &&
                          "bg-[yellow] animate-pulse"
                        } ${value.paymentStatus === "fail" && "bg-error"}`}
                      />
                    </div>

                    <Grid container direction="row">
                      <Grid item md={4} xs={12}>
                        <div className={classes.card}>
                          <Card elevation={0} className={classes.cardMain}>
                            <div className={classes.imageWrapper}>
                              <img
                                src={value?.designUrl}
                                alt="product"
                                width="100%"
                                // quality={70}
                              />
                            </div>
                          </Card>
                        </div>
                      </Grid>

                      <Grid item md={8} xs={12} style={{ padding: "1em 0" }}>
                        <div>
                          <div className="flex flex-row justify-between items-center my-[0.75em]">
                            <div className="text-textGray font-medium text-[0.875em] text-left">
                              Transaction Hash
                            </div>
                            <div className="text-primary2 font-bold text-[0.9em] underline">
                              <a
                                href={`https://polygonscan.com/tx/${value?.hash}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                {value?.hash?.substring(0, 6)}...
                                {value?.hash?.substring(
                                  value?.hash.length - 4,
                                  value?.hash.length
                                )}
                              </a>
                            </div>
                          </div>

                          <div className="flex flex-row justify-between items-center my-[0.75em]">
                            <div className="text-textGray font-medium text-[0.875em] text-left">
                              Transaction Status
                            </div>
                            <div className="text-primary2 font-bold text-[0.9em] capitalize">
                              {value?.paymentStatus}
                            </div>
                          </div>

                          <div className="flex flex-row justify-between items-center my-[0.75em]">
                            <div className="text-textGray font-medium text-[0.875em] text-left">
                              Order Date
                            </div>
                            <div className="text-primary2 font-bold text-[0.9em]">
                              {new Date(value?.createdAt).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    {value?.paymentStatus == "success" && (
                      <div
                        className="text-sm underline text-primary2 cursor-pointer"
                        onClick={() => router.push(`/dashboard/user/profile`)}>
                        Click to see your collected shirts
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
          </Grid>
          // </Paper>
        )}

        {loading && !orders && (
          <div className="w-full h-[40vh] flex justify-center items-center bg-[#fafafa] shadow-paper my-4 rounded-[1.5em] md:rounded-[2em] ">
            <ClapSpinner
              size={30}
              frontColor="#707070"
              backColor="#707070"
              className={classes.spinner}
            />
          </div>
        )}
      </DashboardLayout>
    </React.Fragment>
  );
};

function mapState(state) {
  const { loading, orders, transactions, proposedTransactions, collected } =
    state.orders;
  const { singleBid } = state.auction;
  return {
    loading,
    orders,
    transactions,
    proposedTransactions,
    collected,
    singleBid,
  };
}

const actionCreators = {
  getAllOrders: orderActions.getAllOrders,
  getAllTransactions: orderActions.getAllTransactions,
  getProposedTx: orderActions.getProposedTx,
  getCollectedTx: orderActions.getCollectedTx,
  getSingleBid: auctionActions.getSingleBid,
};

const connectedOrderTrackingPage = connect(
  mapState,
  actionCreators
)(OrderTracking);
export default withAuth(connectedOrderTrackingPage);
