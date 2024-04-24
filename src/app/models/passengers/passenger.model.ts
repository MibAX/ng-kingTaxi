import { Gender } from "../../enums/gender.enum";

export interface PassengerModel {
    id: number,
    phoneNumber: string,
    fullName: string,
    age: number,
    gender: Gender
}
