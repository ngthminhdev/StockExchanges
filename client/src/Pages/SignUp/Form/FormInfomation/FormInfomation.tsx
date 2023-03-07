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

interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const schema = yup
  .object()
  .shape({
    fullName: yup.string().required("Vui lòng nhập họ và tên"),
    userName: yup.string().required("Vui lòng nhập tên đăng nhập"),
    phoneNumber: yup.string().required("Vui lòng nhập số điện thoại"),
    email: yup.string().required("Vui lòng nhập email"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    repeatPassword: yup.string().required("Vui lòng nhập mật khẩu nhập lại"),
    rules: yup.bool().oneOf([true], "Vui lòng bấm xác nhận"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const FormInfomation = ({ setActiveStep }: Props) => {
  const [checkedInput, setCheckedInput] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      repeatPassword: "",
      rules: false,
    },
  });

  const errorsField = [
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.fullName?.message}
        </p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.userName?.message}
        </p>
      ),
    },
    {
      tag: (
        <p className="error__Input--formInfomation">
          {errors?.phoneNumber?.message}
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
          {errors?.repeatPassword?.message}
        </p>
      ),
    },
  ];

  const handleSubmitForm: SubmitHandler<IFormValues> = (data: FormData ) => {
    setActiveStep( prev => prev + 1 ) ;
  };

  const inputFormMapping: inputFormMapping[] = [
    {
      label: "Họ và tên",
      id: "fullName",
      type: "text",
    },
    {
      label: "Tên đăng nhập",
      id: "userName",
      type: "text",
    },
    {
      label: "Số điện thoại",
      id: "phoneNumber",
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
      id: "repeatPassword",
      type: "password",
    },
  ];

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
