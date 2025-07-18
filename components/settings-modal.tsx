"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Settings, Volume2, VolumeX, Smartphone, SmartphoneNfc } from "lucide-react"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { settings, updateSettings } = useGameStore()

  const handleSoundToggle = (enabled: boolean) => {
    updateSettings({ sound: enabled })
  }

  const handleVibrationToggle = (enabled: boolean) => {
    updateSettings({ vibration: enabled })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 rounded-3xl shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="text-center pb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Settings className="w-8 h-8 text-white" />
                </motion.div>
                <DialogTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  {t("settings", settings.language)}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Sound Setting */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50"
                >
                  <div className="flex items-center space-x-3">
                    {settings.sound ? (
                      <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-slate-400" />
                    )}
                    <Label htmlFor="sound" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("sound", settings.language)}
                    </Label>
                  </div>
                  <Switch id="sound" checked={settings.sound} onCheckedChange={handleSoundToggle} />
                </motion.div>

                {/* Vibration Setting */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50"
                >
                  <div className="flex items-center space-x-3">
                    {settings.vibration ? (
                      <SmartphoneNfc className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-slate-400" />
                    )}
                    <Label htmlFor="vibration" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {t("vibration", settings.language)}
                    </Label>
                  </div>
                  <Switch id="vibration" checked={settings.vibration} onCheckedChange={handleVibrationToggle} />
                </motion.div>

                {/* Test Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-3"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const store = useGameStore.getState()
                      store.playSound("beep")
                    }}
                    className="flex-1 rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                  >
                    Test Sound
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const store = useGameStore.getState()
                      store.vibrate([100, 50, 100])
                    }}
                    className="flex-1 rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                  >
                    Test Vibration
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
