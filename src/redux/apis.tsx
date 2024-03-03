import axios from "axios";
import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";

const endPoint = process.env.REACT_APP_API_ENDPOINT;

const apiConfig = (flag = false) => {
  if (Cookies.get("accessToken")) {
    return {
      headers: {
        // Authorization: `bearer ${Cookies.get("accessToken")}`,
        "Content-Type": flag ? "multipart/form-data" : "application/json",
      },
      method: "PUT,DELETE,POST,GET,OPTION",
      withCredentials: true,
    };
  }
  return { withCredentials: true };
};

export const getApi = (url?: string, params?: any) => {
  return axios.get(`${endPoint}${url}`, {
    params: params,
    ...apiConfig(),
  });
};

export const postApi = (url: string, apiData?: any, flag?: boolean) => {
  return axios.post(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApi = (url: string, apiData: any, flag?: boolean) => {
  return axios.put(`${endPoint}${url}`, apiData, apiConfig(flag));
};

export const putApiNoHeader = (url: string, apiData: any) => {
  if (Cookies.get("accessToken")) {
    return axios.put(`${endPoint}${url}`, apiData, {
      headers: {
        Authorization: `bearer ${Cookies.get("accessToken")}`,
      },
    });
  } else {
    // If there's no access token, return an error response or handle it as needed.
    return Promise.reject("No access token available"); 
  }
};

export const deleteApi = (url: string) => {
  return axios.delete(`${endPoint}${url}`, apiConfig());
};

export const deleteApiWithData = (url: string, apiData?: any) => {
  return axios.delete(`${endPoint}${url}`, {
    data: apiData,
    ...apiConfig(),
  });
};
