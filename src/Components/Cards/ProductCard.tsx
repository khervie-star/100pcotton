/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import Favorite from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import _ from "lodash";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { tokenActions } from "../../redux/actions";
// import CustomLoadingButton from "../customLoadingButton";
// import { JwtParser } from "../../helpers";
import authTokenService from "../../services/authToken.service";
import { SolidButton } from "../Buttons";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ProductCard(props: any) {
  const router = useRouter();
  const [liked, setLiked] = React.useState(false);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [nftId, setNFTTokenId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");
  const [tokenDescription, setTokenDescription] = React.useState("");

  const handleBuyToken = () => {
    router.push(`/dashboard/r/product/${tokenId}`);
  };

  React.useEffect(() => {
    !props
      ? null
      : (setTokenName(props.token.nftName),
        setTokenId(props.token._id),
        setNFTTokenId(props.token.tokenId),
        setTokenDescription(props.token?.description),
        setTokenImage(props.token.DesignUrl));
  }, [props]);

  React.useEffect(() => {
    if (loggedIn) {
      setLiked(_.includes(props.token.likes, authTokenService.getUserId()));
    } else {
      setLiked(false);
    }
  }, []);

  const AddToFavorites = () => {
    if (!loggedIn) {
      toast("You are not loggedin");
    } else {
      props.addToFavorites(tokenId);
      setLiked(!liked);
    }
  };

  const { loggedIn } = props;

  return (
    <React.Fragment>
      <div className="w-full m-0 md:my-8">
        <div className="shadow-paper p-2 md:p-[14px] rounded-[1em] md:rounded-[1.5em] relative w-full h-full">
          <div className="bg-transparent w-full h-3/4 relative  ">
            <div className="absolute bottom-2  right-2 bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] text-[0.75em] font-semibold shadow-lg flex place-content-center items-center w-[20px] h-[20px]  rounded-full">
              {props?.token?.isOriginal && "O"}
              {!props?.token?.isOriginal && "P"}
            </div>
            <img
              src={!tokenImage ? "/static/front_shirt.png" : tokenImage}
              alt="product"
              width="100%"
            />
          </div>
          <div>
            <div className="font-bold text-[16px] md:text-[18px] text-primary2 font-sora">
              {tokenName}
            </div>
            <div className="font-light text-[12px] text-textGray font-sora">
              {tokenDescription}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center gap-3 relative py-4 px-2">
          <div className="w-9/12">
            {/* <CustomLoadingButton onClick={handleBuyToken}>
              Mint
            </CustomLoadingButton> */}
            <SolidButton onClick={handleBuyToken}>Mint</SolidButton>
          </div>

          <div className="w-3/12">
            <IconButton
              aria-labelledby="like"
              className="bg-gradient-to-b from-[#B22222] via-[#820D06] to-[#820D06] w-[1.5em] h-[1.5em] text-[1.8em] shadow-paper  hover:bg-[#b22222]"
              onClick={AddToFavorites}>
              <Checkbox
                checked={liked}
                {...label}
                icon={
                  <Favorite fontSize="small" style={{ color: "#fafafa" }} />
                }
                checkedIcon={
                  <Favorite className="text-[#F1BC31] text-[14px]" />
                }
              />
            </IconButton>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function mapState(state: any) {
  const { loggedIn } = state.login;
  return { loggedIn };
}

const actionCreators = {
  addToFavorites: tokenActions.addToFavorites,
};

const connectedProductCard = connect(mapState, actionCreators)(ProductCard);
export default connectedProductCard;
