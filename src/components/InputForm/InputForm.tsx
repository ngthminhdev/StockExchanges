import React , { useState } from 'react'
import { UseFormRegister } from 'react-hook-form/dist/types';
import { Path } from 'react-hook-form';
import { EyeIcon } from '../icons';
import "./InputForm.styles.scss"

export interface IFormValues {
    username : string ,
    account_name : string ,
    phone : string ,
    password : string ,
    email : string ,
    confirm_password:string ,
    rules?:boolean ,
}

interface Props {
    icon ?: React.ReactElement ,
    placeHolder ?: string ,
    type : string ,
    styles ?: object ,
    register : UseFormRegister<IFormValues> 
    label : Path<IFormValues> ,
    id:string ,
}

const InputForm = ( { icon , placeHolder , id , type , styles , register , label } : Props ) => {
  
  const [isShowPassWord , setIsShowPassWord] = useState<boolean>(false) ;

  const handleShowPassWord = () => {
     setIsShowPassWord( prev => !prev ) ;
  }

  return (
    <div className='inputWrapper'>
      <>
      <span className='iconInput'>
      {icon} 
      </span>
      <input 
      id={id}
      type={ ( type == "password" && isShowPassWord == true ) ? "text" : type } 
      placeholder={placeHolder} 
      style={{...styles}}
      {...register(label)}
      className="inputForm"
      />
      {
        type == "password" && 
        <span onClick={handleShowPassWord} className='iconInput right'>
        <EyeIcon/>
        </span>
      }
      </>
    </div>
  )
}

export default InputForm