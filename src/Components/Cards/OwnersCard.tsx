/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { Avatar, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
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
import Image from "next/image";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import authTokenService from "../../services/authToken.service";
import { SolidButton } from "../Buttons";

const useStyles = makeStyles((theme: any) => ({
  card: {
    // height: "100%",
    margin: "2em",
    [theme.breakpoints.down("md")]: {
      margin: 0,
      width: "100%",
      height: "100%",
    },
  },
  main: {
    width: "100%",
    height: "80%",
    margin: "0px",
    padding: ".75em",
    borderRadius: "2em",
    position: "relative",
    boxShadow: theme.palette.boxShadow.main,
    [theme.breakpoints.down("md")]: {
      padding: ".5em",
      borderRadius: "1em",
    },
  },
  imageWrapper: {
    background: "transparent",
    borderRadius: "2em 2em 0 0",
    width: "100%",
    height: "75%",
    position: "relative",
    "& img": {
      borderRadius: "1.4em 1.4em 0 0",
    },
  },
  productName: {
    color: theme.palette.text.main,
    fontWeight: "bold",
  },
  isProposed: {
    color: "#707070",
    fontWeight: "bold",
    fontSize: ".75em",
    display: "flex",
    alignItems: "center",
  },
  likeIcon: {
    background: "linear-gradient(180deg, #B22222, #820D06, #7C0A02)",
    backgroundColor: theme.palette.primary.main,
    width: "1.2em",
    height: "1.2em",
    fontSize: "1.8em",
    boxShadow: theme.palette.boxShadow.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  liked: {
    color: theme.palette.dividerYellow.main,
  },
  availableProducts: {
    position: "relative",
    padding: "1em 0.5em",
    display: "flex",
    justifyContent: "flex-end",
  },
  loginbox: {
    padding: "2em",
    width: "100%",
    height: 300,
    position: "relative",
    borderRadius: "1em",
  },
  TAC: {
    color: theme.palette.primary.light,
    fontWeight: "bold",
    fontSize: ".95em",
    marginBottom: "1em",
    "& .MuiTypography-body1": {
      fontWeight: "bold",
      fontSize: ".85em",
    },
  },
  emptyMain: {
    color: theme.palette.buttonBackground.main,
    fontWeight: "bold",
  },
  emptySub: {
    color: theme.palette.text.secondary,
    fontSize: ".875em",
  },
  tag: {
    position: "absolute",
    right: "6%",
    bottom: "6%",
  },
  tagName: {
    background: "linear-gradient(180deg, #E25822, #D94D22, #B22222)",
    color: "#fafafa",
    fontSize: ".75em",
    fontWeight: "bold",
    boxShadow: theme.palette.boxShadow.main,
  },
}));

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  // bgcolor: "background.paper",
  borderRadius: "1em",
  // boxShadow: 24,
  p: 4,
};

function OwnerCard(props: any) {
  const router = useRouter();
  const classes = useStyles();
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

  const handleAuction = () => {
    router.push(`/dashboard/auctions/setup/p/${tokenId}`);
  };

  // React.useEffect(() => {
  //   if (userService.userValue) {
  //     setUserId(authTokenService.getUserId());
  //   }
  // }, []);

  React.useEffect(() => {
    !props
      ? null
      : (setTokenName(props.token.nftName),
        setTokenId(props.token._id),
        setNFTTokenId(props.token.tokenId),
        setTokenDescription(props.token?.description),
        setTokenImage(props.token.DesignUrl));
  }, [props]);

  if (props?.auctions) {
    const auctionsArray = props?.auctions;
    const isInArray = auctionsArray.find((e: any) => e.tokenId === tokenId);
    const auctioned = !!isInArray;
  }

  const { loggedIn } = props;
  console.log(props?.auctioned);

  return (
    <React.Fragment>
      <div className="m-0 md:my-8">
        <div className="shadow-paper p-2 md:p-[14px] rounded-[1em] md:rounded-[1.5em] relative w-full h-full">
          <div className="bg-transparent w-full h-3/4 relative  ">
            <div className="absolute bottom-2  right-2 bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] text-[0.75em] font-semibold shadow-lg flex place-content-center items-center w-[20px] h-[20px]  rounded-full">
              P
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
          {props?.auctioned && true && (
            <div className="flex items-center justify-between w-full">
              <div className="flex justify-start items-center text-[#707070] text-[14px]">
                Placed on Auctions
                <Image
                  src="/static/icons8-sand-timer.gif"
                  width={14}
                  height={14}
                  alt=""
                  style={{ margin: "0 3px" }}
                />
              </div>
              <IconButton onClick={() => router.push("/dashboard/auctions/me")}>
                <SettingsRoundedIcon />
              </IconButton>
            </div>
          )}
        </div>

        {!props?.auctioned && true && (
          <div className="my-4 w-full flex justify-center">
            <SolidButton onClick={handleAuction}>Auction</SolidButton>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

function mapState(state: any) {
  // const { token } = state;
  const { loggedIn } = state.login;
  // const { tokens } = token;
  return { loggedIn };
}

const actionCreators = {
  addToFavorites: tokenActions.addToFavorites,
};

const connectedOwnerCard = connect(mapState, actionCreators)(OwnerCard);
export default connectedOwnerCard;
