"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Trophy, Medal, Award } from "lucide-react"

interface ScoreboardProps {
  showTitle?: boolean
  compact?: boolean
}

export function Scoreboard({ showTitle = true, compact = false }: ScoreboardProps) {
  const { currentGame, settings } = useGameStore()

  if (!currentGame) return null

  const sortedPlayers = [...currentGame.players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return a.joinOrder - b.joinOrder
  })

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return null
    }
  }

  const getPositionBadge = (position: number) => {
    switch (position) {
      case 0:
        return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
      case 1:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
      case 2:
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
      default:
        return "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
    }
  }

  if (compact) {
    return (
      <div className="w-full space-y-2">
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between px-4 py-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-slate-800/60"
          >
            <div className="flex items-center gap-3">
              {getPositionIcon(index)}
              <span className="font-medium text-slate-800 dark:text-slate-200">{String(player.name)}</span>
            </div>
            <Badge className={getPositionBadge(index)}>{String(player.score)}</Badge>
          </motion.div>
        ))}
        {sortedPlayers.length > 3 && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-2">
            +{sortedPlayers.length - 3} más...
          </p>
        )}
      </div>
    )
  }

  return (
    <Card className="border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 shadow-xl rounded-3xl overflow-hidden">
      {showTitle && (
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            {t("score", settings?.language || "es")}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        <div className="space-y-3">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-700"
                  : "backdrop-blur-md bg-white/60 dark:bg-slate-700/60 hover:bg-white/80 dark:hover:bg-slate-700/80"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-8 h-8">
                  {getPositionIcon(index) || (
                    <span className="text-lg font-bold text-slate-600 dark:text-slate-400">{String(index + 1)}</span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{String(player.name)}</p>
                  {player.lastRole && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {player.lastRole === "impostor" ? "🎭 Impostor" : "👥 Ciudadano"}
                    </p>
                  )}
                </div>
              </div>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3 }} key={player.score}>
                <Badge className={`text-lg font-bold px-3 py-1 ${getPositionBadge(index)}`}>
                  {String(player.score)}
                </Badge>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
