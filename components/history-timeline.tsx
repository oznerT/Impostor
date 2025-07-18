"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { ChevronDown, ChevronUp, Clock, Trophy, Users, Zap } from "lucide-react"

export function HistoryTimeline() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { currentGame, settings } = useGameStore()

  if (!currentGame || currentGame.history.length === 0) return null

  return (
    <Card className="border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t("history", settings.language)}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="rounded-2xl">
            {isExpanded ? (
              <>
                {t("hideHistory", settings.language)}
                <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                {t("showHistory", settings.language)}
                <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {currentGame.history.map((entry, index) => (
                <motion.div
                  key={`${entry.round}-${entry.timestamp}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50"
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        entry.outcome === "citizens"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      {entry.outcome === "citizens" ? (
                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        Ronda {entry.round}
                      </Badge>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                        {entry.word}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Impostor: {entry.impostorName} • {entry.outcome === "citizens" ? "Grupo ganó" : "Impostor ganó"}
                    </p>
                  </div>

                  <div className="flex-shrink-0">
                    {entry.outcome === "citizens" ? (
                      <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Zap className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
