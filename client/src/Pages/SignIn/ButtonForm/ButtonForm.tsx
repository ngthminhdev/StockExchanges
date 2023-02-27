import React, { ReactNode } from 'react'
import "./ButtonForm.styles.scss"

interface Props {
  children : ReactNode ,
  handleClickBtn : Function ,
  variant : string ,
  isDarkTheme?:boolean ,
}

const ButtonForm = ({ children , handleClickBtn , variant , isDarkTheme } : Props ) => {
  return (
    <button className={`btn ${ (variant ) == 'primary' ? 'primary' : 'second' } ${isDarkTheme ? 'dark' : ''}`} onClick={ (e) => { handleClickBtn(e) } }>
      {children}
    </button>
  )
}

export default ButtonForm