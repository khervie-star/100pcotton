import { auctionConstants } from '../../utility/constants';

export function auction(state = {}, action) {
  switch (action.type) {
    case auctionConstants.GETALL_AUCTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case auctionConstants.GETALL_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        auctions: action.auctions
      };
    case auctionConstants.GETALL_AUCTION_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case auctionConstants.GETSINGLE_AUCTION_REQUEST:
      return {
        ...state,
        gettingSingleAuction: true
      };
    case auctionConstants.GETSINGLE_AUCTION_SUCCESS:
      return {
        ...state,
        gettingSingleAuction: false,
        singleAuction: action.singleAuction,
      };
    case auctionConstants.GETSINGLE_AUCTION_FAILURE:
      return {
        ...state,
        gettingSingleAuction: false,
        error: action.error,
      };

    case auctionConstants.GETBIDS_AUCTION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case auctionConstants.GETBIDS_AUCTION_SUCCESS:
      return {
        ...state,
        items: action.users
      };
    case auctionConstants.GETBIDS_AUCTION_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case auctionConstants.GETAUCTION_BIDS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case auctionConstants.GETAUCTION_BIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        auctionBids: action.auctionBids
      };
    case auctionConstants.GETAUCTION_BIDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    case auctionConstants.GET_SINGLE_BID_REQUEST:
      return {
        ...state,
        loading: true
      };
    case auctionConstants.GET_SINGLE_BID_SUCCESS:
      return {
        ...state,
        loading: false,
        singleBid: action.singleBid
      };
    case auctionConstants.GET_SINGLE_BID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };




    case auctionConstants.CREATE_AUCTION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case auctionConstants.CREATE_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        auction: action,
      };
    case auctionConstants.CREATE_AUCTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };


    case auctionConstants.PLACEBID_AUCTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case auctionConstants.PLACEBID_AUCTION_SUCCESS:
      return {
        ...state,
        loading: false,
        bid: action.bid
      };
    case auctionConstants.PLACEBID_AUCTION_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case auctionConstants.SEND_BIDWINNER_MAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case auctionConstants.SEND_BIDWINNER_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        bidEmail: action.bidEmail
      };
    case auctionConstants.SEND_BIDWINNER_MAIL_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case auctionConstants.SEND_BIDWINNER_O_MAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case auctionConstants.SEND_BIDWINNER_O_MAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        notified: action.notified
      };
    case auctionConstants.SEND_BIDWINNER_O_MAIL_FAILURE:
      return {
        ...state,
        error: action.error


      }; case auctionConstants.COlLECT_TOKEN_HASH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case auctionConstants.COLLECT_TOKEN_HASH_SUCCESS:
      return {
        ...state,
        loading: false,
        hashResponse: action.hashResponse
      };
    case auctionConstants.COLLECT_TOKEN_HASH_FAILURE:
      return {
        ...state,
        error: action.error
      };







    case auctionConstants.DELETE_AUCTION_REQUEST:
      return {
        loading: true
      };
    case auctionConstants.DELETE_AUCTION_SUCCESS:
      return {
        loading: false,
        deleted: action.deleted
      };
    case auctionConstants.DELETE_AUCTION_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}
