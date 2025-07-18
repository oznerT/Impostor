"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Scoreboard } from "@/components/scoreboard"
import { RotateCcw, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export function GameResults() {
  const { currentGame, nextRound, saveGameToHistory, settings } = useGameStore()
  const router = useRouter()

  if (!currentGame) return null

  const handleNextRound = () => {
    nextRound()
  }

  const handleGoHome = () => {
    saveGameToHistory()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg space-y-6"
      >
        {/* Scoreboard */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Scoreboard />
        </motion.div>

        {/* Round Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("roundCompleted", settings?.language || "es", {
              round: String(currentGame.currentRoundNumber),
            })}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3"
        >
          <Button
            onClick={handleNextRound}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {t("nextRound", settings?.language || "es")}
          </Button>

          <Button
            onClick={handleGoHome}
            variant="outline"
            className="w-full border-slate-200 dark:border-slate-600 font-medium py-4 rounded-2xl transition-all duration-300 bg-transparent"
          >
            <Home className="w-5 h-5 mr-2" />
            {t("exitGame", settings?.language || "es")}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
