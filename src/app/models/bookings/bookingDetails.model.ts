import { PassengerModel } from "../passengers/passenger.model";

export interface BookingDetailsModel {
    id: number,
    fromAddress: string,
    toAddress: string,
    pickUpTime: string,
    price: number,
    driverFullName: string,
    carPlateNumber: string,
    passengers: PassengerModel[]
}