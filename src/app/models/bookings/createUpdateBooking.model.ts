export interface CreateUpdateBookingModel {
    id: number,
    fromAddress: string,
    toAddress: string,
    pickUpTime: string,
    price: number,
    passengerIds: number[],
    carId: number,
    driverId: number
}