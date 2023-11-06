import React from "react";
import Image from "next/image";

import shirt1 from "../../../Assets/images/Item-1.svg";
import shirt2 from "../../../Assets/images/Item-2.svg";
import shirt3 from "../../../Assets/images/Item.svg";
import sphere1 from "../../../Assets/images/sphere-dynamic-clay.svg";
import sphere2 from "../../../Assets/images/sphere-dynamic-gradient.svg";
import sphere4 from "../../../Assets/images/sphere-dynamic-clay-2.svg";
import link from "../../../Assets/images/link-dynamic-clay.svg";
import purpleblur from "../../../Assets/images/purpleblur.svg";
import yellowblur from "../../../Assets/images/yellowblur.svg";

const SectionThree = () => {
  return (
    <div className="container mx-auto p-8 md:p-16 relative">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 h-[350px] ">
          <div className="relative p-8 w-[80%] md:w-[60%]">
            <Image
              src={shirt3}
              className="absolute w-full top-0 left-0"
              alt=""
              width={100}
            />
            <Image
              src={shirt1}
              className="absolute top-10 left-10 w-full"
              alt=""
              width={100}
            />
            <Image
              src={shirt2}
              className="absolute top-20 left-20 w-full "
              alt=""
              width={100}
            />
          </div>
        </div>
        <div className="p-0 md:p-16 mt-12 md:mt-0">
          <h6 className="font-sora font-semibold text-[48px] md:text-[64px] text-secondaryBlack leading-[48px] md:leading-[64px] tracking-[0.2px] mb-6">
            Brand Vision
          </h6>
          <div className="font-inter font-normal text-base text-textGray leading-[24px] tracking-[0.2px] divide-y divide-[#E2E2ED]">
            <p className="py-8">
              Our brand vision is to create a new standard for the clothing
              industry that prioritizes affordability, utility, and community.
              By offering our customers the ability to engage with and benefit
              from our brand, we hope to create a loyal and passionate community
              that is dedicated to 100pCotton.
            </p>
            <p className="py-8">
              In conclusion, 100pCotton is a brand that combines innovative
              technology, a commitment to quality, and a passion for empowering
              our customers to express themselves.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mr-[450px] -mt-[50px]">
        <Image src={purpleblur} alt="" width={100} className="w-full" />
      </div>
      <div className="absolute bottom-0 right-0 -mr-[150px] mb-[100px]">
        <Image src={yellowblur} alt="" width={100} className="w-full" />
      </div>
      <div className="absolute bottom-[590px] left-[110px] -ml-[0] -mb-[0]">
        <Image src={sphere1} alt="" width={80} className="w-[80%]" />
      </div>
      <div className="absolute bottom-[520px] left-[500px]  -ml-[0] -mb-[0]">
        <Image src={sphere2} alt="" width={100} className="w-full" />
      </div>{" "}
      <div className="absolute bottom-[595px] left-[150px] -ml-[0] -mb-[0] -z-50">
        <Image src={link} alt="" width={100} className="w-full" />
      </div>
      <div className="absolute bottom-[150px] left-[550px] -ml-[0] -mb-[0]">
        <Image src={sphere4} alt="" width={100} className="w-full" />
      </div>
    </div>
  );
};

export default SectionThree;
