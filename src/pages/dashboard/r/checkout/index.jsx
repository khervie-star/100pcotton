/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import {
  Backdrop,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Modal,
  Paper,
  Select,
  TextField,
  ToggleButton,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";
import * as yup from "yup";
// import CustomLoadingButton from "../../../components/customLoadingButton";
import { JwtParser } from "../../../../helpers";
import useWeb3 from "../../../../hooks/web3js/web3context";
import {
  orderActions,
  tempDataActions,
  tokenActions,
  userActions,
} from "../../../../redux/actions";
import { tokenService } from "../../../../services";
const countryStateData = require("countrycitystatejson");

import GppGoodIcon from "@mui/icons-material/GppGood";
import { HashLoader, BeatLoader } from "react-spinners";
import CloseIcon from "@mui/icons-material/Close";

import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import smartContractTokenABI from "../../../../contract/HUNDREDPERCENTNFT.json";
import { Contract } from "ethers";

import { parseCommission } from "../../../../helpers/commission";
import { pinJSONToIPFS } from "../../../../hooks/web3js/pinata";

import { useStyles } from "../../../../styles/replicaCheckoutStyles";
import authTokenService from "../../../../services/authToken.service";
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
import { useWallet } from "../../../../Provider/WalletContext";

function Checkout(props) {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [orderModal, setOrderModal] = React.useState(false);
  const [addressModal, setAddressModal] = React.useState(false);
  const [tokenId, setTokenId] = React.useState("");
  const [tokenDetail, setTokenDetail] = React.useState("");
  const [tokenName, setTokenName] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");
  const [status, setStatus] = React.useState("pending");
  const [price, setPrice] = React.useState("");
  const [userWalletAddress, setUserWalletAddress] = React.useState("");
  const [selected, setSelected] = React.useState(true);
  const [countryCode, setCountryCode] = React.useState("");
  const [stateProvinceName, setStateProvinceName] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [countryData, setCountryData] = React.useState([]);
  const [statesData, setStatesData] = React.useState([]);
  const [citiesData, setCitiesData] = React.useState([]);
  const [values, setValues] = React.useState({
    name: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
  const [txStatus, setTxStatus] = React.useState("");
  const [statusText, setStatusText] = React.useState("");

  const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
  // const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
  const contractABI = smartContractTokenABI.abi;

  // GET USER ID
  let userId = authTokenService.getUserId();
  React.useEffect(() => {
    props.getUser(userId);
  }, []);

  const { data, user, replica, ordering, ordered, updating, hashStatus } =
    props;

  const { wallet, connectWallet, connectingWallet } = useWallet();

  const handleUpdateAddress = () => {
    const addressDetails = new Object();
    addressDetails.name = values?.name;
    addressDetails.street1 = values?.street1;
    addressDetails.street2 = values?.street2;
    addressDetails.city = values?.city;
    addressDetails.state = values?.state;
    addressDetails.zip = values?.zip;
    addressDetails.country = values?.country;

    const addressObject = new Object();
    addressObject.shippingAddress = addressDetails;

    props.updateShippingAddress(addressObject);
    setAddressModal(false);
  };

  // BUY
  const handleProceedToBuy = async () => {
    if (wallet.isConnected) {
      setOrderModal(true);
      setTxStatus("loading");
      setStatusText("Connecting to metamask");

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const currentAccount = await provider
        .send("eth_requestAccounts", [])
        .then((accounts) => {
          if (accounts.length > 0) return accounts[0];
        });

      console.log(currentAccount);

      try {
        const orderDetails = new Object();
        orderDetails.quantity = data?.quantity;
        orderDetails.size = data?.size;
        orderDetails.shippingAddress = user?.shippingAddress;
        orderDetails.nftName = data?.singleToken?.nftName;
        // orderDetails.tokenId = id;
        orderDetails.userWalletAddress = currentAccount;
        orderDetails.DesignUrl = data?.shirtImage;
        orderDetails.logoDisplayUrl = data?.logoDisplayUrl;
        orderDetails.logoColor = data?.color.logoColor;
        orderDetails.shiteColor = data?.color.shiteColor;
        orderDetails.tokenType = "proposed";
        orderDetails.proposedId = data?.singleToken?._id;

        buyReplicaNFT(
          data?.shirtImage,
          data?.singleToken?.nftName,
          data?.singleToken?.tokenId,
          data?.singleToken?.commission,
          data?.singleToken?.userWalletAddress,
          data?.singleToken?.price,
          data?.singleToken?.coinRate,
          orderDetails
        );
      } catch (err) {
        console.log(err);
        setTxStatus("error");
        setStatusText(err);
        setTimeout(setOrderModal(false), 2000);
      }
    } else {
      toast.error("Please connect wallet");
    }
  };

  const handleProceedToOrder = async (tokenId) => {
    setTxStatus("loading");
    setStatusText("Placing Order...");

    const replicaDetails = new Object();
    replicaDetails.nftName = data?.singleToken?.nftName;
    replicaDetails.tokenId = tokenId;
    replicaDetails.userWalletAddress = data?.singleToken?.userWalletAddress;
    replicaDetails.DesignUrl = data?.shirtImage;
    replicaDetails.logoDisplayUrl = data?.logoDisplayUrl;
    replicaDetails.logoColor = data?.color?.logoColor;
    replicaDetails.shiteColor = data?.color?.shiteColor;

    tokenService
      .createReplicaToken(replicaDetails, data?.singleToken?._id)
      .then(async (response) => {
        console.log(response);
        console.log(response?.replica?._id, response?.originalTokenId);

        const orderDetails = new Object();
        orderDetails.replicaId = response?.replica?._id;
        orderDetails.quantity = data?.quantity;
        orderDetails.size = data?.size;
        orderDetails.shippingAddress = user?.shippingAddress;
        props.createOrder(orderDetails);
        setTxStatus("success");
        setStatusText("Order placed successfully");
      })
      .catch((error) => {
        setTxStatus("error");
        setStatusText(error.error || error.message || error.response);
        console.log(error.error, error.message, error.response);
      });
    setLoading(false);
  };

  const handleEditAddressOpen = () => {
    setAddressModal(true);
  };

  const handleEditAddressCLose = () => {
    setAddressModal(false);
  };

  const handleCountryChange = (e) => {
    setValues({
      ...values,
      country: e.target.value,
    });
    setStatesData(countryStateData?.getStatesByShort(e.target.value));
  };

  const handleStateChange = (e) => {
    setValues({
      ...values,
      state: e.target.value,
    });
    setCitiesData(countryStateData?.getCities(values?.country, e.target.value));
  };

  const handleCityChange = (e) => {
    setValues({
      ...values,
      city: e.target.value,
    });
  };

  const handleZipChange = (e) => {
    setValues({
      ...values,
      zip: e.target.value,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  React.useEffect(() => {
    setCountryData(countryStateData?.getCountries());
    setStatesData(
      countryStateData?.getStatesByShort(props?.user?.shippingAddress?.country)
    );
    setCitiesData(
      countryStateData?.getCities(
        props?.user?.shippingAddress?.country,
        props?.user?.shippingAddress?.state
      )
    );
    setValues({
      ...values,
      name: props?.user?.shippingAddress?.name,
      street1: props?.user?.shippingAddress?.street1,
      street2: props?.user?.shippingAddress?.street2,
      city: props?.user?.shippingAddress?.city,
      state: props?.user?.shippingAddress?.state,
      country: props?.user?.shippingAddress?.country,
      zip: props?.user?.shippingAddress?.zip,
    });
  }, []);

  const buyReplicaNFT = async (
    url,
    name,
    originalTokenId,
    commission,
    originalTokenOwner,
    price,
    rate,
    orderDetails
  ) => {
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
      console.log(pinataResponse.pinataUrl);

      //Parse Commission
      // const pcommission = parseCommission(commission);

      //Setup transaction
      // Get the current average gas price on the Ethereum network
      const gasPriceFromProvider = await provider.getGasPrice();

      const options = {
        gasLimit: 1000000,
        gasPrice: gasPriceFromProvider,
        value: parseEther(parseFloat(35 / rate).toString()).toString(10),
      };

      try {
        const receipt = await smartContract
          .buyNFT(
            originalTokenId,
            parseEther(parseFloat(35 / rate).toString()).toString(10),
            replicaURI,
            false,
            options
          )
          .then((tr) => {
            console.log(`TransactionResponse TX hash: ${tr.hash}`);
            setStatusText("Generated hash");
            setStatusText("Creating order");
            props.sendTxHash({ hash: tr.hash, orderDetails: orderDetails });
            setTxStatus("success");
            setStatusText(
              "Your payment is being validated and your order would be placed when the payment is complete"
            );
          })
          .catch((e) => {
            console.log(e);
            setTxStatus("error");
            setStatusText("Transaction cancelled");

            return e;
          });
      } catch (err) {
        console.log(err);
        setTxStatus("error");
        setStatusText(
          "😢 Something went wrong while setting up your transaction."
        );
        return err;
      }
    } catch (err) {
      console.log(err);
      setTxStatus("error");
      setStatusText("😢 Something went wrong while uploading your tokenURI.");
      return err;
    }
  };

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="flex md:flex-row flex-col items-center justify-center gap-4">
          <div className="w-full md:w-7/12">
            <div className="rounded-[20px] bg-[white] p-6 shadow-paper">
              <Grid container direction="row" justifyContent="space-between">
                <Grid>
                  <h6 className="text-primary2 text-[24px] font-bold font-sora">
                    <IconButton
                      style={{
                        color: `${
                          !!user?.shippingAddress ? "#2e7d32" : "#707070"
                        }`,
                      }}>
                      <CheckCircleIcon />
                    </IconButton>
                    Shipping Address
                  </h6>
                </Grid>
                <Grid item>
                  <SolidOrangeButton onClick={handleEditAddressOpen}>
                    <IconButton style={{ color: "#fff" }}>
                      <EditIcon />
                    </IconButton>
                    Edit
                  </SolidOrangeButton>
                </Grid>
              </Grid>
              <div className="mt-8 text-textGray font-semibold text-[15px]">
                * Free domestic and international shipping
              </div>
              <Grid>
                {!!user?.shippingAddress && (
                  <>
                    <div className="text-[#121212] font-bold text-[.9em]">
                      {user?.firstName + " " + user?.lastName}
                    </div>

                    <div className="text-[0.8em] text-[#707070]">
                      {user?.shippingAddress?.city +
                        ", " +
                        user?.shippingAddress?.state +
                        ", " +
                        user?.shippingAddress?.country}
                    </div>
                  </>
                )}

                {!user?.shippingAddress && (
                  <>
                    <div className="text-[#121212] font-bold text-[.9em] font-sora">
                      No address found
                    </div>

                    <div className="text-[0.8em] text-textGray font-sora">
                      Please add your shipping address to continue
                    </div>
                  </>
                )}
              </Grid>
            </div>

            <div className="shadow-paper  bg-[#fafafa] w-full h-[150px] md:h-[200px] rounded-[1.5em] md:rounded-[2em] px-[1em] md:px-[2em] py-[1em] my-4 flex flex-col justify-between">
              <div className="w-full flex justify-between items-center mb-4">
                <div className="flex gap-2 items-center text-[#E25822] text-[18px] md:text-[24px] font-bold">
                  <div
                    className={
                      !!user?.shippingAddress
                        ? "text-[#2e7d32]"
                        : "text-[#707070]"
                    }>
                    <CheckCircleIcon />
                  </div>
                  <h6 className="text-primary2 text-[24px] font-bold font-sora">
                    Payment Method
                  </h6>
                </div>
              </div>

              <div className="w-full rounded-[3em] bg-primary2/10 border-2 border-solid border-primary2  flex mx-auto p-3 gap-3 items-center justify-center">
                <Image
                  src="/static/metamask.png"
                  width={18}
                  height={18}
                  alt="https://iconscout.com/contributors/icon-mafia"
                />
                <div className="text-[#121212] font-bold">METAMASK</div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-5/12">
            {/* <Paper elevation={4} className={classes.orderDetails}> */}
            <div className="rounded-[20px] bg-[white] p-6 shadow-paper">
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}></div>
              <div>
                <h6 className="text-primary2 text-[24px] font-bold font-sora">
                  Order
                </h6>

                <Grid container direction="row" spacing="2">
                  <Grid item md={4} xs={6}>
                    <div className={classes.card}>
                      {/* <Card elevation={4} className={classes.cardMain}> */}
                      <div className={classes.imageWrapper}>
                        <img
                          src={data?.shirtImage}
                          alt="product"
                          // layout="fill"
                          width="100%"
                          height="100%"
                          // quality={70}
                        />
                      </div>
                      {/* </Card> */}
                    </div>
                  </Grid>
                  <Grid
                    item
                    md={8}
                    xs={6}
                    style={{ padding: "1em" }}
                    className="font-sora">
                    <h6 className="font-bold text-left text-[#E25822]">
                      {data?.singleToken?.nftName}
                    </h6>

                    <div className="text-[#707070] text-[0.75em] font-semibold">
                      Shirt size: {data?.size}
                    </div>

                    <div className="text-[#707070] text-[0.75em] font-semibold">
                      Qty: {data?.quantity}
                    </div>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <div>
                  <div className="flex flex-row my-4 items-center justify-between w-full font-sora">
                    <div className="text-textGray text-[0.75em]">
                      Single price:
                    </div>

                    <div className="text-primary2 text-[0.75em] font-bold ">
                      {(35 / data?.singleToken?.coinRate).toFixed(3)}{" "}
                      <span className="text-[0.7em] text-[#f1bc31]">MATIC</span>{" "}
                      <span className="text-textGray text-[0.75em]  m-[0.3em] font-light">
                        {/* ({data?.singleToken?.price}) */}$35
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between my-4 font-sora">
                    <div className="text-textGray text-[0.75em]">Subtotal:</div>
                    <div className="text-primary2 text-[0.75em] font-bold ">
                      {(
                        (35 / data?.singleToken?.coinRate) *
                        data?.quantity
                      ).toFixed(3)}
                      <span className="text-[0.7em] text-[#f1bc31]">MATIC</span>
                      <span className="text-textGray text-[0.75em]  m-[0.3em] font-light">
                        {/* ({data?.singleToken?.price * data?.quantity}) */}{" "}
                        $35
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <SolidOrangeButton onClick={handleProceedToBuy}>
                {loading && <span>Hang on...</span>}
                {!loading && <span>Proceed</span>}
              </SolidOrangeButton>
            </div>
          </div>
        </div>
        {/* MODAL COMPONENT */}
        <Modal
          open={addressModal}
          onClose={handleEditAddressCLose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            backdropFilter: "blur(5px)",
          }}>
          <div className="w-full h-full flex justify-center items-center relative p-4">
            <div className="bg-[#fafafa] shadow-paper w-full md:w-[50vw] rounded-[20px  ] md:rounded-[2em] my-2 p-4 py-8 relative">
              <div
                onClick={handleEditAddressCLose}
                className="bg-gradient-to-br from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] absolute top-2 right-2 p-2 rounded-full cursor-pointer">
                <CloseIcon />
              </div>
              <div className="font-bold text-left text-[#E25822] text-[18px] md:text-[22px]">
                Edit Address
              </div>
              <Grid container className={classes.shippingDetails} spacing={2}>
                <Grid item xs={12} id="userAddress">
                  <TextField
                    fullWidth
                    variant="standard"
                    id="name"
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange("name")}
                    className="loginInput"
                  />
                </Grid>
                <Grid item xs={12} id="userAddress">
                  <TextField
                    fullWidth
                    variant="standard"
                    id="street1"
                    name="street1"
                    label="Street Address"
                    value={values.street1}
                    onChange={handleChange("street1")}
                    className="loginInput"
                  />
                </Grid>
                <Grid item xs={12} id="userAddress">
                  <TextField
                    fullWidth
                    variant="standard"
                    id="street2"
                    name="street2"
                    label="Apartment Number"
                    value={values.street2}
                    onChange={handleChange("street2")}
                    className="loginInput"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    variant="standard"
                    sx={{ m: 0, minWidth: "100%" }}>
                    <InputLabel id="country-label">Country</InputLabel>
                    <Select
                      labelId="country-label"
                      id="country-select"
                      value={values?.country}
                      label="Country"
                      onChange={handleCountryChange}
                      defaultValue={values?.country}>
                      {countryData.map((country, i) => (
                        <MenuItem value={country.shortName} key={i}>
                          <ListItem disablePadding sx={{ margin: 0 }}>
                            <ListItemIcon>{country?.emoji}</ListItemIcon>
                            <ListItemText primary={country?.name} />
                          </ListItem>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    variant="standard"
                    sx={{ m: 0, minWidth: "100%" }}
                    style={{}}>
                    <InputLabel id="state-label">State Province</InputLabel>
                    <Select
                      labelId="state-label"
                      id="state-select"
                      value={values?.state}
                      label="State"
                      onChange={handleStateChange}
                      defaultValue={values?.state}>
                      {statesData?.map((val, i) => (
                        <MenuItem value={val} key={i}>
                          {val}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    variant="standard"
                    sx={{ m: 0, minWidth: "100%" }}
                    style={{}}>
                    <InputLabel id="city-label">City</InputLabel>
                    <Select
                      labelId="city-label"
                      id="city-select"
                      label="City"
                      onChange={handleCityChange}
                      value={values?.city}>
                      {citiesData?.map((value, i) => (
                        <MenuItem value={value} key={i}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="zip"
                    label="Zip"
                    defaultValue={values?.zip}
                    value={values?.zip}
                    onChange={handleZipChange}
                    variant="standard"
                    helperText=""
                    required
                  />
                </Grid>
              </Grid>
              <div>
                <div className="w-full flex justify-center mt-8">
                  <SolidButton
                    onClick={handleUpdateAddress}
                    disabled={
                      !values.name ||
                      !values.street1 ||
                      !values.city ||
                      !values.state ||
                      !values.country ||
                      !values.zip
                    }>
                    Save Address
                  </SolidButton>
                </div>
              </div>
            </div>
          </div>
        </Modal>
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
            <div className="w-full flex justify-center items-center">
              <Box className={classes.style}>
                {/* <Paper elevation={24} className={classes.loginbox}> */}
                <div className="relative rounded-[20px] p-6 bg-[white] w-full md:w-[50vw] h-[80%] md:h-[50vh] box-border    ">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-main text-[18px] md:text-[28px] font-bold font-sora text-primary2">
                      {/* <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent font-sora font-bold text-[28px]  "> */}
                      Processing Payment
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
                        <OutlinedButton onClick={() => setOrderModal(false)}>
                          Close
                        </OutlinedButton>
                        <SolidButton onClick={handleProceedToBuy}>
                          Try Again
                        </SolidButton>
                      </div>
                    )}

                    {hashStatus && txStatus !== "loading" && (
                      <div className="w-full flex justify-center items-center my-4 gap-2 md:gap-4">
                        <OutlinedButton
                          onClick={() => router.push("/dashboard")}>
                          Go home
                        </OutlinedButton>
                        <SolidButton
                          onClick={() =>
                            router.push("/dashboard/orders?tab=shirts")
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
  const { token } = state;
  const { loading, singleToken, replica } = token;
  console.log(replica);
  const { productData } = state.tempData;
  const { data } = productData;
  const { user, updating } = state.users;
  const { ordered, ordering, hashStatus } = state.orders;
  return {
    updating,
    loading,
    singleToken,
    data,
    user,
    replica,
    ordered,
    ordering,
    hashStatus,
  };
}

const actionCreators = {
  createReplicaToken: tokenActions.createReplicaToken,
  getUser: userActions.getUser,
  createOrder: orderActions.createOrder,
  updateShippingAddress: userActions.updateShippingAddress,
  deleteData: tempDataActions.deleteData,
  sendTxHash: orderActions.sendTxHash,
};

const connectedSetupAuctionsPage = connect(mapState, actionCreators)(Checkout);
export default connectedSetupAuctionsPage;
