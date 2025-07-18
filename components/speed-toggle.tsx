"use client"

import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { t } from "@/lib/i18n"
import { useGameStore } from "@/lib/store"
import { Zap } from "lucide-react"

interface SpeedToggleProps {
  value: boolean
  onChange: (speedMode: boolean) => void
}

export function SpeedToggle({ value, onChange }: SpeedToggleProps) {
  const { settings } = useGameStore()

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50"
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            value ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-slate-300 dark:bg-slate-600"
          }`}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>
        <div>
          <Label htmlFor="speed-mode" className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {t("speedMode", settings.language)}
          </Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t("speedModeDesc", settings.language)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {value && <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">15s</Badge>}
        <Switch id="speed-mode" checked={value} onCheckedChange={onChange} />
      </div>
    </motion.div>
  )
}
