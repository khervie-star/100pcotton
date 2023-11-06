/* eslint-disable react-hooks/exhaustive-deps */

import { makeStyles, styled } from "@mui/styles";
import { useRouter } from "next/router";
import * as React from "react";
import CanvasRender from "../../../../Components/canvasRender";

import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";
import { Swiper, SwiperSlide } from "swiper/react";
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
} from "../../../../Components/Buttons";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import toast from "react-hot-toast";
import {
  IoArrowBack,
  IoArrowBackCircle,
  IoArrowBackOutline,
} from "react-icons/io5";
import { useWallet } from "../../../../Provider/WalletContext";

const selected =
  "bg-primary2 text-white border-none shadow-[-4px_-4px_4px_0px_#0000001A_inset]";

const notSelected =
  "bg-transparent border-2 border-solid border-primary2  text-primary2";

function BuyReplica(props) {
  const [sizePicked, setSizePicked] = React.useState(false);
  const [color, setColor] = React.useState({
    logoColor: "white",
    shiteColor: "red",
  });
  // const [size, setSize] = React.useState("medium");
  const [quantity, setQuantity] = React.useState(1);

  // const [userId, setUserId] = React.useState("");

  const [instantBuy, setInstantBuy] = React.useState(false);

  const router = useRouter();
  const handlePin = React.useRef(null);

  const [size, setSize] = React.useState(null); // Initialize size state as null

  const handleSizeClick = (selectedSize) => {
    setSize(selectedSize); // Update size state when user clicks a size button
    setSizePicked(true);
  };

  const {
    query: { id },
  } = router;

  let userId = authTokenService.getUserId();
  React.useEffect(() => {
    props.getSingleAdmin(id);
  }, [id]);

  const {
    loading,
    singleAdminToken,
    addedToCart,
    ethPrice,
    fetching,
    loggedIn,
  } = props;

  const { wallet, connectWallet, connectingWallet, disconnectWallet } =
    useWallet();

  const handleBuyReplica = async () => {
    if (sizePicked) {
      setInstantBuy(true);
      if (wallet.isConnected) {
        const getPinnedImageUrL = await handlePin.current();
        console.log(getPinnedImageUrL);

        if (getPinnedImageUrL) {
          const { shirtImage } = getPinnedImageUrL;
          const { logoDisplayUrl } = getPinnedImageUrL;

          props.addData({
            shirtImage,
            logoDisplayUrl,
            singleAdminToken,
            color,
            quantity,
            size,
          });
          router.push("/dashboard/o/checkout");
        } else {
          setInstantBuy(false);
        }
      } else {
        toast.error("Please connect to metamask");
        setInstantBuy(false);
      }
      setInstantBuy(false);
    } else {
      toast("Please select a shirt size");
    }
  };

  const handleBackToPreviousPage = () => {
    router.back();
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
                  name={singleAdminToken?.nftName}
                  token={singleAdminToken}
                  logo={singleAdminToken?.logo}
                />
              </div>
            </div>
          </div>

          <div className="basis-full md:basis-1/3">
            <div className="flex flex-col gap-4">
              <div className="w-full rounded-[12px] md:rounded-20px] bg-white p-4 md:p-6 flex justify-between items-center">
                <div className="text-[21px] md:text-[28px] font-bold text-primary2 w-fit border-b-2 border-textGray">
                  {singleAdminToken?.nftName}
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
                          {(
                            parseFloat(singleAdminToken?.price) /
                            parseFloat(singleAdminToken?.coinRate)
                          ).toFixed(3)}{" "}
                        </h5>
                        <div className="text-[14px] ml-2 font-medium ">
                          MATIC
                        </div>
                      </div>
                      <div>
                        <div className="text-[#fffafa] font-medium text-[14px]">
                          ${singleAdminToken?.price}{" "}
                        </div>
                      </div>
                    </div>
                  )}
                </SolidButton>
              </div>

              <div className="w-full rounded-[12px] md:rounded-20px] bg-white p-4 md:p-6">
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
                <div className="flex flex-col ">
                  <p className="text-primary2 font-bold font-sora text-[18px] md:text-[20px] mb-2">
                    Description:
                  </p>
                  <p className="text-textGray font-light text-base">
                    {singleAdminToken?.description}
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
  const { loading, singleAdminToken } = state.token;
  const { addingToCart, addedToCart, fetching } = state.users;
  return {
    loading,
    singleAdminToken,
    addingToCart,
    addedToCart,
    fetching,
    loggedIn,
  };
}

const actionCreators = {
  getSingleAdmin: tokenActions.getSingleAdmin,
  createTokenReplica: tokenActions.createTokenReplica,
  createCart: userActions.createCart,
  addData: tempDataActions.addData,
};

const connectedBuyReplicaPage = connect(mapState, actionCreators)(BuyReplica);
export default withAuth(connectedBuyReplicaPage);
