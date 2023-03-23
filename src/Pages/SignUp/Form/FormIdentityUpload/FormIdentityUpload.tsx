import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types/form";
import { ButtonForm } from "../../../../components";
import { AddImageIcon } from "../../../../components/icons";
import { useCryptoGraphic } from "../../../../hook";
import { IUser } from "../../../../interface";
import "./FormIdentityUpload.styles.scss";
import { InputFileMapping } from "./type";

interface Props {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
}

export interface ImageIdentity {
  imgType: string;
  imgUrl: string | undefined;
  imgErrors?: string;
}

interface errorsForm {
  frontImage: string | undefined;
  backsideImage: string | undefined;
}

const FormIdentityUpload = ({ setActiveStep, setUserData }: Props) => {
  const [imagesPreview, setImagesPreview] = useState<ImageIdentity[]>([
    { imgType: "frontImage", imgUrl: "" },
    { imgType: "backsideImage", imgUrl: "" },
  ]);
  const [isChangeImage, setIsChangeImage] = useState<boolean>(false);
  const errors: errorsForm = useMemo(() => {
    let errorObject: errorsForm = { frontImage: "", backsideImage: "" };
    imagesPreview.forEach((item) => {
      let errosMesage = "";
      if (!item.imgUrl && isChangeImage == true) {
        errosMesage = `Vui lòng tải ảnh mặt ${
          item.imgType == "backsideImage" ? "sau" : "trước"
        }`;
      }
      errorObject[item.imgType as keyof errorsForm] = errosMesage;
    });
    return errorObject;
  }, [imagesPreview]);

  console.log(errors);

  const getImage = (imageType: string): ImageIdentity => {
    return imagesPreview.find((image) => image.imgType == imageType)!;
  };

  console.log(imagesPreview);

  const { deCode, enCode } = useCryptoGraphic();

  function getBase64(file: any, callback: any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      callback(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typeImage = e.target.id;
    let beforePicture = getImage(typeImage);
    if (beforePicture) {
      const imageUrl: { url?: string } = { url: beforePicture.imgUrl };
      delete imageUrl.url;
    }
    const file = e.target.files && e.target.files[0];
    if (file) {
      getBase64(file, (fileUrl: string) => {
        setImagesPreview((prev) =>
          prev.map((img) => {
            if (img.imgType == typeImage) {
              img.imgUrl = fileUrl;
            }
            return img;
          })
        );
      });
    }
    setIsChangeImage(true);
  };

  const getDataInfomationForm = () => {
    const jsonData = localStorage.getItem("vnd-register-data");
    if (jsonData) {
      const data = JSON.parse(jsonData);
      return data;
    }
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChangeImage) {
      if (errors.frontImage == "" && errors.backsideImage == "") {
         const dataInfomationForm = getDataInfomationForm();
         const decodedData = deCode(dataInfomationForm);
         const newData = { ...decodedData
           , imageIdentity: imagesPreview
         };
         setUserData(newData) ;
         const encodeData = enCode(newData);
         localStorage.setItem("vnd-register-data", JSON.stringify( encodeData ) );
      } else {
        return;
      }
    }
    setActiveStep((prev) => {
      localStorage.setItem("vnd-register-step", JSON.stringify(prev + 1));
      return prev + 1;
    });
  };

  useEffect(() => {
    const encodedString = localStorage.getItem("vnd-register-data");
    if (encodedString) {
      const data = deCode(JSON.parse(encodedString));
      if (data.imageIdentity) {
        console.log(data.imageIdentity)
         setImagesPreview( data.imageIdentity ) ;
        // shift end : boi den tu con tro den cuoi dong
      }
    }
  }, []);

  const inputFileMapping: InputFileMapping[] = [
    {
      id: "frontImage",
      textHeader: "ẢNH MẶT TRƯỚC",
      subTextHeader: "Hình ảnh chụp trực diện và rõ nét thông tin",
      errorMessage: "Vui lòng tải ảnh mặt trước",
    },
    {
      id: "backsideImage",
      textHeader: "ẢNH MẶT SAU",
      subTextHeader: "Hình ảnh chụp trực diện và rõ nét thông tin",
      errorMessage: "Vui lòng tải ảnh mặt sau",
    },
  ];

  const errorsFileMapping = [
    {
      tag: errors.frontImage && (
        <p className="error__Input--img">{"Vui lòng tải ảnh mặt trước"}</p>
      ),
    },
    {
      tag: errors.backsideImage && (
        <p className="error__Input--img">{"Vui lòng tải ảnh mặt sau"}</p>
      ),
    },
  ];

  return (
    <form
      className="form__register--infomation"
      onSubmit={(e) => {
        handleSubmitForm(e);
      }}
      action=""
    >
      <p className="title">THÔNG TIN NHẬN DIỆN KHÁCH HÀNG</p>
      <p className="subTitle">
        Vui lòng cung cấp thông tin CMND/CCCD để xác thực khách hàng
      </p>
      <div className="inputFile__wrapper">
        {inputFileMapping.map((inputFile, index) => {
          return (
            <div
              key={inputFile.id}
              className="inputFile__item"
              style={{ position: "relative" }}
            >
              <label htmlFor={inputFile.id} className="inputFile__label">
                <p style={{ fontSize: "14px" }}>{inputFile.textHeader}</p>
                <p style={{ fontSize: "13px", margin: "8px 0 16px 0" }}>
                  {inputFile.subTextHeader}
                </p>
                <AddImageIcon />
                <img src={getImage(inputFile.id).imgUrl} alt="" />
                <input
                  type="file"
                  id={inputFile.id}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleChangePicture(e);
                  }}
                />
              </label>
              {errorsFileMapping[index].tag}
            </div>
          );
        })}
      </div>
      <div className="buttons__wrapper">
        <ButtonForm
          width="210px"
          height="32px"
          variant="second"
          styles={{
            margin: "32px 0",
          }}
          handleClickBtn={() => {
            setActiveStep((prev) => {
              localStorage.setItem(
                "vnd-register-step",
                JSON.stringify(prev - 1)
              );
              return prev - 1;
            });
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

export default FormIdentityUpload;
