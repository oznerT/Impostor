"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/lib/store"
import { themes } from "@/data/themes"
import { t } from "@/lib/i18n"
import { Scoreboard } from "@/components/scoreboard"
import { HistoryTimeline } from "@/components/history-timeline"
import { RoomShare } from "@/components/room-share"
import { WordEditorModal } from "@/components/word-editor-modal"
import { Users, Play, Share, Trophy, Edit3, ChevronRight, Clock, Target, Zap } from "lucide-react"

export function GameSetup() {
  const { currentGame, startRound, settings } = useGameStore()
  const [showScoreboard, setShowScoreboard] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showWordEditor, setShowWordEditor] = useState(false)

  if (!currentGame) return null

  const theme = themes.find((t) => t.id === currentGame.themeId)
  const subTheme = theme?.subThemes?.[currentGame.subThemeId]
  const subThemeLabel = currentGame.subThemeId === "general" ? "General" : subTheme?.label || "General"

  const handleStartRound = () => {
    startRound()
  }

  const hasScores = currentGame.players.some((p) => p.score > 0)

  const getDifficultyIcon = () => {
    switch (currentGame.difficulty) {
      case "easy":
        return <Clock className="w-4 h-4" />
      case "medium":
        return <Target className="w-4 h-4" />
      case "hard":
        return <Zap className="w-4 h-4" />
    }
  }

  const getDifficultyColor = () => {
    switch (currentGame.difficulty) {
      case "easy":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
      case "hard":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-6"
      >
        <Card className="border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 text-center">
            {/* Category Icon */}
            <motion.div
              className="text-7xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {String(theme?.icon || "")}
            </motion.div>

            {/* Game Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                {String(theme?.label || "")}
              </h1>

              {/* Theme breadcrumb */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="backdrop-blur-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  {String(theme?.label || "")}
                </Badge>
                <ChevronRight className="w-4 h-4 text-slate-400" />
                <Badge variant="outline" className="border-slate-200 dark:border-slate-600">
                  {String(subThemeLabel)}
                </Badge>
              </div>

              {/* Game Settings */}
              <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                <Badge
                  variant="secondary"
                  className="backdrop-blur-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                >
                  <Users className="w-4 h-4 mr-1" />
                  {String(currentGame.playerCount)} {t("players", settings?.language || "es").toLowerCase()}
                </Badge>
                <Badge variant="secondary" className={`backdrop-blur-md ${getDifficultyColor()}`}>
                  {getDifficultyIcon()}
                  <span className="ml-1">{t(currentGame.difficulty, settings?.language || "es")}</span>
                </Badge>
                {currentGame.speedMode && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    <Zap className="w-4 h-4 mr-1" />
                    Speed
                  </Badge>
                )}
                {currentGame.currentRoundNumber > 0 && (
                  <Badge
                    variant="secondary"
                    className="backdrop-blur-md bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                  >
                    Ronda {String(currentGame.currentRoundNumber)}
                  </Badge>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Sala:{" "}
                <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                  {String(currentGame.id)}
                </code>
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowShare(true)}
                  className="rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowWordEditor(true)}
                  className="rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              </div>

              {hasScores && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowScoreboard(!showScoreboard)}
                  className="w-full rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  {showScoreboard ? "Ocultar ranking" : "Ver ranking"}
                </Button>
              )}
            </motion.div>

            {/* Start Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button
                onClick={handleStartRound}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                {currentGame.currentRoundNumber === 0 ? "Iniciar primera ronda" : "Iniciar siguiente ronda"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* Scoreboard */}
        {showScoreboard && hasScores && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Scoreboard showTitle={false} />
          </motion.div>
        )}

        {/* History Timeline */}
        {currentGame.history.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <HistoryTimeline />
          </motion.div>
        )}
      </motion.div>

      {/* Modals */}
      <RoomShare gameId={currentGame.id} isOpen={showShare} onClose={() => setShowShare(false)} />

      <WordEditorModal isOpen={showWordEditor} onClose={() => setShowWordEditor(false)} />
    </div>
  )
}
