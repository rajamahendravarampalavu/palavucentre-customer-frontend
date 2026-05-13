import { useEffect, useState } from 'react'

const STATUS_MESSAGES = {
  accepted: { text: 'Your order has been accepted! 👍', color: 'border-purple-400/30 bg-purple-500/10 text-purple-200' },
  preparing: { text: 'Your food is being prepared! 🍳', color: 'border-amber-400/30 bg-amber-500/10 text-amber-200' },
  ready: { text: 'Your order is ready for pickup! ✅', color: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' },
  delivered: { text: 'Order completed. Enjoy your meal! 🎉', color: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' },
  cancelled: { text: 'Your order has been cancelled ❌', color: 'border-red-400/30 bg-red-500/10 text-red-200' },
}

export default function OrderToast({ status, orderNumber, onDismiss }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  if (!visible || !status) return null

  const msg = STATUS_MESSAGES[status] || { text: `Order updated: ${status}`, color: 'border-white/20 bg-white/5 text-white/80' }

  return (
    <div className="fixed top-4 right-4 z-[9999] animate-slide-in-right">
      <div className={`rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${msg.color}`}>
        <p className="text-sm font-medium">{msg.text}</p>
        {orderNumber && <p className="mt-0.5 text-xs opacity-70">Order #{orderNumber}</p>}
      </div>
    </div>
  )
}
