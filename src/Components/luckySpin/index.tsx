/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import ReplayIcon from "@mui/icons-material/Replay";
import { Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import { ClapSpinner } from "react-spinners-kit";
import { tokenActions } from "../../redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import { OutlinedButton, SolidButton, SolidOrangeButton } from "../Buttons";

function LuckySpin(props: any) {
  const router = useRouter();

  React.useEffect(() => {
    props.getRandom();
  }, []);

  const { spinning, randomToken } = props;

  return (
    <div className="w-full md:w-[400px] justify-center items-center mx-8 md:mx-0">
      <div className="bg-[#fafafa] shadow-paper rounded-[1em] relative w-full px-6 md:px-8 py-4">
        <div
          onClick={props?.toggleClose}
          className="bg-gradient-to-br from-[#E25822] via-[#D94D22] to-[#B22222] text-[#fafafa] absolute top-2 right-2 p-2 rounded-full cursor-pointer">
          <CloseIcon />
        </div>
        {spinning && (
          <Grid style={{ display: "relative" }}>
            <div className="text-primary2 text-[18psx] md:text-[20px] text-left font-bold mb-4 ">
              Lucky spin
            </div>
            <div className="font-light text-[15px] text-textGray">
              Be patient while we generate your lucky word.
            </div>
            <div className="w-full flex justify-center my-10">
              <ClapSpinner size={50} frontColor="#E25822" backColor="#E25822" />
            </div>
          </Grid>
        )}
        {!spinning && !randomToken && (
          <div className="w-full flex justify-center items-center">
            <div className="text-[crimson] font-bold text-[18px] md:text-[20px] text-center my-8">
              Something went wrong!
            </div>
            <div
              className="flex w-full justify-center items-center gap-1 text-gray text-[18px] font-bold cursor-pointer"
              onClick={() => props.getRandom()}>
              <div className="m-0 text-[14px]">Spin again</div>
              <div style={{ color: "#E25822" }}>
                <ReplayIcon />
              </div>
            </div>
          </div>
        )}
        {!spinning && randomToken && (
          <Grid style={{}}>
            <div className="text-primary2 text-[18px] md:text-[20px] text-left font-bold mb-4 ">
              Lucky spin
            </div>
            <div className="font-light text-[15px] text-textGray">
              Your lucky word is:
            </div>
            <div className="w-full flex flex-col gap-3 items-center justify-center my-8">
              <div className="w-40 bg-[#fff] shadow-paper rounded-[1em] text-center">
                <img
                  src={
                    !randomToken
                      ? "/static/gaspar-zaldo-nCw-R-HfhWI-unsplash.jpg"
                      : randomToken?.DesignUrl
                  }
                  alt="product"
                  height="100%"
                />
              </div>
              <div className="text-center text-[18px] font-bold text-primary2 mb-3">
                <div className="font-bold text-[28px] gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                  {randomToken?.nftName}
                </div>
              </div>
            </div>

            <div
              className="flex w-full justify-center items-center gap-1 text-textGray text-[18px] font-bold cursor-pointer"
              onClick={() => props.getRandom()}>
              <div className="m-0 text-[14px]">Spin again</div>
              <div style={{ color: "#E25822" }}>
                <ReplayIcon />
              </div>
            </div>
          </Grid>
        )}

        {!spinning && randomToken && (
          <>
            <div className="flex justify-between items-center gap-4 mt-8">
              {/* <button
                  onClick={() => router.push(`/dashboard/r/product/${randomToken?._id}`)}
                  className="mx-auto my-2 py-2 px-2 flex  w-full justify-center  items-center rounded-full text-[1em] font-semibold  border-none  text-[#fafafa] bg-gradient-to-b from-[#E25822] to-[#b22222] shadow-paper">
                  Buy design
                </button> */}
              <OutlinedButton onClick={props?.toggleClose}>
                Close
              </OutlinedButton>

              {/* <button
                  onClick={props?.toggleClose}
                  className="mx-auto my-2 py-2 px-2 flex  w-full justify-center  items-center rounded-full text-[1em] font-semibold border border-solid border-main text-main bg-[#fafafa] ">
                  Close
                </button> */}
              {/* <SolidOrangeButton onClick={props?.toggleClose}>
                  Close
                </SolidOrangeButton> */}
              <SolidButton
                onClick={() =>
                  router.push(`/dashboard/r/product/${randomToken?._id}`)
                }>
                Buy shirt
              </SolidButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function mapState(state: any) {
  const { spinning, randomToken } = state.token;
  return { spinning, randomToken };
}

const actionCreators = {
  getRandom: tokenActions.getRandom,
};

const ConnectedLuckySpinPage = connect(mapState, actionCreators)(LuckySpin);
export default ConnectedLuckySpinPage;
