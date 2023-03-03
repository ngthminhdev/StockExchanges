import React , { useState } from "react";
import { Stepper } from "../../components";
import {
  IndentityIcon,
  NoteTowerIcon1,
  NoteTowerIcon2,
  NoteTowerIcon3,
  PaperIcon,
  SignIcon,
  TowerRegister,
} from "../../components/icons";
import ButtonForm from "../SignIn/ButtonForm/ButtonForm";
import "./SignUp.styles.scss";

const SignUp = () => {

  const [activeStep , setActiveStep] = useState<number>(1) ;
  
  const listSteps = [
    {
      icon : <PaperIcon/> ,
      label : 'Thông tin đăng ký' ,
    } ,
    {
      icon : <IndentityIcon/>,
      label : 'Thông tin định danh' ,
    } ,
    {
      icon : <SignIcon/>,
      label : 'Kí hợp đồng' ,
    }
  ] ;

  const handleSubmitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
     if( activeStep == 3 ) {

     }
     else {
      setActiveStep( prev => prev + 1 ) ;
     }
  }

  return (
    <div>
      <header className="header__register">
        <div className="header__img" style={{ width: "108px" }} />
        <div className="header__contact--wrapper">
          <div className="header__contact">
            <span className="header__contact--icon setting"></span>
            <div className="header__contact--text">Hướng dẫn sử dụng</div>
          </div>
          <div></div>
          <div className="header__contact">
            <span className="header__contact--icon support"></span>
            <div className="header__contact--text">
              Tổng đài hỗ trợ DLINK{" "}
              <span
                style={{
                  fontSize: "15px",
                  color: "#F5A122",
                  fontWeight: "bold",
                }}
              >
                1900545409
              </span>{" "}
            </div>
          </div>
        </div>
      </header>
      <div className="content__register">
        <div className="content__left">
          <p className="title">THÁP TÀI SẢN</p>
          <TowerRegister />
          <div className="content__note">
            <span style={{height:'22px' , width:'65px'}}>
            <NoteTowerIcon1 />
            </span>
            <div className="content__note--text">
              Chứng khoán - Chứng quyền - Phái sinh - Margin
            </div>
          </div>
          <div className="content__note">
            <span style={{height:'22px' , width:'65px'}}>
            <NoteTowerIcon2 />
            </span>
            <div className="content__note--text">
              Trái phiếu doanh nghiệp - Chứng chỉ quỹ - Đầu tư cổ phiếu - Bất
              động sản
            </div>
          </div>
          <div className="content__note">
            <span style={{height:'22px' , width:'65px'}}>
            <NoteTowerIcon3 />
            </span>
            <div className="content__note--text">
              Kế hoạch bảo hiểm - Kế hoạch hưu trí - Tích sản mục tiêu
            </div>
          </div>
        </div>
        <div className="content__form--register">
          <Stepper listSteps={listSteps} activeStep={activeStep}/>
          <ButtonForm width="210px" height="32px" handleClickBtn={handleSubmitForm} variant="primary">Tiếp tục</ButtonForm>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
