import { tokenConstants } from '../../utility/constants';

export function token(state = {}, action) {
  switch (action.type) {

    case tokenConstants.GETALLADMIN_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETALLADMIN_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        adminTokens: action.adminTokens,
      };
    case tokenConstants.GETALLADMIN_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.GETSINGLEADMIN_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETSINGLEADMIN_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        singleAdminToken: action.singleAdminToken,
      };
    case tokenConstants.GETSINGLEADMIN_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.GETSINGLEADMINREPLICA_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETSINGLEADMINREPLICA_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        singleAdminReplica: action.singleAdminReplica,
      };
    case tokenConstants.GETSINGLEADMINREPLICA_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case tokenConstants.GETPROPOSED_TOKEN_REQUEST:
      return {
        loading: true
      };
    case tokenConstants.GETPROPOSED_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        proposedTokens: action.proposedTokens,
      };
    case tokenConstants.GETPROPOSED_TOKEN_FAILURE:
      return {
        error: action.error
      };

    case tokenConstants.GETALLREPLICAS_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETALLREPLICAS_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        replicas: action.replicas,
      };
    case tokenConstants.GETALLREPLICAS_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case tokenConstants.GETSINGLE_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETSINGLE_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        singleToken: action.singleToken
      };
    case tokenConstants.GETSINGLE_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.GETSINGLE_REPLICA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETSINGLE_REPLICA_SUCCESS:
      return {
        ...state,
        loading: false,
        singleReplica: action.singleReplica
      };
    case tokenConstants.GETSINGLE_REPLICA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case tokenConstants.GETTRENDING_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        noSearch: true,
        trendingTokens: []
      };
    case tokenConstants.GETTRENDING_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        trendingTokens: action.trendingTokens,
        noSearch: true,

      };
    case tokenConstants.GETTRENDING_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error,
        getError: true,

      };


    case tokenConstants.GETALL_PROPOSED_LIKED_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETALL_PROPOSED_LIKED_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        favoriteProposedTokens: action.favoriteProposedTokens
      };
    case tokenConstants.GETALL_PROPOSED_LIKED_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.GETALL_ORIGINAL_LIKED_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.GETALL_ORIGINAL_LIKED_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        favoriteOriginalTokens: action.favoriteOriginalTokens
      };
    case tokenConstants.GETALL_ORIGINAL_LIKED_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };



    case tokenConstants.GETBYALPHABET_TOKEN_REQUEST:
      return {
        ...state,
        searching: true,
        noSearch: false,
        searchResult: [],
      };
    case tokenConstants.GETBYALPHABET_TOKEN_SUCCESS:
      return {
        ...state,
        searching: false,
        noSearch: false,
        searchResult: action.searchResult
      };
    case tokenConstants.GETBYALPHABET_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error,
        getError: true,
      };


    case tokenConstants.GETRANDOM_TOKEN_REQUEST:
      return {
        ...state,
        spinning: true,
        randomToken: []
      };
    case tokenConstants.GETRANDOM_TOKEN_SUCCESS:
      return {
        ...state,
        spinning: false,
        randomToken: action.randomToken
      };
    case tokenConstants.GETRANDOM_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.GETORIGINAL_TOKEN_REQUEST:
      return {
        spinning: true,
        originalTokens: []
      };
    case tokenConstants.GETORIGINAL_TOKEN_SUCCESS:
      return {
        spinning: false,
        originalTokens: action.originalTokens
      };
    case tokenConstants.GETORIGINAL_TOKEN_FAILURE:
      return {
        error: action.error
      };



    case tokenConstants.CREATE_ORIGINAL_ADMIN_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.CREATE_ORIGINAL_ADMIN_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        adminTokenCreated: action.adminTokenCreated
      };
    case tokenConstants.CREATE_ORIGINAL_ADMIN_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.CREATE_USER_ORIGINAL_FROM_ORIGINAL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.CREATE_USER_ORIGINAL_FROM_ORIGINAL_SUCCESS:
      return {
        ...state,
        loading: false,
        userOriginal: action.userOriginal
      };
    case tokenConstants.CREATE_USER_ORIGINAL_FROM_ORIGINAL_FAILURE:
      return {
        ...state,
        error: action.error
      };


    case tokenConstants.CREATE_PROPOSED_TOKEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.CREATE_PROPOSED_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        proposedToken: action.proposedToken,
      };
    case tokenConstants.CREATE_PROPOSED_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };



    case tokenConstants.CREATE_REPLICA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case tokenConstants.CREATE_REPLICA_SUCCESS:
      return {
        ...state,
        loading: false,
        replica: action.replica
      };
    case tokenConstants.CREATE_REPLICA_FAILURE:
      return {
        ...state,
        error: action.error
      };



    case tokenConstants.SEARCH_TOKEN_REQUEST:
      return {
        ...state,
        searching: true,
        noSearch: false,
        searchResult: [],
      };
    case tokenConstants.SEARCH_TOKEN_SUCCESS:
      return {
        ...state,
        searching: false,
        noSearch: false,
        searchResult: action.searchResult
      };
    case tokenConstants.SEARCH_TOKEN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case tokenConstants.CHANGEOWNERSHIP_TOKEN_REQUEST:
      return {
        changing: true
      };
    case tokenConstants.CHANGEOWNERSHIP_TOKEN_SUCCESS:
      return {
        ...state,
        changing: false,
        collectedToken: action.collectedToken
      };
    case tokenConstants.CHANGEOWNERSHIP_TOKEN_FAILURE:
      return {
        ...state,
        changing: false,
        error: action.error
      };

    case tokenConstants.CHANGEOWNERSHIP_O_TOKEN_REQUEST:
      return {
        changing: true,
      };
    case tokenConstants.CHANGEOWNERSHIP_O_TOKEN_REQUEST:
      return {
        ...state,
        changing: false,
        collectedOriginalToken: action.collectedOriginalToken
      };
    case tokenConstants.CHANGEOWNERSHIP_O_TOKEN_REQUEST:
      return {
        ...state,
        changing: false,
        error: action.error
      };



    case tokenConstants.ADDTOFAVORITES_TOKEN_REQUEST:
      return {

      };
    case tokenConstants.ADDTOFAVORITES_TOKEN_SUCCESS:
      return {

      };
    case tokenConstants.ADDTOFAVORITES_TOKEN_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}