import Image from "next/image";
import React from "react";

const ComingSoon = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center text-center bg-gradient-to-b from-primary to-[#7C0A02]">
      <div>
        <div className="w-[250px] md:w-[250px] relative">
          <Image src="/static/logos/alignedLogo2.png" layout="fill" />
          <div className="text-white text-[16px] md:text-[24px]">
            Coming soon!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
