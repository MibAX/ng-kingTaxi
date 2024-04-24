import { Gender } from "../../enums/gender.enum"
import { BookingModel } from "../bookings/booking.model"

export interface CreateUpdatePassengerModel {
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    phoneNumber: string,
    gender: Gender
}