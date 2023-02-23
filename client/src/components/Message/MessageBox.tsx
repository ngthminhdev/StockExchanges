import React from 'react'
import getIconsMessage from './icons'
import { MessageType } from './type'

interface Props {
    type : MessageType ,
    message : string ,
}

const MessageBox = ( { type , message }:Props ) => {
  return (
    <div className={type}>
        <span>{getIconsMessage(type)}</span>
        <div>
            <p className='typeTitle'>{type}</p>
            <p>{message}</p>
        </div>
    </div>
  )
}

export default MessageBox