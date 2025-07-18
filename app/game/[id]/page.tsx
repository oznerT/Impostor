"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useGameStore } from "@/lib/store"
import { GameSetup } from "@/components/game-setup"
import { PlayerSetup } from "@/components/player-setup"
import { GameRound } from "@/components/game-round"
import { GameWaiting } from "@/components/game-waiting"
import { GameReveal } from "@/components/game-reveal"
import { GameResults } from "@/components/game-results"
import NoiseOverlay from "@/components/noise-overlay"

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const gameId = params.id as string
  const { games, currentGame, setCurrentGame, nickname, setNickname, setPhase } = useGameStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load nickname from localStorage
    const savedNickname = localStorage.getItem("impostor-nickname")
    if (savedNickname) {
      setNickname(savedNickname)
    }

    // Find and set current game
    const game = games.find((g) => g.id === gameId)
    if (game) {
      setCurrentGame(game)
    } else {
      router.push("/")
    }
  }, [gameId, games, setCurrentGame, router, setNickname])

  if (!mounted || !currentGame) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const renderGamePhase = () => {
    switch (currentGame.phase) {
      case "player-setup":
        return <PlayerSetup onComplete={() => setPhase("setup")} />
      case "setup":
        return <GameSetup />
      case "round":
        return <GameRound />
      case "waiting":
        return <GameWaiting />
      case "reveal":
        return <GameReveal />
      case "results":
        return <GameResults />
      default:
        return <PlayerSetup onComplete={() => setPhase("setup")} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Noise texture overlay */}
      <NoiseOverlay />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentGame.phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          {renderGamePhase()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
