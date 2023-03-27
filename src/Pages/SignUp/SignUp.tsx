import React, { useEffect, useState } from "react";
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
import { FormContract, FormIdentityUpload, FormInfomation } from "./Form";
import { IUser } from "../../interface";
import "./SignUp.styles.scss";
import { confirmBox } from "../../components/ConfirmBox";

const SignUp = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [userData, setUserData] = useState<IUser>({
    username: "",
    account_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    rules: false,
    imageIdentity : [
      { imgType: "frontImage", imgUrl: "" },
      { imgType: "backsideImage", imgUrl: "" },
    ]
  });

  const listSteps = [
    {
      icon: <PaperIcon />,
      label: "Thông tin đăng ký",
    },
    {
      icon: <IndentityIcon />,
      label: "Thông tin định danh",
    },
    {
      icon: <SignIcon />,
      label: "Kí hợp đồng",
    },
  ];

  const stepForm = [
    {
      component: (
        <FormInfomation
          setActiveStep={setActiveStep}
          setUserData={setUserData}
          userData={userData}
        />
      ),
    },
    { component: <FormIdentityUpload setUserData={setUserData} setActiveStep={setActiveStep} /> },
    { component: <FormContract setActiveStep={setActiveStep} /> },
  ];

  useEffect(() => {
    const step = localStorage.getItem("vnd-register-step");
    if (step) {
      if (+step != 1) {
        confirmBox({
          message:
            "Bạn có muốn tiếp tục quá trình đăng ký lần trước hay không ?",
          yes : () => { 
            setActiveStep(+step) ;
           } ,
          no : () => {
            localStorage.removeItem("vnd-register-step") ;
            localStorage.removeItem("vnd-register-data") ;
          }
        });
      }
    }
  }, []);

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
            <span style={{ height: "22px", width: "65px" }}>
              <NoteTowerIcon1 />
            </span>
            <div className="content__note--text">
              Chứng khoán - Chứng quyền - Phái sinh - Margin
            </div>
          </div>
          <div className="content__note">
            <span style={{ height: "22px", width: "65px" }}>
              <NoteTowerIcon2 />
            </span>
            <div className="content__note--text">
              Trái phiếu doanh nghiệp - Chứng chỉ quỹ - Đầu tư cổ phiếu - Bất
              động sản
            </div>
          </div>
          <div className="content__note">
            <span style={{ height: "22px", width: "65px" }}>
              <NoteTowerIcon3 />
            </span>
            <div className="content__note--text">
              Kế hoạch bảo hiểm - Kế hoạch hưu trí - Tích sản mục tiêu
            </div>
          </div>
        </div>
        <div className="content__form--register">
          <Stepper listSteps={listSteps} activeStep={activeStep} />
          <div style={{ width: "100%" }}>
            <div style={{ paddingInline: "8%", marginTop: "24px" }}>
              {stepForm[activeStep - 1].component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
