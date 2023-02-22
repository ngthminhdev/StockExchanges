import React from 'react'
import "./CheckBoxLanguage.styles.scss"

const CheckBoxLanguage = () => {
  return (
    <div id="checkbox">
          <input type="checkbox" name="" id="languageCheckBox" />
          <label htmlFor="languageCheckBox">
            <span className="english">EN</span>
            <span className="vietnam">VN</span>
          </label>
    </div>
  )
}

export default CheckBoxLanguage