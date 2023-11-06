import toast from "react-hot-toast";
import { store } from "../redux/store";
import { axiosPrivate } from "./interceptor";

const baseUrl = `https://api.100pcotton.com/v1`;
const ApiUrl = `https://api.100pcotton.com/v1`;

const state = store.getState();

export const orderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  trackOrder,
  sendTxHash,
  getTxHash,
  getAllTransactions,
  getSingleTx,
  sendTxForProposed,
  getProposedTx,
  getCollectedTx,
  validateCode,
};

function createOrder(orderDetails) {
  return axiosPrivate
    .post(`/order`, orderDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getAllOrders() {
  return axiosPrivate
    .get(`/order/get/user`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getAllTransactions() {
  return axiosPrivate.get(`/hash`).then(handleAxiosResponse).catch(handleError);
}

function getSingleTx(hash) {
  return axiosPrivate
    .get(`/hash/${hash}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getSingleOrder(id) {
  return axiosPrivate
    .get(`/order/${id}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function trackOrder(trackingId) {
  return axiosPrivate
    .get(`/shipment/${trackingId}/tracker`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function sendTxHash(hash) {
  return axiosPrivate
    .post(`/hash`, hash)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function sendTxForProposed(details) {
  return axiosPrivate
    .post(`/proposed/hash`, details)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getTxHash(hash) {
  return axiosPrivate
    .post(`/hash`, hash)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getProposedTx() {
  return axiosPrivate
    .get(`/proposed/hash`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getCollectedTx() {
  return axiosPrivate
    .get(`/bid/hash/get`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function validateCode(code) {
  return axiosPrivate
    .post(`/discount/code/verify`, code)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function handleAxiosResponse(response) {
  console.log(response);
  const data = response && response.data;

  return data;
}

function handleError(error) {
  if (error.response) {
    error = error.response.data;
    if (response.status === 401 || response.status === 403) {
      console.log(error);
    } else if (response.status == 422) {
      toast.error("Could not verify address, Please enter correct Address!");
    }
  } else {
    error = error.message;
  }
  console.log(error);
  return Promise.reject(error);
}
