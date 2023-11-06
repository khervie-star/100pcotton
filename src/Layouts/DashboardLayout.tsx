import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import { DashboardNavbar } from "../Components/DashboardNavbar";
import DashboardSidebar from "../Components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        {/* CHROME / FIREFOX */}
        {/* <meta name="theme-color" content="#b22222" /> */}
        {/* WINDOWS */}
        {/* <meta name="ms-application-navbutton-color" content="#b22222" /> */}
        {/* IOS */}
        {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
        {/* <meta name="apple-mobile-web-app-status-bar" content="maroon" /> */}
      </Head>

      <React.Fragment>
        <div className="w-screen h-screen bg-gradient-to-tr  from-[#A01AEC] via-[#CB527D] to-[#DF9361] fixed">
          <div className="flex">
            <div className="w-1/6 h-screen hidden md:block">
              <DashboardSidebar />
            </div>
            <div className="w-full md:w-5/6">
              <div className="h-[60px] md:h-[100px] md:hidden">
                <DashboardNavbar />
              </div>

              <div>
                <div className="bg-transparent p-4 pb-12  md:p-8   h-[calc(100vh-60px)] md:h-[calc(100vh)] relative overflow-x-hidden overflow-y-scroll font-sora">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default DashboardLayout;
