import React, { ReactNode } from 'react'
import "./ButtonForm.styles.scss"

interface Props {
  children : ReactNode ,
  handleClickBtn : Function ,
  variant : string ,
  isDarkTheme?:boolean ,
  width  : string ,
  height : string ,
}

const ButtonForm = ({ children , handleClickBtn , variant , isDarkTheme ,width , height } : Props ) => {
  return (
    <button className={`btn ${ (variant ) == 'primary' ? 'primary' : 'second' } ${isDarkTheme ? 'dark' : ''}`} style={{width:width , height:height}} onClick={ (e) => { handleClickBtn(e) } }>
      {children}
    </button>
  )
}

export default ButtonForm