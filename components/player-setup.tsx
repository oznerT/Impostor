"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGameStore } from "@/lib/store"
import { Users, Check, Edit3 } from "lucide-react"

interface PlayerSetupProps {
  onComplete: () => void
}

export function PlayerSetup({ onComplete }: PlayerSetupProps) {
  const { currentGame, updatePlayerName, settings } = useGameStore()
  const [playerNames, setPlayerNames] = useState<Record<string, string>>(() => {
    if (!currentGame) return {}

    const names: Record<string, string> = {}
    currentGame.players.forEach((player) => {
      names[player.id] = player.name
    })
    return names
  })

  if (!currentGame) return null

  const handleNameChange = (playerId: string, name: string) => {
    setPlayerNames((prev) => ({
      ...prev,
      [playerId]: name,
    }))
  }

  const handleSaveNames = () => {
    // Actualizar nombres en el store
    Object.entries(playerNames).forEach(([playerId, name]) => {
      if (name.trim()) {
        updatePlayerName(playerId, name.trim())
      }
    })
    onComplete()
  }

  const allNamesValid = currentGame.players.every((player) => playerNames[player.id]?.trim().length > 0)

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Users className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Configurar Jugadores
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Personaliza el nombre de cada jugador</p>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            {currentGame.players.map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="space-y-2"
              >
                <Label
                  htmlFor={`player-${player.id}`}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Jugador {index + 1}
                  {player.id === "host" && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                      Host
                    </span>
                  )}
                </Label>
                <Input
                  id={`player-${player.id}`}
                  value={playerNames[player.id] || ""}
                  onChange={(e) => handleNameChange(player.id, e.target.value)}
                  placeholder={`Nombre del jugador ${index + 1}`}
                  className="rounded-2xl border-slate-200 dark:border-slate-600 backdrop-blur-sm bg-white/50 dark:bg-slate-700/50"
                  maxLength={20}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + currentGame.players.length * 0.1 }}
              className="pt-6"
            >
              <Button
                onClick={handleSaveNames}
                disabled={!allNamesValid}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-5 h-5 mr-2" />
                Confirmar Nombres
              </Button>
            </motion.div>

            {!allNamesValid && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-600 dark:text-red-400 text-center"
              >
                Todos los jugadores deben tener un nombre
              </motion.p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
