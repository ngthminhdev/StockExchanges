import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ButtonForm } from "../../../../components";
import { AgreeIcon } from "../../../../components/icons";
import "./FormContract.styles.scss";

interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

interface FormContract {
  acceptContract: boolean;
}

const FormContract = ({ setActiveStep }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormContract>();

  console.log(errors);
  const handleSubmitForm: SubmitHandler<FormContract> = async (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="form__register--infomation"
    >
      <p className="title">HỢP ĐỒNG MỞ TÀI KHOẢN</p>
      <iframe
        src="https://www.vndirect.com.vn/cmsupload/beta/HD-Mo-tai-khoan_25102021.pdf"
        style={{ border: "0px #ffffff none", marginTop: "24px" }}
        name="myiFrame"
        scrolling="yes"
        height="345px"
        width="716px"
      ></iframe>
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          marginTop: "24px",
        }}
        htmlFor="rules"
      >
        <input
          style={{ display: "none" }}
          className="checkBox__rules"
          type="checkbox"
          id="rules"
          {...register("acceptContract", { required: true })}
        />
        <span className="checkBox__container">
          <AgreeIcon />
        </span>
        <p style={{ fontSize: "12px" }}>
          Tôi đã đọc và đồng ý với hợp đồng mở tài khoản
        </p>
      </label>
      {errors.acceptContract && (
        <p className="error__Input--checkBox">
          Vui lòng bấm chọn đồng ý trước khi tiếp tục
        </p>
      )}
      <div className="buttons__wrapper">
        <ButtonForm
          width="210px"
          height="32px"
          variant="second"
          styles={{
            margin: "32px 0",
          }}
          type={"button"}
          handleClickBtn={() => {
            setActiveStep( prev => { 
              localStorage.setItem("vnd-register-step", JSON.stringify(prev-1) ) ;
              return prev - 1 ;
            } );
          }}
        >
          Trở về
        </ButtonForm>
        <ButtonForm
          width="210px"
          height="32px"
          variant="primary"
          styles={{
            margin: "32px 0 32px 20px",
          }}
        >
          Tiếp tục
        </ButtonForm>
      </div>
    </form>
  );
};

export default FormContract;
