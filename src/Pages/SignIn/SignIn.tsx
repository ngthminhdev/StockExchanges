import React, { useEffect, useRef, useState } from "react";
import { LockIcon, LogoTextDark, LogoTextLight, UserIcon } from "../../components/icons";
import { ButtonForm , CustomeInput, } from "../../components";
import CheckBoxLanguage from "./Header/CheckBoxLanguage/CheckBoxLanguage";
import SettingTheme from "./Header/SettingTheme/SettingTheme";
import { successMessage , errorMessage } from "../../components/Message";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IFormValues } from "../../components/InputForm/InputForm";
import "./SignIn.styles.scss";

const SignIn = () => {
  const { register , handleSubmit } = useForm<IFormValues>() ;
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

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() ;
  }
  
  return (
    <div style={{ height: "100vh" }} className={`login__wrapper ${darkTheme ? "darkTheme" : ''}`}>
      <header className="header__login">
        <SettingTheme
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        />
        <CheckBoxLanguage handleChangeLangue={handleChangeLangue}/>
      </header>
      <div className="content">
        <div className="content__img"></div>
        <form onSubmit={(e) => handleSubmitForm(e)} action="" className="content__form">
          <div style={{padding:'4px'}}>
          {
            darkTheme ? <LogoTextDark/> :<LogoTextLight width="227" height="59"/>
          }
          </div>
          <p className="content__form--title">{t("titleForm")}</p>
          <CustomeInput 
           icon={<UserIcon/>}
           placeHolder={t("userName")}
           type={'text'} 
          />
          <CustomeInput 
           icon={<LockIcon/>}
           placeHolder={t("passWord")}
           type={'password'}
          />
          <ButtonForm styles={{lineHeight:'24px'}} width="100%" height="auto" variant="primary">{t("btn1")}</ButtonForm>
          <Link to={'/register'} style={{width:'100%', textDecoration:'none'}}>
          <ButtonForm styles={{lineHeight:'24px'}} width="100%" height="auto" isDarkTheme={darkTheme} handleClickBtn={()=> {}} variant="second">{t("btn2")}</ButtonForm>
          </Link>
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
