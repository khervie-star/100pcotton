import Router from "next/router";
import toast from 'react-hot-toast';
import { tokenService } from '../../services';
import { tokenConstants } from '../../utility/constants';

export const tokenActions = {
  getAllAdmin,
  getSingleAdmin,
  getSingleAdminReplica,
  getProposed,
  getAllReplicas,
  getSingleReplica,
  createOriginalAdminToken,
  createUserOriginalfromAdminToken,
  createProposedToken,
  createReplicaToken,
  // createToken,
  // createTokenReplica,
  searchToken,
  getSingleProposedToken,
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
  return dispatch => {
    dispatch(request());

    tokenService.getAllAdmin()
      .then(
        adminTokens => dispatch(success(adminTokens)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETALLADMIN_TOKEN_REQUEST } }
  function success(adminTokens) { return { type: tokenConstants.GETALLADMIN_TOKEN_SUCCESS, adminTokens } }
  function failure(error) { return { type: tokenConstants.GETALLADMIN_TOKEN_FAILURE, error } }
}

function getSingleAdmin(tokenId) {
  return dispatch => {
    dispatch(request(tokenId));

    tokenService.getSingleAdmin(tokenId)
      .then(
        singleAdminToken => dispatch(success(singleAdminToken)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETSINGLEADMIN_TOKEN_REQUEST } }
  function success(singleAdminToken) { return { type: tokenConstants.GETSINGLEADMIN_TOKEN_SUCCESS, singleAdminToken } }
  function failure(error) { return { type: tokenConstants.GETSINGLEADMIN_TOKEN_FAILURE, error } }
}

function getSingleAdminReplica(tokenId) {
  return dispatch => {
    dispatch(request(tokenId));

    tokenService.getSingleAdminReplica(tokenId)
      .then(
        singleAdminReplica => dispatch(success(singleAdminReplica)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETSINGLEADMINREPLICA_TOKEN_REQUEST } }
  function success(singleAdminReplica) { return { type: tokenConstants.GETSINGLEADMINREPLICA_TOKEN_SUCCESS, singleAdminReplica } }
  function failure(error) { return { type: tokenConstants.GETSINGLEADMINREPLICA_TOKEN_FAILURE, error } }
}

function getProposed() {
  return dispatch => {
    dispatch(request());

    tokenService.getProposed()
      .then(
        proposedTokens => dispatch(success(proposedTokens)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETPROPOSED_TOKEN_REQUEST } }
  function success(proposedTokens) { return { type: tokenConstants.GETPROPOSED_TOKEN_SUCCESS, proposedTokens } }
  function failure(error) { return { type: tokenConstants.GETPROPOSED_TOKEN_FAILURE, error } }
}

function getAllReplicas() {
  return dispatch => {
    dispatch(request());

    tokenService.getAll()
      .then(
        tokens => dispatch(success(replicas)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETALLREPLICAS_TOKEN_REQUEST } }
  function success(replicas) { return { type: tokenConstants.GETALLREPLICAS_TOKEN_SUCCESS, replicas } }
  function failure(error) { return { type: tokenConstants.GETALLREPLICAS_TOKEN_FAILURE, error } }
}

function getSingleProposedToken(tokenId) {
  return dispatch => {
    dispatch(request());

    tokenService.getSingleProposedToken(tokenId)
      .then(
        singleToken => dispatch(success(singleToken)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETSINGLE_TOKEN_REQUEST } }
  function success(singleToken) { return { type: tokenConstants.GETSINGLE_TOKEN_SUCCESS, singleToken } }
  function failure(error) { return { type: tokenConstants.GETSINGLE_TOKEN_FAILURE, error } }
}

function getSingleReplica(replicaId) {
  return dispatch => {
    dispatch(request());

    tokenService.getSingleReplica(replicaId)
      .then(
        singleReplica => dispatch(success(singleReplica)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETSINGLE_REPLICA_REQUEST } }
  function success(singleReplica) { return { type: tokenConstants.GETSINGLE_REPLICA_SUCCESS, singleReplica } }
  function failure(error) { return { type: tokenConstants.GETSINGLE_REPLICA_FAILURE, error } }
}

function getTrending() {
  return dispatch => {
    dispatch(request());

    tokenService.getTrending()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETTRENDING_TOKEN_REQUEST } }
  function success(trendingTokens) { return { type: tokenConstants.GETTRENDING_TOKEN_SUCCESS, trendingTokens } }
  function failure(error) { return { type: tokenConstants.GETTRENDING_TOKEN_FAILURE, error } }
}

function getAllProposedLikedTokens() {
  return dispatch => {
    dispatch(request());

    tokenService.getAllProposedLikedTokens()
      .then(
        favoriteProposedTokens => dispatch(success(favoriteProposedTokens)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETALL_PROPOSED_LIKED_TOKEN_REQUEST } }
  function success(favoriteProposedTokens) { return { type: tokenConstants.GETALL_PROPOSED_LIKED_TOKEN_SUCCESS, favoriteProposedTokens } }
  function failure(error) { return { type: tokenConstants.GETALL_PROPOSED_LIKED_TOKEN_FAILURE, error } }
}

function getAllOriginalLikedTokens() {
  return dispatch => {
    dispatch(request());

    tokenService.getAllOriginalLikedTokens()
      .then(
        favoriteOriginalTokens => dispatch(success(favoriteOriginalTokens)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETALL_ORIGINAL_LIKED_TOKEN_REQUEST } }
  function success(favoriteOriginalTokens) { return { type: tokenConstants.GETALL_ORIGINAL_LIKED_TOKEN_SUCCESS, favoriteOriginalTokens } }
  function failure(error) { return { type: tokenConstants.GETALL_ORIGINAL_LIKED_TOKEN_FAILURE, error } }
}


function getByAlphabet(alphabet) {
  console.log(alphabet)
  return dispatch => {
    dispatch(request());

    tokenService.getByAlphabet()
      .then(
        searchResult => dispatch(success(searchResult.filter((item) => {
          return Object.values(item.nftName).toString().toLowerCase().startsWith(alphabet.toString().toLowerCase())
        }))),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETBYALPHABET_TOKEN_REQUEST } }
  function success(searchResult) { return { type: tokenConstants.GETBYALPHABET_TOKEN_SUCCESS, searchResult } }
  function failure(error) { return { type: tokenConstants.GETBYALPHABET_TOKEN_FAILURE, error } }
}


function getRandom() {
  return dispatch => {
    dispatch(request());

    tokenService.getRandom()
      .then(
        randomToken => dispatch(success(randomToken)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETRANDOM_TOKEN_REQUEST } }
  function success(randomToken) { return { type: tokenConstants.GETRANDOM_TOKEN_SUCCESS, randomToken } }
  function failure(error) { return { type: tokenConstants.GETRANDOM_TOKEN_FAILURE, error } }
}

function getOriginal() {
  return dispatch => {
    dispatch(request());

    tokenService.getOriginal()
      .then(
        originalTokens => dispatch(success(originalTokens)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: tokenConstants.GETORIGINAL_TOKEN_REQUEST } }
  function success(originalTokens) { return { type: tokenConstants.GETORIGINAL_TOKEN_SUCCESS, originalTokens } }
  function failure(error) { return { type: tokenConstants.GETORIGINAL_TOKEN_FAILURE, error } }
}

function getMultiple() {
  return dispatch => {
    dispatch(request());

    tokenService.getOriginal()
      .then(
        originalTokens => dispatch(success(originalTokens)),
        error => dispatch(failure(error))
      );
  };

  function request() { return { type: tokenConstants.GETORIGINAL_TOKEN_REQUEST } }
  function success(originalTokens) { return { type: tokenConstants.GETORIGINAL_TOKEN_SUCCESS, originalTokens } }
  function failure(error) { return { type: tokenConstants.GETORIGINAL_TOKEN_FAILURE, error } }
}


// POST
function createOriginalAdminToken(tokenDetails) {
  return dispatch => {
    dispatch(request(tokenDetails));

    tokenService.createOriginalAdminToken(tokenDetails)
      .then(
        adminTokenCreated => {
          dispatch(success(adminTokenCreated));
          toast.success('Token proposed successfully 👏')
        },
        error => {
          dispatch(failure(error));
          toast.error(error)
        }
      );
  };

  function request(tokenDetails) { return { type: tokenConstants.CREATE_ORIGINAL_ADMIN_TOKEN_REQUEST, tokenDetails } }
  function success(adminTokenCreated) { return { type: tokenConstants.CREATE_ORIGINAL_ADMIN_TOKEN_SUCCESS, adminTokenCreated } }
  function failure(error) { return { type: tokenConstants.CREATE_ORIGINAL_ADMIN_TOKEN_FAILURE, error } }
}

function createProposedToken(tokenDetails, tokenId) {
  return dispatch => {
    dispatch(request(tokenDetails, tokenId));

    tokenService.createProposedToken(tokenDetails, tokenId)
      .then(
        proposedToken => {
          dispatch(success(proposedToken));
          // toast.success('Token proposed successfully 👏')
          // Router.push(`/user/profile`)
        },
        error => {
          dispatch(failure(error));
          toast.error(error)
        }
      );
  };

  function request(tokenDetails) { return { type: tokenConstants.CREATE_PROPOSED_TOKEN_REQUEST, tokenDetails } }
  function success(proposedToken) { return { type: tokenConstants.CREATE_PROPOSED_TOKEN_SUCCESS, proposedToken } }
  function failure(error) { return { type: tokenConstants.CREATE_PROPOSED_TOKEN_FAILURE, error } }
}

function createUserOriginalfromAdminToken(tokenDetails, adminOriginalTokenId) {
  return dispatch => {
    dispatch(request(tokenDetails, adminOriginalTokenId));

    tokenService.createUserOriginalfromAdminToken(tokenDetails, adminOriginalTokenId)
      .then(
        userOriginal => {
          dispatch(success(userOriginal));
          // toast.success('Token proposed successfully 👏')
          // Router.push(`/user/profile`)
        },
        error => {
          dispatch(failure(error));
          toast.error(error)
        }
      );
  };

  function request(tokenDetails) { return { type: tokenConstants.CREATE_ORIGINAL_FROM_ADMIN_TOKEN_REQUEST, tokenDetails } }
  function success(userOriginal) { return { type: tokenConstants.CREATE_ORIGINAL_FROM_ADMIN_TOKEN_SUCCESS, userOriginal } }
  function failure(error) { return { type: tokenConstants.CREATE_ORIGINAL_FROM_ADMIN_TOKEN_FAILURE, error } }
}


// function createToken(tokenDetails) {
//   return dispatch => {
//     dispatch(request(tokenDetails));

//     tokenService.createToken(tokenDetails)
//       .then(
//         token => {
//           dispatch(success(token));
//           toast.success('Token created successfully')
//           Router.push(`/user/profile`)
//         },
//         error => {
//           dispatch(failure(error));
//           toast.error(error)
//         }
//       );
//   };

//   function request(token) { return { type: tokenConstants.CREATE_TOKEN_REQUEST, token } }
//   function success(token) { return { type: tokenConstants.CREATE_TOKEN_SUCCESS, token } }
//   function failure(error) { return { type: tokenConstants.CREATE_TOKEN_FAILURE, error } }
// }

function createReplicaToken(replicaDetails, originalTokenId) {
  return dispatch => {
    dispatch(request(replicaDetails));

    tokenService.createReplicaToken(replicaDetails, originalTokenId)
      .then(
        replica => {
          dispatch(success(replica));
          // toast.success('Order success')
        },
        error => {
          dispatch(failure(error.toString()));
          toast.error(error.error)
          console.log(error)
        },
      );
  };

  function request(replica) { return { type: tokenConstants.CREATE_REPLICA_REQUEST, replica } }
  function success(replica) { return { type: tokenConstants.CREATE_REPLICA_SUCCESS, replica } }
  function failure(error) { return { type: tokenConstants.CREATE_REPLICA_FAILURE, error } }
}


// function createTokenReplica(replicaDetails, originalTokenId) {
//   return dispatch => {
//     dispatch(request(replicaDetails));

//     tokenService.createTokenReplica(replicaDetails, originalTokenId)
//       .then(
//         replica => {
//           dispatch(success(replica));
//           // toast.success('Shirt purchase successful. It would be shipped accordingly!')
//         },
//         error => {
//           dispatch(failure(error.toString()));
//           toast.error(error.error)
//         },
//       );
//   };

//   function request(replica) { return { type: tokenConstants.CREATEREPLICA_TOKEN_REQUEST, replica } }
//   function success(replica) { return { type: tokenConstants.CREATEREPLICA_TOKEN_SUCCESS, replica } }
//   function failure(error) { return { type: tokenConstants.CREATEREPLICA_TOKEN_FAILURE, error } }
// }

function searchToken({ searchTerm }) {
  return dispatch => {
    dispatch(request({ searchTerm }));

    tokenService.searchToken({ searchTerm })
      .then(
        searchResult => {
          dispatch(success(searchResult));
        },
        error => {
          dispatch(failure(error));
          toast.error(error.toString())
        }
      );
  };

  function request(searchTerm) { return { type: tokenConstants.SEARCH_TOKEN_REQUEST, searchTerm } }
  function success(searchResult) { return { type: tokenConstants.SEARCH_TOKEN_SUCCESS, searchResult } }
  function failure(error) { return { type: tokenConstants.SEARCH_TOKEN_FAILURE, error } }
}


// PATCH
function changeTokenOwnerShip(bidId, newTokenOwner) {
  return dispatch => {
    dispatch(request(newTokenOwner));

    tokenService.changeTokenOwnerShip(bidId, newTokenOwner)
      .then(
        collectedToken => {
          dispatch(success(collectedToken));
        },
        error => {
          dispatch(failure(error.toString()));
          toast.error(error)
        }
      );
  };

  function request(collectedToken) { return { type: tokenConstants.CHANGEOWNERSHIP_TOKEN_REQUEST, collectedToken } }
  function success(collectedToken) { return { type: tokenConstants.CHANGEOWNERSHIP_TOKEN_SUCCESS, collectedToken } }
  function failure(error) { return { type: tokenConstants.CHANGEOWNERSHIP_TOKEN_FAILURE, error } }
}

function changeTokenOwnerShipOriginal(bidId, newTokenOwner) {
  return dispatch => {
    dispatch(request(newTokenOwner));

    tokenService.changeTokenOwnerShipOriginal(bidId, newTokenOwner)
      .then(
        collectedTokenOriginal => {
          dispatch(success(collectedTokenOriginal));
        },
        error => {
          dispatch(failure(error.toString()));
          toast.error(error)
        }
      );
  };

  function request(collectedToken) { return { type: tokenConstants.CHANGEOWNERSHIP_O_TOKEN_REQUEST, collectedToken } }
  function success(collectedTokenOriginal) { return { type: tokenConstants.CHANGEOWNERSHIP_O_TOKEN_SUCCESS, collectedTokenOriginal } }
  function failure(error) { return { type: tokenConstants.CHANGEOWNERSHIP_O_TOKEN_FAILURE, error } }
}

function addToFavorites(tokenId, userId) {
  return dispatch => {
    // dispatch(request(tokenId));

    tokenService.addToFavorites(tokenId, userId)
      .then(
        addedToFavorites => {
          // dispatch(success());
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(toast.error(error.toString()));
        }
      );
  };

  function request(addedToFavorites) { return { type: tokenConstants.ADDTOFAVORITES_TOKEN_REQUEST, addedToFavorites } }
  function success(addedToFavorites) { return { type: tokenConstants.ADDTOFAVORITES_TOKEN_SUCCESS, addedToFavorites } }
  function failure(error) { return { type: tokenConstants.ADDTOFAVORITES_TOKEN_FAILURE, error } }
}

function addAdminTokenToFavorites(tokenId, userId) {
  return dispatch => {
    // dispatch(request(tokenId));

    tokenService.addAdminTokenToFavorites(tokenId, userId)
      .then(
        addedToFavorites => {
          // dispatch(success());
        },
        error => {
          dispatch(failure(error.toString()));
          dispatch(toast.error(error.toString()));
        }
      );
  };

  function request(addedToFavorites) { return { type: tokenConstants.ADDTOFAVORITES_TOKEN_REQUEST, addedToFavorites } }
  function success(addedToFavorites) { return { type: tokenConstants.ADDTOFAVORITES_TOKEN_SUCCESS, addedToFavorites } }
  function failure(error) { return { type: tokenConstants.ADDTOFAVORITES_TOKEN_FAILURE, error } }
}

