import { PowerType } from "../../enums/power-type.enum";

export interface CreateUpdateCarModel {
    id: number,
    plateNumber: string,
    model: string,
    modelDate: number,
    powerType: PowerType,
}