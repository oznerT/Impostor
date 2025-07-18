"use client"

import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import type { DifficultyLevel } from "@/data/themes"
import { t } from "@/lib/i18n"
import { useGameStore } from "@/lib/store"
import { Clock, Zap, Target } from "lucide-react"

interface DifficultySliderProps {
  value: DifficultyLevel
  onChange: (difficulty: DifficultyLevel) => void
  speedMode: boolean
}

export function DifficultySlider({ value, onChange, speedMode }: DifficultySliderProps) {
  const { settings } = useGameStore()

  const difficulties: { level: DifficultyLevel; icon: any; time: number; color: string }[] = [
    { level: "easy", icon: Clock, time: speedMode ? 15 : 45, color: "from-green-500 to-green-600" },
    { level: "medium", icon: Target, time: speedMode ? 15 : 30, color: "from-yellow-500 to-orange-500" },
    { level: "hard", icon: Zap, time: speedMode ? 15 : 20, color: "from-red-500 to-red-600" },
  ]

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {t("difficulty", settings.language)}
      </Label>

      <div className="grid grid-cols-3 gap-2">
        {difficulties.map((diff) => {
          const Icon = diff.icon
          const isSelected = value === diff.level

          return (
            <motion.button
              key={diff.level}
              onClick={() => onChange(diff.level)}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-slate-200 dark:border-slate-600 bg-white/50 dark:bg-slate-700/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${diff.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {t(diff.level, settings.language)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {diff.time}s
                </Badge>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="difficulty-indicator"
                  className="absolute inset-0 rounded-2xl bg-blue-500/10 border-2 border-blue-500"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
