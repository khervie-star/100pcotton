import Image from "next/image";
import React from "react";
import logo from "../../Assets/images/logo-f 16.png";
import Link from "next/link";
import { SolidButton } from "../Buttons";

import {
  FaDiscord,
  FaFacebook,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  const continueToShop = () => {
    router.push("/dashboard");
  };

  const socials = [
    {
      name: "Discord",
      path: "https://discord.gg/BY5RQyd6Gt",
      icon: FaDiscord,
    },
    {
      name: "Youtube",
      path: "https://www.youtube.com/@100pNFT ",
      icon: FaYoutube,
    },
    {
      name: "Tiktok",
      path: "https://www.tiktok.com/@100pnft ",
      icon: FaTiktok,
    },
    {
      name: "Twitter",
      path: "https://twitter.com/100pNFT ",
      icon: FaTwitter,
    },
    {
      name: "Facebook",
      path: "https://www.facebook.com/profile.php?id=100087585485407 ",
      icon: FaFacebookF,
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com/100pnft/ ",
      icon: FaInstagram,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/company/100pnft",
      icon: FaLinkedinIn,
    },
  ];
  return (
    <footer className="container mx-auto p-8 md:p-16">
      {/* <div className="border border-solid border-[#D9D9D9] rounded-[20px] grid grid-cols-1 md:grid-cols-3 gap-4  md:divide-x md:divide-[#D9D9D9]">
        <div className="px-6 py-8 flex flex-col justify-between">
          <div className="relative w-[40%]">
            <Image src={logo} alt="" width={100} height={100} />
          </div>
          <div className="w-full flex items-center gap-7">
            <Link
              href="#"
              className="font-inter text-[14px] text-textGray leading-[21px] tracking-[0.2px] font-normal">
              Support
            </Link>

            <Link
              href="#"
              className="font-inter text-[14px] text-textGray leading-[21px] tracking-[0.2px] font-normal">
              Term of service
            </Link>

            <Link
              href="#"
              className="font-inter text-[14px] text-textGray leading-[21px] tracking-[0.2px] font-normal">
              License
            </Link>
          </div>
        </div>
        <div className="p-6 pt-8">
          <div className="footer-links flex flex-col gap-4">
            <Link
              href="#"
              className="font-sora font-semibold text-base leading-[20.16px] tracking-[0.2px] text-secondaryBlack">
              Auctions
            </Link>
            <Link
              href="#"
              className="font-sora font-semibold text-base leading-[20.16px] tracking-[0.2px] text-secondaryBlack">
              Roadmap
            </Link>
            <Link
              href="#"
              className="font-sora font-semibold text-base leading-[20.16px] tracking-[0.2px] text-secondaryBlack">
              Discover
            </Link>
            <Link
              href="#"
              className="font-sora font-semibold text-base leading-[20.16px] tracking-[0.2px] text-secondaryBlack">
              Community
            </Link>
          </div>
          <div className="my-12">
            <SolidButton>My account</SolidButton>
          </div>
          <div className="social-links flex gap-5 items-center">
            <Link
              href="#"
              className="text-[#7780A1] bg-[white] text-[24px]"
              aria-label="Facebook Icon">
              <FaFacebookSquare />
            </Link>
            <Link
              href="#"
              className="text-[#7780A1] bg-[white] text-[24px]"
              aria-label="Twiter Icon">
              <FaTwitterSquare />
            </Link>
            <Link
              href="#"
              className="text-[#7780A1] bg-[white] text-[24px]"
              aria-label="Instagram Icon">
              <FaInstagramSquare />
            </Link>
            <Link
              href="#"
              className="text-[#7780A1] bg-[white] text-[24px]"
              aria-label="Youtube Icon">
              <FaYoutubeSquare />
            </Link>
          </div>
        </div>
        <div className="px-6 py-8 flex flex-col justify-between">
          <p className="font-inter text-[16px] text-textGray leading-[24px] tracking-[0.2px] font-normal">
            Please subscribe to our weekly newsletter to receive updates.
          </p>
        </div>
      </div> */}
      <div className="w-full flex justify-center items-center my-6">
        <SolidButton onClick={continueToShop}>Continue to shop</SolidButton>
      </div>
      <div className="border-t border-solid border-[#D9D9D9] flex gap-5  justify-center items-center md:divide-x md:divide-[#D9D9D9]">
        {/* <div className="p-6 pt-8"></div> */}
        <div className="text-[16px] flex flex-row gap-5 items-center mt-4">
          {socials.map((social, i) => (
            <Link
              key={social.name}
              href={social.path}
              target="_blank"
              className="button w-8 h-8 flex justify-center items-center text-primary2 first-letter:shadow-[-4px_-4px_4px_0px_#0000001A_inset] rounded-full cursor-pointer select-none transition-all duration-150 border-none ">
              <social.icon />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
