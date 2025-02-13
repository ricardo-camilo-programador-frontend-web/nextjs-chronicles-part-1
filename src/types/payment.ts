export interface CreditCardInfo {
  number: string;
  name: string;
  expirationDate: string;
  cvv: string;
}

export interface BoletoInfo {
  number: string;
}

export type PaymentMethod = 'creditCard' | 'boleto' | 'pix' | 'bitcoin' | 'paypal';

export interface PaymentInformation {
  paymentMethod: PaymentMethod;
  creditCard?: CreditCardInfo;
  boleto?: BoletoInfo;
}
