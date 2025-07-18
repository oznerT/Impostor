"use client"

import { Suspense, lazy, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { SettingsModal } from "@/components/settings-modal"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import NoiseOverlay from "@/components/noise-overlay"
import { Settings } from "lucide-react"
import { FooterSocial } from "@/components/footer-social"

// Lazy load components
const CategoryGrid = lazy(() => import("@/components/category-grid"))
const CreateRoomModal = lazy(() => import("@/components/create-room-modal"))

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
      />
    </div>
  )
}

export default function HomePage() {
  const [selectedTheme, setSelectedTheme] = useState<{ themeId: string; subThemeId: string } | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const { settings } = useGameStore()

  const handleCreateRoom = (themeId: string, subThemeId: string) => {
    setSelectedTheme({ themeId, subThemeId })
    setShowCreateModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Noise texture overlay */}
      <NoiseOverlay />

      <div className="relative">
        {/* Header */}
        <header className="flex items-center justify-between p-4 sm:p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge
              variant="secondary"
              className="text-sm font-medium backdrop-blur-md bg-white/60 dark:bg-slate-800/60 border-white/20 dark:border-slate-700/20"
            >
              {t("version", settings.language)}
            </Badge>
          </motion.div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="rounded-full hover:bg-white/20 dark:hover:bg-slate-800/20 backdrop-blur-sm"
              aria-label={t("settings", settings.language)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </header>

        {/* Hero Section */}
        <motion.section
          className="text-center px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-200 dark:via-slate-100 dark:to-slate-200 bg-clip-text text-transparent mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Impostor
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 sm:mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t("findImpostor", settings.language)}
            </motion.p>
          </div>
        </motion.section>

        {/* Categories Grid */}
        <motion.section
          className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-800 dark:text-slate-200 text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {t("chooseTheme", settings.language)}
            </motion.h2>

            <Suspense fallback={<LoadingSpinner />}>
              <CategoryGrid onCreateRoom={handleCreateRoom} />
            </Suspense>
          </div>
        </motion.section>

        {/* Footer */}
        <FooterSocial />
      </div>

      <Suspense fallback={null}>
        <CreateRoomModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          themeId={selectedTheme?.themeId || null}
          subThemeId={selectedTheme?.subThemeId || null}
        />
      </Suspense>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}
