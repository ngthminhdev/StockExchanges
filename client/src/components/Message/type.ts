export type MessageType = 'Info' | 'Warning' | 'Success' | 'Error' ;
export type cteateMessageFunc = ( type : MessageType , message : string ) => void ;
export type MessageFunction = ( message : string ) => void ;