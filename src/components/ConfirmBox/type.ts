export interface confirmAction {
    message : string ,
    yes : () => void ,
    no ?: () => void ,
}

export type confirmBoxFunc = ( action : confirmAction ) => void