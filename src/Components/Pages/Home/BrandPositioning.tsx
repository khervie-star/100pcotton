import React from "react";
import Image from "next/image";

import bag from "../../../Assets/images/bag-dynamic-gradient.webp";
import chess from "../../../Assets/images/chess-dynamic-gradient.webp";
import heart from "../../../Assets/images/notify-heart-dynamic-gradient.webp";
import purpleblur from "../../../Assets/images/purpleblur.svg";
import yellowblur from "../../../Assets/images/yellowblur.svg";
import lineCotton from "../../../Assets/images/line cotton.svg";

const sectionData = [
  {
    id: 1,
    image: chess,
    title: "Power",
    content:
      "  to complete the phrase based on a uniform model provided for the entire community together. Our brand utilizes a cutting-edge NFT checkout mechanism. And if the phrase becomes popular, the owner can auction off the rights to someone else, ensuring that the cycle of creativity and reward continues. This is all thanks to the power of NFT technology.",
  },
  {
    id: 2,
    image: bag,
    title: "Affordability",
    content:
      "  We believe everyone should have access to stylish, well-made clothing, which is why we offer all of our T-shirts at a competitive price of $35. We are committed to not having outrageous NFT pricing and ensuring that our products are accessible to all.",
  },
  {
    id: 3,
    image: heart,
    title: "Community",
    content:
      "  We aim to foster a sense of community and belonging among our customers through our unique NFT checkout mechanism. Customers who purchase one of our T-shirts can propose a model phrase to be printed on the shirt, and if it is bought, they receive 20% of all sales made with that phrase forever. This creates a network of customers who are connected by their shared love of fashion and the brand.",
  },
];

const BrandPositioning = () => {
  return (
    <div className="container mx-auto p-8 md:p-16 relative">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-0 md:p-16">
          <h6 className="font-sora font-semibold text-[48px] md:text-[64px] text-secondaryBlack leading-[48px] md:leading-[64px] tracking-[0.2px] mb-6">
            Brand Positioning
          </h6>
          <p className="font-inter font-normal text-[14px] md:text-base text-textGray leading-[24px] tracking-[0.2px]">
            100pCotton is a new clothing brand that offers customers a unique
            and innovative shopping experience through NFTs. Our brand
            positioning is centered around utility, affordability, and
            community.
          </p>
        </div>
        <div>
          <div className="flex flex-col divide-y divide-[#E2E2ED]">
            {sectionData.map((data, index) => (
              <div
                className="flex flex-row items-center gap-4 py-8"
                key={data.id}>
                <div className="icon relative basis-1/4">
                  <Image src={data.image} alt="" width={100} quality={100} />
                </div>
                <div className="basis-3/4">
                  <span className="font-inter font-bold text-[black] text-base leading-[24px]">
                    {data.title}:
                  </span>
                  <span className="font-inter font-normal text-textGray text-base leading-[24px]">
                    {data.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 -ml-[280px] -mt-[0px]">
        <Image src={purpleblur} alt="" width={100} className="w-[80%]" />
      </div>
      <div className="absolute bottom-0 right-0 -mr-[200px] mb-[200px]">
        <Image src={yellowblur} alt="" width={100} className="w-full" />
      </div>
      <div className="absolute bottom-[0] left-[0] -ml-[10px] -mb-[190px]">
        <Image src={lineCotton} alt="" width={120} className="w-[110%]" />
      </div>
      <div className="absolute bottom-[0] left-[0] -ml-[10px] -mb-[200px] rotate-[9deg]">
        <Image src={lineCotton} alt="" width={120} className="w-[110%]" />
      </div>
    </div>
  );
};

export default BrandPositioning;
