/* eslint-disable react-hooks/exhaustive-deps */

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import LoadingButton from "@mui/lab/LoadingButton";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import { makeStyles, styled } from "@mui/styles";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";
import domtoimage from "dom-to-image";
import { Swiper, SwiperSlide } from "swiper/react";
import CanvasRender from "../../../../Components/canvasRender";
import { JwtParser } from "../../../../helpers";
import withAuth from "../../../../helpers/withAuth";
import useWeb3 from "../../../../hooks/web3js/web3context";
import {
  tempDataActions,
  tokenActions,
  userActions,
} from "../../../../redux/actions";
import authTokenService from "../../../../services/authToken.service";
import {
  SolidButton,
  SolidGrayButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
  SolidYellowButton,
} from "../../../../Components/Buttons";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import { IoArrowBackCircle, IoArrowBackOutline } from "react-icons/io5";

const uploadImage = (fileBlob, text) => {
  const data = new FormData();

  data.append("file", fileBlob, `${text}.png`);

  data.append("upload_preset", "100nft");

  data.append("cloud_name", "z-pro-trading");

  return fetch(" https://api.cloudinary.com/v1_1/z-pro-trading/image/upload", {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      return data.secure_url;
    })
    .catch((err) => console.log(err));
};

const selected =
  "bg-primary2 text-white border-none shadow-[-4px_-4px_4px_0px_#0000001A_inset]";

const notSelected =
  "bg-transparent border-2 border-solid border-primary2  text-primary2";

function BuyReplica(props) {
  const [color, setColor] = React.useState({
    logoColor: "red",
    shiteColor: "white",
  });
  const [colorPicked, setColorPicked] = React.useState(false);
  const [sizePicked, setSizePicked] = React.useState(false);
  const [size, setSize] = React.useState(null); // Initialize size state as null
  const [quantity, setQuantity] = React.useState(1);

  const [replicaUrl, setReplicaUrl] = React.useState("");
  const [addingToCart, setAddingToCart] = React.useState(false);
  const [instantBuy, setInstantBuy] = React.useState(false);

  const router = useRouter();
  const handlePin = React.useRef(null);
  const sliderRef = React.useRef();
  const swiperRef = React.useRef(null);
  const mobileSwiperRef = React.useRef(null);

  const toastId = React.useRef(null);

  const {
    query: { id },
  } = router;

  const handleColorClick = (newColor) => {
    if (newColor !== null) {
      setColor(newColor);
      setColorPicked(true);
    }
  };

  const handleSizeClick = (selectedSize) => {
    setSize(selectedSize); // Update size state when user clicks a size button
    setSizePicked(true);
  };

  let userId = authTokenService.getUserId();
  React.useEffect(() => {
    props.getSingleProposedToken(id);
  }, [id]);

  const { loading, singleToken, addedToCart, ethPrice, fetching, loggedIn } =
    props;

  console.log(size);

  const handleBuyReplica = async () => {
    if (colorPicked && sizePicked) {
      setInstantBuy(true);
      // if (ethBalance) {
      const getPinnedImageUrL = await handlePin.current(null);
      console.log(getPinnedImageUrL);
      setReplicaUrl(getPinnedImageUrL);

      const { shirtImage, logoDisplayUrl } = getPinnedImageUrL;
      console.log(shirtImage, logoDisplayUrl);

      props.addData({
        shirtImage,
        logoDisplayUrl,
        singleToken,
        color,
        quantity,
        size,
      });
      router.push("/dashboard/r/checkout");
      // } else {
      //   toast.error("Please connect to metamask");
      //   setInstantBuy(false);
      // }
      setInstantBuy(false);
    } else {
      toast("Please choose a shirt color and a shirt size");
    }
  };

  const handleBackToPreviousPage = () => {
    router.back();
  };

  const toSlide = (num) => {
    swiperRef.current?.swiper.slideTo(num);
    mobileSwiperRef.current?.swiper.slideTo(num);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex flex-col md:flex-row items-start justify-center gap-4 md:gap-8">
          <div className="w-full md:w-2/3 ">
            <div className="mb-3">
              <SolidOrangeButton onClick={handleBackToPreviousPage}>
                <IoArrowBackCircle />
                Back
              </SolidOrangeButton>
              {/* <SolidYellowButton>Back</SolidYellowButton>
              <SolidGrayButton>Back</SolidGrayButton> */}
            </div>
            <div className="w-full h-[400px] md:h-full bg-white shadow-paper rounded-[12px] md:rounded-20px] p-4 flex items-center justify-center overflow-hidden relative mb-3 ">
              {/* <div
                className="back-button hover:cursor-pointer absolute top-3 left-3"
                onClick={handleBackToPreviousPage}>
                <div className="flex gap-2 items-center">
                  <IoArrowBackCircle />
                  <p className="text-[14px] font-bold text-secondaryBlack font-poppins">
                    Back
                  </p>
                </div>
              </div> */}
              <div className="scale-[0.675] md:scale-100 ">
                <CanvasRender
                  color={color}
                  handlePin={handlePin}
                  name={singleToken?.nftName}
                  token={singleToken}
                  logo={true}
                />
              </div>
            </div>
          </div>

          <div className="basis-full md:basis-1/3">
            <div className="flex flex-col gap-4">
              <div className="w-full rounded-[12px] md:rounded-20px] bg-white p-4 md:p-6 flex justify-between items-center">
                <div className="text-[21px] md:text-[28px] font-bold text-primary2 w-fit border-b-2 border-textGray">
                  {singleToken?.nftName}
                </div>

                <SolidButton>
                  {fetching && (
                    <div style={{ display: "flex" }}>
                      <ClapSpinner
                        size={16}
                        frontColor="#707070"
                        backColor="#707070"
                        className={classes.spinner}
                      />
                    </div>
                  )}

                  {!fetching && (
                    <div className="flex flex-col justify-center gap-1">
                      <div className="flex justify-center items-center">
                        <h5 className="text-[#F1BC31] font-semibold text-[18px]">
                          {(35 / parseFloat(singleToken?.coinRate)).toFixed(3)}{" "}
                        </h5>
                        <div className="text-[12px] ml-2 font-medium ">
                          MATIC
                        </div>
                      </div>
                      <div>
                        <div className="text-[#fffafa] font-medium text-[14px]">
                          {/* ${singleToken?.price}{" "} */}
                          $35
                        </div>
                      </div>
                    </div>
                  )}
                </SolidButton>
              </div>

              <div className="w-full rounded-[12px] md:rounded-20px] bg-white p-4 md:p-6 mb-6">
                <div className="flex flex-col mb-6">
                  <p className="text-primary2 font-bold font-sora text-[18px] md:text-[20px] mb-6">
                    Select size:
                  </p>
                  <div className="flex justify-start flex-wrap gap-3 md:gap-4">
                    <button
                      className={` p-2 rounded-[12px] font-sora font-semibold w-14 md:w-20 flex justify-center items-center py-3 ${
                        size === "S" ? selected : notSelected
                      }`}
                      onClick={() => handleSizeClick("S")}>
                      S
                    </button>
                    <button
                      className={` p-2 rounded-[12px] font-sora font-semibold  w-14 md:w-20  flex justify-center items-center py-3 ${
                        size === "M" ? selected : notSelected
                      }`}
                      onClick={() => handleSizeClick("M")}>
                      M
                    </button>
                    <button
                      className={` p-2 rounded-[12px] font-sora font-semibold  w-14 md:w-20  flex justify-center items-center py-3 ${
                        size === "L" ? selected : notSelected
                      }`}
                      onClick={() => handleSizeClick("L")}>
                      L
                    </button>
                    <button
                      className={` p-2 rounded-[12px] font-sora font-semibold  w-14 md:w-20 flex justify-center items-center py-3 ${
                        size === "XL" ? selected : notSelected
                      }`}
                      onClick={() => handleSizeClick("XL")}>
                      XL
                    </button>
                    <button
                      className={` p-2 rounded-[12px] font-sora font-semibold  w-14 md:w-20 flex justify-center items-center py-3 ${
                        size === "XXL" ? selected : notSelected
                      }`}
                      onClick={() => handleSizeClick("XXL")}>
                      XXL
                    </button>
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <p className="text-primary2 font-bold font-sora text-[18px] md:text-[20px] mb-6">
                    Select color:
                  </p>
                  <div className="flex justify-start flex-wrap gap-3 md:gap-4">
                    {singleToken?.colors?.map((value, i) => (
                      <button
                        key={i}
                        className={` p-2 rounded-[12px] font-sora font-semibold w-14 md:w-20 flex justify-center items-center py-3 ${
                          color === value ? selected : notSelected
                        }`}
                        onClick={() => handleColorClick(value)}>
                        {value.shiteColor[0].toUpperCase() +
                          value.shiteColor.substring(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <p className="text-primary2 font-bold font-sora text-[18px] md:text-[20px] mb-2">
                    Description:
                  </p>
                  <p className="text-textGray font-light text-base">
                    {singleToken?.description}
                  </p>
                </div>
                <div className="w-full justify-center mt-8">
                  {loggedIn ? (
                    <SolidOrangeButton onClick={() => handleBuyReplica()}>
                      {instantBuy && <span>Minting...</span>}
                      {!instantBuy && <span>Mint</span>}
                    </SolidOrangeButton>
                  ) : (
                    <div>
                      <SolidGrayButton
                        onClick={() => router.push("/dashboard/account/login")}>
                        Login
                      </SolidGrayButton>
                      <p className="text-secondaryBlack text-[12px] font-light font-inter mt-4">
                        You must be logged in to make a purchase. This is to
                        track who owns what words to send notifications
                        appropriately.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function mapState(state) {
  const { loggedIn } = state.login;
  const { loading, singleToken } = state.token;
  const { addingToCart, addedToCart, fetching } = state.users;
  console.log(singleToken, state, addingToCart);
  return {
    loading,
    singleToken,
    addingToCart,
    addedToCart,
    fetching,
    loggedIn,
  };
}

const actionCreators = {
  getSingleProposedToken: tokenActions.getSingleProposedToken,
  createTokenReplica: tokenActions.createTokenReplica,
  createCart: userActions.createCart,
  addData: tempDataActions.addData,
};

const connectedBuyReplicaPage = connect(mapState, actionCreators)(BuyReplica);
export default connectedBuyReplicaPage;
