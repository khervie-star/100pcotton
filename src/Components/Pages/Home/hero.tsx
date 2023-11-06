import React from "react";
import sphere1 from "../../../Assets/images/sphere-dynamic-clay.svg";
import sphere2 from "../../../Assets/images/sphere-dynamic-clay-2.svg";
import bigSphere from "../../../Assets/images/sphere-dynamic-gradient.png";
import camera from "../../../Assets/images/camera-dynamic-clay.svg";
import link from "../../../Assets/images/link-dynamic-clay.svg";
import Image from "next/image";

const HeroPage = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full h-screen flex justify-center items-center bg-hero bg-cover bg-no-repeat bg-bottom p-8 md:p-24 ">
        <div className="w-full md:w-[80%] mx-auto">
          <div className="font-sora font-semibold text-secondaryBlack text-[110px] z-50 relative">
            <div className="font-sora font-semibold text-secondaryBlack text-[40px] leading-[50px] md:text-[110px] md:leading-[130px] tracking-[0.2px] mb-2">
              Wear your
            </div>
            <div className="gradient-text uppercase font-sora font-extrabold text-secondaryBlack text-[40px] md:text-[120px] leading-[50px] md:leading-[120px] tracking-[0.2px] md:ml-[200px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent mb-2 flex-wrap break-words ">
              CREATIVITY
            </div>
            <div className="font-sora font-semibold text-secondaryBlack text-[40px] leading-[50px] md:text-[110px] md:leading-[130px] tracking-[0.2px] md:ml-[75px]">
              own your story.
            </div>
            {/* <div className="" */}
            <Image
              src={bigSphere}
              alt=""
              width={300}
              className="absolute bottom-0 left-1/3 -z-10 -mb-[180px]"
              priority
            />
            <Image
              src={camera}
              alt=""
              width={120}
              className="absolute bottom-0 left-1/3 -z-10 -mb-[180px] ml-[200px]"
              priority
            />
            <Image
              src={link}
              alt=""
              width={100}
              className="absolute bottom-0 left-1/3 -z-20 -mb-[120px] -ml-[20px]"
              priority
            />
            <Image
              src={sphere2}
              alt=""
              width={20}
              className="absolute top-[200px] left-[150px] -z-10 -mb-[180px] "
              priority
            />
            <Image
              src={sphere2}
              alt=""
              width={20}
              className="absolute top-10 left-2/3 -z-20 "
              priority
            />{" "}
            <Image
              src={sphere1}
              alt=""
              width={50}
              className="absolute top-0 left-2/3 -z-10 -mb-[180px] -ml-[100px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
