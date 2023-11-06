/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useRouter } from "next/router";
import * as React from "react";

import { format } from "date-fns-tz";

import { connect } from "react-redux";

import useWeb3 from "../../../../../hooks/web3js/web3context";
import { auctionActions, tokenActions } from "../../../../../redux/actions";
import { ethers } from "ethers";
import authTokenService from "../../../../../services/authToken.service";
import toast from "react-hot-toast";
import { SolidOrangeButton } from "../../../../../Components/Buttons";
import DashboardLayout from "../../../../../Layouts/DashboardLayout";
import { useWallet } from "../../../../../Provider/WalletContext";

const useStyles = makeStyles((theme) => ({
  nftHolder: {
    width: "90%",
    height: 450,
    borderRadius: "2em",
    boxShadow: theme.palette.boxShadow.main,
    // background: "linear-gradient(180deg, #b22222, #b22222)",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: 300,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  },
  designBarMain: {
    padding: "2em",
  },
  auctionDetails: {
    padding: "2em",
    borderRadius: "2em",
    boxShadow: theme.palette.boxShadow.main,
    "& .MuiTypography-body2": {
      color: theme.palette.primary.light,
      fontSize: ".85em",
      fontWeight: "bold",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0",
      borderRadius: "0",
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },
  headerText: {
    color: theme.palette.buttonBackground.main,
    textAlign: "left",
    fontWeight: "bold",
    "& h6": {
      fontWeight: "bold",
    },
  },
  amountGen: {
    textAlign: "left",
    marginBottom: "1em",
    "& span": {
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
  },
  nftTitle: {
    color: theme.palette.primary.main,
    textAlign: "left",
    fontWeight: "bold",
    margin: "1em 0",
  },
  inputBasePaper: {
    p: "1px 5px",
    margin: "1em 0 1.5em 0",
    height: "40px",
    display: "flex",
    // alignItems: "center",
    border: "1px solid",
    borderRadius: "3em",
    borderColor: theme.palette.textColor.main,
    boxShadow: "none",
    background: "#fff",
    "& input": {
      fontFamily: "poppins",
      fontSize: ".875em",
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    "& input::placeholder": {
      fontFamily: "poppins",
      fontSize: ".85em",
    },
    "& input:focus": {
      outline: "none",
    },
  },
  inputHandler: {
    width: "75%",
    borderRadius: "3em",
  },
  ETHhandler: {
    borderRadius: "3em",
    width: "25%",
    background: "linear-gradient(to bottom, #d84d22, #cd4022 )",
  },
  divider: {
    backgroundColor: theme.palette.dividerYellow.main,
  },
  finalBtn: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    margin: "1em auto",
  },
  textField: {
    width: "100%",
    borderRadius: "3em",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    "& .css-1nms4el-MuiInputBase-root-MuiOutlinedInput-root": {
      borderRadius: "3em",
      height: "40px",
      fontSize: ".875em",
      color: "inherit",
    },
  },
  divider: {
    color: theme.palette.dividerYellow.main,
    width: "100%",
    margin: "1em 0",
  },
}));

function SetupAuction(props) {
  const classes = useStyles();
  const router = useRouter();
  // const [loading, setLoading] = React.useState(false);
  const [tokenId, setTokenId] = React.useState("");
  const [tokenDetail, setTokenDetail] = React.useState("");
  const [tokenName, setTokenName] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");
  // const [authToken, setAuthToken] = React.useState("");
  const [user, setUserId] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [price, setPrice] = React.useState("");
  const [userWalletAddress, setUserWalletAddress] = React.useState("");
  const [auctionEndDate, setAuctionEndDate] = React.useState(new Date());
  const {
    isActive,
    isConnected,
    connectError,
    currentAccount,
    isLoading,
    onConnect,
    ethBalance,
    getSavedWalletInfo,
  } = useWeb3();
  console.log(currentAccount, ethBalance, getSavedWalletInfo());

  const {
    query: { id },
  } = router;

  const handleDateChange = (newValue) => {
    setAuctionEndDate(newValue);
    // console.log(format(newValue, "yyyy-MM-dd"));
  };

  React.useEffect(() => {
    // setTokenId(id);
    // const user = new BehaviorSubject(
    //   process.browser && JSON.parse(localStorage.getItem("user"))
    // );
    // const token = user._value.token;
    // setAuthToken(token);
    setUserId(authTokenService.getUserId());
  }, [id]);

  // GET TOKEN
  React.useEffect(() => {
    props.getSingleAdminReplica(id);
  }, [id]);

  const { singleAdminReplica, loading } = props;
  const { wallet, connectWallet, connectingWallet, disconnectWallet } =
    useWallet();

  console.log(tokenId, user, currentAccount, price, singleAdminReplica);

  const handleSubmit = async () => {
    if (wallet.isConnected) {
      //Get user account
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const currentAccount = await provider
        .send("eth_requestAccounts", [])
        .then((accounts) => {
          if (accounts.length > 0) return accounts[0];
        });

      // setLoading(true);
      const auctionDetails = new Object();
      auctionDetails.originalId = id; //tokenId
      auctionDetails.userWalletAddress = currentAccount; //wallet address
      auctionDetails.price = price;
      auctionDetails.expiryDate = format(
        auctionEndDate,
        "yyyy-MM-dd'T'hh:mm:ss"
      );

      console.log(auctionDetails);

      props.auctionOriginal(auctionDetails);
    } else {
      toast.error("Please connect to metamask");
    }
  };

  return (
    <DashboardLayout>
      <Container>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignContent="center">
          <Grid item md={7} xs={12}>
            <div className="bg-[white] w-full md:w-[90%] h-[300px] md:h-[450px] rounded-[12px] md:rounded-[20px] flex justify-center items-center text-center shadow-paper">
              <img
                src={singleAdminReplica?.DesignUrl}
                height="auto"
                alt={singleAdminReplica?._id}
                className="h-full object-contain"
              />
            </div>
          </Grid>
          <Divider classNAme={classes.divider} />
          <Grid
            item
            md={5}
            xs={12}
            justifyContent="center"
            alignContent="center"
            className={classes.designBarMain}
            sx={{ mr: 0, display: { xs: "block", md: "inline" } }}>
            <div className="bg-[white] p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px]">
              {/* <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}></div> */}
              <div>
                <h6 className="text-primary2 font-sora font-bold text-[20px] md:text-[24px]">
                  Setup Auction
                </h6>

                <Typography
                  component="div"
                  variant="h6"
                  gutterBottom
                  color="text.primary"
                  className={classes.nftTitle}>
                  {singleAdminReplica?.nftName}
                </Typography>
                <Divider className={classes.divider} />
                <div className="text-textGray text-[14px] font-sora font-light">
                  Proposed price
                </div>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                  className={classes.inputBasePaper}>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder=" "
                    fullWidth
                    id="price"
                    name="price"
                    type="number"
                    color="primary"
                    inputProps={{ "aria-label": "tokenPrice" }}
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    required
                  />
                  <Button className={classes.ETHhandler}>MATIC</Button>
                </ButtonGroup>
                <MobileDateTimePicker
                  label="End date"
                  value={auctionEndDate}
                  onChange={handleDateChange}
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  maxDate={
                    new Date(new Date().setMonth(new Date().getMonth() + 1))
                  }
                  renderInput={(params) => (
                    <TextField {...params} className={classes.textField} />
                  )}
                />
              </div>
              <div className="mt-8">
                <SolidOrangeButton
                  onClick={handleSubmit}
                  disabled={
                    parseFloat(price) <= 0.0000001 || !parseFloat(price)
                  }>
                  {loading && <span>Hang on...</span>}
                  {!loading && <span>Auction</span>}
                </SolidOrangeButton>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}

function mapState(state) {
  const { token } = state;
  const { loading, singleAdminReplica } = token;
  return { loading, singleAdminReplica };
}

const actionCreators = {
  getSingleAdminReplica: tokenActions.getSingleAdminReplica,
  auctionOriginal: auctionActions.auctionOriginal,
};

const connectedSetupAuctionsPage = connect(
  mapState,
  actionCreators
)(SetupAuction);
export default connectedSetupAuctionsPage;
