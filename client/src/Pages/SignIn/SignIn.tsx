import React, { useEffect, useRef, useState } from "react";
import { LockIcon, LogoTextLight, UserIcon } from "../../components/icons";
import CheckBoxLanguage from "./Header/CheckBoxLanguage/CheckBoxLanguage";
import InputForm from "./InputForm/InputForm";
import SettingTheme from "./Header/SettingTheme/SettingTheme";
import "./SignIn.styles.scss";
import ButtonForm from "./ButtonForm/ButtonForm";

const SignIn = () => {

  const [ darkTheme , setDarkTheme ] = useState<boolean>(false) ;

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault() ;
    
  }
  
  return (
    <div style={{ height: "100vh" }}>
      <header>
        <SettingTheme
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        />
        <CheckBoxLanguage/>
      </header>
      <div className="content">
        <div className="content__img"></div>
        <form action="" className="content__form">
          <div style={{padding:'4px'}}>
          <LogoTextLight/>
          </div>
          <p className="content__form--title">Đăng nhập với tài khoản VNDIRECT</p>
          <InputForm 
           icon={<UserIcon/>}
           placeHolder={'Tên đăng nhập'}
           isInputPassWorld={false}
          />
          <InputForm 
           icon={<LockIcon/>}
           placeHolder={'Mật khẩu'}
           isInputPassWorld={true}
          />
          <ButtonForm variant="primary" handleClickBtn={handleSubmitForm}>ĐĂNG NHẬP</ButtonForm>
          <ButtonForm variant="second" handleClickBtn={()=>{ }}>MỞ TÀI KHOẢN</ButtonForm>
          <div className="contact">
            <p className="link">QUÊN MẬT KHẨU</p>
            <p className="link" style={{textDecoration:'underline'}}>Trợ giúp</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
