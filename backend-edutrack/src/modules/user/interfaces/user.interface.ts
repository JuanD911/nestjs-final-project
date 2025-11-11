import { UserTypes } from "./userTypes";

export interface User {

    id: string,
    full_name: string,
    email: string,
    password: string,
    role: UserTypes

}