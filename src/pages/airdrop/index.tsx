import React from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Navbar from "../../Components/Navbar";

const Whitepaper = () => {
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[80px] md: m-6 container mx-auto py-16">
        <div className="flex flex-col md:flex-row w-full gap-12 relative">
          <div className="w-full md:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full md:w-2/3 md:mt-[60px]">
            <div className=" text-center mt-4 font-sora gradient-text font-bold text-[26px] md:text-[48px] bg-gradient-to-r from-primary2 to-primary1 bg-clip-text fill-transparent mb-2">
              Airdop
            </div>
            <div className="font-semibold font-sora text-[15px] text-secondaryBlack text-center border-[1px] border-solid border-success rounded-md p-4 w-fit mx-auto bg-success/5 mb-4">
              $2,000 NFTee Giveaways + 40% Royalty on Shirt Sales Deposited Into
              Your Wallets!
            </div>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;
