"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Trophy, Zap, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export function GameReveal() {
  const { currentGame, setPhase, nextRound, handleRoundEnd, settings } = useGameStore()
  const [result, setResult] = useState<"citizens" | "impostor" | null>(null)
  const router = useRouter()

  if (!currentGame) return null

  const impostorPlayer = currentGame.players.find((p) => p.lastRole === "impostor")

  const handleResult = (winner: "citizens" | "impostor") => {
    setResult(winner)
    handleRoundEnd(winner)

    // Show result animation
    setTimeout(() => {
      setPhase("results")
    }, 3000)
  }

  const handleNextRound = () => {
    nextRound()
    setPhase("round")
  }

  const handleGoHome = () => {
    router.push("/")
  }

  if (result) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg text-center"
        >
          {result === "citizens" ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              {/* Confetti effect */}
              <div className="relative">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400,
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 0.5,
                    }}
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                  />
                ))}
                <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">🚀 ¡El equipo acertó!</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">+0.5 puntos para cada ciudadano</p>
            </motion.div>
          ) : (
            <motion.div
              animate={{
                textShadow: [
                  "0 0 0px rgba(239, 68, 68, 0)",
                  "0 0 20px rgba(239, 68, 68, 0.8)",
                  "0 0 0px rgba(239, 68, 68, 0)",
                ],
              }}
              transition={{ duration: 0.5, repeat: 6 }}
            >
              <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">😈 ¡Impostor ganador!</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                +1 punto para {String(impostorPlayer?.name || "Impostor")}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6"
            >
              {t("whoWon", settings?.language || "es")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-600 dark:text-slate-400 mb-8"
            >
              {t("selectResult", settings?.language || "es")}
            </motion.p>

            <div className="space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Button
                  onClick={() => handleResult("citizens")}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {t("groupWon", settings?.language || "es")}
                </Button>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Button
                  onClick={() => handleResult("impostor")}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {t("impostorWon", settings?.language || "es")}
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
