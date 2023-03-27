import React from "react";
import "./Stepper.styles.scss";
import { IStep } from "./type";

interface Props {
  listSteps: IStep[];
  activeStep : number ,
}

const Stepper = ({ listSteps , activeStep }: Props) => {
  // nhận vào 1 state là acticeStep để biết step nào đang thực hiện và 1 mảng steps
  const widthPerStep = 100 / listSteps.length ;
  const isCompleted = ( activeIndex:number , indexItem:number ) => activeIndex > indexItem ;
  const isProcessAndCompleted = ( activeIndex:number , indexItem:number ) => activeIndex >= indexItem ;
  return (
    <div className="stepper__wrapper">
      {listSteps.map( ( step , index ) => (
        <div key={index} className={`stepper__item ${ isCompleted(activeStep , index + 1) && 'active' }`} style={{width:`${widthPerStep}%`}}>
          <div className={`stepper__step ${ isProcessAndCompleted(activeStep , index + 1) && 'active' }`}>{ step.icon ? step.icon : index}</div>
          <div className={`stepper__label ${ isProcessAndCompleted(activeStep , index + 1) && 'active' }`}>{step.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;

// ${ isActive(activeStep , index + 1) && 'active' }
