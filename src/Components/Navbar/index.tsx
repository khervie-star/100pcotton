import Image from "next/image";
import React, { useState } from "react";
import logo from "../../Assets/images/logo-f 16.svg";
import whitelogo from "../../Assets/images/whiteLogo.png";
import Link from "next/link";
import { OutlinedButton, SolidButton } from "../Buttons";
import { useRouter } from "next/router";

import Banner from "./Banner";
import Nav from "./Nav";

const navLinks = [
  // {
  //   id: 1,
  //   name: "Originals",
  //   path: "/dashboard/originals",
  // },
  {
    id: 1,
    name: "How it works",
    path: "#how-it-works",
  },
  // {
  //   id: 2,
  //   name: "Auctions",
  //   path: "/dashboard/auctions",
  // },

  // {
  //   id: 3,
  //   name: "Favorites",
  //   path: "/dashboard/favorites",
  // },
  // {
  //   id: 4,
  //   name: "Propose",
  //   path: "/dashboard/user/profile",
  // },
  // {
  //   id: 3,
  //   name: "Top Selling",
  //   path: "/dashboard/top-selling",
  // },
  {
    id: 2,
    name: "Roadmap",
    path: "#roadmap",
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
];

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const toggleNavbar = () => {
    setMobileNav(true);
  };
  const router = useRouter();

  const continueToShop = () => {
    router.push("/dashboard");
  };

  return (
    <div className="fixed w-full z-[9999] top-0">
      <Banner />
      <Nav />

      <div className={`navbar-menu relative  z-[9999]`}>
        {/* <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div> */}
        <nav
          className={`fixed top-0 ${
            mobileNav ? "left-[0%]" : "left-[100%]"
          } z-[9999] bottom-0 flex flex-col w-full max-w-sm py-6 px-6 bg-[white] border-r overflow-y-auto transition-all duration-500 ease-in-out`}>
          <div className="flex items-center mb-8">
            <Link className="mr-auto text-3xl font-bold leading-none" href="/">
              <Image src={logo} width={100} height={100} alt="100pcotton" />
            </Link>
            <button
              role="button"
              id="button"
              aria-label="toggleButton"
              aria-labelledby="nav-menu"
              className="navbar-close"
              onClick={() => setMobileNav(false)}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul className="font-sora">
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="/">
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#how-it-works">
                  How it works
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="/dashboard/auctions">
                  Auctions
                </Link>
              </li>
              {/* <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="/dashboard/favorites">
                  Favorites
                </Link>
              </li> */}
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="#roadmap">
                  Roadmap
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
          <div className="mt-auto hidden md:flex">
            <div className="pt-6">
              <Link
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                href="#">
                Sign in
              </Link>
              <SolidButton>My account</SolidButton>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2021</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
