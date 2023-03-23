import React, { MouseEventHandler, ReactNode } from 'react'
import "./ButtonForm.styles.scss"

interface Props {
  children : ReactNode ,
  handleClickBtn ?: MouseEventHandler<HTMLButtonElement> ,
  variant : string ,
  isDarkTheme?:boolean ,
  width  : string ,
  height : string ,
  styles ?: object ,
  type ?: "button" | "reset" | "submit" ,
}

const ButtonForm = ({ children , handleClickBtn , type , variant , isDarkTheme ,width , height , styles } : Props ) => {
  return (
    <button onClick={handleClickBtn} type={type} className={`btn ${ (variant ) == 'primary' ? 'primary' : 'second' } ${isDarkTheme ? 'dark' : ''}`} style={{width:width , height:height , ...styles }}>
      {children}
    </button>
  )
}

export default ButtonForm