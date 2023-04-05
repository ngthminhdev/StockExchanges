import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectorUser } from '../redux/User/User.selector'
import { UserSlice } from '../redux/User/User.slice';
import { IUser } from '../interface';
import useAxiosPrivate from './useAxiosPrivate';

const useUser = () => {
  
  const dispatch = useDispatch() ;
  const user = useSelector( selectorUser ) ;
  console.log(user) ;
  const setUser = ( user : IUser ) => {
    dispatch( UserSlice.actions.setUser( user ) ) ;
  }
  const axiosPrivate = useAxiosPrivate() ;

  useEffect( () => {
     const fetchData = async () => {
      try {
        const res = await axiosPrivate({
          method:'GET' ,
          url:'api/user/info' ,
         })
         console.log(res) ;
       } catch (error) {
         console.log(error) ;
       }
     }
     if ( localStorage.getItem("access-token") ) {
      fetchData() ;
     }
  } , [] )

  return {
    user ,
    setUser ,
  }
}

export default useUser