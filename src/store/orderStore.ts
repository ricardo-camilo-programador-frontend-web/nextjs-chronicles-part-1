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
