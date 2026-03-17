import { supabase } from './supabase'
import type { Order, OrderStatus, CreateOrderInput, CreateOrderItemInput } from '@/types/order'

// Create a new order with items
export async function createOrder(
  orderData: CreateOrderInput,
  items: CreateOrderItemInput[]
): Promise<Order> {
  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  if (orderError) throw orderError

  // Insert order items
  const itemsWithOrderId = items.map((item) => ({
    ...item,
    order_id: order.id,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsWithOrderId)

  if (itemsError) throw itemsError

  return order
}

// Fetch all orders (admin only - requires auth)
export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Update order status (admin only)
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Delete an order and its items (admin only)
export async function deleteOrder(orderId: string): Promise<void> {
  const { error: itemsError } = await supabase
    .from('order_items')
    .delete()
    .eq('order_id', orderId)

  if (itemsError) throw itemsError

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('id', orderId)

  if (error) throw error
}

// Get order stats
export async function getOrderStats() {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('status, total_amount, created_at')

  if (error) throw error

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 7)

  const monthAgo = new Date(today)
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const totalOrders = orders.length
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total_amount, 0)

  const todayOrders = orders.filter(
    (o) => new Date(o.created_at) >= today
  ).length

  const todayRevenue = orders
    .filter((o) => new Date(o.created_at) >= today && o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total_amount, 0)

  const pendingOrders = orders.filter((o) => o.status === 'pending').length

  const statusCounts = orders.reduce(
    (acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  // Daily revenue for last 7 days
  const dailyRevenue: { date: string; revenue: number; orders: number }[] = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    const dayOrders = orders.filter((o) => {
      const d = new Date(o.created_at)
      return d >= date && d < nextDate && o.status !== 'cancelled'
    })

    dailyRevenue.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      revenue: dayOrders.reduce((sum, o) => sum + o.total_amount, 0),
      orders: dayOrders.length,
    })
  }

  return {
    totalOrders,
    totalRevenue,
    todayOrders,
    todayRevenue,
    pendingOrders,
    statusCounts,
    dailyRevenue,
  }
}
