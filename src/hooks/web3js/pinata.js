// require('dotenv').config();
const API_KEY = process.env.PINATA_API_KEY;
const API_SECRET = process.env.PINATA_API_SECRET;
import { axiosPublic } from "../../services/axiosPublic";

const axios = require('axios');

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axiosPublic.post(url, JSONBody, {
    headers: {
      pinata_api_key: "a4ae70cca7ca80f05b81",
      pinata_secret_api_key: "040da715427505033abe3ec43151f5a3d0cf74960209b22816e365c0f3242470",
    }
  })
    .then(function (response) {
      return {
        success: true,
        pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }

    });
};
