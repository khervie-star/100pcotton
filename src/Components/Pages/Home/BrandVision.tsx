import React from "react";
import Image from "next/image";

import purpleblur from "../../../Assets/images/purpleblur.svg";
import blackLogoPattern from "../../../Assets/images/black logo pattern.svg";
import vItem1 from "../../../Assets/images/visionitem1.svg";
import vItem2 from "../../../Assets/images/visionitem2.svg";
import vItem3 from "../../../Assets/images/visionitem3.svg";
import asset from "../../../Assets/images/Image.png";

const BrandVision = () => {
  return (
    <div className="container mx-auto relative">
      <div className="w-full h-full flex flex-col md:flex-row items-center gap-8 p-8 md:p-20">
        <div className="basis-5/12">
          <div>
            <h6 className="font-sora font-semibold text-[48px] md:text-[64px] text-secondaryBlack leading-[48px] md:leading-[64px] tracking-[0.2px] mb-6">
              Goals and Values
            </h6>
            <div>
              <p className="font-inter text-textGray font-normal text-base leading-[24px] mb-6">
                <span className="font-bold text-[black]">Brand Vision: </span>
                Our vision is to revolutionize the clothing industry by creating
                a community-driven brand that rewards customers for their
                creativity and engagement. We want to empower our customers to
                be part of the brand and benefit from their contributions to the
                community.
              </p>
              <p className="font-inter text-textGray font-normal text-base leading-[24px]">
                <span className="font-bold text-[black]">
                  Brand Statement:{" "}
                </span>
                &quot;Wear your creativity, own your story.&quot;
              </p>
            </div>
          </div>
        </div>
        <div className="md:basis-7/12 basis-full p-0 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[12px] h-full">
            <div className="flex flex-col gap-[12px] h-full">
              <div className=" flex-1 rounded-[12px] border border-solid border-[rgba(226,226,237,0.7)] p-3 md:p-6">
                <h6 className="text-[#0F101C] text-[20px] md:text-[24px] leading-[30.24px] font-sora font-bold mb-3 flex items-center justify-between">
                  <span>Quality</span>
                  <div>
                    <Image src={vItem2} alt="" width={100} className="" />
                  </div>
                </h6>
                <p className="font-inter text-textGray font-normal text-[12px] leading-[16px] md:text-[14px] md:leading-[21px]">
                  We are committed to providing high-quality clothing made from
                  100% cotton.
                </p>
              </div>
              <div className=" flex-1 rounded-[12px] border border-solid border-[rgba(226,226,237,0.7)] p-3 md:p-6">
                <h6 className="text-[#0F101C] text-[20px] md:text-[24px] leading-[30.24px] font-sora font-bold mb-3 flex items-center justify-between">
                  <span>Community</span>
                  <div>
                    <Image src={vItem3} alt="" width={250} className="" />
                  </div>
                </h6>
                <p className="font-inter text-textGray font-normal text-[12px] leading-[16px] md:text-[14px] md:leading-[21px]">
                  We are a brand that values and empowers our customers,
                  promoting collaboration and creativity.
                </p>
              </div>
              <div className=" flex-1 rounded-[12px] border border-solid border-[rgba(226,226,237,0.7)] p-3 md:p-6">
                <h6 className="text-[#0F101C] text-[20px] md:text-[24px] leading-[30.24px] font-sora font-bold mb-3 flex items-center justify-between">
                  <span>Innovation</span>
                  <div>
                    <Image src={vItem1} alt="" width={100} className="" />
                  </div>
                </h6>
                <p className="font-inter text-textGray font-normal text-[12px] leading-[16px] md:text-[14px] md:leading-[21px]">
                  We embrace new technologies and challenge the status quo to
                  create a unique shopping experience for our customers.
                </p>
              </div>
            </div>
            <div className=" bg-[#060714] rounded-[12px] md:rounded-tl-none h-[400px] md:h-full mt-5 md:mt-0">
              <div className="relative h-2/3 w-full ">
                <Image src={asset} alt="" className="h-full object-contain" />
              </div>
              <div className="h-1/3 px-[12px] md:px-[32px] py-[22px]">
                <h6 className="text-[white] text-[20px] md:text-[24px] leading-[30.24px] font-sora font-semibold mb-3">
                  Giving Back
                </h6>
                <p className="font-inter text-textGray font-normal text-[12px] leading-[16px] md:text-[14px] md:leading-[21px] mb-[22px]">
                  We believe in giving back to our community, which is why we
                  donate 20% of all sales to the user who completes the phrase
                  on the shirt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 -ml-[450px] md:-ml-[350px] -mt-[100px]">
        <Image src={purpleblur} alt="" width={100} className="w-full" />
      </div>

      <div className="absolute bottom-0 left-0 -ml-[180px] -mb-[100px]">
        <Image src={blackLogoPattern} alt="" width={100} className="w-full" />
      </div>
    </div>
  );
};

export default BrandVision;
