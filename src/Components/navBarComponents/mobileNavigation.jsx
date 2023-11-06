import * as React from "react";
import { motion } from "framer-motion";
import { MobileMenuItem } from "./menuItem";
import {
  Avatar,
  Button,
  Paper,
  Menu,
  MenuItem,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
// import useWeb3 from "../../hooks/web3js/web3context";
// import Link from "../../utility/Link";
// import ConnectWallet from "../connectWallet";
import { ethers } from "ethers";
import { DotLoader } from "react-spinners";
import Image from "next/image";
import matic from "../../../public/static/logos/matic.png";
import {
  SolidGrayButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
} from "../Buttons";
import { useWallet } from "../../Provider/WalletContext";

const variants = {
  open: {
    x: 500,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    x: 0,
  },
};

export const MobileNavigation = ({ toggle, loggedIn, user, logout }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [accounts, setAccounts] = React.useState();
  const [balance, setEthBalance] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState("");

  const [ethbalance, setBalance] = React.useState();
  const [currentAccount, setCurrentAccount] = React.useState();
  const [chainId, setChainId] = React.useState();
  const [chainname, setChainName] = React.useState();
  const handleWalletModalOpen = () => {
    setOpen(!open), console.log(open);
  };
  const handleWalletModalClose = () => setOpen(false);
  // const { onDisconnect, onConnect } = useWeb3();

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // }

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
        localStorage.setItem("isWalletConnected", true);
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    localStorage.setItem("isWalletConnected", false);
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  // React.useEffect(() => {
  //   if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
  //   //client side code
  //   if (!window.ethereum) return;
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   provider.getBalance(currentAccount).then((result) => {
  //     setBalance(ethers.utils.formatEther(result));
  //     // props.addWalletDetails({
  //     //   currentAccount: currentAccount,
  //     //   walletBalance: ethers.utils.formatEther(result),
  //     // });
  //   });
  //   provider.getNetwork().then((result) => {
  //     setChainId(result.chainId);
  //     setChainName(result.name);
  //   });
  // }, [currentAccount]);

  // const handleConnect = () => {
  //   handleWalletModalClose();
  //   setLoading(true);
  //   onConnect();
  // };

  const handleLogout = () => {
    toggle();
    logout();
  };
  const handleProfileClick = () => {
    toggle();
    router.push("/dashboard/user/profile");
  };

  const { wallet, connectWallet, connectingWallet, disconnectWallet } =
    useWallet();

  console.log(loggedIn);
  const primaryPaths = [
    { name: "Home", link: "/dashboard", id: 1 },
    // { name: "Originals", link: "/dashboard/originals", id: 2 },
    { name: "Explore Shirts", link: "/dashboard/search", id: 2 },
    {
      name: "Propose",
      // link: "/user/profile",
      link: loggedIn
        ? user?.role === "admin"
          ? "/dashboard/propose-shirt/admin?token=0"
          : "/dashboard/user/profile"
        : "/dashboard/propose-shirt/play",
      id: 3,
    },
    { name: "Auctions", link: "/dashboard/auctions", id: 4 },
    {
      name: "Top Selling",
      link: "/dashboard/top-selling",
      id: 5,
    },
    { name: "Favorites", link: "/dashboard/favorites", id: 6 },
    { name: "Help", link: "/dashboard/help", id: 7 },
    { name: "Settings", link: "/dashboard/settings", id: 8 },
  ];

  const filteredNavLinks = primaryPaths.filter(
    (item) => !loggedIn && item.name !== "Settings" && item.name !== "Favorites"
  );

  return (
    <>
      <motion.ul variants={variants} className="nav_toggle_list">
        {primaryPaths.map((value, i) => (
          <MobileMenuItem
            i={i}
            key={i}
            name={value.name}
            link={value.link}
            toggle={toggle}
          />
        ))}
        {/* <div> */}
        {loggedIn && (
          <>
            <div className={"absolute right-5 top-5"}>
              <div
                className={
                  "flex items-center cursor-pointer font-bold text-[#fff]"
                }
                onClick={() => handleLogout()}>
                <Logout
                  fontSize="small"
                  style={{ color: "#fffafa", marginRight: "5px" }}
                />
                Logout
              </div>
            </div>
            <div>
              <div
                className="w-full flex items-center text-[1.5em] font-bold cursor-pointer my-4 text-[white]"
                onClick={handleProfileClick}>
                <Avatar
                  alt={user?.firstName}
                  src={user?.profilePicture}
                  sx={{
                    bgcolor: "#b22222",
                    border: "2px solid #f1bc31",
                    marginRight: "5px",
                  }}
                />
                Profile
              </div>
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
          </>
        )}
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
        {!loggedIn && (
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
        )}
        {/* </div> */}
      </motion.ul>
      {/* MODAL COMPONENT */}
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
    </>
  );
};
