"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/lib/store"

interface AmbientOverlayProps {
  timeLeft: number
  totalTime: number
}

export function AmbientOverlay({ timeLeft, totalTime }: AmbientOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const { vibrate } = useGameStore()

  useEffect(() => {
    const shouldShow = timeLeft <= 10 && timeLeft > 0

    if (shouldShow && !showOverlay) {
      setShowOverlay(true)
      vibrate([50, 50, 100])
    } else if (!shouldShow && showOverlay) {
      setShowOverlay(false)
    }
  }, [timeLeft, showOverlay, vibrate])

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 pointer-events-none"
          style={{ mixBlendMode: "multiply" }}
        />
      )}
    </AnimatePresence>
  )
}
