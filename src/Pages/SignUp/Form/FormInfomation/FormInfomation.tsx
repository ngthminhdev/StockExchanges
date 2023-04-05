import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { ButtonForm, CustomeInput, InputForm } from "../../../../components";
import { AgreeIcon } from "../../../../components/icons";
import { IFormValues } from "../../../../components/InputForm/InputForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./FormInfomation.styles.scss";
import { inputFormMapping } from "./type";
import { IUser } from "../../../../interface";
import { useCryptoGraphic } from "../../../../hook";

interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  userData: IUser;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Vui lòng nhập họ và tên")
      .min(4, "Vui lòng nhập tối thiểu 4 ký tự"),
    account_name: yup
      .string()
      .required("Vui lòng nhập tên đăng nhập")
      .min(4, "Vui lòng nhập tối thiểu 4 ký tự").matches( /^\S+$/ ,"Tên đăng nhập không được có khoảng trắng"),
    phone: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .matches(phoneRegExp, "Số điện thoại không hợp lệ"),
    email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
    password: yup.string().required("Vui lòng nhập mật khẩu").min(8,"Vui lòng nhập tối thiểu 8 ký tự").matches( /^.*[a-z]+.*$/,"Phải có ít nhất 1 chữ cái thường").matches( /.*[A-Z]+.*$/,"Phải có ít nhất 1 chữ cái in hoa").matches( /^.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+.*$/,"Phải có ít nhất 1 ký tự đặc biệt") ,
    confirm_password: yup.string().required("Vui lòng nhập mật khẩu nhập lại").min(8,"Vui lòng nhập tối thiểu 8 ký tự").oneOf([yup.ref("password")] , "Khác với mật khẩu đăng ký"),
    rules: yup.bool().oneOf([true], "Vui lòng bấm xác nhận"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const FormInfomation = ({ setActiveStep, setUserData, userData }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: userData,
  });

  const { enCode, deCode } = useCryptoGraphic();

  const errorsField = [
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.username?.message}
        </p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.account_name?.message}
        </p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.phone?.message}
        </p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">{errors?.email?.message}</p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.password?.message}
        </p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.confirm_password?.message}
        </p>
      ),
    },
  ];

  const handleSubmitForm: SubmitHandler<IFormValues> = async (
    data: FormData
  ) => {
    if (isDirty) {
      const newData = { ...userData, ...data };
      const encodedRegisterData = enCode(newData);
      localStorage.setItem(
        "vnd-register-data",
        JSON.stringify(encodedRegisterData)
      );
    }
    setActiveStep((prev) => {
      localStorage.setItem("vnd-register-step", JSON.stringify(prev + 1));
      return prev + 1;
    });
  };

  const inputFormMapping: inputFormMapping[] = [
    {
      label: "Họ và tên",
      id: "username",
      type: "text",
    },
    {
      label: "Tên đăng nhập",
      id: "account_name",
      type: "text",
    },
    {
      label: "Số điện thoại",
      id: "phone",
      type: "tel",
    },
    {
      label: "Email",
      id: "email",
      type: "email",
    },
    {
      label: "Mật khẩu",
      id: "password",
      type: "password",
    },
    {
      label: "Nhập lại mật khẩu",
      id: "confirm_password",
      type: "password",
    },
  ];

  useEffect(() => {
    const encodedString = localStorage.getItem("vnd-register-data");
    if (encodedString) {
      const data = deCode(JSON.parse(encodedString));
      setUserData(data);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="form__register--infomation"
    >
      <p className="title">ĐĂNG KÝ MỞ TÀI KHOẢN CHỨNG KHOÁN</p>
      <p className="subTitle">
        Quý khách vui lòng nhập các thông tin dưới đây để mở tài khoản
      </p>
      <div className="inputRegister__wrapper">
        {inputFormMapping.map((item, index) => {
          return (
            <div
              key={index}
              style={{ marginTop: index == 1 || index == 0 ? "24px" : "0" }}
              className="inputContainer"
            >
              <label
                style={{ fontSize: "13px", marginBottom: "4px" }}
                htmlFor={item.id}
              >
                {item.label}
              </label>
              <InputForm
                type={item.type}
                id={item.id}
                register={register}
                label={item.id}
                styles={{
                  width: "332px",
                  height: "38px",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                  borderColor: "#CBD5E0",
                }}
              />
              {errorsField[index].tag}
            </div>
          );
        })}
        <div className="inputContainer">
          <label
            style={{ fontSize: "13px", marginBottom: "4px" }}
            htmlFor={"presenter"}
          >
            {"Mã người giới thiệu (Nếu có)"}
          </label>
          <CustomeInput
            type={"text"}
            id={"presenter"}
            placeHolder=""
            styles={{
              width: "332px",
              height: "38px",
              paddingRight: "16px",
              paddingLeft: "16px",
              borderColor: "#CBD5E0",
            }}
          />
        </div>
      </div>
      <label
        style={{ display: "flex", alignItems: "flex-start" }}
        htmlFor="rules"
      >
        <input
          style={{ display: "none" }}
          className="checkBox__rules"
          type="checkbox"
          id="rules"
          {...register("rules")}
        />
        <span className="checkBox__container">
          <AgreeIcon />
        </span>
        <p style={{ fontSize: "12px" }}>
          Tôi đề nghị mở tài khoản chứng khoán tại VNDIRECT, đồng ý giao kết hợp
          đồng mở tài khoản chứng khoán và chấp nhận toàn bộ{" "}
          <a
            target="_blank"
            href="https://www.vndirect.com.vn/cmsupload/beta/Dieu-khoan-dieu-kien.pdf"
            style={{ textDecoration: "underline", color: "#F5A122" }}
          >
            các điều khoản và điều kiện giao dịch chứng khoán
          </a>
        </p>
      </label>
      <p
        style={{
          width: "100%",
          textAlign: "left",
          fontSize: "12px",
          fontWeight: "500",
          color: "#CC2222",
        }}
      >
        {errors.rules?.message}
      </p>
      <ButtonForm
        width="210px"
        height="32px"
        variant="primary"
        styles={{
          marginTop: "32px",
        }}
      >
        Tiếp tục
      </ButtonForm>
      <p style={{ marginTop: "12px", fontSize: "12px" }}>
        Đã có tài khoản ?{" "}
        <Link style={{ color: "#F5A122" }} to={"/login"}>
          <span>Đăng nhập</span>
        </Link>
      </p>
    </form>
  );
};

export default FormInfomation;
