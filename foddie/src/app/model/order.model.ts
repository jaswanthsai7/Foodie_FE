import { Restaurant } from "./restaurant.model";

export interface Order{
    email?: string,
    restaurant?: Restaurant,
    totalAmount?: Number,
    address?:string
}