import axios from "axios";
import { userActions } from "../redux/actions";
import { store } from "../redux/store";
import AuthTokenService from "./authToken.service";
import { memoizedRefreshToken } from "./refreshToken";

// const { logout } = userActions

axios.defaults.baseURL = `https://api.100pcotton.com/v1`;
axios.interceptors.request.use(
    (config) => {
        const token = AuthTokenService.getLocalAccessToken();
        if (token) {
            config.withCredentials = true;
            // config.headers["Authorization"] = 'Bearer ' + token;
            config.headers = {
                ...config.headers,
                authorization: `Bearer ${token}`,
                'Access-Control-Allow-Origin': "*",
            };
        }
        console.log(config)
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

const { dispatch } = store;

console.log(dispatch)
axios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err?.config;

        // if (originalConfig.url !== "/login" && err.response && err?.response?.status === 401) {
        if (err?.response?.status === 401 && !originalConfig?._retry) {
            originalConfig._retry = true;

            const result = await memoizedRefreshToken();

            if (result?.token) {
                config.headers = {
                    ...config.headers,
                    authorization: `Bearer ${result?.token}`,
                };
            }

            return axios(originalConfig);
        }
        return Promise.reject(err);
    }
);


export const axiosPrivate = axios;
