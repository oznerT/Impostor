"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/lib/store"
import { themes, type DifficultyLevel } from "@/data/themes"
import { t } from "@/lib/i18n"
import { DifficultySlider } from "@/components/difficulty-slider"
import { SpeedToggle } from "@/components/speed-toggle"
import { Users, Play, ChevronRight } from "lucide-react"

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
  themeId: string | null
  subThemeId: string | null
}

export default function CreateRoomModal({ isOpen, onClose, themeId, subThemeId }: CreateRoomModalProps) {
  const [playerCount, setPlayerCount] = useState([6])
  const [nickname, setNickname] = useState("")
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("medium")
  const [speedMode, setSpeedMode] = useState(false)
  const router = useRouter()
  const { createGame, setNickname: setStoreNickname, settings, nickname: storedNickname } = useGameStore()

  // Load stored nickname on mount
  useEffect(() => {
    if (storedNickname) {
      setNickname(storedNickname)
    } else {
      const savedNickname = localStorage.getItem("impostor-nickname")
      if (savedNickname) {
        setNickname(savedNickname)
      }
    }
  }, [storedNickname])

  const theme = themeId ? themes.find((t) => t.id === themeId) : null
  const subTheme = theme?.subThemes?.[subThemeId || ""] || null
  const subThemeLabel = subThemeId === "general" ? "General" : subTheme?.label || "General"

  const handleCreateGame = () => {
    if (!nickname.trim() || !themeId || !subThemeId) {
      console.error("Missing required data:", { nickname: nickname.trim(), themeId, subThemeId })
      return
    }

    console.log("Creating game with:", { themeId, subThemeId, difficulty, speedMode, playerCount: playerCount[0] })

    localStorage.setItem("impostor-nickname", nickname.trim())
    setStoreNickname(nickname.trim())

    const gameId = createGame(themeId, subThemeId, difficulty, speedMode, playerCount[0])
    console.log("Game created with ID:", gameId)

    router.push(`/game/${gameId}`)
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && theme && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-md border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="text-center pb-6">
                <motion.div
                  className="text-5xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {theme.icon}
                </motion.div>
                <DialogTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  {theme.label}
                </DialogTitle>

                {/* Theme breadcrumb */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="backdrop-blur-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {theme.label}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                  <Badge variant="outline" className="border-slate-200 dark:border-slate-600">
                    {subThemeLabel}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Nickname Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="nickname" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {t("yourName", settings?.language || "es")}
                  </Label>
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder={t("enterName", settings?.language || "es")}
                    className="rounded-2xl border-slate-200 dark:border-slate-600 backdrop-blur-sm bg-white/50 dark:bg-slate-700/50"
                    maxLength={20}
                  />
                </motion.div>

                {/* Difficulty Slider */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <DifficultySlider value={difficulty} onChange={setDifficulty} speedMode={speedMode} />
                </motion.div>

                {/* Speed Mode Toggle */}
                <SpeedToggle value={speedMode} onChange={setSpeedMode} />

                {/* Player Count Slider */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {t("players", settings?.language || "es")}
                    </Label>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{playerCount[0]}</span>
                  </div>
                  <Slider
                    value={playerCount}
                    onValueChange={setPlayerCount}
                    max={15}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>3 min</span>
                    <span>15 max</span>
                  </div>
                </motion.div>

                {/* Create Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                  <Button
                    onClick={handleCreateGame}
                    disabled={!nickname.trim()}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {t("startGame", settings?.language || "es")}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
