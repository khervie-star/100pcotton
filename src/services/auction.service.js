import { axiosPublic } from "./axiosPublic";
import { axiosPrivate } from "./interceptor";

export const auctionService = {
  createAuction,
  auctionOriginal,
  getAllAuction,
  getAllAuction_Auth,
  getSingleAuction,
  placeBid,
  getBids,
  getSingleBid,
  getAuctionBids,
  sendMailToAuctionWinner,
  sendMailToAuctionWinnerForOriginal,
  collectTokenHash,
  deleteAuction,
};

function createAuction(auctionDetails) {
  return axiosPrivate
    .post(`/auction/token`, auctionDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function auctionOriginal(auctionDetails) {
  return axiosPrivate
    .post(`/auction/token/original`, auctionDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getAllAuction_Auth() {
  return axiosPrivate
    .get(`/auction/token`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getAllAuction() {
  return axiosPublic
    .get(`/auction/token`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getSingleAuction(id) {
  return axiosPrivate
    .get(`/auction/token/${id}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function placeBid(auctionDetails, auctionId) {
  return axiosPrivate
    .post(`/bid/create/${auctionId}`, auctionDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getBids(auctionId) {
  return axiosPrivate
    .get(`/bid/${auctionId}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getSingleBid(bidId) {
  return axiosPrivate
    .get(`/bid/single/${bidId}`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function getAuctionBids() {
  return axiosPrivate
    .get(`/users/get/auction/bid`)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function sendMailToAuctionWinner(bidId) {
  return axiosPrivate
    .post(`/bid/sendmail/${bidId}`, {})
    .then(handleAxiosResponse)
    .catch(handleError);
}

function sendMailToAuctionWinnerForOriginal(bidId) {
  return axiosPrivate
    .post(`/bid/sendmail/${bidId}/original`, {})
    .then(handleAxiosResponse)
    .catch(handleError);
}

function collectTokenHash(hashDetails) {
  return axiosPrivate
    .post(`/bid/hash/create`, hashDetails)
    .then(handleAxiosResponse)
    .catch(handleError);
}

function deleteAuction(auctionId) {
  return axiosPrivate
    .delete(`/auction/token/${auctionId}`)
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
  } else {
    error = error.message;
  }
  console.log(error);
  return Promise.reject(error);
}

// const connectedNavbar = connect(actionCreators)(Navbar);
