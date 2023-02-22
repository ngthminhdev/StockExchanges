import React, { ReactNode } from 'react'
import "./ButtonForm.styles.scss"

interface Props {
  children : ReactNode ,
  handleClickBtn : Function ,
  variant : string ,
}

const ButtonForm = ({ children , handleClickBtn , variant } : Props ) => {
  return (
    <button className={`btn ${ (variant ) == 'primary' ? 'primary' : 'second' }`} onClick={ (e) => { handleClickBtn(e) } }>
      {children}
    </button>
  )
}

export default ButtonForm