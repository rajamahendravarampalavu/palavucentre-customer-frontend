import { CheckCircle2 } from 'lucide-react'

const STEPS = [
  { id: 'pending', label: 'Order Placed', emoji: '📋', note: 'Restaurant received your order' },
  { id: 'accepted', label: 'Accepted', emoji: '👍', note: 'Kitchen accepted your order' },
  { id: 'preparing', label: 'Preparing', emoji: '🍳', note: 'Your food is being prepared' },
  { id: 'ready', label: 'Ready', emoji: '✅', note: 'Ready for pickup!' },
  { id: 'delivered', label: 'Picked Up', emoji: '🎉', note: 'Enjoy your meal!' },
]

export default function OrderTracker({ orderStatus, cancelledAt }) {
  if (orderStatus === 'cancelled') {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
        <p className="text-lg">❌</p>
        <p className="mt-1 text-sm font-medium text-red-300">Order Cancelled</p>
        {cancelledAt && <p className="mt-1 text-xs text-red-300/60">{new Date(cancelledAt).toLocaleString()}</p>}
      </div>
    )
  }

  const currentIndex = STEPS.findIndex(s => s.id === orderStatus)

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      {/* Current status highlight */}
      <div className="mb-4 text-center">
        <span className="text-2xl">{STEPS[currentIndex]?.emoji || '📋'}</span>
        <p className="mt-1 text-sm font-semibold text-gold">{STEPS[currentIndex]?.note}</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isActive = index === currentIndex
          const isPending = index > currentIndex

          return (
            <div key={step.id} className="flex flex-1 items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    isCompleted
                      ? 'border-emerald-400 bg-emerald-400/20'
                      : isActive
                        ? 'border-gold bg-gold/20 animate-pulse shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                        : 'border-white/20 bg-white/5'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="text-xs">{step.emoji}</span>
                  )}
                </div>
                <p className={`mt-1.5 text-[9px] font-medium text-center leading-tight ${
                  isActive ? 'text-gold' : isCompleted ? 'text-emerald-300/80' : 'text-white/30'
                }`}>
                  {step.label}
                </p>
              </div>

              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="mx-1 h-0.5 flex-1 rounded-full overflow-hidden bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      index < currentIndex ? 'w-full bg-emerald-400' : 'w-0 bg-gold'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
