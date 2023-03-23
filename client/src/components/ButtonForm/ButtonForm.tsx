import React, { ReactNode } from 'react'
import "./ButtonForm.styles.scss"

interface Props {
  children : ReactNode ,
  handleClickBtn ?: Function ,
  variant : string ,
  isDarkTheme?:boolean ,
  width  : string ,
  height : string ,
  styles ?: object ,
}

const ButtonForm = ({ children , handleClickBtn , variant , isDarkTheme ,width , height , styles } : Props ) => {
  return (
    <button type='submit' className={`btn ${ (variant ) == 'primary' ? 'primary' : 'second' } ${isDarkTheme ? 'dark' : ''}`} style={{width:width , height:height , ...styles }}>
      {children}
    </button>
  )
}

export default ButtonForm