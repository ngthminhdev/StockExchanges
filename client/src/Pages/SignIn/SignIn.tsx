import React, { useEffect, useRef, useState } from "react";
import { LockIcon, LogoTextDark, LogoTextLight, UserIcon } from "../../components/icons";
import CheckBoxLanguage from "./Header/CheckBoxLanguage/CheckBoxLanguage";
import InputForm from "./InputForm/InputForm";
import ButtonForm from "./ButtonForm/ButtonForm";
import SettingTheme from "./Header/SettingTheme/SettingTheme";
import { infoMessage, successMessage , warningMessage , errorMessage } from "../../components/Message";
import { useTranslation } from "react-i18next";
import "./SignIn.styles.scss";

const SignIn = () => {

  const [ darkTheme , setDarkTheme ] = useState<boolean>(false) ;
  const [ t , i18n ] = useTranslation() ;

  const handleChangeLangue = (e : React.ChangeEvent<HTMLInputElement>) => {
     if(e.target.checked) {
      i18n.changeLanguage('en') ;
     }
     else {
      i18n.changeLanguage('de') ;
     }
  }

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault() ;
    successMessage("test message");
    infoMessage("test") ;
    warningMessage("test") ;
    errorMessage("test") ;
  }
  
  return (
    <div style={{ height: "100vh" }} className={`login__wrapper ${darkTheme ? "darkTheme" : ''}`}>
      <header>
        <SettingTheme
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        />
        <CheckBoxLanguage handleChangeLangue={handleChangeLangue}/>
      </header>
      <div className="content">
        <div className="content__img"></div>
        <form action="" className="content__form">
          <div style={{padding:'4px'}}>
          {
            darkTheme ? <LogoTextDark/> :<LogoTextLight/>
          }
          </div>
          <p className="content__form--title">{t("titleForm")}</p>
          <InputForm 
           icon={<UserIcon/>}
           placeHolder={t("userName")}
           isInputPassWorld={false}
          />
          <InputForm 
           icon={<LockIcon/>}
           placeHolder={t("passWord")}
           isInputPassWorld={true}
          />
          <ButtonForm variant="primary" handleClickBtn={handleSubmitForm}>{t("btn1")}</ButtonForm>
          <ButtonForm isDarkTheme={darkTheme} variant="second" handleClickBtn={()=>{ }}>{t("btn2")}</ButtonForm>
          <div className="contact">
            <p className="link">{t("forgotPassWord")}</p>
            <p className="link" style={{textDecoration:'underline'}}>{t("help")}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
