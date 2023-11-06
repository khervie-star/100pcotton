// import { toast } from 'react-toastify';
import { store } from '../redux/store';

// import config from 'config';
import { axiosPublic } from './axiosPublic';
import { axiosPrivate } from './interceptor';

const baseUrl = `https://api.100pcotton.com/v1`;
const ApiUrl = `https://api.100pcotton.com/v1`;


const state = store.getState();


export const tokenService = {
  getAllAdmin,
  getSingleAdmin,
  getSingleAdminReplica,
  getProposed,
  getAllReplicas,
  createOriginalAdminToken,
  createUserOriginalfromAdminToken,
  createProposedToken,
  createReplicaToken,
  searchToken,
  tokenSearch,
  searchAdminToken,
  search,
  getSingleProposedToken,
  getSingleTokenCart,
  getTrending,
  getAllProposedLikedTokens,
  getAllOriginalLikedTokens,
  changeTokenOwnerShip,
  changeTokenOwnerShipOriginal,
  addToFavorites,
  addAdminTokenToFavorites,
  getByAlphabet,
  getRandom,
  getOriginal,
};


// GET
function getAllAdmin() {
  return axiosPublic.get(`${baseUrl}/admin/token`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getSingleAdmin(tokenId) {
  return axiosPrivate.get(`/admin/token/${tokenId}`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getSingleAdminReplica(tokenId) {
  return axiosPrivate.get(`/original/token/${tokenId}`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getSingleProposedToken(tokenId) {
  return axiosPrivate.get(`/propose/token/${tokenId}`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getSingleTokenCart(tokenId) {
  return axiosPrivate.get(`/token/${tokenId}`)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function getProposed() {
  return axiosPrivate.get(`/propose/token`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getAllReplicas() {
  return axiosPrivate.get(`/replica/user`)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function getAllProposedLikedTokens() {
  return axiosPrivate.get(`propose/token/get/alllike`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getAllOriginalLikedTokens() {
  return axiosPrivate.get(`/admin/token/get/alllike`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getTrending() {
  return axiosPublic.get(`/propose/token/get/trendingtoken/?page=1&limit=5`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getByAlphabet() {
  return axiosPublic.get(`/propose/token`)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function getRandom() {
  return axiosPrivate.get(`/propose/token/random/token`)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function getOriginal() {
  return axiosPrivate(`/original`)
    .then(handleAxiosResponse)
    .catch(handleError)
}



// POST
function createOriginalAdminToken(tokenDetails) {
  return axiosPrivate.post(`/admin/token`, tokenDetails)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function createUserOriginalfromAdminToken(tokenDetails, adminOriginalTokenId) {
  return axiosPrivate.post(`/original/token/${adminOriginalTokenId}`, tokenDetails)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function createProposedToken(tokenDetails, tokenId) {
  return axiosPrivate.post(`/propose/token/${tokenId}/original`, tokenDetails)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function createReplicaToken(replicaDetails, originalTokenId) {
  return axiosPrivate.post(`/replica/token/${originalTokenId}`, replicaDetails)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function searchToken(searchTerm) {
  return axiosPublic.post(`/propose/token/search/token?page=1&limit=5`, searchTerm)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function tokenSearch(searchObject) {
  return axiosPublic.post(`/propose/token/search/token?page=1&limit=5`, searchObject)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function searchAdminToken(searchObject) {
  return axiosPublic.post(`/admin/token/search/token?page=1&limit=5`, searchObject)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function search(searchTerm) {
  return axiosPublic.post(`/search`, searchTerm)
    .then(handleAxiosResponse)
    .catch(handleError)
}




// PATCH
function addToFavorites(tokenId, userId) {
  return axiosPrivate.patch(`/propose/token/${tokenId}/like`, userId)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function addAdminTokenToFavorites(tokenId, userId) {
  return axiosPrivate.patch(`/admin/token/${tokenId}/like`, userId)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function changeTokenOwnerShip(bidId, newTokenOwner) {
  return axiosPrivate.patch(`/bid/${bidId}/buy`, newTokenOwner)
    .then(handleAxiosResponse)
    .catch(handleError)
}

function changeTokenOwnerShipOriginal(bidId, newTokenOwner) {
  return axiosPrivate.patch(`/bid/${bidId}/buy/original`, newTokenOwner)
    .then(handleAxiosResponse)
    .catch(handleError)
}


function handleAxiosResponse(response) {
  console.log(response)
  const data = response && response.data;

  return data;
}

function handleError(error) {
  if (error.response) {
    error = error.response.data;
  } else {
    error = error.message
  }
  console.log(error)
  return Promise.reject(error);

}
