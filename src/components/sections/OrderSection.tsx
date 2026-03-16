import { useState } from 'react'
import {
  Plus, Minus, Check, Copy, ExternalLink,
  Banknote, Smartphone, CreditCard,
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import toast from 'react-hot-toast'

const PRODUCTS = [
  { name: 'Cookies', price: 85 },
  { name: 'Brownies', price: 120 },
  { name: 'Cinnamon Buns', price: 95 },
]

const INSTAPAY_NUMBER = '+201120110109'
const VODAFONE_NUMBER = '01120110109'

type PaymentMethod = 'cod' | 'vodafone' | 'instapay'

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; desc: string; icon: typeof Banknote }[] = [
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: Banknote },
  { id: 'vodafone', label: 'Vodafone Cash', desc: 'Send to our Vodafone wallet', icon: Smartphone },
  { id: 'instapay', label: 'InstaPay', desc: 'Bank transfer via InstaPay', icon: CreditCard },
]

export function OrderSection() {
  const sectionRef = useScrollAnimation()
  const [quantities, setQuantities] = useState([0, 0, 0])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [delivery, setDelivery] = useState<'pickup' | 'delivery'>('pickup')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [payment, setPayment] = useState<PaymentMethod>('cod')
  const [showConfirm, setShowConfirm] = useState(false)
  const [copiedField, setCopiedField] = useState('')

  const total = quantities.reduce((sum, q, i) => sum + q * PRODUCTS[i].price, 0)

  const updateQty = (index: number, delta: number) => {
    setQuantities((prev) =>
      prev.map((q, i) => (i === index ? Math.max(0, q + delta) : q))
    )
  }

  const getOrderItems = () =>
    PRODUCTS.map((p, i) => ({ ...p, qty: quantities[i] })).filter(
      (item) => item.qty > 0
    )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (total === 0) {
      toast.error('Please add at least one item to your order')
      return
    }
    if (!name.trim() || !phone.trim()) {
      toast.error('Please fill in your name and phone number')
      return
    }
    if (delivery === 'delivery' && !address.trim()) {
      toast.error('Please enter your delivery address')
      return
    }
    setShowConfirm(true)
  }

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedField(label)
    toast.success(`${label} copied!`)
    setTimeout(() => setCopiedField(''), 2000)
  }

  const paymentLabel = PAYMENT_OPTIONS.find((p) => p.id === payment)?.label ?? ''

  const whatsappMessage = () => {
    const items = getOrderItems()
    const lines = items.map((i) => `${i.qty}x ${i.name} (${i.qty * i.price} EGP)`)
    const msg = `Hi Alia! 🍪\n\nI'd like to place an order:\n${lines.join('\n')}\n\nTotal: ${total} EGP\nPayment: ${paymentLabel}\n\nName: ${name}\nPhone: ${phone}\n${delivery === 'delivery' ? `Delivery to: ${address}` : 'Pickup'}\n${notes ? `Notes: ${notes}` : ''}`
    return `https://wa.me/201120110109?text=${encodeURIComponent(msg)}`
  }

  const inputClass =
    'w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30'

  return (
    <section id="order" className="bg-muted py-24 md:py-32" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="scroll-animate mb-12 text-center">
          <h2 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
            Place Your Order
          </h2>
          <p className="mt-3 text-muted-foreground">
            Choose your treats and we'll have them ready for you
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="scroll-animate mx-auto max-w-2xl rounded-2xl bg-card p-6 shadow-lg md:p-8"
          style={{ transitionDelay: '100ms' }}
        >
          {/* Product rows */}
          <div className="space-y-4">
            {PRODUCTS.map((product, i) => (
              <div
                key={product.name}
                className="flex items-center justify-between rounded-xl bg-muted/50 p-4"
              >
                <div>
                  <p className="font-display text-lg text-foreground">
                    {product.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {product.price} EGP / box
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateQty(i, -1)}
                    className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted active:scale-95"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-8 text-center font-medium text-foreground">
                    {quantities[i]}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(i, 1)}
                    className="flex size-8 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted active:scale-95"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <span className="font-display text-xl text-foreground">Total</span>
            <span className="font-display text-2xl text-accent">
              {total} EGP
            </span>
          </div>

          {/* Customer details */}
          <div className="mt-8 space-y-4">
            <h3 className="font-display text-lg text-foreground">
              Your Details
            </h3>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />

            {/* Delivery preference */}
            <div className="flex gap-4">
              {(['pickup', 'delivery'] as const).map((opt) => (
                <label
                  key={opt}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                    delivery === opt
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={opt}
                    checked={delivery === opt}
                    onChange={() => setDelivery(opt)}
                    className="sr-only"
                  />
                  {opt === 'pickup' ? 'Pickup' : 'Delivery'}
                </label>
              ))}
            </div>

            {delivery === 'delivery' && (
              <textarea
                placeholder="Delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className={inputClass + ' resize-none'}
              />
            )}

            <textarea
              placeholder="Any special requests?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* Payment method */}
          <div className="mt-8 space-y-3">
            <h3 className="font-display text-lg text-foreground">
              How would you like to pay?
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              {PAYMENT_OPTIONS.map((opt) => {
                const Icon = opt.icon
                const selected = payment === opt.id
                return (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                      selected
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-card hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={selected}
                      onChange={() => setPayment(opt.id)}
                      className="sr-only"
                    />
                    <Icon
                      className={`size-6 ${
                        selected ? 'text-accent' : 'text-muted-foreground'
                      }`}
                    />
                    <span
                      className={`text-sm font-semibold ${
                        selected ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-xs text-muted-foreground leading-tight">
                      {opt.desc}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="border-beam mt-6 w-full rounded-xl bg-accent py-4 text-base font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:scale-[1.01] active:scale-[0.99]"
          >
            Confirm Order
          </button>
        </form>
      </div>

      {/* Confirmation dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-accent/10">
              <Check className="size-6 text-accent" />
            </div>
            <DialogTitle className="text-center font-display text-2xl">
              Order Confirmed!
            </DialogTitle>
            <DialogDescription className="text-center">
              Here's your order summary
            </DialogDescription>
          </DialogHeader>

          {/* Summary */}
          <div className="space-y-2 rounded-xl bg-muted p-4">
            {getOrderItems().map((item) => (
              <div
                key={item.name}
                className="flex justify-between text-sm text-foreground"
              >
                <span>
                  {item.qty}× {item.name}
                </span>
                <span>{item.qty * item.price} EGP</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-border pt-2 font-display text-base text-foreground">
              <span>Total</span>
              <span className="text-accent">{total} EGP</span>
            </div>
          </div>

          {/* Payment instructions based on chosen method */}
          {payment === 'cod' && (
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="size-5 text-accent" />
                <p className="text-sm font-semibold text-foreground">
                  Cash on Delivery
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Have <span className="font-semibold text-foreground">{total} EGP</span> ready when your order arrives. No advance payment needed!
              </p>
            </div>
          )}

          {payment === 'vodafone' && (
            <div className="rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Smartphone className="size-5 text-accent" />
                <p className="text-sm font-semibold text-foreground">
                  Pay via Vodafone Cash
                </p>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm font-mono text-foreground">
                  {VODAFONE_NUMBER}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(VODAFONE_NUMBER, 'Vodafone number')}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  {copiedField === 'Vodafone number' ? (
                    <Check className="size-4 text-accent" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs font-medium text-foreground mb-1">Steps:</p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open Vodafone Cash on your phone</li>
                  <li>Send <span className="font-semibold text-foreground">{total} EGP</span> to <span className="font-mono font-semibold text-foreground">{VODAFONE_NUMBER}</span></li>
                  <li>Include your name in the transfer note</li>
                </ol>
              </div>
            </div>
          )}

          {payment === 'instapay' && (
            <div className="rounded-xl border border-border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <CreditCard className="size-5 text-accent" />
                <p className="text-sm font-semibold text-foreground">
                  Pay via InstaPay
                </p>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-sm font-mono text-foreground">
                  {INSTAPAY_NUMBER}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopy(INSTAPAY_NUMBER, 'InstaPay number')}
                  className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
                >
                  {copiedField === 'InstaPay number' ? (
                    <Check className="size-4 text-accent" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs font-medium text-foreground mb-1">Steps:</p>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Open your banking app (CIB, QNB, Banque Misr, etc.)</li>
                  <li>Go to InstaPay and send <span className="font-semibold text-foreground">{total} EGP</span></li>
                  <li>Use number: <span className="font-mono font-semibold text-foreground">{INSTAPAY_NUMBER}</span></li>
                  <li>Include your name in the transfer note</li>
                </ol>
              </div>
            </div>
          )}

          {/* WhatsApp */}
          <a
            href={whatsappMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-medium text-[#fff] transition-all hover:bg-[#20BD5A] active:scale-[0.98]"
          >
            <ExternalLink className="size-4" />
            Send order confirmation on WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setShowConfirm(false)}
            className="w-full rounded-xl border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Done
          </button>
        </DialogContent>
      </Dialog>
    </section>
  )
}
