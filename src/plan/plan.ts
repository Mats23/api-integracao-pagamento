import { Item } from "../item/Item";

export class Plan {
    id:string;
    name:string;
    currency:string;
    installments:number[];
    trial_period_days:number;
    interval:string;
    interval_count:number;
    items:Item[];
}