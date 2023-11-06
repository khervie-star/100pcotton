import Image from "next/image";
import React from "react";
import macbook from "../../../Assets/images/MacBook-Pro-16-f 2.svg";
import iphone from "../../../Assets/images/iPhone-Xs-Recovered-2 1.svg";
import blackLogoPattern from "../../../Assets/images/black logo pattern.svg";

const SectionSix = () => {
  return (
    <div className="container mx-auto p-8 md:p-16 relative">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-0 md:p-16">
          <h6 className="font-sora font-semibold text-[48px] md:text-[64px] text-secondaryBlack leading-[48px] md:leading-[80.64px] tracking-[0.2px] mb-6 ">
            TOP statements for a Landing Page
          </h6>
          <h6 className="font-sora font-bold text-[24px] text-secondaryBlack leading-[36px] tracking-[0.2px] mb-4">
            &quot;100pCotton: Where fashion meets technology.&quot;
          </h6>
          <p className="py-8 font-inter font-normal text-[14px] md:text-base text-textGray leading-[20px] md:leading-s  [24px] tracking-[0.2px]">
            This brand positioning statement positions 100pCotton as a
            forward-thinking brand at the forefront of innovation in the fashion
            industry. By highlighting the brand&apos;s use of technology, this
            statement aims to attract customers interested in cutting-edge
            fashion and shopping experiences. This statement is ideal for
            marketing campaigns aimed at customers who value technology and
            innovation in their fashion choices.
          </p>
        </div>
        <div className="p-8 relative hidden md:block">
          <Image
            src={macbook}
            className="absolute top-0 left-0"
            alt=""
            width={1000}
          />
          <Image
            src={iphone}
            className="absolute top-[200px] left-0"
            alt=""
            width={200}
          />
          <Image
            src={blackLogoPattern}
            className="absolute top-[0] right-0 -z-20 -mr-[100px]"
            alt=""
            width={400}
          />{" "}
          <Image
            src={blackLogoPattern}
            className="absolute top-[300px] right-0 -z-20 -mr-[100px]"
            alt=""
            width={500}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionSix;
