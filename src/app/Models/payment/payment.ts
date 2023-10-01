import { Contract } from '../contract/contract';
import { PaymentMethod } from '../payment-method/payment-method';

export class Payment {
  constructor(
    public id: number,
    public paymentMethod: PaymentMethod | null = null,
    public contract: Contract,
    public totalPrice: number,
    public isPay: boolean,
    public paymentDdate: Date | null = null
  ) {}
}
