import Router from "next/router";
import toast from "react-hot-toast";
import { auctionService } from "../../services";
import { auctionConstants } from "../../utility/constants";

export const auctionActions = {
  createAuction,
  auctionOriginal,
  getAllAuction,
  getSingleAuction,
  placeBid,
  getBids,
  getSingleBid,
  getAuctionBids,
  sendMailToAuctionWinner,
  sendMailToAuctionWinnerForOriginal,
  collectTokenHash,
  deleteAuction,
};

// GET
function getAllAuction() {
  return (dispatch) => {
    dispatch(request());

    auctionService.getAllAuction().then(
      (auctions) => dispatch(success(auctions)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: auctionConstants.GETALL_AUCTION_REQUEST };
  }
  function success(auctions) {
    return { type: auctionConstants.GETALL_AUCTION_SUCCESS, auctions };
  }
  function failure(error) {
    return { type: auctionConstants.GETALL_AUCTION_FAILURE, error };
  }
}

function getSingleAuction(id) {
  return (dispatch) => {
    dispatch(request());

    auctionService.getSingleAuction(id).then(
      (singleAuction) => dispatch(success(singleAuction)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: auctionConstants.GETSINGLE_AUCTION_REQUEST };
  }
  function success(singleAuction) {
    return { type: auctionConstants.GETSINGLE_AUCTION_SUCCESS, singleAuction };
  }
  function failure(error) {
    return { type: auctionConstants.GETSINGLE_AUCTION_FAILURE, error };
  }
}

function getBids() {
  return (dispatch) => {
    dispatch(request());

    auctionService.getBids().then(
      (users) => dispatch(success(users)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: auctionConstants.GETBIDS_AUCTION_REQUEST };
  }
  function success(users) {
    return { type: auctionConstants.GETBIDS_AUCTION_SUCCESS, users };
  }
  function failure(error) {
    return { type: auctionConstants.GETBIDS_AUCTION_FAILURE, error };
  }
}

function getSingleBid(bidId) {
  return (dispatch) => {
    dispatch(request(bidId));

    auctionService.getSingleBid(bidId).then(
      (singleBid) => dispatch(success(singleBid)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request(bidId) {
    return { type: auctionConstants.GET_SINGLE_BID_REQUEST, bidId };
  }
  function success(singleBid) {
    return { type: auctionConstants.GET_SINGLE_BID_SUCCESS, singleBid };
  }
  function failure(error) {
    return { type: auctionConstants.GET_SINGLE_BID_FAILURE, error };
  }
}

// POST
function createAuction(auctionDetails) {
  return (dispatch) => {
    dispatch(request(auctionDetails));
    const createAuctionToast = toast.loading("Creating...");

    auctionService.createAuction(auctionDetails).then(
      (auction) => {
        dispatch(success(auction));
        toast.success(
          "Auction created successfully, check your profile for details",
          { id: createAuctionToast }
        );
        Router.push("/dashboard/user/profile");
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, { id: createAuctionToast });
      }
    );
  };

  function request(auction) {
    return { type: auctionConstants.CREATE_AUCTION_REQUEST, auction };
  }
  function success(auction) {
    return { type: auctionConstants.CREATE_AUCTION_SUCCESS, auction };
  }
  function failure(error) {
    return { type: auctionConstants.CREATE_AUCTION_FAILURE, error };
  }
}

function auctionOriginal(auctionDetails) {
  return (dispatch) => {
    dispatch(request(auctionDetails));
    const createAuctionToast = toast.loading("Creating...");

    auctionService.auctionOriginal(auctionDetails).then(
      (auction) => {
        dispatch(success(auction));
        toast.success(
          "Auction created successfully, check your profile for details",
          { id: createAuctionToast }
        );
        Router.push("/dashboard/user/profile");
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, { id: createAuctionToast });
      }
    );
  };

  function request(auction) {
    return { type: auctionConstants.CREATE_AUCTION_REQUEST, auction };
  }
  function success(auction) {
    return { type: auctionConstants.CREATE_AUCTION_SUCCESS, auction };
  }
  function failure(error) {
    return { type: auctionConstants.CREATE_AUCTION_FAILURE, error };
  }
}

function placeBid(auctionDetails, auctionId) {
  return (dispatch) => {
    dispatch(request(auctionDetails));
    const bidToast = toast.loading("Placing bid...");

    auctionService.placeBid(auctionDetails, auctionId).then(
      (bid) => {
        dispatch(success(bid));
        toast.success("Bid placed successfully", { id: bidToast });
        setTimeout(() => {
          toast("We would notify you once your bid is accepted!");
        }, 1000);
        setTimeout(() => {
          Router.push("/dashboard/auctions/my-bids");
        }, 1000);
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error.error, { id: bidToast });
      }
    );
  };

  function request(bid) {
    return { type: auctionConstants.PLACEBID_AUCTION_REQUEST, bid };
  }
  function success(bid) {
    return { type: auctionConstants.PLACEBID_AUCTION_SUCCESS, bid };
  }
  function failure(error) {
    return { type: auctionConstants.PLACEBID_AUCTION_FAILURE, error };
  }
}

function getAuctionBids() {
  return (dispatch) => {
    dispatch(request());

    auctionService.getAuctionBids().then(
      (auctionBids) => {
        dispatch(success(auctionBids));
      },
      (error) => {
        dispatch(failure(error.toString()));
        console.log(error);
      }
    );
  };

  function request(auctionBids) {
    return { type: auctionConstants.GETAUCTION_BIDS_REQUEST, auctionBids };
  }
  function success(auctionBids) {
    return { type: auctionConstants.GETAUCTION_BIDS_SUCCESS, auctionBids };
  }
  function failure(error) {
    return { type: auctionConstants.GETAUCTION_BIDS_FAILURE, error };
  }
}
    
function sendMailToAuctionWinner(bidId) {
  return (dispatch) => {
    dispatch(request(bidId));
    const bidToast = toast.loading("Sending notice to bid winner...");

    auctionService.sendMailToAuctionWinner(bidId).then(
      (bidEmail) => {
        dispatch(success(bidEmail));
        toast.success("User notified successfully", { id: bidToast });
        // setTimeout(() => {
        //   Router.reload();
        // }, 2000);
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, { id: bidToast });
      }
    );
  };

  function request(bidEmail) {
    return { type: auctionConstants.SEND_BIDWINNER_MAIL_REQUEST, bidEmail };
  }
  function success(bidEmail) {
    return { type: auctionConstants.SEND_BIDWINNER_MAIL_SUCCESS, bidEmail };
  }
  function failure(error) {
    return { type: auctionConstants.SEND_BIDWINNER_MAIL_FAILURE, error };
  }
}

function sendMailToAuctionWinnerForOriginal(bidId) {
  return (dispatch) => {
    dispatch(request(bidId));
    const bidToast = toast.loading("Sending notice to bid winner...");

    auctionService.sendMailToAuctionWinnerForOriginal(bidId).then(
      (notified) => {
        dispatch(success(notified));
        toast.success("Auction winner notified successfully", { id: bidToast });
      },
      (error) => {
        dispatch(failure(error.toString()));
        toast.error(error, { id: bidToast });
      }
    );
  };

  function request(bidId) {
    return { type: auctionConstants.SEND_BIDWINNER_O_MAIL_REQUEST, bidId };
  }
  function success(notified) {
    return { type: auctionConstants.SEND_BIDWINNER_O_MAIL_SUCCESS, notified };
  }
  function failure(error) {
    return { type: auctionConstants.SEND_BIDWINNER_O_MAIL_FAILURE, error };
  }
}

function collectTokenHash(hash) {
  return (dispatch) => {
    dispatch(request(hash));

    auctionService.collectTokenHash(hash).then(
      (hashResponse) => {
        dispatch(success(hashResponse));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(hash) {
    return { type: auctionConstants.COlLECT_TOKEN_HASH_REQUEST, hash };
  }
  function success(hashResponse) {
    return { type: auctionConstants.COLLECT_TOKEN_HASH_SUCCESS, hashResponse };
  }
  function failure(error) {
    return { type: auctionConstants.COLLECT_TOKEN_HASH_FAILURE, error };
  }
}

// DELETE
function deleteAuction(auctionId) {
  return (dispatch) => {
    dispatch(request(auctionId));
    const deleteToast = toast.loading("Deleting auction ");

    auctionService.deleteAuction(auctionId).then(
      (deleted) => {
        dispatch(success(deleted));
        toast.success("Auction deleted successfully!", { id: deleteToast });
        Router.push("/dashboard/auctions/me");
      },
      (error) => {
        dispatch(failure(id, error.toString()));
        toast.error(error, { id: deleteToast });
      }
    );
  };
  function request(deleteAuction) {
    return { type: auctionConstants.DELETE_AUCTION_REQUEST, deleteAuction };
  }
  function success(deleted) {
    return { type: auctionConstants.DELETE_AUCTION_SUCCESS, deleted };
  }
  function failure(id, error) {
    return { type: auctionConstants.DELETE_AUCTION_FAILURE, id, error };
  }
}
