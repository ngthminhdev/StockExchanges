import { createRoot } from "react-dom/client";
import ConfirmBox from "./ConfirmBox";
import { confirmBoxFunc } from "./type";

const createOverlay = () => {
    let overlay = document.querySelector("#overlayConfirmBox") ;
    if ( !overlay ) {
       overlay = document.createElement("div") ;
       overlay.id = 'overlayConfirmBox' ;
       document.body.appendChild(overlay) ;
    }
    return overlay ;
}

export const confirmBox:confirmBoxFunc = (action) => {
  const overlay = createOverlay() ;
  const root = createRoot(overlay) ;
  root.render(<ConfirmBox root={root} overlay={overlay} action={action}/>)
}