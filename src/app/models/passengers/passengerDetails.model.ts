import { Gender } from "../../enums/gender.enum"
import { BookingModel } from "../bookings/booking.model"

export interface PassengerDetailsModel {
    id: number,
    phoneNumber: string,
    fullName: string,
    age: number,
    gender: Gender,
    Bookings: BookingModel[]
}