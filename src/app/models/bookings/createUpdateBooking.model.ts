export interface CreateUpdateBookingModel {
    id: number,
    fromAddress: string,
    toAddress: string,
    pickUpTime: string,
    passengerIds: number[],
    carId: number,
    driverId: number
}