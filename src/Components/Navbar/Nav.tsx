import Link from "next/link";
import React, { useState } from "react";
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
import { SolidButton } from "../Buttons";
import { useRouter } from "next/router";

import logo from "../../Assets/images/logo-f 16_better_quality_cropped.png";
import Image from "next/image";

export default function Nav() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [product, setProduct] = useState(false);
  const [deliverables, setDeliverables] = useState(false);

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
  const navLinks = [
    {
      id: 1,
      name: "How it works",
      path: "/#how-it-works",
    },

    {
      id: 2,
      name: "Roadmap",
      path: "/#roadmap",
    },
    {
      id: 3,
      name: "Whitepaper",
      path: "/whitepaper",
    },
    {
      id: 4,
      name: "Airdrop",
      path: "/airdrop",
    },
    {
      id: 5,
      name: "Wear2Earn",
      path: "/wear2earn",
    },
  ];
  return (
    <>
      <div className="h-full bg-[#fafafa] w-full z-[9999]">
        {/* Code block starts */}
        <nav className="bg-transparent xl:block hidden z-[9999]">
          {/* <div
            className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true">
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div>
          <div
            className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
            aria-hidden="true">
            <div
              className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
              }}
            />
          </div> */}
          <div className=" px-6 py-2 xl:py-0">
            <div className="flex items-center justify-between">
              {/* <div className="inset-y-0 left-0 flex items-center xl:hidden">
                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                  <div className="visible xl:hidden">
                    <ul className="p-2 border-r bg-white absolute rounded left-0 right-0 shadow mt-8 md:mt-8 hidden">
                      <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <span className="ml-2 font-bold">Dashboard</span>
                        </div>
                      </li>
                      <li className="flex xl:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                        <div className="flex items-center">
                          <span className="ml-2 font-bold">Products</span>
                        </div>
                      </li>
                      <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <span className="ml-2 font-bold">Performance</span>
                      </li>
                      <li className="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <span className="ml-2 font-bold">Deliverables</span>
                      </li>
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                            <img
                              className="rounded h-10 w-10 object-cover"
                              src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png"
                              alt="logo"
                            />
                          </div>
                          <p className="text-sm ml-2 cursor-pointer">
                            Jane Doe
                          </p>
                          <div className="sm:ml-2 text-white relative"></div>
                        </div>
                      </li>
                      <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                        <div className="flex items-center">
                          <span className="ml-2">Profile</span>
                        </div>
                      </li>
                    </ul>
                    <svg
                      onclick="MenuHandler(this,true)"
                      aria-haspopup="true"
                      aria-label="Main Menu"
                      xmlns="http://www.w3.org/2000/svg"
                      className="show-m-menu icon icon-tabler icon-tabler-menu"
                      width={28}
                      height={28}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={4} y1={8} x2={20} y2={8} />
                      <line x1={4} y1={16} x2={20} y2={16} />
                    </svg>
                  </div>
                  <div
                    className="hidden close-m-menu text-gray-700"
                    onclick="MenuHandler(this,false)">
                    <svg
                      aria-label="Close"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <line x1={18} y1={6} x2={6} y2={18} />
                      <line x1={6} y1={6} x2={18} y2={18} />
                    </svg>
                  </div>
                </div>
              </div> */}
              <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                <div className="flex items-center">
                  <div className=" relative w-[100px] p-3">
                    <Link href="/">
                      <Image src={logo} alt="" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex text-gray-500 font-sora font-semibold">
                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                  {navLinks.map((navLink, index) => (
                    <Link
                      key={navLink.id}
                      href={navLink.path}
                      className="flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                      {navLink.name}
                    </Link>
                  ))}
                </div>

                <div className="hidden xl:flex items-center">
                  <div className="relative md:mr-0 my-2">
                    <SolidButton onClick={continueToShop}>
                      Continue to shop
                    </SolidButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <nav>
          <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40">
            <div
              className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              aria-hidden="true">
              <div
                className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                style={{
                  clipPath:
                    "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                }}
              />
            </div>
            <div
              className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
              aria-hidden="true">
              <div
                className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                style={{
                  clipPath:
                    "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                }}
              />
            </div>
            <div className="w-24">
              <Link href="/">
                <Image src={logo} alt="" />
              </Link>
            </div>
            <div className="flex items-center">
              {/* <div className="relative mr-6 ">
                  <SolidButton onClick={continueToShop}>
                    Continue to shop
                  </SolidButton>
                </div> */}
              <div
                id="menu"
                className="text-gray-800"
                onClick={() => setShow(!show)}>
                {show ? (
                  ""
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-menu-2"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1={4} y1={6} x2={20} y2={6} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={18} x2={20} y2={18} />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full xl:hidden h-screen top-0 absolute z-[9999]  transform  translate-x-0 duration-300"
                : "   w-full xl:hidden h-screen top-0 absolute z-[9999]  transform -translate-x-full duration-300"
            }>
            <div
              className="bg-gray-800 opacity-50 w-full h-full"
              onClick={() => setShow(!show)}
            />
            <div className="w-64 z-40 fixed overflow-y-auto top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-300 ease-in">
              <div className="px-6 h-full">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="mt-6 flex w-full items-center justify-between">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                          <div className=" relative w-1/2 px-3">
                            <Link href="/">
                              <Image src={logo} alt="" />
                            </Link>{" "}
                          </div>
                        </div>
                        <div
                          id="cross"
                          className="text-gray-800"
                          onClick={() => setShow(!show)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-x"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <ul className="f-m-m font-sora mt-6">
                      <li className="mb-1">
                        <Link
                          className="block p-3 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                          href="/">
                          Home
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link
                          className="block p-3 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                          href="/#how-it-works">
                          How it works
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link
                          className="block p-3 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                          href="/#roadmap">
                          Roadmap
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link
                          className="block p-3 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                          href="/airdrop">
                          Airdrop
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link
                          className="block p-3 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                          href="/whitepaper">
                          Whitepaper
                        </Link>
                      </li>
                      <li className="mb-1">
                        <Link
                          className="block p-3 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded"
                          href="/wear2earn">
                          Wear2Earn
                        </Link>
                      </li>

                      <li className="mt-auto  flex">
                        <div className="pt-6">
                          <SolidButton onClick={continueToShop}>
                            Continue to shop
                          </SolidButton>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full pt-4">
                    <div className="text-center font-poppins font-light text-[14px] text-textGray">
                      &copy; 2023 100pCotton
                    </div>
                    <div className="border-t border-gray-300">
                      <div className="w-full flex items-center justify-between pt-1">
                        <div className="flex gap-4 items-center text-[16px] ">
                          {socials.map((social, i) => (
                            <Link
                              key={i}
                              href={social.path}
                              className="gradient-text bg-gradient-to-tr from-primary1 to-primary2  bg-clip-text fill-transparent text-primary2">
                              <social.icon />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Code block ends */}
      </div>
    </>
  );
}
