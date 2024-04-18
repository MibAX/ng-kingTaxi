import { Gender } from "../../enums/gender.enum"

export interface CreateUpdateDriverModel {
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    phoneNumber: string,
    gender: Gender,
    rating: number
}