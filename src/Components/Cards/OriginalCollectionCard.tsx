/* eslint-disable @next/next/no-img-element */

import { Avatar, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import { JwtParser } from "../../helpers";
import { userService } from "../../services";
// import CustomLoadingButton from "../customLoadingButton";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import TaskTwoToneIcon from "@mui/icons-material/TaskTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Image from "next/image";
import authTokenService from "../../services/authToken.service";
import { SolidButton } from "../Buttons";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function OriginalCollectonsCard(props: any) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  // const [userId, setUserId] = React.useState("");
  const [nftId, setNFTTokenId] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");
  const [auctionState, setAuctionState] = React.useState();
  const [tokenDescription, setTokenDescription] = React.useState("");

  const handleProposeWithOriginal = () => {
    router.push(`/dashboard/propose-shirt/${tokenId}?token=${nftId}`);
  };

  const handleAuction = () => {
    router.push(`/dashboard/auctions/setup/o/${tokenId}`);
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

  const { loggedIn } = props;

  return (
    <React.Fragment>
      <div className="m-0 md:my-8">
        <div className="shadow-paper p-2 md:p-[14px] rounded-[1em] md:rounded-[1.5em] relative w-full h-full">
          <div className="bg-[transparent] w-full h-3/4 relative  ">
            <div className="absolute bottom-2  right-2 bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] text-[0.75em] font-semibold shadow-lg flex place-content-center items-center w-[20px] h-[20px]  rounded-full">
              O
            </div>
            <img
              src={!tokenImage ? "/static/front_shirt.png" : tokenImage}
              alt="product"
              width="100%"
            />
          </div>
          <div className="my-4">
            <div className="font-bold text-[16px] md:text-[18px] text-primary2 font-sora">
              {tokenName}
            </div>
            <div className="font-light text-[12px] text-textGray font-sora">
              {tokenDescription}
            </div>
          </div>
          {props?.token?.isPropose && true && (
            <div className="flex justify-start gap-2 text-[14px] my-2">
              <div className="text-[#707070] font-semibold">Proposed</div>
              <AssignmentTurnedInTwoToneIcon fontSize="small" />
            </div>
          )}

          {props?.auctioned && true && (
            <div className="flex items-center justify-between w-full">
              <div className="text-[#707070] text-[10px] md:text-[14px] font-semibold">
                Auctioned{" "}
                <Image
                  src="/static/icons8-sand-timer.gif"
                  width={10}
                  height={10}
                  alt=""
                  style={{ margin: "0 3px" }}
                />
              </div>
              <IconButton
                color="primary"
                onClick={() => router.push("/dashboard/auctions/me")}>
                <SettingsRoundedIcon />
              </IconButton>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-6 my-6 w-full">
          {!props?.token?.isPropose && true && (
            <SolidButton
              onClick={() => {
                handleProposeWithOriginal();
              }}
              disabled={props.token?.isPropose}>
              {props.token?.isPropose && <span>Proposed</span>}
              {!props.token?.isPropose && <span>Propose</span>}
            </SolidButton>
          )}

          {/* {!props?.auctioned && true && (
            <SolidButton
              onClick={() => {
                handleAuction();
              }}
              disabled={props?.auctioned}>
              {props?.auctioned && <span>Auctioned</span>}
              {!props?.auctioned && <span>Auction</span>}
            </SolidButton>
          )} */}
        </div>
      </div>
    </React.Fragment>
  );
}

function mapState(state: any) {
  const { loggedIn } = state.login;
  return { loggedIn };
}
const connectedOriginalCollectonsCard = connect(mapState)(
  OriginalCollectonsCard
);
export default connectedOriginalCollectonsCard;
