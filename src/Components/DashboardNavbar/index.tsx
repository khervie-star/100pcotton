import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { userActions } from "../../redux/actions";
import { connect } from "react-redux";

import { useRouter } from "next/router";
import { dropdownData } from "../../utility/data";
import { Turn as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { MobileNavigation } from "../navBarComponents/mobileNavigation";
import { useDimensions } from "../../hooks/useDimensions";
import authTokenService from "../../services/authToken.service";
import {
  SolidButton,
  SolidGrayButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
  SolidYellowButton,
} from "../Buttons";
import whiteLogo from "../../Assets/images/whiteLogo.png";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at -40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const DashboardNavbar = (props: {
  getUser?: any;
  loggedIn: any;
  privateLogout?: any;
  user?: any;
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const containerRef = React.useRef(null);
  const { height } = useDimensions(containerRef);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    if (loggedIn) {
      props.getUser(authTokenService.getUserId());
    }
  }, [props.loggedIn]);

  const handleLogout = () => {
    // e.preventDefault();
    props.privateLogout();
    toggleDropdown();
  };

  const handleUserProfile = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dashboard/user/profile");
    toggleDropdown();
  };

  const handleSettings = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dashboard/settings");
    toggleDropdown();
  };

  const handleAddress = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dashboard/user/address");
    toggleDropdown();
  };

  const handleOrders = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dashboard/orders");
    toggleDropdown();
  };

  const hideImg = () => {};

  const { loggedIn, user } = props;

  console.log(loggedIn);

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-between md:justify-end px-4 md:px-16 py-3 bg-transparent border-none h-[98%]">
        <div className="w-1/6 h-full flex justify-center md:hidden m-4">
          <Link href="/" as="/">
            {/* <img
              src="/static/logos/alignedLogo2.png"
              alt="100NFT"
              height="100%"
            />
             */}
            <Image src={whiteLogo} width={75} height={75} alt="" />
          </Link>
        </div>
        {/* {!loggedIn && (
          <div className="flex items-center gap-2">
            <SolidGrayButton
              onClick={() => router.push("/dashboard/account/login")}>
              Login
            </SolidGrayButton>
            <SolidGrayButton
              onClick={() => router.push("/dashboard/account/signup")}>
              Sign up
            </SolidGrayButton>
          </div>
        )} */}

        {/* {loggedIn && ( */}
        <div className="flex items-center">
          <div className="flex z-[800] md:hidden">
            <Hamburger
              toggled={isMenuOpen}
              toggle={setMenuOpen}
              duration={0.8}
              size={24}
              color="#fff"
              rounded
            />
          </div>
          <button
            onClick={toggleDropdown}
            className="relative z-10 h-12 w-12 rounded-full overflow-hidden border-2 border-yellow bg-[#b22222] focus:outline-none focus:border-white hidden md:block">
            {user?.profilePicture?.length > 0 ? (
              <img
                alt={user?.firstName}
                src={user?.profilePicture}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-[18px] font-bold text-yellow w-full h-full flex justify-center items-center">
                {user?.firstName?.slice(0, 1)}
              </div>
            )}
          </button>
          {isDropdownOpen && (
            <div className="origin-top-right absolute top-16 right-4 mt-2 w-48 rounded-md shadow-lg z-50">
              <div className="py-1 rounded-md bg-white shadow-xs">
                <div
                  onClick={handleUserProfile}
                  className="px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex items-center gap-2 cursor-pointer">
                  <div className="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-none border-yellow bg-[#b22222] focus:outline-none focus:border-white">
                    {user?.profilePicture?.length > 0 ? (
                      <img
                        alt={user?.firstName}
                        src={user?.profilePicture}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-[18px] font-bold text-yellow w-full h-full flex justify-center items-center">
                        {user?.firstName?.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div>My Account</div>
                </div>

                {dropdownData.map((data, i) => (
                  <div
                    key={i}
                    onClick={eval(data.action)}
                    className="px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex items-center gap-2 cursor-pointer">
                    <data.icon fontSize={24} />
                    <div>{data.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* )} */}
        <motion.div
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className={`absolute top-0 right-0 left-0 bottom-0 w-screen h-screen ${
            isMenuOpen ? "z-[200]" : "-z-[100] hidden"
          } `}>
          <motion.div className="background" variants={sidebar} />
          <MobileNavigation
            toggle={() => setMenuOpen(false)}
            loggedIn={loggedIn}
            logout={() => handleLogout()}
            user={user}
          />
        </motion.div>
      </nav>
    </>
  );
};

function mapState(state: { users: { user: any }; login: { loggedIn: any } }) {
  const { user } = state.users;
  const { loggedIn } = state.login;
  return { loggedIn, user };
}

const actionCreators = {
  getUser: userActions.getUser,
  privateLogout: userActions.privateLogout,
};

const connectedNavbar = connect(mapState, actionCreators)(DashboardNavbar);

// export default DashboardNavbar;

export { connectedNavbar as DashboardNavbar };
