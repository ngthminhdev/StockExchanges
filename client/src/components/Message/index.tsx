import React from 'react'
import { createRoot } from 'react-dom/client';
import MessageBox from './MessageBox';

import { MessageFunction , cteateMessageFunc } from './type'

// 4 fuction tượng trưng cho 4 type message để sẵn gọi ra 
// 1 function để tạo wrapper và container cho message ,
// 1 function để render và unmount message 

const createContainer = () => {
    let messageWrapper = document.querySelector("#messageWrapper") ;
    if ( !messageWrapper ) {
        messageWrapper = document.createElement('div') ;
        messageWrapper.id = 'messageWrapper' ;
        document.body.appendChild(messageWrapper) ;
    }

    let container = document.createElement('div') ;
    container.id = "messageContainer" ;
    messageWrapper.appendChild(container) ;
    return container ;
}

const createMessage:cteateMessageFunc = ( type , message ) => {
    const container = createContainer() ;
    const root = createRoot(container) ;
    root.render(<MessageBox type={type} message={message}/>)
    setTimeout( () => {
      root.unmount() ;
      container.remove() ;
    } ,2000)
}

export const infoMessage:MessageFunction = ( message ) => {
    createMessage("Info",message) ;
}

export const warningMessage:MessageFunction = ( message ) => {
    createMessage("Warning",message) ;
}

export const errorMessage:MessageFunction = ( message ) => {
    createMessage("Error",message) ;
}

export const successMessage:MessageFunction = ( message ) => {
    createMessage("Success",message) ;
}