/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { Avatar, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { JwtParser } from "../../helpers";
import useWeb3 from "../../hooks/web3js/web3context";
import { tokenActions } from "../../redux/actions";
import { userService } from "../../services";
// import CustomLoadingButton from "../customLoadingButton";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import _ from "lodash";

import AssignmentTurnedInTwoToneIcon from "@mui/icons-material/AssignmentTurnedInTwoTone";
import authTokenService from "../../services/authToken.service";
import { SolidButton } from "../Buttons";

const HtmlTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#fffafa",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid rgba(226, 88, 34, .5)",
    borderRadius: "12px",
  },
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function ReplicaProductCard(props: any) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [nftId, setNFTTokenId] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");
  const [auctionState, setAuctionState] = React.useState();
  const [tokenDescription, setTokenDescription] = React.useState("");

  const handlePropose = () => {
    router.push(`/dashboard/propose-shirt/${tokenId}?token=${nftId}`);
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

  console.log(props?.cannotPropose, props?.token?.isPropose);

  return (
    <React.Fragment>
      <div className="m-0 md:my-8">
        <div className="shadow-paper p-2 md:p-[14px] rounded-[1em] md:rounded-[1.5em] relative w-full h-full">
          <div className="bg-transparent w-full h-3/4 relative  ">
            <div className="absolute bottom-2  right-2 bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] text-[0.75em] font-semibold shadow-lg flex place-content-center items-center w-[20px] h-[20px]  rounded-full">
              R
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

          {props?.cannotPropose && (
            <HtmlTooltip
              title={
                <React.Fragment>
                  {"You cannot make a proposal with the replica of a shirt "}{" "}
                  <b>{"you own or have proposed initially."}</b>{" "}
                  {"You can make more proposals buy buying more shirts"}😉
                </React.Fragment>
              }>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <WarningTwoToneIcon color="warning" fontSize="small" />
              </div>
            </HtmlTooltip>
          )}
        </div>

        {!props?.token?.isPropose && !props?.cannotPropose && (
          <div className="my-4 w-full flex justify-center">
            {/* <CustomLoadingButton
              onClick={handlePropose}
              loading={loading}
              width="75%">
              Propose
            </CustomLoadingButton> */}
            <SolidButton onClick={handlePropose}>Propose</SolidButton>
          </div>
        )}
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

const ConnectedReplicaProductCard = connect(
  mapState,
  actionCreators
)(ReplicaProductCard);
export default ConnectedReplicaProductCard;
