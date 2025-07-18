"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QRCodeCanvas } from "qrcode.react"
import { Share, Copy, QrCode, Check } from "lucide-react"
import { t } from "@/lib/i18n"
import { useGameStore } from "@/lib/store"

interface RoomShareProps {
  gameId: string
  isOpen: boolean
  onClose: () => void
}

export function RoomShare({ gameId, isOpen, onClose }: RoomShareProps) {
  const [copied, setCopied] = useState(false)
  const { settings } = useGameStore()

  const gameUrl = typeof window !== "undefined" ? `${window.location.origin}/j/${gameId}` : ""

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gameUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Impostor Game",
          text: "Únete a mi sala de Impostor",
          url: gameUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 rounded-3xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Share className="w-8 h-8 text-white" />
            </motion.div>
            <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {t("shareRoom", settings.language)}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* QR Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="p-4 bg-white rounded-2xl shadow-lg">
                <QRCodeCanvas
                  value={gameUrl}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  includeMargin={true}
                />
              </div>
            </motion.div>

            {/* Room Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Código de sala</p>
              <Badge variant="secondary" className="text-2xl font-mono px-4 py-2">
                {gameId}
              </Badge>
            </motion.div>

            {/* URL Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <div className="flex gap-2">
                <Input
                  value={gameUrl}
                  readOnly
                  className="rounded-2xl border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700"
                />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  className="rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </motion.div>

            {/* Share Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              <Button
                onClick={handleShare}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-2xl"
              >
                <Share className="w-4 h-4 mr-2" />
                Compartir
              </Button>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="flex-1 border-slate-200 dark:border-slate-600 py-3 rounded-2xl bg-transparent"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Copiar
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
