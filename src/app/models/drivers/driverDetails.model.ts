import { Gender } from "../../enums/gender.enum"
import { CarModel } from "../cars/car.model"

export interface DriverDetailsModel {
    id: number,
    fullName: string,
    age: number,
    phoneNumber: string,
    gender: Gender,
    rating: number,
    cars: CarModel[]
}