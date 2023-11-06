/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */

import { Grid } from "@mui/material";
import * as React from "react";

import { useTransform, useViewportScroll } from "framer-motion";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { FreeMode, Keyboard, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import BidProductCard from "../../../Components/Cards/BidProductCard";
import withAuth from "../../../helpers/withAuth";
import { auctionActions } from "../../../redux/actions";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { SolidPurpleGradientButton } from "../../../Components/Buttons";

function Auctions(props: any) {
  const router = useRouter();
  const sliderRef = React.useRef();
  const [likedItems, setLikedItems] = React.useState(true);
  const [allAuctions, setAllAuctions] = React.useState([]);
  // const [loading, setLoading] = React.useState(false);
  const [slideIndex, setSlideIndex] = React.useState("0");

  const scrollAmount = 120;

  React.useEffect(() => {
    props.getAllAuction();
  }, []);

  const handleGoToAuctions = () => {
    router.push("/dashboard/auctions/me");
  };

  const handleGoToBids = () => {
    router.push("/dashboard/auctions/my-bids");
  };

  const { auctions, tokens, loading } = props;
  console.log(auctions, tokens);

  return (
    <React.Fragment>
      <DashboardLayout>
        <Grid>
          <div className="w-full flex flex-col justify-center md:flex-row gap-4 h-full md:h-[300px] mb-8 ">
            <div className="md:w-6/12 w-full md:mx-4 h-full">
              <div className="bg-[white] h-full p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px]">
                <div className="mb-6 mt-2 text-center">
                  <p className="text-textGray text-[14px] font-semibold font-sora mb-2">
                    Enter here to access bids placed on your personal auctions:
                  </p>

                  <div className="w-full flex justify-center">
                    <SolidPurpleGradientButton
                      onClick={handleGoToAuctions}
                      width="200px">
                      My Auctions
                    </SolidPurpleGradientButton>
                  </div>
                </div>
                <div className="text-center ">
                  <p className="text-textGray text-[14px] font-semibold font-sora mb-2">
                    Enter here to access tokens you placed bids on:
                  </p>

                  <div className="w-full flex justify-center">
                    <SolidPurpleGradientButton
                      onClick={handleGoToBids}
                      width="200px">
                      My bids
                    </SolidPurpleGradientButton>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-6/12 w-full md:mx-4 h-full">
              <div className="bg-[white] h-full p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px]">
                <div className="mb-4 text-center">
                  <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                    Tutorial video
                  </div>
                  <div className="text-[12px] text-[#707070]  font-light hidden md:block">
                    Watch this quick video to learn how to auction.
                  </div>
                </div>
                <div className="w-full h-auto mt-3">
                  <iframe
                    src="https://youtube.com/embed/9UUrH0EnAzk"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-auto rounded-md"></iframe>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        {loading && (
          <div className="bg-[#fafafa] shadow-paper rounded-[1.8em] my-4 p-8">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 my-1">
              <div className="bg-skeleton h-72 rounded-full my-4 animate-pulse flex flex-col gap-4 ">
                <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
              </div>
              <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
              </div>
              <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
              </div>
              <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
              </div>
            </div>
          </div>
        )}
        {!loading && _.some(auctions, { isClose: false, originalId: {} }) && (
          <div>
            <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-12">
              <Grid component="div" direction="column">
                <Grid item xs>
                  <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#ec4352] text-[20px]">
                    Originals
                  </h5>
                </Grid>
                <div>
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    freeMode={true}
                    navigation
                    keyboard={true}
                    modules={[Navigation, Keyboard, FreeMode]}
                    className="mySwiper"
                    breakpoints={{
                      0: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}>
                    {_.chain(auctions)
                      .filter(function (o) {
                        return o.isClose === false && !!o?.originalId;
                      })
                      .orderBy(
                        ["tokenId?.noOfSales", "expiryDate"],
                        ["desc", "desc"]
                      )
                      .slice(0, 5)
                      ?.map((value, i) => (
                        <Grid item md={4} xs={6} key={i}>
                          <SwiperSlide>
                            <BidProductCard token={value} />
                          </SwiperSlide>
                        </Grid>
                      ))
                      .value()}
                  </Swiper>
                </div>
              </Grid>
            </div>
          </div>
        )}
        {!loading && _.some(auctions, { isClose: false, tokenId: {} }) && (
          <div>
            <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-12">
              <Grid component="div" direction="column">
                <Grid item xs>
                  <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#ec4352] text-[20px]">
                    Live Auctions
                  </h5>
                </Grid>
                <div>
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    freeMode={true}
                    navigation
                    keyboard={true}
                    modules={[Navigation, Keyboard, FreeMode]}
                    className="mySwiper"
                    breakpoints={{
                      0: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}>
                    {_.chain(auctions)
                      .filter(function (o) {
                        return o.isClose === false && !o?.originalId;
                      })
                      .orderBy(
                        ["tokenId?.noOfSales", "expiryDate"],
                        ["desc", "desc"]
                      )
                      .slice(0, 5)
                      ?.map((value, i) => (
                        <Grid item md={4} xs={6} key={i}>
                          <SwiperSlide>
                            <BidProductCard token={value} />
                          </SwiperSlide>
                        </Grid>
                      ))
                      .value()}
                  </Swiper>
                </div>
              </Grid>
            </div>
          </div>
        )}
        {!loading && _.some(auctions, { isClose: false, tokenId: {} }) && (
          <div>
            <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-12">
              <Grid component="div" direction="column">
                <Grid item xs>
                  <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#ec4352] text-[20px]">
                    Ending soon
                  </h5>
                </Grid>
                <div>
                  <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    freeMode={true}
                    navigation
                    keyboard={true}
                    modules={[Navigation, Keyboard, FreeMode]}
                    className="mySwiper"
                    breakpoints={{
                      0: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                      640: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                      },
                    }}>
                    {_.chain(auctions)
                      .filter(function (o) {
                        return o.isClose === false && !o?.originalId;
                      })
                      .orderBy(
                        ["tokenId?.noOfSales", "expiryDate"],
                        ["desc", "asc"]
                      )
                      .slice(0, 5)
                      ?.map((value, i) => (
                        <Grid item md={4} xs={6} key={i}>
                          <SwiperSlide>
                            <BidProductCard token={value} />
                          </SwiperSlide>
                        </Grid>
                      ))
                      .value()}
                  </Swiper>
                </div>
              </Grid>
            </div>
          </div>
        )}

        {!loading && !_.some(auctions, ["isClose", false]) && (
          <div
            style={{
              width: "100%",
              height: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
              src={"/static/vector/empty-products.svg"}
              width={200}
              height={200}
              alt=""
            />

            <h5 className="inline-block mb-[0.5em]  py-[0.2em] font-bold text-[white] font-sora text-[20px]">
              There are no auctions yet!
            </h5>
            <p className="inline-block mb-[0.5em]  py-[0.2em] font-medium text-[white] font-sora text-[14px]">
              Auction one of your tokens to get started!
            </p>
          </div>
        )}
      </DashboardLayout>
    </React.Fragment>
  );
}

function mapState(state: any) {
  const { loading, auctions } = state.auction;
  const { tokens } = state.token;
  console.log(auctions, state);
  return { loading, auctions, tokens };
}

const actionCreators = {
  getAllAuction: auctionActions.getAllAuction,
};

const connectedAuctionsPage = connect(mapState, actionCreators)(Auctions);
export default connectedAuctionsPage;
