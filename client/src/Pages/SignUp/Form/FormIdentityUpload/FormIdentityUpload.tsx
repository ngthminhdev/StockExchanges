import React, { useEffect, useState } from "react";
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

interface ImageIdentity {
  imgType: string ,
  imgUrl: string,
}

const FormIdentityUpload = ({ setActiveStep }: Props) => {
  const [imagesPreview, setImagesPreview] = useState<ImageIdentity[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IdentityForm>();

  console.log(imagesPreview) ;

  const getImage = ( imageType : string ) => {
     return imagesPreview.find(
      (image) => image.imgType == imageType
    );
  }

  const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
      const typeImage = e.target.id ;
      let beforePicture = getImage(typeImage) ;
      if (beforePicture) {
        URL.revokeObjectURL(beforePicture.imgUrl);
      }
      const file = e.target.files && e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        console.log(fileUrl);
        if ( beforePicture ) {
          setImagesPreview((prev) =>
            prev.map((img) => {
              if (img.imgType == typeImage) {
                img.imgUrl = fileUrl;
              }
              return img;
            })
          );
        } else {
          setImagesPreview((prev) => [
            ...prev,
            { imgType: typeImage, imgUrl: fileUrl },
          ]);
        }
      }
  };

  const handleSubmitForm: SubmitHandler<IdentityForm> = (data) => {
    setActiveStep((prev) => prev + 1);
  };

  useEffect( () => {
   const handleRemoveImageUrl = () => {
    imagesPreview.forEach ( (img) => {
       URL.revokeObjectURL(img.imgUrl) ;
    } )
   }
   return () => {
    handleRemoveImageUrl() ;
   }
  } , [] )

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
            <img src={getImage("frontImage")?.imgUrl} alt="" />
            <input
              type="file"
              id="frontImage"
              style={{ display: "none" }}
              { ...register("frontImage", { required: true }) }
              onChange={(e) => {
                handleChangePicture(e);
              }}
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
            <img src={getImage("backsideImage")?.imgUrl} alt="" />
            <input
              type="file"
              id="backsideImage"
              style={{ display: "none" }}
              {...register("backsideImage", { required: true })}
              onChange={(e) => {
                handleChangePicture(e);
              }}
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
