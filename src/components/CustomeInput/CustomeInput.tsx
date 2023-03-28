import React , { useState } from 'react'
import { EyeIcon } from '../icons';

interface Props {
    icon ?: React.ReactElement ,
    placeHolder : string ,
    type : string ,
    styles ?: object ,
    id?:string ,
}

const CustomeInput = ( { icon , placeHolder , type , styles , id } : Props ) => {
  
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
      type={ ( type == "password" && isShowPassWord == true ) ? "text" : type } 
      placeholder={placeHolder} 
      style={{...styles}}
      className="inputForm" 
      id={id}
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

export default CustomeInput