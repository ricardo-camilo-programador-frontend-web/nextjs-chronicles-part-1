import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cartItem';
import { ShippingMethod, Address } from "@/types/shippingMethod";
import { CustomerInformation } from "@/types/customer";
import { OrderPaymentInfo } from "@/types/payment";
import { getUniqueId } from "@/utils/getUniqueId";

interface Order {
  orderId: string;
  items: CartItem[];
  shippingAddress: Address;
  shippingMethod: ShippingMethod;
  customerInfo: CustomerInformation;
  paymentInfo: OrderPaymentInfo;
  total: number;
  status: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'orderId' | 'createdAt'>) => string;
  getOrder: (orderId: string) => Order | undefined;
  getAllOrders: () => Order[];
}

const BITCOIN_PAYMENT_ADDRESS = 'bc1qdgqe3a4nruxwlp5wmuajyz0d9tv4hnf26qyta6';
const PIX_PAYMENT_ADDRESS = '5cc626c0-7e07-4c76-a20d-5559c58bd50b';

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const orderId = `${getUniqueId()}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
        const newOrder = {
          ...orderData,
          orderId,
          createdAt: new Date(),
          paymentInfo: {
            ...orderData.paymentInfo,
            url: orderData.paymentInfo.paymentMethod === 'bitcoin' ? BITCOIN_PAYMENT_ADDRESS : PIX_PAYMENT_ADDRESS
          }
        };

        set((state) => ({
          orders: [...state.orders, newOrder],
        }));

        return orderId;
      },
      getOrder: (orderId) => {
        return get().orders.find((order) => order.orderId === orderId);
      },
      getAllOrders: () => {
        return get().orders;
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
