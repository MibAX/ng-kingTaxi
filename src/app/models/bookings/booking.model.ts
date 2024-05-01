export interface BookingModel {
    id: number,
    fromAddress: string,
    toAddress: string,
    pickUpTime: string,
    price: number,
    driverFullName: string,
    driverPhoneNumber: string,
    driverRating: number,
    carPlateNumber: string,
}