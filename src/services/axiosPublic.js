import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: `https://api.100pcotton.com/v1`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});


