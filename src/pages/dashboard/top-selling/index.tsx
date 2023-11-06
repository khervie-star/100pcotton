/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */

import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";

import { tokenActions } from "../../../redux/actions";

import ProductCard from "../../../Components/Cards/ProductCard";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import { SolidButton } from "../../../Components/Buttons";
import { Grid } from "@mui/material";

function TopSelling(props: any) {
  const router = useRouter();

  const { loading, trendingTokens } = props;

  React.useEffect(() => {
    props.getTrending();
  }, []);

  return (
    <div>
      <Head>
        <title>Top Selling | 100% Cotton</title>
      </Head>
      <DashboardLayout>
        <main>
          <div className="mt-4 mb-12 p-0 flex flex-col md:flex-row justify-center items-start gap-4 h-full md:h-[170px]">
            <div className="w-full h-full md:w-8/12 bg-[#fafafa] shadow-paper rounded-[2em] md:rounded-[1em]  mt-0 mb-[1.5em] md:mb-0">
              <div className="flex flex-row gap-4 justify-between w-full py-4 px-8">
                <Grid item xs={7} style={{ paddingTop: "0" }}>
                  <div className="flex justify-start items-center gap-2 font-bold text-[24px] my-2">
                    <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                      Top Selling
                    </div>
                  </div>
                  <div className="text-[13px] text-[#707070] font-light mb-3  ">
                    Have a look at our most sold shirts from the most sold to
                    the least sold
                  </div>
                </Grid>
              </div>
            </div>

            <div className="w-full h-full md:w-4/12 md:px-4">
              <div className="h-full text-[#ec4352] text-center p-2 mb-2 rounded-3xl shadow-paper bg-[#fafafa]">
                <div className="font-bold text-[24px] gradient-text bg-gradient-to-tl from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent mb-3">
                  Browse Tokens
                </div>
                <div className="text-[12px] text-textGray font-light text-center mb-4">
                  Click below to browse other categories of designs
                </div>

                <div className="w-full mx-auto flex justify-center">
                  <SolidButton onClick={() => router.push("/dashboard/search")}>
                    Browse Here
                  </SolidButton>
                </div>
              </div>
            </div>
          </div>

          {!loading && (
            <div>
              <div className="bg-[#fafafa] shadow-paper bg-white p-4 md:p-8 my-2 rounded-[1em] md:rounded-[2em]">
                <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 ">
                  {trendingTokens?.map((value: any, i: any) => (
                    <div className="w-full" key={i}>
                      <ProductCard token={value} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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
        </main>
      </DashboardLayout>
    </div>
  );
}

function mapState(state: any) {
  const {
    adminTokens,
    proposedTokens,
    loading,
    originalTokens,
    trendingTokens,
  } = state.token;
  return {
    proposedTokens,
    loading,
    originalTokens,
    adminTokens,
    trendingTokens,
  };
}

const actionCreators = {
  getTrending: tokenActions.getTrending,
};

const connectedHomePage = connect(mapState, actionCreators)(TopSelling);
export default connectedHomePage;
