/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Switch,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Box,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import FormData from "form-data";
import { useS3Upload } from "next-s3-upload";
import * as React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";

import { tokenActions, userActions, orderActions } from "../../redux/actions";
import { tokenService } from "../../services";
import badWords from "../../utility/badWordsList";
import domtoimage from "dom-to-image";

import GppGoodIcon from "@mui/icons-material/GppGood";
import { BeatLoader } from "react-spinners";

import { ethers } from "ethers";
import smartContractTokenABI from "../../contract/HUNDREDPERCENTNFT.json";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";
import { parseCommission } from "../../helpers/commission";
import { pinJSONToIPFS } from "../../hooks/web3js/pinata";

const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
// const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
const contractABI = smartContractTokenABI.abi;
import { buyReplicaNFT } from "../../helpers/contractFunctions";

import { checkAdmin } from "../../helpers/checkAdmin";
import { useRouter } from "next/router";
import authTokenService from "../../services/authToken.service";
import { OutlinedButton, SolidButton } from "../Buttons";
import { FaWindowClose } from "react-icons/fa";

import { fabric } from "fabric-pure-browser";
import { useWallet } from "../../Provider/WalletContext";

// MUI makeStyles
const useStyles = makeStyles((theme) => ({
  canvasMain: {
    overflowX: "scroll",
    overflowY: "hidden",
  },
  canvasWrapper: {
    // p: 2,
    // m: 2,
    width: "500px",
    position: "relative",
    padding: "2em",
    borderRadius: "2em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: theme.palette.boxShadow.main,
    [theme.breakpoints.down("md")]: {
      scale: "0.68",
    },
  },
  drawingArea: {
    position: "absolute",
    top: "120px",
    left: "122px",
    zIndex: 10,
    width: "200px",
    height: "400px",
    textAlign: "center",
  },

  canvasContainer: {
    width: "200px",
    height: "400px",
    position: "relative",
    userSelect: "none",
  },

  tshirtDiv: {
    width: "452px",
    height: "548px",
    position: "relative",
    userSelect: "none",
    // backgroundColor: "red",
    // overflowX: "scroll",
    // overflowX: "hidden",
    // overflowY: "hidden",
  },

  canvas: {
    position: "absolute",
    width: "200px",
    height: "400px",
    left: "0px",
    top: "0px",
    userSelect: "none",
    cursor: "default",
  },
  designBarMain: {
    padding: "2em",
    paddingTop: "0",
    [theme.breakpoints.down("md")]: {
      boxShadow: "none",

      padding: "0",
    },
  },
  designBar: {
    padding: "2em",
    borderRadius: "2em",
    boxShadow: theme.palette.boxShadow.main,
    "& .MuiTypography-body2": {
      color: theme.palette.primary.light,
      fontSize: ".85em",
      fontWeight: "bold",
    },
    [theme.breakpoints.down("md")]: {
      boxShadow: "none",
      padding: "1.2em",
    },
  },
  headerText: {
    color: theme.palette.textColor.main,
    fontWeight: "bold",
  },
  previewText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: ".5em 0",
  },
  headerDesc: {
    color: theme.palette.textGray.main,
    fontWeight: "light",
    fontSize: "10px",
  },
  inputBasePaper: {
    p: "1px 5px",
    margin: "2em 0 1.5em 0",
    height: "40px",
    display: "flex",
    // alignItems: "center",
    border: "1px solid",
    borderRadius: "3em",
    borderColor: theme.palette.borderColor.main,
    color: "#121212",
    fontWeight: "bold",
    "& input": {
      fontFamily: "poppins",
      fontSize: ".875em",
      fontWeight: "regular",
    },
    "& input::placeholder": {
      color: theme.palette.textGray.main,
      fontFamily: "poppins",
      fontSize: ".8em",
      fontWeight: "regular",
      fontStyle: "italic",
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
    background: "linear-gradient(180deg, #E25822, #D94D22, #B22222)",
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
  description: {
    margin: "10em 0",
    borderRadius: "3em",
    borderColor: theme.palette.borderColor.main,
  },
  spinner: {
    margin: "5px",
    textAlign: "center",
  },
  divider: {
    color: theme.palette.dividerYellow.main,
    width: "100%",
    margin: "1em 0",
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

const CssTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    fontSize: 16,
    padding: "0px",
  },
  "& label.Mui-focused": {
    color: "#E25822",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#E25822",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E25822",
      borderRadius: 20,
    },
    "&:hover fieldset": {
      borderColor: "#E25822",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E25822",
    },
  },
});

const ColoredSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#e25822",
    "&:hover": {
      backgroundColor: alpha("#e25822", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#e25822",
  },
}));

// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

// interface MutableRefObject<T> {
//   current: T;
// }

// Parent function component
const DesignPage = (props) => {
  const classes = useStyles();
  const canvas = React.useRef(null);
  const router = useRouter();

  const [url, setUrl] = React.useState("");
  const [text, setTextChange] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [available, setAvailable] = React.useState(false);
  const [checkingAvailability, setCheckingAvailability] = React.useState(false);
  const [propoaslId, setProposalId] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [showLogo, setShowLogo] = React.useState(true);
  const canvasRef = React.useRef(null);
  const [orderModal, setOrderModal] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);

  const [size, setSize] = React.useState({
    width: 500,
    height: 500,
  });

  const [txStatus, setTxStatus] = React.useState("");
  const [statusText, setStatusText] = React.useState("");

  const contractAddress = "0xCc1cdff9ae4E20fE429947642283526da17EE58F"; // Mainnet
  // const contractAddress = "0x552e0f1B1C46351451e4Ac8F703D7cBE31D02324"; // Testnet
  const contractABI = smartContractTokenABI.abi;

  React.useEffect(() => {
    if (loggedIn) {
      props.getUser(authTokenService.getUserId());
      setProposalId(props.nftId);
      setTokenId(props.tokenId);
    }
  }, []);

  const {
    tokens,
    user,
    proposedToken,
    userOriginal,
    proposedStatus,
    loggedIn,
  } = props;
  const { wallet, connectWallet, connectingWallet } = useWallet();

  // INITIALIZE CANVAS
  const initCanvas = () =>
    new fabric.Canvas("canvas", {
      selection: false,
      renderOnAddRemove: true,
    });

  // RENDER CANVAS UPON DOM LOAD
  React.useEffect(() => {
    canvas.current = initCanvas();

    canvas.current.on("mouse:over", () => {});

    // destroy fabric on unmount
    return () => {
      canvas.current.dispose();
      canvas.current = null;
    };
  }, []);

  // HANDLE TEXT CHANGE
  const handleTextChange = (event) => {
    let textVal = event.target.value;
    if (loggedIn) {
      // Add Text to state
      if (props?.user.role === "admin") {
        setTextChange(event.target.value.slice(0, 12));
        textVal = textVal;
      } else {
        setTextChange(event.target.value.toLowerCase().slice(0, 12));
        textVal = textVal.toLowerCase();
      }

      // Place text
      handlePlaceTextOnShirt(textVal);

      // Check availability status
      const searchObject = new Object();
      searchObject.nftName = event.target.value.toLowerCase();
      setCheckingAvailability(true);
      tokenService
        .search(searchObject)
        .then((response) => {
          console.log(response);
          const filterAdminTokens = response?.adminToken?.filter((item) => {
            return Object.values(item.nftName).join("") === event.target.value;
          });
          const filterProposedTokens = response?.proposedToken?.filter(
            (item) => {
              return (
                Object.values(item.nftName).join("") === event.target.value
              );
            }
          );
          if (
            filterAdminTokens.length == 0 &&
            filterProposedTokens.length == 0
          ) {
            setAvailable(true);
            setCheckingAvailability(false);
          } else {
            setAvailable(false), setCheckingAvailability(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setAvailable(false);
          setCheckingAvailability(false);
        });
    } else {
      setTextChange(event.target.value.toLowerCase().slice(0, 12));
      textVal = textVal.toLowerCase();
      handlePlaceTextOnShirt(textVal);
    }
  };

  // PLACE TEXT ON SHIRT
  const handlePlaceTextOnShirt = (txt) => {
    if (canvas.current.getObjects().length > 0) {
      const textObj = canvas.current.getObjects()[0];
      canvas.current.remove(textObj);
    }
    // Add a textbox for word phrases
    const textBox = new fabric.Textbox(txt, {
      width: 200,
      height: 10,
      top: 0,
      left: 0,
      fontSize: 27,
      fontWeight: "500",
      fontFamily: "'Poppins', sans-serif",
      textAlign: "center",
      fill: user?.role == "admin" ? "#fff" : "#b22222",
      stroke: user?.role == "admin" ? "#fff" : "#b22222",
      fixedWidth: 200,
    });

    textBox.setControlsVisibility({
      mt: false,
      mb: false,
      ml: false,
      mr: false,
      bl: false,
      br: false,
      tl: false,
      tr: false,
      mtr: false,
    });
    textBox.lockMovementX = true;
    textBox.lockMovementY = true;

    //Make the text font reduce as text size enlarges
    canvas.current.on("text:changed", function (opt) {
      var textBox = opt.target;
      if (textBox.width > textBox.fixedWidth) {
        textBox.fontSize *= textBox.fixedWidth / (textBox.width + 1);
        textBox.width = textBox.fixedWidth;
      }
    });

    if (textBox.width > textBox.fixedWidth) {
      textBox.fontSize *= textBox.fixedWidth / (textBox.width + 1);
      textBox.width = textBox.fixedWidth;
    }

    // Render the Textbox on Canvas
    canvas.current.add(textBox);
    canvas.current.renderAll();
  };

  // SET DESCRIPTION TO STATE
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // TOGGLE LOGO
  const handleShowLogoChange = (event) => {
    setShowLogo(event.target.checked);
  };

  //  EXPORT CANVAS
  const handleExport = async () => {
    setLoading(true);
    if (!badWords.includes(text.toLowerCase())) {
      if (wallet.isConnected) {
        // Create dataUri from node
        var node = document.getElementById("tshirt-div");
        const fileBlob = await domtoimage.toBlob(node).then(function (blob) {
          return blob;
        });

        //Upload to cloudinary
        uploadImage(fileBlob, text);
      } else {
        toast.error("Please connect wallet");
        setLoading(false);
      }
    } else {
      toast.error("You cannot propose with a bad word! Please try another.");
      setLoading(false);
    }
    setLoading(false);
  };
  const uploadImage = (fileBlob, text) => {
    const data = new FormData();

    data.append("file", fileBlob, `${text}.png`);

    data.append("upload_preset", "100nft");

    data.append("cloud_name", "z-pro-trading");

    fetch(" https://api.cloudinary.com/v1_1/z-pro-trading/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.secure_url);
        onMintPressed(data.secure_url);
      })
      .catch((err) => console.log(err));

    return data.secure_url;
  };

  const onMintPressed = async (url) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const currentAccount = await provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) return accounts[0];
      });

    const proposedDetails = new Object();
    proposedDetails.id = tokenId;
    proposedDetails.nftName = text;
    proposedDetails.userWalletAddress = currentAccount;
    proposedDetails.DesignUrl = url;
    proposedDetails.description = text;
    proposedDetails.tokenOwner = user?.role === "admin" ? "admin" : "user";

    proposeNewDesignX(url, text, propoaslId, proposedDetails);
  };
  // proposedDetails.logo = showLogo;

  const proposeNewDesignX = async (url, name, nftId, proposedDetails) => {
    setCompleted(false);
    setOrderModal(true);
    setTxStatus("loading");
    setStatusText("Connecting to metamask");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const smartContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    const currentAccount = await provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) return accounts[0];
      });

    setStatusText("Pinning to IPFS...");
    //error handling
    if (url.trim() == "" || name.trim() == "") {
      setTxStatus("error");
      setStatusText(
        "❗Please  make sure all fields are completed before minting."
      );
    }

    //make metadata
    const metadata = new Object();
    metadata.name = name;
    metadata.image = url;

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
      toast.error("😢 Something went wrong while uploading your tokenURI.");
      setTxStatus("error");
      setStatusText("😢 Something went wrong while uploading your tokenURI.");
    }
    const tokenURI = pinataResponse.pinataUrl;

    setStatusText("Starting transaction..");

    // const contractOwner = await smartContract.contractOwner();
    const contractOwner = "0x698895555d706eB44B83385642C5c6d30544EEE3";
    console.log(contractOwner, currentAccount);

    //Setup transaction
    // Get the current average gas price on the Ethereum network
    const gasPriceFromProvider = await provider.getGasPrice();

    const options = {
      gasLimit: 1100000,
      gasPrice: gasPriceFromProvider,
      from: currentAccount,
    };

    try {
      await smartContract
        .propose(
          checkAdmin(nftId, currentAccount, contractOwner),
          // 0,
          tokenURI,
          options
        )
        .then((tr) => {
          console.log(`TransactionResponse TX hash: ${tr.hash}`);
          setStatusText("Generated hash");
          setStatusText("Waiting for transaction to be mined");

          props.sendTxForProposed({
            hash: tr.hash,
            proposedDetails: proposedDetails,
          });
          setTxStatus("success");
          setStatusText(
            "Your payment is being validated and your shirt would be created when the payment is complete"
          );

          setCompleted(true);
        });
    } catch (error) {
      console.log(error);
      setTxStatus("error");
      setStatusText("Transaction cancelled");
    }
  };

  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center">
        <Grid item md={7} xs={12} className={classes.canvasMain}>
          <div className="flex w-full  md:items-start items-center justify-center mb-[-100px] overflow-hidden md:overflow-auto md:mb-0">
            <Paper
              elevation={4}
              className={classes.canvasWrapper}
              ref={canvasRef}>
              <div
                id="tshirt-div"
                className={classes.tshirtDiv}
                style={{
                  backgroundColor: user?.role == "admin" ? "red" : "white",
                }}>
                <img
                  id="tshirt-backgroundpicture"
                  src="https://res.cloudinary.com/z-pro-trading/image/upload/v1662925827/assets/background-image_ofxo72.png"
                  crossOrigin="anonymous"
                  alt="shirt"
                />

                <div id="drawingArea" className={classes.drawingArea}>
                  <div className={classes.canvasContainer}>
                    <div className="flex w-full justify-center">
                      {showLogo &&
                        (user?.role == "admin" && true ? (
                          <img
                            id="logo-backgroundpicture"
                            src="https://res.cloudinary.com/z-pro-trading/image/upload/v1661255716/assets/logo_colored_white_tiha53.png"
                            width="60%"
                            alt="logo"
                          />
                        ) : (
                          <img
                            id="logo-backgroundpicture"
                            src="https://res.cloudinary.com/z-pro-trading/image/upload/v1662926045/assets/logo_colored_walci0.png"
                            width="60%"
                            alt="logo"
                          />
                        ))}
                    </div>

                    <canvas
                      className={classes.canvas}
                      id="canvas"
                      width="200"
                      height="400"></canvas>
                  </div>
                </div>
              </div>
            </Paper>
          </div>
          <Typography
            component="div"
            variant="h6"
            gutterBottom
            className={classes.previewText}>
            Preview
          </Typography>{" "}
        </Grid>
        <Divider
          className={classes.divider}
          sx={{ display: { xs: "block", md: "none" } }}
        />
        <Grid
          item
          md={5}
          xs={12}
          justifyContent="center"
          alignContent="center"
          className={classes.designBarMain}>
          <Paper elevation={4} className={classes.designBar}>
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
              }}></div>
            <div>
              <Typography
                component="div"
                variant="h6"
                gutterBottom
                className={classes.headerText}>
                Design Proposal
              </Typography>
              <Typography
                component="div"
                variant="caption"
                gutterBottom
                className={classes.headerDesc}>
                Upload your desired word or phrase
              </Typography>
              <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="outlined primary button group"
                className={classes.inputBasePaper}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Enter preferred word"
                  fullWidth
                  id="outlined-name"
                  color="primary"
                  type="text"
                  inputProps={{
                    "aria-label": "propose-word/phrase",
                    maxLength: 12,
                  }}
                  value={text}
                  onChange={handleTextChange}
                  required
                />
              </ButtonGroup>
            </div>
            {loggedIn && (
              <div>
                {available && !checkingAvailability && text.length > 3 && (
                  <Typography
                    component="div"
                    variant="caption"
                    gutterBottom
                    className={classes.headerDesc}
                    style={{ color: "green" }}>
                    Available
                  </Typography>
                )}

                {!available && !checkingAvailability && text.length > 3 && (
                  <Typography
                    component="div"
                    variant="caption"
                    gutterBottom
                    className={classes.headerDesc}
                    style={{ color: "red" }}>
                    Not Available
                  </Typography>
                )}

                {!checkingAvailability && text.length <= 3 && (
                  <Typography
                    component="div"
                    variant="caption"
                    gutterBottom
                    className={classes.headerDesc}
                    style={{ color: "red" }}>
                    Enter 2 characters or more
                  </Typography>
                )}

                {checkingAvailability && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ClapSpinner
                      size={8}
                      frontColor="#707070"
                      backColor="#707070"
                      className={classes.spinner}
                    />{" "}
                    <Typography
                      component="div"
                      variant="caption"
                      gutterBottom
                      className={classes.headerDesc}
                      style={{ margin: "0 5px" }}>
                      Checking availability...
                    </Typography>
                  </div>
                )}
              </div>
            )}

            {user?.role === "admin" && loggedIn && (
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center">
                <Grid item>
                  <Typography
                    style={{
                      color: "#707070",
                      fontWeight: "bold",
                      fontSize: ".9em",
                    }}>
                    Display logo
                  </Typography>
                </Grid>
                <Grid item>
                  <ColoredSwitch
                    checked={showLogo}
                    onChange={handleShowLogoChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Grid>
              </Grid>
            )}
            {loggedIn ? (
              <Grid className={classes.finalBtn} sx={{ mt: "30px" }}>
                <SolidButton
                  disabled={!available || text.length < 3}
                  onClick={() => {
                    handleExport();
                  }}>
                  {loading && <span>Proposing</span>}
                  {!loading && <span>Propose</span>}
                </SolidButton>
              </Grid>
            ) : (
              <>
                <div className="mt-12">
                  <div className="bg-primary2/5 border-primary2 border-solid border text-[13px] p-3 rounded-[8px] relative text-textGray font-medium mb-4">
                    To propose a word on a shirt you must first buy a shirt
                    proposed by a previous customer. Please login to continue.
                  </div>
                  <SolidButton
                    onClick={() => router.push("/dashboard/account/login")}>
                    Login to continue
                  </SolidButton>
                </div>
              </>
            )}
          </Paper>
          <div className="my-6 bg-white shadow-paper rounded-[12px] md:rounded-[20px] p-6">
            <Typography
              component="div"
              variant="h6"
              gutterBottom
              className={classes.headerText}>
              Tutorial Video
            </Typography>
            <Typography
              component="div"
              variant="caption"
              gutterBottom
              className={classes.headerDesc}>
              Watch this quick video to learn how to propose
            </Typography>
            {/* <div class="aspect-w-16 aspect-h-9"> */}
            <div className="w-full h-auto mt-3">
              <iframe
                src="https://youtube.com/embed/GpdIpSKLWg0"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                className="w-full h-full rounded-md"></iframe>
            </div>
          </div>
        </Grid>
      </Grid>

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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
            }}>
            <Box className={classes.style}>
              <Paper elevation={24} className={classes.loginbox}>
                <div className="w-full flex justify-between items-center">
                  <div className="text-main text-[18px] md:text-[28px] font-bold font-sora text-primary2">
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
                    </div>
                  )}
                  <div className="mt-4 text-main text-[14px] md:text-[20px] font-semibold text-center font-sora text-primary2">
                    {statusText}
                  </div>
                  {txStatus === "error" && (
                    <div className="w-full flex justify-center items-center my-4 gap-2 md:gap-4">
                      <SolidButton onClick={() => onMintPressed(url)}>
                        Try Again
                      </SolidButton>
                      <OutlinedButton onClick={() => setOrderModal(false)}>
                        Close
                      </OutlinedButton>
                    </div>
                  )}

                  {completed && (
                    <div className="w-full flex justify-center items-center my-4 gap-2 md:gap-4">
                      <SolidButton
                        onClick={() =>
                          router.push("/dashboard/orders?tab=proposed")
                        }>
                        See tokens
                      </SolidButton>
                      <OutlinedButton onClick={() => router.push("/dashboard")}>
                        Go home
                      </OutlinedButton>
                    </div>
                  )}
                </div>
              </Paper>
            </Box>
          </div>
        </>
      </Modal>
    </Container>
  );
};

function mapState(state) {
  const { user } = state.users;
  const { loggedIn } = state.login;
  const { tokens, loading, proposedToken, userOriginal } = state.token;
  const { proposedStatus, proposedError } = state.orders;
  console.log(loading);
  return {
    tokens,
    loading,
    loggedIn,
    user,
    proposedToken,
    userOriginal,
    proposedStatus,
    proposedError,
  };
}

const actionCreators = {
  getUser: userActions.getUser,
  createOriginalAdminToken: tokenActions.createOriginalAdminToken,
  createProposedToken: tokenActions.createProposedToken,
  sendTxForProposed: orderActions.sendTxForProposed,
};

const connectedDesignPage = connect(mapState, actionCreators)(DesignPage);
export default connectedDesignPage;
