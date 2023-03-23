import React from "react";
import { confirmAction } from "./type";
import "./ConfirmBox.styles.scss" ;
import { Root } from "react-dom/client";

interface Props {
  action: confirmAction;
  root : Root ,
  overlay : Element ,
}

const ConfirmBox = ({ action , root , overlay }: Props) => {
  const { message , yes , no } = action ;

  const close = () => {
    root.unmount() ;
    overlay.remove() ;
  }

  const handleOke = () => {
    yes() ;
    close() ;
  }

  const handleCancle = () => {
    no && no() ;
    close() ;
  }
  
  return (
    <div className="confirmBox__container">
      <p className="confirmBox__container--message">{message}</p>
      <div className="confirmBox__buttons">
        <button onClick={handleCancle} className="confirmBox__button cancle">KHÔNG</button>
        <button onClick={handleOke} className="confirmBox__button confirm">TIẾP TỤC</button>
      </div>
    </div>
  );
};

export default ConfirmBox;
