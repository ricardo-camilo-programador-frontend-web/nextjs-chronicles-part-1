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

export interface OrderPaymentInfo {
  paymentMethod: PaymentMethod;
  creditCard?: CreditCardInfo;
  boleto?: BoletoInfo;
  qrCodeUrl?: string;
  boletoUrl?: string;
  paypalUrl?: string;
  pixUrl?: string;
  bitcoinUrl?: string;
}
