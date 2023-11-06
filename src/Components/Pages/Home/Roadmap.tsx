import React from "react";
import roadmap from "../../../Assets/images/roadmap_2.svg";
import pleat from "../../../Assets/images/Pleat.svg";
import Image from "next/image";

import roadmap1 from "../../../Assets/images/roadmap/roadmap1.png";
import roadmap2 from "../../../Assets/images/roadmap/roadmap2.svg";
import roadmap3 from "../../../Assets/images/roadmap/roadmap3.svg";
import roadmap4 from "../../../Assets/images/roadmap/roadmap4.svg";
import roadmap5 from "../../../Assets/images/roadmap/roadmap5.svg";
import roadmap6 from "../../../Assets/images/roadmap/roadmap6.svg";

const Roadmap = () => {
  return (
    <div className="roadmap container mx-auto" id="roadmap">
      <div className="relative hidden md:block w-full h-full p-8 md:p-16">
        <Image src={roadmap} alt="" className=" w-full h-full" />
      </div>
      <div className="block md:hidden p-8 md:p-16">
        <div className="flex flex-col gap-0">
          <div className="relative w-1/2 h-full">
            <Image src={pleat} alt="" className=" w-full h-full" />
          </div>
          <div className="rounded-[20px] rounded-tl-none bg-[#F2F3F6] px-5 py-8">
            <h3 className="text-secondaryBlack text-[30px] font-sora font-semibold">
              Roadmap
            </h3>
            <p className="w-full text-black font-inter font-light text-[13px] mt-4">
              As a small business with big dreams, we have a clear roadmap for
              <strong>the next five years</strong> that we would like to share
              with you. We plan to revolutionize the clothing industry by
              creating a community-driven brand on the blockchain. Here are the
              key milestones we plan to achieve:
            </p>
            <div className="my-16 flex flex-col gap-12">
              <div className="flex">
                <div className="relative w-[120px] h-full">
                  <Image src={roadmap1} alt="" className=" w-full h-full" />
                </div>
                <div className="bg-white rounded-[12px] p-5 w-full ml-[-16px]">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    First and foremost, by mid-2023, we aim{" "}
                    <strong>
                      to have a new phrase to complete every 2 months.
                    </strong>{" "}
                    There will be many opportunities to participate, and voting
                    on the phrases will happen in the community Discord.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-white rounded-[12px] p-5 w-full">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    By the end of 2023, we aim to{" "}
                    <strong>expand our product line</strong> to include caps,
                    shoes, long sleeves, hoodies, and pants. Some of these will
                    be customizable for rewards as well. We will also implement
                    a new feature that allows customers to complete the art
                    using AI to draw phrases they write based on our proposed
                    skeleton.
                  </p>
                </div>
                <div className="relative w-[120px] h-full ml-[-16px] -mt-4">
                  <Image src={roadmap2} alt="" className=" w-full h-full" />
                </div>
              </div>
              <div className="flex">
                <div className="relative w-[120px] h-full">
                  <Image src={roadmap3} alt="" className=" w-full h-full" />
                </div>
                <div className="bg-white rounded-[12px] p-5 w-full ml-[-16px]">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    By early-2024, we plan to{" "}
                    <strong>
                      offer better quality shirts and chique clothing
                    </strong>{" "}
                    that will enhance our customers&apos; fashion experience. We
                    want to earn your trust and grow together. This is the first
                    ever clothing brand on the blockchain.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-white rounded-[12px] p-5 w-full">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    By mid-2024, we plan to take feedback and ideas from our
                    members to increase the visibility of our brand. We will
                    offer customers the{" "}
                    <strong>opportunity to pay for headline space</strong> on
                    the website to show their proposed shirts to potential
                    customers.
                  </p>
                </div>
                <div className="relative w-[120px] h-full ml-[-16px] -mt-4">
                  <Image src={roadmap4} alt="" className=" w-full h-full" />
                </div>
              </div>
              <div className="flex">
                <div className="relative w-[120px] h-full">
                  <Image src={roadmap5} alt="" className=" w-full h-full" />
                </div>
                <div className="bg-white rounded-[12px] p-5 w-full ml-[-16px]">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    By the beginning of 2025, we hope to{" "}
                    <strong>offer metaverse plans</strong>
                    where customers can shop in the metaverse.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="bg-white rounded-[12px] p-5 w-full">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    By the end of 2025,{" "}
                    <strong>we plan to add more tokenomics.</strong>
                    Customers can save up their replicas to aggregate additional
                    rewards per single proposal. We will also{" "}
                    <strong>upgrade our platform</strong> to allow adding
                    features to pre existing proposals, apply rewards to
                    proposals via auctions or self-minted proposals, and add
                    more special tokens for special customers.
                  </p>
                </div>
                <div className="relative w-[120px] h-full ml-[-16px] -mt-4">
                  <Image src={roadmap6} alt="" className=" w-full h-full" />
                </div>
              </div>{" "}
              <div className="flex">
                <div className="relative w-[120px] h-full">
                  <Image src={roadmap5} alt="" className=" w-full h-full" />
                </div>
                <div className="bg-white rounded-[12px] p-5 w-full ml-[-16px]">
                  <p className="w-full text-black font-inter font-light text-[14px]">
                    By the end of 2026,
                    <strong>
                      {" "}
                      we aim to have significant improvements to the website and
                      user experience.
                    </strong>{" "}
                    We want to ensure that our customers enjoy the shopping
                    experience and have all the necessary tools to participate
                    in our community.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-16 text-black text-[18px] font-bold font-sora">
              <p>We are excited to embark on this</p>
              <p className=" gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent indent-[24px]">
                JOURNEY WITH YOU
              </p>
              <p className="indent-[40px]"> and hope that you will join us</p>
              <p className=" gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent indent-[16px]">
                IN MAKING HISTORY
              </p>
              <p className="indent-[18px]">in the clothing industry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
