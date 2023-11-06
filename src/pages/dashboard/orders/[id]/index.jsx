/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import * as React from "react";

import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import { orderActions } from "../../../../redux/actions";
import DashboardLayout from "../../../../Layouts/DashboardLayout";

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
  main: {
    margin: "2em 0",
    borderRadius: "2em",
    padding: "2em",
    margin: "2em 0",
    boxShadow: theme.palette.boxShadow.main,
  },
  nftName: {
    color: theme.palette.textColor.main,
    fontWeight: "bold",
    textAlign: "center",
  },
  orderDetails: {
    color: theme.palette.primary.main,
    fontWeight: "500",
    fontSize: "1em",
  },
  dates: {
    margin: "1em 0",
  },
  orderDate: {
    color: theme.palette.textGray.main,
  },
  deliveryDate: {
    color: theme.palette.textGray.main,
  },
  location: {
    margin: "1em 0",
  },
  shippedFrom: {
    color: theme.palette.textColor.main,
    fontSize: ".5em",
    fontWeight: "bold",
  },
  shippedTo: {
    color: theme.palette.textColor.main,
    fontSize: ".5em",
    fontWeight: "bold",
  },
  finalBtn: {
    display: "flex",
    justifyContent: "flex-end",
    textAlign: "center",
    float: "right",
    margin: "1em auto",
    fontSize: ".875em",
  },
  divider: {
    backgroundColor: theme.palette.dividerYellow.main,
  },
  card: {
    width: "100%",
    height: "100%",
    // margin: "2em ",
  },
  cardMain: {
    width: "100%",
    // height: "100%",
    margin: "0px",
    padding: ".75em",
    borderRadius: "2em",
    // boxShadow: theme.palette.boxShadow.main,
    boxShadow: "0px 10px 40px #70707026",
  },
  imageWrapper: {
    // background: "linear-gradient(180deg, #b22222, #b22222)",
    borderRadius: "2em",
    width: "100%",
    height: "100%",
    position: "relative",
    "& img": {
      // borderRadius: "1.4em",
      // marginLeft: "-55px",
      // marginTop: "15px",
      // marginBottom: "-15px",
      // marginLeft: "-35px",
    },
  },
  productName: {
    color: theme.palette.text.main,
    fontWeight: "bold",
    margin: "0",
  },
}));

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.textColor.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.textColor.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 24,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.textColor.main,
  }),
  "& .QontoStepIcon-completedIcon": {
    color: theme.palette.textColor.main,
    zIndex: 1,
    fontSize: 22,
  },
  "& .QontoStepIcon-pendingIcon": {
    color: theme.palette.textColor.main,
    zIndex: 1,
    fontSize: 24,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, pending, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <CheckCircleRoundedIcon className="QontoStepIcon-completedIcon" />
      ) : pending ? (
        <PendingRoundedIcon className="QontoStepIcon-pendingIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const steps = ["Pre-transit", "In transit", "Out for delivery", "Delivered"];

const label = { inputProps: { "aria-label": "Checkbox demo" } };

var options = { year: "numeric", month: "short", day: "numeric" };

function SingleOrderTrackingPage(props) {
  const classes = useStyles();
  const router = useRouter();
  const [tokenName, setTokenName] = React.useState("");
  const [tokenDescription, setTokenDescription] = React.useState("");
  const [status, setStatus] = React.useState(0);

  const {
    query: { id },
  } = router;

  React.useEffect(() => {
    props?.getSingleTx(id);
    props?.getSingleOrder(id);
    if (props?.content?.trackingNumber) {
      props?.trackOrder(id);
    }
  }, []);

  React.useEffect(() => {
    if (props?.orderLocation) {
      if (props?.orderLocation?.trackResult?.status == "pre_transit") {
        setStatus(1);
      } else if (props?.orderLocation?.trackResult?.status == "in_transit") {
        setStatus(2);
      } else if (
        props?.orderLocation?.trackResult?.status == "out_for_delivery"
      ) {
        setStatus(3);
      } else if (props?.orderLocation?.trackResult?.status == "delivered") {
        setStatus(4);
      }
    }
  }, []);

  const { orderLocation, singleOrder, trx } = props;

  console.log(trx, singleOrder);

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="bg-[#fafafa] shadow-paper relative overflow-hidden h-[7em] md:h-[10em] w-full px-8 md:px-12 py-4 rounded-[20px]   mb-[1.5em] md:mb-0 ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-evenly gap-3">
              <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                Tracking
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
        <Grid container xs={12}>
          <div className="bg-[#fafafa] shadow-paper relative overflow-hidden h-full w-full px-4 md:px-8 py-4 rounded-[20px]   mb-[1.5em] md:mb-0 mt-12">
            <Grid container direction="row" spacing={4}>
              <Grid item md={4} xs={12} style={{}}>
                <div className={classes.card}>
                  <Card elevation={0} className={classes.cardMain}>
                    <div className={classes.imageWrapper}>
                      <img
                        src={
                          singleOrder?.replicaId
                            ? singleOrder?.replicaId?.DesignUrl
                            : singleOrder?.tokenId?.DesignUrl
                        }
                        alt="product"
                        width="100%"
                        // quality={70}
                      />
                    </div>
                    <CardContent style={{ padding: "10px 0" }}>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        className={classes.productName}>
                        {tokenName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="#707070"
                        style={{ fontWeight: "normal", fontSize: ".8em" }}>
                        {tokenDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>

              <Grid item md={8}>
                <div>
                  <Grid item>
                    <Typography
                      variant="h5"
                      component="div"
                      gutterBottom
                      className={classes.nftName}>
                      {singleOrder?.nftName}
                    </Typography>
                  </Grid>
                  <Typography
                    component="div"
                    variant="h6"
                    className={classes.orderDetails}
                    gutterBottom>
                    <span style={{ color: "#707070", fontSize: "10px" }}>
                      ID:
                    </span>{" "}
                    {singleOrder?.trackingNumber
                      ? singleOrder?.trackingNumber?.substring(0, 12) + "..."
                      : "_________"}
                  </Typography>

                  <div className="flex flex-row justify-between items-center my-[0.75em]">
                    <div className="text-[#707070] font-medium text-[0.875em] text-left">
                      Transaction Hash
                    </div>
                    <div className="text-[#E25822] font-bold text-[0.9em] underline">
                      <a
                        href={`https://polygonscan.com/tx/${singleOrder?.hash}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        {singleOrder?.hash?.substring(0, 12)}...
                        {singleOrder?.hash?.substring(
                          singleOrder?.hash.length - 4,
                          singleOrder?.hash.length
                        )}
                      </a>
                    </div>
                  </div>
                  <Typography
                    component="div"
                    variant="h6"
                    className={classes.orderDetails}
                    gutterBottom>
                    <span style={{ color: "#707070", fontSize: "10px" }}>
                      quantity:
                    </span>{" "}
                    {singleOrder?.quantity}
                  </Typography>
                  <Typography
                    component="div"
                    variant="h6"
                    className={classes.orderDetails}
                    gutterBottom>
                    <span style={{ color: "#707070", fontSize: "10px" }}>
                      Size:
                    </span>{" "}
                    {singleOrder?.size}
                  </Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className={classes.dates}>
                    <div>
                      <Typography
                        component="div"
                        variant="caption"
                        className={classes.orderDate}
                        gutterBottom
                        color="text.secondary">
                        {new Date(singleOrder?.createdAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        component="div"
                        variant="caption"
                        className={classes.deliveryDate}
                        gutterBottom
                        color="text.secondary">
                        {orderLocation
                          ? new Date(
                              orderLocation?.trackResult?.est_delivery_date
                            ).toLocaleDateString("en-US", options)
                          : "Unestimated"}
                      </Typography>
                    </div>
                  </Grid>
                  {props && (
                    <Grid
                      container
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.location}>
                      <div>
                        <Typography
                          component="div"
                          variant="body1"
                          className={classes.shippedFrom}
                          gutterBottom
                          color="text.secondary">
                          {
                            orderLocation?.trackResult?.carrier_detail
                              ?.origin_location
                          }
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          component="div"
                          variant="body1"
                          className={classes.shippedTo}
                          gutterBottom
                          color="text.secondary">
                          {
                            orderLocation?.trackResult?.carrier_detail
                              ?.destination_location
                          }
                        </Typography>
                      </div>
                    </Grid>
                  )}
                  <div>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Stepper
                        alternativeLabel
                        activeStep={status}
                        connector={<QontoConnector />}>
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel StepIconComponent={QontoStepIcon}>
                              {label}
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Stack>
                  </div>
                  <div>
                    {/* <div className={classes.finalBtn}>
                    <CustomButton
                      onClick={null}
                      endIcon={<CheckCircleOutline />}
                    >
                      Received
                    </CustomButton>
                  </div> */}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </DashboardLayout>
    </React.Fragment>
  );
}

function mapState(state) {
  const { orderLocation, singleOrder, trx } = state.orders;
  return { orderLocation, singleOrder, trx };
}

const actionCreators = {
  trackOrder: orderActions.trackOrder,
  getSingleOrder: orderActions.getSingleOrder,
  getSingleTx: orderActions.getSingleTx,
};

const connectedSingleOrderTrackingPage = connect(
  mapState,
  actionCreators
)(SingleOrderTrackingPage);
export default connectedSingleOrderTrackingPage;
