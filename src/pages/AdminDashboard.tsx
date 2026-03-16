import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { fetchOrders, updateOrderStatus, getOrderStats } from '@/lib/orders'
import { useNavigate } from 'react-router-dom'
import type { Order, OrderStatus } from '@/types/order'
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  PAYMENT_METHOD_LABELS,
} from '@/types/order'
import {
  LogOut, Search, Filter, Package, DollarSign,
  Clock, TrendingUp, ChevronDown, Phone, MapPin,
  MessageSquare, RefreshCw,
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line,
} from 'recharts'

const STATUS_OPTIONS: OrderStatus[] = [
  'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled',
]

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const navigate = useNavigate()

  const loadData = async () => {
    try {
      const [ordersData, statsData] = await Promise.all([
        fetchOrders(),
        getOrderStats(),
      ])
      setOrders(ordersData)
      setStats(statsData)
    } catch (err: any) {
      toast.error('Failed to load orders')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/admin/login')
        return
      }
      loadData()
    })

    // Real-time subscription
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          loadData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [navigate])

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      toast.success(`Order updated to ${ORDER_STATUS_LABELS[newStatus]}`)
      loadData()
    } catch (err) {
      toast.error('Failed to update order')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      search === '' ||
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer_phone.includes(search) ||
      order.order_number.toString().includes(search)

    const matchesStatus =
      statusFilter === 'all' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <RefreshCw className="mx-auto size-8 animate-spin text-accent" />
          <p className="mt-3 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <h1 className="font-display text-xl text-foreground">
              Batch by Alia
            </h1>
            <p className="text-xs text-muted-foreground">Order Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <RefreshCw className="size-4" />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        {/* Stats cards */}
        {stats && (
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              icon={<Package className="size-5" />}
              label="Total Orders"
              value={stats.totalOrders}
              color="text-blue-500"
            />
            <StatCard
              icon={<DollarSign className="size-5" />}
              label="Total Revenue"
              value={`${stats.totalRevenue} EGP`}
              color="text-green-500"
            />
            <StatCard
              icon={<Clock className="size-5" />}
              label="Today's Orders"
              value={stats.todayOrders}
              sub={`${stats.todayRevenue} EGP`}
              color="text-orange-500"
            />
            <StatCard
              icon={<TrendingUp className="size-5" />}
              label="Pending"
              value={stats.pendingOrders}
              color="text-yellow-500"
            />
          </div>
        )}

        {/* Charts */}
        {stats && stats.dailyRevenue.length > 0 && (
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-display text-sm text-foreground">
                Revenue (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [`${value} EGP`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#d4a574" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="mb-4 font-display text-sm text-foreground">
                Orders (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={stats.dailyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#888' }} />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#d4a574"
                    strokeWidth={2}
                    dot={{ fill: '#d4a574' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, phone, or order #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground outline-none focus:border-accent"
            >
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <div className="rounded-xl border border-border bg-card py-12 text-center">
              <Package className="mx-auto size-8 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">No orders found</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={selectedOrder?.id === order.id}
                onToggle={() =>
                  setSelectedOrder(
                    selectedOrder?.id === order.id ? null : order
                  )
                }
                onStatusUpdate={handleStatusUpdate}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  sub?: string
  color: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className={`mb-2 ${color}`}>{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

function OrderCard({
  order,
  isExpanded,
  onToggle,
  onStatusUpdate,
}: {
  order: Order
  isExpanded: boolean
  onToggle: () => void
  onStatusUpdate: (id: string, status: OrderStatus) => void
}) {
  const createdAt = new Date(order.created_at)
  const timeAgo = getTimeAgo(createdAt)

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Summary row */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/30"
      >
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs text-muted-foreground">
              #{order.order_number}
            </span>
            <p className="font-medium text-foreground">
              {order.customer_name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            {order.total_amount} EGP
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}
          >
            {ORDER_STATUS_LABELS[order.status]}
          </span>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded details */}
      {isExpanded && (
        <div className="border-t border-border bg-muted/20 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Customer info */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">
                Customer
              </h4>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Phone className="size-3.5 text-muted-foreground" />
                <a
                  href={`tel:${order.customer_phone}`}
                  className="underline hover:text-accent"
                >
                  {order.customer_phone}
                </a>
              </div>
              {order.delivery_method === 'delivery' && order.delivery_address && (
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <MapPin className="mt-0.5 size-3.5 text-muted-foreground" />
                  {order.delivery_address}
                </div>
              )}
              <div className="text-sm text-foreground">
                <span className="text-muted-foreground">Delivery: </span>
                {order.delivery_method === 'pickup' ? 'Pickup' : 'Delivery'}
              </div>
              <div className="text-sm text-foreground">
                <span className="text-muted-foreground">Payment: </span>
                {PAYMENT_METHOD_LABELS[order.payment_method]}
              </div>
              {order.notes && (
                <div className="flex items-start gap-2 text-sm text-foreground">
                  <MessageSquare className="mt-0.5 size-3.5 text-muted-foreground" />
                  {order.notes}
                </div>
              )}
            </div>

            {/* Order items */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                Items
              </h4>
              <div className="space-y-1.5">
                {order.order_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-foreground"
                  >
                    <span>
                      {item.quantity}x {item.product_name}
                    </span>
                    <span>{item.subtotal} EGP</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-1.5 text-sm font-semibold text-foreground">
                  <span>Total</span>
                  <span>{order.total_amount} EGP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status update */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              Update status:
            </span>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => onStatusUpdate(order.id, status)}
                disabled={order.status === status}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  order.status === status
                    ? ORDER_STATUS_COLORS[status] + ' ring-2 ring-accent/50'
                    : 'border border-border bg-card text-muted-foreground hover:bg-muted'
                }`}
              >
                {ORDER_STATUS_LABELS[status]}
              </button>
            ))}
          </div>

          {/* WhatsApp link */}
          <div className="mt-3">
            <a
              href={`https://wa.me/${order.customer_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                `Hi ${order.customer_name}! This is Batch by Alia. Your order #${order.order_number} status: ${ORDER_STATUS_LABELS[order.status]}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[#20BD5A]"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
