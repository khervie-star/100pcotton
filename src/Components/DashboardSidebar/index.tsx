/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Backdrop, Modal } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import toast from "react-hot-toast";
import useWeb3 from "../../hooks/web3js/web3context";
// import Link from "../../utility/Link";
// import ConnectWallet from "../connectWallet";
import { ethers } from "ethers";
import { DotLoader } from "react-spinners";
import Link from "next/link";

import { connect } from "react-redux";
import { JwtParser } from "../../helpers";
import { userActions, tempDataActions } from "../../redux/actions";
import matic from "../../../public/static/logos/matic.png";
import Image from "next/image";
import { MdOutlineSettings, MdOutlineHelp } from "react-icons/md";
import authTokenService from "../../services/authToken.service";
import logo from "../../Assets/images/logo-f 16.svg";
import whiteLogo from "../../Assets/images/whiteLogo.png";
import {
  SolidButton,
  SolidGrayButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
  SolidYellowButton,
} from "../Buttons";
import { useWallet } from "../../Provider/WalletContext";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const DashboardSidebar = (props: any) => {
  const router = useRouter();
  // const [wallet, setWallet] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState();
  const [balance, setEthBalance] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState("");

  const [ethbalance, setBalance] = useState<any | null>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState();
  const [chainname, setChainName] = useState();

  const handleWalletModalOpen = () => {
    setOpen(!open), console.log(open);
  };
  const handleWalletModalClose = () => setOpen(false);

  const { wallet, connectWallet, connectingWallet, disconnectWallet }: any =
    useWallet();

  const { user, loggedIn } = props;

  console.log(wallet, "hi", connectingWallet);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
        // localStorage.setItem("isWalletConnected", "true");
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    localStorage.setItem("isWalletConnected", "false");
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  const handleLogout = () => {
    // e.preventDefault();
    props.privateLogout();
    // toggleDropdown();
  };

  const navLinks = [
    {
      name: "Home",
      path: "/dashboard",
      value: "1",
    },
    // {
    //   name: "Originals",
    //   path: "/dashboard/originals",
    //   value: "2",
    // },
    {
      name: "Explore Shirts",
      path: "/dashboard/search",
      value: "2",
    },
    {
      name: "Propose",
      path: props?.loggedIn
        ? props?.user?.role === "admin"
          ? "/dashboard/propose-shirt/admin?token=0"
          : "/dashboard/user/profile"
        : "/dashboard/propose-shirt/play",
      value: "3",
    },
    {
      name: "Auctions",
      path: "/dashboard/auctions",
      value: "4",
    },
    {
      name: "Top Selling",
      path: "/dashboard/top-selling",
      value: "5",
    },
    {
      name: "Favorites",
      path: "/dashboard/favorites",
      value: "6",
    },
    {
      name: "Help",
      path: "/dashboard/help",
      value: "7",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      value: "8",
    },
  ];
  const bottomPanel = [
    {
      name: "Help",
      path: "/dashboard/help",
      value: "7",
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      value: "8",
    },
  ];
  const drawerWidth = 240;

  const filteredNavLinks = navLinks.filter(
    (item) => !loggedIn && item.name !== "Settings" && item.name !== "Favorites"
  );

  return (
    <div className="sidebar h-full overflow-y-scroll font-sora">
      <div className="w-full h-[100px] flex justify-center p-3 mb-2">
        <Link href="/" as="/" className="h-full p-4">
          <Image src={whiteLogo} alt="100pCotton" height={125} width={125} />
        </Link>
      </div>
      <div className="w-full flex flex-col text-center justify-center items-center pt-4">
        <div>
          {navLinks.map((text, index) => (
            <Link
              href={text.path}
              key={index}
              style={{ textDecoration: "none" }}>
              <div
                className={`flex gap-2 items-center !no-underline my-3  font-sora ${
                  router.pathname === text.path
                    ? "font-sora font-semibold text-[16px] text-[white] py-4 px-6 rounded-[0px] flex items-center justify-center border-l-[4px] border-solid border-[#A01AEC] bg-black/5"
                    : "text-[white] !no-underline "
                }`}>
                <div className="no-underline">{text.name}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* <div>
          <Link href="/dashboard/help" style={{ textDecoration: "none" }}>
            <div
              className={`flex gap-3 items-center no-underline my-4 ${
                router.pathname === "/dashboard/help"
                  ? "text-[black] no-underline "
                  : "text-[white] no-underline "
              }`}>
              <MdOutlineHelp fontSize={24} />
              <div className="no-underline">Help</div>
            </div>
          </Link>

          <Link href="/dashboard/settings" style={{ textDecoration: "none" }}>
            <div
              className={`flex gap-3 items-center no-underline my-4 ${
                router.pathname === "/dashboard/settings"
                  ? "text-[black] !no-underline "
                  : "text-[white] !no-underline "
              }`}>
              <MdOutlineSettings fontSize={24} />
              <div className="no-underline">Settings</div>
            </div>
          </Link>
        </div> */}
        <div>
          {loggedIn ? (
            <div>
              <div
                className="items-center justify-center flex gap-3 text-[white] font-semibold text-[18px] cursor-pointer"
                onClick={() => router.push("/dashboard/user/profile")}>
                <div className="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-[1px] border-primary1 bg-transparent focus:outline-none focus:border-white">
                  {user?.profilePicture?.length > 0 ? (
                    <img
                      alt={user?.firstName}
                      src={user?.profilePicture}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-[18px] font-bold text-[white] w-full h-full flex justify-center items-center">
                      {user?.firstName?.slice(0, 1)}
                    </div>
                  )}
                </div>
                Profile
              </div>
              <div className="text-center w-full flex justify-center my-6">
                <SolidGrayButton onClick={handleLogout}>Logout</SolidGrayButton>
              </div>
            </div>
          ) : (
            <div className="text-center w-full flex flex-col gap-4 justify-center my-6">
              <SolidButton
                onClick={() => router.push("/dashboard/account/login")}>
                Login
              </SolidButton>
              <SolidGrayButton
                onClick={() => router.push("/dashboard/account/signup")}>
                Sign up
              </SolidGrayButton>
            </div>
          )}

          {loggedIn && (
            <>
              {!wallet.isConnected && (
                <div
                  onClick={connectWallet}
                  className="w-full bg-gradient-to-r from-primary1 to-primary2 shadow-[-4px_-4px_4px_0px_#0000001A_inset] rounded-[1em] flex p-4 my-4  justify-center items-center text-[#fff] text-[20px] font-bold cursor-pointer">
                  {connectingWallet ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <DotLoader size={24} color="#F1BC31" />
                    </div>
                  ) : (
                    "  Connect wallet"
                  )}
                </div>
              )}

              {wallet.isConnected && (
                <div
                  className="w-full bg-gradient-to-r from-primary1 to-primary2 shadow-[-4px_-4px_4px_0px_#0000001A_inset] rounded-[1em] flex px-12 p-4 my-4 justify-center items-center text-center text-[20px] font-bold cursor-pointer"
                  onClick={disconnectWallet}>
                  <div onDoubleClick={disconnectWallet}>
                    <>
                      <div className="text-[13px] text-[#fafafa] my-1">
                        Balance
                      </div>
                      <div className="flex justify-center items-center gap-2 my-2 font-bold text-[#F1BC31] text-[24 px]">
                        <div> {parseFloat(wallet.balance).toFixed(3)}</div>
                        <div
                          className={
                            "relative w-[22px] h-[25px] border border-solid border-transparent rounded-[50px]"
                          }>
                          <Image
                            src={matic}
                            alt=""
                            fill
                            className={
                              "w-5 h-5 border border-solid border-transparent rounded-[50px]"
                            }
                          />
                        </div>
                      </div>
                      <div className="text-[12px] text-[#fafafa] my-1">
                        {wallet?.address.slice(0, 5) +
                          "..." +
                          wallet?.address.slice(
                            wallet.address.length - 5,
                            wallet.address.length
                          )}
                      </div>

                      <div className="text-[10px] font-thin text-[#fafafa] my-1">
                        Click to disconnect
                      </div>
                    </>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <Modal
          aria-labelledby="Login Modal"
          aria-describedby="login-modal-description"
          open={open}
          onClose={handleWalletModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}>
          <div>
            {/* <ConnectWallet
              // parentCallback={callback}
              handleConnect={handleConnect}
            /> */}
          </div>
        </Modal>
      </div>
    </div>
  );
};

// export default Sidebar;

function mapState(state: any) {
  const { user } = state.users;
  const { loggedIn } = state.login;
  // const { tokens } = token;
  return { loggedIn, user };
}

const actionCreators = {
  getUser: userActions.getUser,
  addWalletDetails: tempDataActions.addWalletDetails,
  privateLogout: userActions.privateLogout,
};

const ConnectedSidebar = connect(mapState, actionCreators)(DashboardSidebar);
export default ConnectedSidebar;
