import React from "react";
import image from "../../Assets/images/howItWorks.png";
import Image from "next/image";
const Content = () => {
  return (
    <div>
      <div className="md:p-4">
        <section id="WhatIsOurAirdrop" className="mb-8">
          <div className="bg-[#F2F3F6] rounded-[20px] p-6 md:px-[60px] md:py-[40px]">
            <p className="font-bold font-poppins text-[24px] text-primary2 mb-4">
              What Is Our Airdrop?
            </p>
            <div className="text-[16px] md:text-[18px] font-normal font-poppins text-secondaryBlack mb-4">
              In order to get whitelisted, you must fill the Google form
              embedded below. Here is how it works:
              <ul className="font-sora flex flex-col gap-3 text-textGray font-medium mt-4 mb-5">
                <li>
                  -We select 50 random winners and send them each a unique
                  discount code.
                </li>
                <li>
                  -These lucky winners must sign up on our website using the
                  same email provided in the form below.
                </li>
                <li>
                  - This discount code reduces their shirt price to zero. Free
                  shipping is always included for everyone.
                </li>
                <li>
                  - Once you mint this “original” NFTee, we verify its
                  authenticity on the blockchain, after which you can use it to
                  propose a word to fill in the blank in our sentence model.
                </li>
                <li>
                  - UNIQUE REWARD FOR AIRDROP PARTICIPANTS: every time a shirt
                  is sold with this phrase that you proposed using your
                  “original” NFTee, you earn 40% of the $35 shirt sale price,
                  which amounts to $14 deposited immediately into your crypto
                  wallet. This is compared to the 20% rewarded to non-airdrop
                  participants buying our regular shirts (replica NTees).
                </li>
                <li>
                  - New customers can only buy shirts that someone else
                  completed before, and since you are the first ones there, you
                  will receive 40% every time a shirt with your phrase is sold!
                  So make sure you write something unique and interesting for
                  people to wear.
                </li>
              </ul>
              <span className="text-gray-700 text-[14px] font-sora font-semibold mt-5">
                Please watch the video below to understand exactly how to claim
                your airdrop if you are one of the 50 lucky winners.
              </span>
            </div>
          </div>
        </section>
        <section id="ExplanationVideo" className="mb-8">
          <div className="bg-[#F2F3F6] rounded-[20px] p-6 md:px-[60px] md:py-[40px] mt-8">
            <p className="font-bold font-poppins text-[24px] text-primary2 mb-4">
              Explanation Video
            </p>
            <div className="youtube w-full md:w-[600px] h-[400px]">
              <div className="w-full h-full mt-3">
                <iframe
                  src="https://youtube.com/embed/vhAtqnIl2yg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"></iframe>
              </div>
            </div>
          </div>
        </section>

        <section id="FillOutWhitelistForm" className="mb-8">
          <div className="bg-[#F2F3F6] rounded-[20px] p-6 md:px-[60px] md:py-[40px] mt-8">
            <p className="font-bold font-poppins text-[24px] text-primary2 mb-4">
              Fill Out Whitelist Form
            </p>
            <div className="youtube w-full md:w-[600px] h-full">
              <div className="w-full h-full mt-3">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdC-7HU9AxmjW66Of4EJKIWtfzVAAgSyUq6ry9HvBvGekETYA/viewform?embedded=true"
                  width="100%"
                  height="520"
                  frameBorder="0"
                  // marginheight="0"
                  // marginwidth="0">
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Content;
