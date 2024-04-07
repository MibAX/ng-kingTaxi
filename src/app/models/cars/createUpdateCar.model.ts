import { PowerType } from "../../enums/power-type.enum";
import { BookingModel } from "../bookings/booking.model";

export interface CreateUpdateCarModel {
    id: number,
    plateNumber: string,
    model: string,
    modelDate: number,
    powerType: PowerType,
}