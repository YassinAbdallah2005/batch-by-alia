export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cod' | 'vodafone' | 'instapay'
export type DeliveryType = 'pickup' | 'delivery'

export interface OrderItem {
  id: string
  order_id: string
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
}

export interface Order {
  id: string
  order_number: number
  customer_name: string
  customer_phone: string
  delivery_method: DeliveryType
  delivery_address: string | null
  notes: string | null
  payment_method: PaymentMethod
  status: OrderStatus
  total_amount: number
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface CreateOrderInput {
  customer_name: string
  customer_phone: string
  delivery_method: DeliveryType
  delivery_address?: string
  notes?: string
  payment_method: PaymentMethod
  total_amount: number
}

export interface CreateOrderItemInput {
  order_id: string
  product_name: string
  quantity: number
  unit_price: number
  subtotal: number
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-orange-100 text-orange-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
}

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  cod: 'Cash on Delivery',
  vodafone: 'Vodafone Cash',
  instapay: 'InstaPay',
}
