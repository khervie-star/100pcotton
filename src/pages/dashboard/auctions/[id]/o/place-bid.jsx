/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import * as React from "react";

import { connect } from "react-redux";
import { auctionActions, tokenActions } from "../../../../../redux/actions";
import { PolygonIconFilled } from "../../../../../Assets/icons";
import { format, formatDistanceToNow } from "date-fns";
import { BeatLoader } from "react-spinners";
import { BiTimeFive } from "react-icons/bi";
import DashboardLayout from "../../../../../Layouts/DashboardLayout";
import { ArrowLeft } from "@mui/icons-material";
import { SolidButton } from "../../../../../Components/Buttons";

function PlaceBid(props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [bidPrice, setBidPrice] = React.useState("");

  const {
    query: { id },
  } = router;

  const handleBidPriceChage = (event) => {
    setBidPrice(event.target.value);
  };

  // GET TOKEN
  React.useEffect(() => {
    props.getSingleAuction(id);
  }, [id]);

  const placeBid = () => {
    const auctionDetails = new Object();
    auctionDetails.price = bidPrice;

    props.placeBid(auctionDetails, id);
  };

  const { singleAuction, singleAdminReplica } = props;

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex w-full flex-col md:flex-row items-center justify-center gap-8 my-8 md:my-2">
          <div className="w-full md:w-7/12">
            <div className="mb-3">
              <SolidButton onClick={() => router.back()}>
                <ArrowLeft />
                Back
              </SolidButton>
            </div>
            <div className="bg-white w-full flex justify-center shadow-paper rounded-[1em] py-[2em] px-[1em]">
              <img
                src={singleAuction?.originalId?.DesignUrl}
                height="100%"
                alt={singleAuction?.originalId?.nftName}
              />
            </div>
          </div>

          <div className="w-full md:w-5/12">
            <div className="mb-4 rounded-[1.5em] px-4 py-4 bg-white shadow-paper">
              <div className="w-full flex justify-between items-center">
                <div className="text-main text-left font-bold text-[24px] py-[0.2em] border-b-2 border-solid border-yellow">
                  {singleAuction?.originalId?.nftName}
                </div>
                <div className="bg-gradient-to-b from-primary to-[#7c0a02] rounded-[1em] text-center px-6 py-2 flex justify-center items-center">
                  {singleAuction ? (
                    <div>
                      <div className="text-[9px] text-[whitesmoke] w-full flex justify-center items-center gap-1 font-semibold">
                        <div>Expires </div>
                        <BiTimeFive color="#fafafa" fontSize={9} />
                      </div>
                      <div className="font-semibold text-[18px] text-yellow">
                        {format(
                          new Date(singleAuction?.expiryDate),
                          "MMM d, yyyy"
                        )}
                      </div>
                      <div className="font-medium text-[8px] text-[whitesmoke]">
                        {formatDistanceToNow(
                          new Date(singleAuction?.expiryDate),
                          {
                            includeSeconds: true,
                            addSuffix: true,
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <BeatLoader color="#F1BC31" size={16} />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-4 rounded-[1.5em] px-4 py-4 bg-white shadow-paper">
              <div className="text-primary underline decoration-yellow text-left font-bold text-[18px] py-[0.2em] ">
                Top bids
              </div>
              {!!singleAuction?.allBids?.length > 0 ? (
                <div className="w-full flex justify-between items-center grid grid-cols-4 gap-3 mt-4">
                  {_.orderBy(singleAuction?.allBids, ["price"], ["desc"])
                    ?.slice(0, 6)
                    .map((value, i) => (
                      <div
                        className="bg-primary w-full p-1 text-[#fff] rounded-full text-center text-[14px] font-bold"
                        key={i}>
                        {value.price} Matic
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full text-center text-[#ccc] text-[13px] my-4">
                  No bids has been placed yet. You can be the first!
                </div>
              )}
            </div>
            <div className="bg-white w-full shadow-paper rounded-[1em] py-[2em] px-[1em] h-full flex-col justify-between">
              <div>
                <div className="text-main text-[20px] text-left font-bold">
                  Place a bid
                </div>

                <div className="text-gray text-left text-[12px] mt-1 mb-8">
                  You must bid at least{" "}
                  <span className="font-bold text-primary">
                    {singleAuction?.price} MATIC
                  </span>
                </div>
                <div>
                  <div className="relative rounded-full border-2 border-solid border-primary my-4">
                    <input
                      type="number"
                      className="form-input rounded-full  py-3 px-4 block w-full leading-5  transition duration-150 ease-in-out sm:text-sm sm:leading-5 placeholder:font-bold "
                      onChange={handleBidPriceChage}
                      value={bidPrice}
                      placeholder="e.g 50"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <PolygonIconFilled />
                    </div>
                  </div>
                </div>

                {bidPrice < singleAuction?.price && (
                  <div className="text-[0.65em] text-[#cc0000] font-semibold">
                    {bidPrice < singleAuction?.price &&
                      "Your bid price cannot be less than the starting price"}
                  </div>
                )}
                <div className="w-full h-[1px] bg-yellow mt-2 mb-6" />

                <div>
                  <div>
                    <div className="w-full flex justify-between items-center">
                      <div className="font-semibold text-gray text-[12px]">
                        Your bid price:
                      </div>
                      <div className="text-primary text-[15px] font-bold">
                        {bidPrice.length > 0 ? bidPrice : "__"}{" "}
                        <span className="text-yellow text-[13px]">MATIC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {bidPrice >= singleAuction?.price && (
                  <div className="w-full flex justify-center transition-all duration-1000">
                    <button
                      className=" btn-primary py-2 px-12 mt-12 transition-all duration-1000"
                      onClick={placeBid}>
                      {!loading && <span>Place Bid</span>}
                      {loading && <BeatLoader color="#fff" size={12} />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function mapState(state) {
  const { loading, singleAuction } = state.auction;
  const { singleAdminReplica } = state.token;
  console.log(singleAuction, state);
  return { loading, singleAuction, singleAdminReplica };
}

const actionCreators = {
  getSingleAuction: auctionActions.getSingleAuction,
  placeBid: auctionActions.placeBid,
  getSingleAdminReplica: tokenActions.getSingleAdminReplica,
};

const connectedPlaceBidPage = connect(mapState, actionCreators)(PlaceBid);
export default connectedPlaceBidPage;
