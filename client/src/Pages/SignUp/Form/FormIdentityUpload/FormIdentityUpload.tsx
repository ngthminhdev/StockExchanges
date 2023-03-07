import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { ButtonForm } from "../../../../components";
import { AddImageIcon } from "../../../../components/icons";
import "./FormIdentityUpload.styles.scss";

interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

interface IdentityForm {
  backsideImage: string;
  frontImage: string;
}

const FormIdentityUpload = ({ setActiveStep }: Props) => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentityForm>();

  const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ;
    if ( file ) {
      const fileUrl = URL.createObjectURL(file) ;
      console.log(fileUrl) ;
    }
  };

  const handleSubmitForm: SubmitHandler<IdentityForm> = (data) => {
    setActiveStep((prev) => prev + 1);
  }; 

  const productImageField = {...register("frontImage" , { required : true })} ;

  console.log(errors);

  return (
    <form
      className="form__register--infomation"
      onSubmit={handleSubmit(handleSubmitForm)}
      action=""
    >
      <p className="title">THÔNG TIN NHẬN DIỆN KHÁCH HÀNG</p>
      <p className="subTitle">
        Vui lòng cung cấp thông tin CMND/CCCD để xác thực khách hàng
      </p>
      <div className="inputFile__wrapper">
        <div className="inputFile__item" style={{ position: "relative" }}>
          <label htmlFor="frontImage" className="inputFile__label">
            <p style={{ fontSize: "14px" }}>ẢNH MẶT TRƯỚC</p>
            <p style={{ fontSize: "13px", margin: "8px 0 16px 0" }}>
              Hình ảnh chụp trực diện và rõ nét thông tin
            </p>
            <AddImageIcon />
            <img src="" alt="" />
            <input
              type="file"
              id="frontImage"
              {...productImageField }
              onChange={ (e) => { handleChangePicture(e) } }
            />
          </label>
          {errors.frontImage && (
            <p className="error__Input--img">Vui lòng tải ảnh mặt trước</p>
          )}
        </div>
        <div className="inputFile__item" style={{ position: "relative" }}>
          <label htmlFor="backsideImage" className="inputFile__label">
            <p style={{ fontSize: "14px" }}>ẢNH MẶT SAU</p>
            <p style={{ fontSize: "13px", margin: "8px 0 16px 0" }}>
              Hình ảnh chụp trực diện và rõ nét thông tin
            </p>
            <AddImageIcon />
            <img src="" alt="" />
            <input
              type="file"
              id="backsideImage"
              {...register("backsideImage", { required: true })}
            />
          </label>
          {errors.backsideImage && (
            <p className="error__Input--img">Vui lòng tải ảnh mặt sau</p>
          )}
        </div>
      </div>
      <ButtonForm
        width="210px"
        height="32px"
        variant="primary"
        styles={{
          margin: "32px 0",
        }}
      >
        Tiếp tục
      </ButtonForm>
    </form>
  );
};

export default FormIdentityUpload;
