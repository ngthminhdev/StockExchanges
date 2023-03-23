import { ImageIdentity } from "../Pages/SignUp/Form/FormIdentityUpload/FormIdentityUpload";

export interface IUser {
    fullName : string ,
    userName : string ,
    phoneNumber : string ,
    password : string ,
    email : string ,
    repeatPassword?:string ,
    rules?:boolean ,
    imageIdentity : ImageIdentity[] ,
}