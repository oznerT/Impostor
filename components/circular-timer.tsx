"use client"

import { motion } from "framer-motion"

interface CircularTimerProps {
  timeLeft: number
  totalTime: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function CircularTimer({
  timeLeft,
  totalTime,
  size = 120,
  strokeWidth = 8,
  className = "",
}: CircularTimerProps) {
  const safeTimeLeft = Number(timeLeft) || 0
  const safeTotalTime = Number(totalTime) || 1
  const safeSize = Number(size) || 120
  const safeStrokeWidth = Number(strokeWidth) || 8

  const radius = (safeSize - safeStrokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = ((safeTotalTime - safeTimeLeft) / safeTotalTime) * 100
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative ${String(className)}`} style={{ width: safeSize, height: safeSize }}>
      <svg width={safeSize} height={safeSize} className="transform -rotate-90" viewBox={`0 0 ${safeSize} ${safeSize}`}>
        {/* Background circle */}
        <circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={safeStrokeWidth}
          fill="transparent"
          className="text-slate-200 dark:text-slate-700"
        />

        {/* Progress circle */}
        <motion.circle
          cx={safeSize / 2}
          cy={safeSize / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={safeStrokeWidth}
          fill="transparent"
          strokeLinecap="round"
          className="text-blue-500 dark:text-blue-400"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>

      {/* Time display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={safeTimeLeft}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200"
        >
          {String(safeTimeLeft)}
        </motion.span>
      </div>
    </div>
  )
}
