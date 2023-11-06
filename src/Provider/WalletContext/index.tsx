import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

// Create a context for global state
const WalletContext: any = createContext(null);

// Create a provider component
const WalletProvider = ({ children }: any) => {
  const [wallet, setWallet] = useState({
    address: "",
    balance: "",
    isConnected: false,
  });
  const [connectingWallet, setConnectingWallet] = useState(false);

  // Function to connect wallet
  const connectWallet = async () => {
    setConnectingWallet(true);
    try {
      // Connect the wallet using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Get the wallet address
      const address = await signer.getAddress();

      // Get the wallet balance
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);
      setWallet({
        address: address,
        balance: formattedBalance,
        isConnected: true,
      });
      setConnectingWallet(false);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setConnectingWallet(false);
    }
  };

  const disconnectWallet = () => {
    // Clear wallet info and set isConnected to false
    setWallet({
      address: "",
      balance: "",
      isConnected: false,
    });
  };

  console.log(wallet);

  return (
    <WalletContext.Provider
      value={{ wallet, connectWallet, connectingWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;

// Custom hook to access the global state
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
