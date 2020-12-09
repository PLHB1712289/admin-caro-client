import axiosClient from "../../apiClient";
import URL from "../../apiClient/URL";

const APIService = {
  signIn: async (username, password) => {
    const payload = { username, password };
    const response = await axiosClient.post(URL.SIGN_IN, payload);

    return response;
  },

  signInWithFB: async (id, accessToken) => {
    const payload = { id, accessToken };
    const response = await axiosClient.post(URL.SIGN_IN_WITH_FB, payload);

    return response;
  },

  signInWithGG: async (tokenId, accessToken) => {
    const payload = { id: tokenId, accessToken };
    const response = await axiosClient.post(URL.SIGN_IN_WITH_GG, payload);

    return response;
  },
};

export default APIService;
