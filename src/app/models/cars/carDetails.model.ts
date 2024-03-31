import { BookingModel } from "../bookings/booking.model";

export interface CarDetailsModel {
    id: number,
    plateNumber: string,
    model: string,
    modelDate: number,
    powerType: number,
    driverFullName: string,
    bookings: BookingModel[]
}