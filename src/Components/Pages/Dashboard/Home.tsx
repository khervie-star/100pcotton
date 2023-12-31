import {
  Backdrop,
  Button,
  Grid,
  Modal,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import { A11y, FreeMode, Keyboard, Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import ConnectedLuckySpinPage from "../components/luckySpin";
import ProductCard from "../../Cards/ProductCard";
import { tokenActions } from "../../../redux/actions";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import _ from "lodash";

function Home(props: any) {
  const router = useRouter();
  const [openLuckySpin, setOpenLuckySpin] = React.useState(false);
  const [emptyAdminTokens, setEmptyAdminTokens] = React.useState(false);

  React.useEffect(() => {
    props.getAllAdmin();
    props.getProposed();
  }, [props.getAll]);

  const { proposedTokens, loading, adminTokens } = props;

  const handleSpin = () => {
    setOpenLuckySpin(true);
  };

  const toggleClose = () => {
    setOpenLuckySpin(false);
  };

  return (
    <div>
      <Head>
        <title>100NFT Landing Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="www.100pcotton.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="100Percent Cotton" />
        <meta property="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Home for Awesome T-shirts and NFTs"
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/z-pro-trading/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1662043315/assets/preview_ubvavg.png"
          }
        />
      </Head>
      <DashboardLayout>
        <main>
          <div className="mt-4 mb-12 p-0 flex flex-col md:flex-row justify-center items-start gap-4 h-[250px]">
            <div className="w-full h-[250px] md:w-8/12 bg-[#fafafa] shadow-paper rounded-[12px] md:rounded-[20px] mt-0 mb-[1.5em] md:mb-0">
              <div className="flex flex-row gap-4 justify-between w-full py-4 px-8">
                <Grid item xs={7} style={{ paddingTop: "0" }}>
                  <div className="flex justify-start items-center gap-2 font-bold text-[24px] my-2">
                    <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                      Lucky Spin
                    </div>
                  </div>
                  <div className="text-[13px] text-[#707070] font-light mb-3  ">
                    Click below to browse a lucky user&apos;s shirt designs
                  </div>
                  <button
                    className="text-center font-medium border-none text-[#fafafa] bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[0.875em] rounded-[3em] px-[2em] py-[0.2em]"
                    onClick={handleSpin}>
                    Spin here
                  </button>
                </Grid>
                <Grid xs={5} style={{ textAlign: "right" }}>
                  <Image
                    src="/static/gift.png"
                    width={100}
                    height={100}
                    alt=""
                  />
                </Grid>
              </div>
            </div>

            <div className="h-[250px] w-full md:w-4/12 md:px-4">
              <Grid>
                <div className="text-[#E25822] text-center p-2 mb-2 rounded-3xl shadow-paper bg-[#fafafa]">
                  <div className="font-bold text-[24px] gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                    Start Here
                  </div>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{
                      fontSize: "12px",
                      color: "#707070",
                      textAlign: "center",
                    }}>
                    See tutorials on how to use our app and buy NFT shirts.
                  </Typography>
                </div>
                <div className="text-[#E25822] text-center p-2 mb-2 rounded-[2em] items-center justify-center shadow-paper bg-[#fafafa]">
                  <button
                    className="text-center font-medium border-none text-[#fafafa] bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[0.875em] rounded-[3em] px-[2em] py-[0.2em]"
                    onClick={() => router.push("/dashboard/help")}
                    disabled={emptyAdminTokens}>
                    See help
                  </button>
                </div>
              </Grid>
            </div>
          </div>

          {/* {!loading &&
            !proposedTokens?.length > 0 &&
            !adminTokens?.length > 0 &&
            true && (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Image
                  src={"/static/vector/no-cards.svg"}
                  width={300}
                  height={300}
                  alt=""
                />
                <p style={{ color: "#ccc", fontSize: "1.1em", fontWeight: "" }}>
                  Hang on?
                </p>
              </div>
            )} */}

          {loading && (
            <div className="bg-[#fafafa] shadow-paper rounded-[1.8em] my-4 p-8">
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 my-1">
                <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-4 ">
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

          {!loading && adminTokens?.length > 0 && true && (
            <div className="overflow-hidden  rounded-[2em] p-4 md:p-8 my-4 shadow-paper bg-[#fff]">
              <div className="flex flex-col gap-2">
                <div>
                  <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#E25822] text-[20px]">
                    Originals
                  </h5>
                  <h5 className="text-[14px]  text-[#707070] my-[1em]">
                    Click below to gain exclusive access to mint one of our
                    limited original NFT shirts.
                  </h5>
                  <button
                    className="text-center font-medium border-none text-[#fafafa] bg-gradient-to-b from-[#E25822] via-[#D94D22] to-[#B22222] text-[0.875em] rounded-[3em] px-[2em] py-[0.2em]"
                    onClick={() => router.push("/dashboard/originals")}
                    disabled={emptyAdminTokens}>
                    Browse here
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && proposedTokens?.length > 0 && true && (
            <div>
              <div className="overflow-none rounded-[2em] p-4 md:p-8 my-8 box-border shadow-paper bg-[#fff] ">
                <div className="flex flex-col">
                  <div>
                    <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#E25822] text-[20px]">
                      Recently Added
                    </h5>
                  </div>
                  <div>
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={4}
                      freeMode={true}
                      navigation
                      keyboard={true}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                      modules={[Navigation, Mousewheel, Keyboard, FreeMode]}
                      className="mySwiper"
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 50,
                        },
                        480: {
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
                      {_.orderBy(proposedTokens, ["createdAt"], ["desc"])
                        .slice(0, 5)
                        ?.map((value: React.Key | null | undefined, i: any) => (
                          <Grid md={3} xs={6} key={value}>
                            <SwiperSlide>
                              <ProductCard token={value} />
                            </SwiperSlide>
                          </Grid>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="overflow-none rounded-[2em] p-4 md:p-8 my-8 box-border shadow-paper bg-[#fff] ">
                <div className="flex flex-col">
                  <div>
                    <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#E25822] text-[20px]">
                      Recently Sold
                    </h5>
                  </div>
                  <div>
                    <Swiper
                      modules={[
                        Navigation,
                        A11y,
                        Mousewheel,
                        Keyboard,
                        FreeMode,
                      ]}
                      spaceBetween={50}
                      slidesPerView={3}
                      navigation
                      keyboard={true}
                      freeMode={true}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                      className="mySwiper"
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 50,
                        },
                        480: {
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
                      {_.filter(
                        proposedTokens,
                        function (o: { noOfSales: number }) {
                          return o.noOfSales > 0;
                        }
                      )?.map((value: any, i: React.Key | null | undefined) => (
                        <Grid md={3} xs={6} key={i}>
                          <SwiperSlide>
                            <ProductCard token={value} />
                          </SwiperSlide>
                        </Grid>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
              <div className="overflow-none rounded-[2em] p-4 md:p-8 my-8 box-border shadow-paper bg-[#fff] ">
                <div className="flex flex-col">
                  <div>
                    <h5 className="border-b border-solid border-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] font-bold text-[#E25822] text-[20px]">
                      Recently Auctioned
                    </h5>
                  </div>
                  <div>
                    <Swiper
                      modules={[
                        Navigation,
                        A11y,
                        Mousewheel,
                        Keyboard,
                        FreeMode,
                      ]}
                      spaceBetween={50}
                      slidesPerView={3}
                      navigation
                      // mousewheel={true}
                      keyboard={true}
                      freeMode={true}
                      onSwiper={(swiper) => console.log(swiper)}
                      onSlideChange={() => console.log("slide change")}
                      className="mySwiper"
                      breakpoints={{
                        0: {
                          slidesPerView: 2,
                          spaceBetween: 50,
                        },
                        480: {
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
                      {/* _.some(auctions, ["isClose", false]) &&  */}
                      {_.filter(
                        proposedTokens,
                        function (o: { auctions: string | any[] }) {
                          return o.auctions.length > 0;
                        }
                      )?.map((value: any, i: React.Key | null | undefined) => (
                        <Grid md={3} xs={6} key={i}>
                          <SwiperSlide>
                            <ProductCard token={value} />
                          </SwiperSlide>
                        </Grid>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <Modal
          aria-labelledby="Login Modal"
          aria-describedby="login-modal-description"
          open={openLuckySpin}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            backdropFilter: "blur(5px)",
          }}>
          <div className="w-full h-full flex justify-center items-center">
            <ConnectedLuckySpinPage toggleClose={toggleClose} />
          </div>
        </Modal> */}
        </main>
      </DashboardLayout>
    </div>
  );
}

function mapState(state: {
  token: {
    adminTokens: any;
    proposedTokens: any;
    loading: any;
    originalTokens: any;
  };
}) {
  const { adminTokens, proposedTokens, loading, originalTokens } = state.token;
  return { proposedTokens, loading, originalTokens, adminTokens };
}

const actionCreators = {
  getAllAdmin: tokenActions.getAllAdmin,
  getProposed: tokenActions.getProposed,
};

const connectedHomePage = connect(mapState, actionCreators)(Home);
export default connectedHomePage;
