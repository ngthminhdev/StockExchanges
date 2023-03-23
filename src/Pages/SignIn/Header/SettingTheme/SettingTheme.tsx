import React , { useRef , useState } from 'react'
import { SettingIcon } from "../../../../components/icons/index";
import { useClickOutSide } from '../../../../hook/useClickOutSide';

import "./SettingTheme.styles.scss"

interface Props {
   darkTheme : boolean ,
   setDarkTheme : React.Dispatch<React.SetStateAction<boolean>> ,
}

const SettingTheme = ( { darkTheme , setDarkTheme }:Props ) => {
   
  const refMenu = useRef<HTMLDivElement>(null);
  const { isShow , setIsShow } = useClickOutSide({ innerRef: refMenu });

  const handleShowMenuTheme = () => {
    setIsShow((prev) => !prev);
  };

  const handleChangeDarkTheme = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const theme = e.target.defaultValue ;
    setDarkTheme ( (theme == 'light') ? false : true ) ;
  }

  return (
    <div className="header__setting" ref={refMenu}>
          <button onClick={handleShowMenuTheme}>
            <SettingIcon />
          </button>
          {isShow && 
            <div className="header__menu--theme">
             <p className="header__menu--title">Chọn giao diện</p>
             <form action="">
              <div>
                <label htmlFor="light">
                  <input type="radio" onChange={ (e) => { handleChangeDarkTheme(e) } } name="theme" id="light" value="light" checked={!darkTheme} />
                  <span className="checkBoxWrapper">
                    <span className="checkBox"></span>
                  </span>
                  <span>Sáng</span>
                </label>
              </div>
              <div>
                 <label htmlFor="dark">
                 <input type="radio" onChange={ (e) => { handleChangeDarkTheme(e) } } name="theme" id="dark" value="dark" checked={darkTheme} />
                 <span className="checkBoxWrapper">
                    <span className="checkBox"></span>
                  </span>
                  <span>Tối</span>
                </label>
              </div>
             </form>
            </div>}
        </div>
  )
}

export default SettingTheme