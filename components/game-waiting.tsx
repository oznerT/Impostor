"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useGameStore } from "@/lib/store"
import { MessageCircle, Vote } from "lucide-react"

export function GameWaiting() {
  const { setPhase } = useGameStore()

  const handleEndVoting = () => {
    setPhase("reveal")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <Card className="border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4"
            >
              ¡Comienza la ronda!
            </motion.h1>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8 space-y-4"
            >
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Conversen entre todos y traten de descubrir quién es el impostor.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Recuerda:</strong> La votación se hace cara a cara, no en la app.
                </p>
              </div>
            </motion.div>

            {/* Animated dots */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-8">
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                  />
                ))}
              </div>
            </motion.div>

            {/* End Voting Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <Button
                onClick={handleEndVoting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Vote className="w-5 h-5 mr-2" />
                Terminar votación
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
