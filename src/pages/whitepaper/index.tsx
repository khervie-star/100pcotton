import React from "react";
import Content from "./Content";
import Sidebar from "./Sidebar";
import Navbar from "../../Components/Navbar";

const Whitepaper = () => {
  return (
    <div>
      <Navbar />
      <div className="md:px-[80px] px-6 py-16  m-6 container mx-auto">
        <div className="flex flex-col md:flex-row w-full gap-12 relative">
          <div className="w-full md:w-1/5">
            <Sidebar />
          </div>
          <div className="w-full md:w-2/3 md:mt-[60px]">
            <div className=" text-center mt-4 font-sora gradient-text font-bold text-[26px] md:text-[48px] bg-gradient-to-r from-primary2 to-primary1 bg-clip-text fill-transparent mb-2">
              Whitepaper
            </div>
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitepaper;
