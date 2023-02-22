import React , { useState } from 'react'
import { EyeIcon } from '../../../components/icons';
import "./InputForm.styles.scss"

interface Props {
    icon : React.ReactElement ,
    placeHolder : string ,
    isInputPassWorld : boolean ,
}

const InputForm = ( { icon , placeHolder , isInputPassWorld } : Props ) => {
  
  const [isShowPassWord , setIsShowPassWord] = useState<boolean>(!isInputPassWorld) ;

  const handleShowPassWord = () => {
     setIsShowPassWord( prev => !prev ) ;
  }

  return (
    <div className='inputWrapper'>
      <>
      <span className='iconInput'>
      {icon} 
      </span>
      <input type={ isShowPassWord ? 'text' : 'password' } placeholder={placeHolder} />
      {
        isInputPassWorld && 
        <span onClick={handleShowPassWord} className='iconInput right'>
        <EyeIcon/>
        </span>
      }
      </>
    </div>
  )
}

export default InputForm