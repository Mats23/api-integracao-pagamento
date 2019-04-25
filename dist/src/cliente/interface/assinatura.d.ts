import { Card } from "../card/card";
import { Customer } from "../customer/customer";
import { Plan } from "../plan/plan";
export declare class Assinatura {
    customer: Customer;
    card: Card;
    plan: Plan;
    plan_id: string;
    payment_method: string;
    customer_id: string;
}
