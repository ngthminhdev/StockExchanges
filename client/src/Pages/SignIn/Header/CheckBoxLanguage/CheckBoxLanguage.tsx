import React from 'react'
import "./CheckBoxLanguage.styles.scss"

interface Props {
  handleChangeLangue : (e: React.ChangeEvent<HTMLInputElement>) => void ,
}

const CheckBoxLanguage = ({handleChangeLangue}:Props) => {
  return (
    <div id="checkbox">
          <input onChange={handleChangeLangue} type="checkbox" name="" id="languageCheckBox" />
          <label htmlFor="languageCheckBox">
            <span className="english">EN</span>
            <span className="vietnam">VN</span>
          </label>
    </div>
  )
}

export default CheckBoxLanguage