import axiosClient from "../../../httpClient/";
import URL from "../../../httpClient/URL";

const APIService = {
  signIn: async (email, password) => {
    const payload = { email, password };
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
  getUser:async()=>{
    const response = await axiosClient.get(URL.GET_USER);

    return response; 
  }
};

export default APIService;
