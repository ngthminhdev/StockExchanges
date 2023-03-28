import { ImageIdentity } from "../Pages/SignUp/Form/FormIdentityUpload/FormIdentityUpload";

export interface IUser {
    username : string ,
    account_name : string ,
    phone : string ,
    password : string ,
    email : string ,
    confirm_password?:string ,
    rules?:boolean ,
    imageIdentity ?: ImageIdentity[] ,
}