/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import { JwtParser } from "../../helpers";
import { tokenActions } from "../../redux/actions";
import authTokenService from "../../services/authToken.service";
import { SolidButton } from "../Buttons";
import { LoginModal } from "../auth/LoginModal";

function BidProductCard(props: any) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [tokenImage, setTokenImage] = React.useState("");

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    !props
      ? null
      : (setTokenName(
          props?.token?.tokenId?.nftName || props?.token?.originalId?.nftName
        ),
        setTokenId(props?.token?._id),
        setTokenImage(
          props?.token?.tokenId?.DesignUrl ||
            props?.token?.originalId?.DesignUrl
        ));
  }, []);

  const handlePlaceBid = () => {
    const auctionerId = props?.token?.user?._id;
    const userId = authTokenService.getUserId();
    console.log(userId === auctionerId);
    if (userId === auctionerId) {
      toast.error(
        "You cannot place a bid to an auction you created, Please try another"
      );
    } else {
      if (!!props?.token?.originalId) {
        router.push(`/dashboard/auctions/${props.token._id}/o/place-bid/`);
      } else {
        router.push(`/dashboard/auctions/${props.token._id}/r/place-bid/`);
      }
    }
  };

  const handleLoginPopup = () => {
    openModal();
  };

  const { loggedIn } = props;

  return (
    <React.Fragment>
      <div className="h-full">
        <div className="shadow-paper bg-white p-2 md:p-4  rounded-[1.2em] md:rounded-[2em] w-full">
          <div className="bg-white h-3/4 w-full">
            <img src={tokenImage} alt="product" width="100%" />
          </div>
          <div className="h-1/4 p-2">
            <div className="font-bold text-[16px] md:text-[18px] text-primary2 font-sora">
              {tokenName}
            </div>

            {!!props?.token?.tokenId?.noOfSales ? (
              <div className="font-normal text-[0.75em] text-gray mt-2 flex gap-1  items-center">
                <div className="font-light text-[0.7em] md:text-[12px]">
                  Total sales:
                </div>

                <div className="text-primary text-[9px]">$</div>
                <div className="font-bold text-yellow flex gap-2 items-center">
                  {props?.token?.tokenId?.noOfSales * 35}
                </div>
              </div>
            ) : (
              <div className="font-normal text-[0.75em] text-gray mt-2 flex gap-1  items-center">
                <div className="font-light text-[0.7em] md:text-[12px]">
                  Total sales:
                </div>

                <div className="text-primary text-[9px]">$</div>
                <div className="font-bold text-yellow flex gap-2 items-center">
                  0
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex justify-center my-4">
          {/* <button
            className="btn-primary text-[13px] m:text-[16px]"
            onClick={handlePlaceBid}>
            Place Bid
          </button> */}
          {loggedIn ? (
            <SolidButton onClick={handlePlaceBid}> Place Bid</SolidButton>
          ) : (
            <SolidButton onClick={openModal}>Login to place Bid</SolidButton>
          )}
        </div>
      </div>
      <LoginModal isOpen={isModalOpen} handleClose={closeModal}>
        <h2 className="text-xl font-bold mb-4">Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close</button>
      </LoginModal>
    </React.Fragment>
  );
}

function mapState(state: any) {
  const { loggedIn } = state.login;
  console.log();
  return { loggedIn };
}

const actionCreators = {
  addToFavorites: tokenActions.addToFavorites,
};

const connectedBidProductCard = connect(
  mapState,
  actionCreators
)(BidProductCard);
export default connectedBidProductCard;
