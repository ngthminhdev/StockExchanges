import React from 'react'
import { createBrowserRouter , Navigate } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout'
import { StockTable , AgreementTable , WarrantsTable, SignIn, SignUp , Home } from '../Pages'

export const router = createBrowserRouter([
  {
    path:"/" ,
    element : <Home/> ,
  },
  {
    element:<MainLayout/> ,
    children : [
      {
       path : "/chung-khoan/:idSan" ,
       element : <StockTable/> , // bảng
      },
      {
       path : "chung-khoan/thoa-thuan/:idSan" ,
       element : <AgreementTable/> , //bảng
      } ,
      {
        path : "chung-khoan/chung-quyen" ,
        element : <WarrantsTable/> ,//table
      }
    ] ,
  } ,
  {
    path:'/login' ,
    element : <SignIn/>
  } ,
  {
    path : '/register' ,
    element : <SignUp/>
  }
])