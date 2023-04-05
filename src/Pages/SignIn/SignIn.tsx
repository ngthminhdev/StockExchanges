import React, { useEffect, useState } from "react";
import { LockIcon, LogoTextDark, LogoTextLight, UserIcon } from "../../components/icons";
import { ButtonForm , CustomeInput, } from "../../components";
import CheckBoxLanguage from "./Header/CheckBoxLanguage/CheckBoxLanguage";
import SettingTheme from "./Header/SettingTheme/SettingTheme";
import { successMessage , errorMessage } from "../../components/Message";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.styles.scss";
import axios from "axios";

const SignIn = () => {
  const [ darkTheme , setDarkTheme ] = useState<boolean>(false) ;
  const [ t , i18n ] = useTranslation() ;
  const navigate = useNavigate() ;

  const handleChangeLangue = (e : React.ChangeEvent<HTMLInputElement>) => {
     if(e.target.checked) {
      i18n.changeLanguage('en') ;
     }
     else {
      i18n.changeLanguage('de') ;
     }
  }

  const saveAccesstoken = ( accesstoken : string ) => {
    localStorage.setItem("access-token" , JSON.stringify(accesstoken) ) ;
  }

  const handleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() ;
    const account_name = document.querySelector("#account_name") as HTMLFormElement ;
    const password = document.querySelector("#password") as HTMLFormElement ;
    try {
      const request = await axios({
        method : "POST" ,
        url : `api/auth/login` ,
        data : { account_name : account_name.value , password : password.value } ,
      }) ;
      saveAccesstoken(request.data.data.access_token) ;
      successMessage("Đăng nhập thành công") ;
      navigate("/") ;
    } catch (error : any) {
      errorMessage(`${error.message}`) ;
      console.log(error)
    }
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
           id={"account_name"}
          />
          <CustomeInput 
           icon={<LockIcon/>}
           placeHolder={t("passWord")}
           type={'password'}
           id={"password"}
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


