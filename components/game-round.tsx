"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useGameStore } from "@/lib/store"
import { getTimerForDifficulty } from "@/data/themes"
import { t } from "@/lib/i18n"
import { CircularTimer } from "@/components/circular-timer"
import { AmbientOverlay } from "@/components/ambient-overlay"
import { Check, AlertTriangle } from "lucide-react"

export function GameRound() {
  const { currentGame, setPhase, currentPlayer, nextPlayer, settings, vibrate, playSound } = useGameStore()
  const [timeLeft, setTimeLeft] = useState(30)
  const [isReady, setIsReady] = useState(false)
  const [timerSize, setTimerSize] = useState(120)

  const totalTime = currentGame ? getTimerForDifficulty(currentGame.difficulty, currentGame.speedMode) : 30

  useEffect(() => {
    if (currentGame) {
      setTimeLeft(totalTime)
    }
  }, [currentGame, totalTime])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth
      setTimerSize(w < 640 ? Math.min(w * 0.8, 200) : 120)
    }
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !isReady) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      vibrate([200, 100, 200])
      playSound("end")
    }
  }, [timeLeft, isReady, vibrate, playSound])

  if (!currentGame) return null

  const currentWord = String(currentGame.currentRound?.words[currentPlayer] || "")
  const isImpostor = currentWord === "IMPOSTOR"
  const playerNumber = Number(currentPlayer) + 1
  const totalPlayers = Number(currentGame.playerCount)

  const handleReady = () => {
    setIsReady(true)
    playSound("beep")

    if (currentPlayer >= currentGame.playerCount - 1) {
      setPhase("waiting")
    } else {
      setTimeout(() => {
        nextPlayer()
        setTimeLeft(totalTime)
        setIsReady(false)
      }, 2000)
    }
  }

  if (isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
          >
            <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
            ¡{t("ready", settings?.language || "es")}!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {currentPlayer < currentGame.playerCount - 1
              ? t("passDevice", settings?.language || "es")
              : t("allPlayersReady", settings?.language || "es")}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <AmbientOverlay timeLeft={timeLeft} totalTime={totalTime} />
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <Card
            className={`border-0 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden ${
              isImpostor ? "bg-red-500/90 dark:bg-red-600/90" : "bg-white/90 dark:bg-slate-800/90"
            }`}
          >
            <CardContent className="p-6 sm:p-8 text-center">
              {/* Player Counter */}
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-6">
                <p
                  className={`text-sm font-medium ${isImpostor ? "text-red-100" : "text-slate-600 dark:text-slate-400"}`}
                >
                  {t("player", settings?.language || "es")} {String(playerNumber)} {t("of", settings?.language || "es")}{" "}
                  {String(totalPlayers)}
                </p>
              </motion.div>

              {/* Timer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: timeLeft <= 10 ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  delay: 0.2,
                  repeat: timeLeft <= 10 ? Number.POSITIVE_INFINITY : 0,
                  duration: 0.5,
                }}
                className="mb-6 sm:mb-8 flex justify-center"
              >
                <CircularTimer
                  timeLeft={Number(timeLeft)}
                  totalTime={totalTime}
                  size={Number(timerSize)}
                  className={isImpostor ? "text-red-200" : "text-slate-800 dark:text-slate-200"}
                />
              </motion.div>

              {/* Word Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 sm:mb-8"
              >
                {isImpostor ? (
                  <motion.div
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 10px rgba(255,255,255,0.8)",
                        "0 0 0px rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="space-y-3 sm:space-y-4"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-white mx-auto" />
                    </motion.div>
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {t("youAreThe", settings?.language || "es")}
                    </h1>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
                      {t("impostor", settings?.language || "es")}
                    </h1>
                  </motion.div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-base sm:text-xl font-medium text-slate-600 dark:text-slate-400">
                      {t("yourWordIs", settings?.language || "es")}
                    </h2>
                    <motion.h1
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                      className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-slate-200 break-words"
                    >
                      {currentWord}
                    </motion.h1>
                  </div>
                )}
              </motion.div>

              {/* Ready Button */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Button
                  onClick={handleReady}
                  className={`w-full font-medium py-3 sm:py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isImpostor
                      ? "bg-white text-red-600 hover:bg-red-50"
                      : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                  }`}
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {t("ready", settings?.language || "es")}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  )
}
