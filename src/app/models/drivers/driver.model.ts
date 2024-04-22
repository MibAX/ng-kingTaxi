import { Gender } from "../../enums/gender.enum";

export interface DriverModel {
    id: number,
    fullName: string,
    phoneNumber: string,
    gender: Gender,
    rating: number
}