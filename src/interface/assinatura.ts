import { Card } from "../card/card";
import { Customer } from "../customer/customer";
import { Plan } from "../plan/plan";

export class Assinatura {
    id:string;
    customer:Customer;
    card:Card;
    plan:Plan;
    plan_id:string;
    payment_method:string = 'credit_card';
    customer_id:string;
}