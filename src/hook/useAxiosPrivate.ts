import React, { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import axios from "axios";

const useAxiosPrivate = () => {
  const accessToken = localStorage.getItem("access-token") ;
  const getNewAccessToken = async () => {
    console.log(accessToken) ;
    const res = await axiosPrivate({
      method: "POST",
      url: "api/auth/refresh-token",
      data : accessToken , 
    });
    //const newAccessToken = res.data.accessToken;
    return res;
  };
  
  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
            if ( accessToken ) {
              config.headers["Authorization"] = accessToken;
            }
        }
        console.log(config) ;
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axiosPrivate.interceptors.response.use(
        response => response ,
        async ( error ) => {
          console.log(error) ;
          // console.log('error response' , error) ;
          //   const prevRequest = error.config ;
          //   if ( error.response.status === 401 && !prevRequest?.sent ) {
          //         //prevRequest?.sent = true ;
          //         const newAccessToken = getNewAccessToken() ;
          //         // localStorage.setItem("access-token" ,JSON.stringify(newAccessToken) ) ;
          //         // prevRequest.headers["Authorization"] = newAccessToken ;
          //         // return axiosPrivate(prevRequest) ;
          //         console.log(newAccessToken) ;
          //   }
          //   return Promise.reject(error) ;
        }
    ) ;
    const abc = async () => {
      try {
      const res = await getNewAccessToken() ;
      console.log(res) ;
      } catch (error) {
        console.log(error)
      }
    }
    abc() ;
    return () => {
        axios.interceptors.request.eject(requestInterceptor) ;
        axios.interceptors.request.eject(responseInterceptor) ;
    }
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
