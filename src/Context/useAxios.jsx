import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "./ContextProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
const useAxios = () => {
  const { SignOut } = useContext(UserContext);
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log("caught from interceptor", error);
        if (error.status == 401 || error.status == 403) {
          SignOut();
        }
        return Promise.reject(error);
      },
    );
  }, []);

  return axiosInstance;
};

export default useAxios;
