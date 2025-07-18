"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { themes } from "@/data/themes"
import { useGameStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { SubThemePicker } from "@/components/sub-theme-picker"

interface CategoryGridProps {
  onCreateRoom: (themeId: string, subThemeId: string) => void
}

export default function CategoryGrid({ onCreateRoom }: CategoryGridProps) {
  const { settings } = useGameStore()
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const [showSubThemePicker, setShowSubThemePicker] = useState(false)

  const handleThemeClick = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (!theme) return

    // Si no tiene sub-temas, crear sala directamente con "general"
    if (!theme.subThemes || Object.keys(theme.subThemes).length === 0) {
      onCreateRoom(themeId, "general")
      return
    }

    // Si tiene sub-temas, mostrar picker
    setSelectedTheme(themeId)
    setShowSubThemePicker(true)
  }

  const handleSubThemeSelect = (subThemeId: string) => {
    if (selectedTheme) {
      onCreateRoom(selectedTheme, subThemeId)
    }
    setShowSubThemePicker(false)
    setSelectedTheme(null)
  }

  const handleCloseSubThemePicker = () => {
    setShowSubThemePicker(false)
    setSelectedTheme(null)
  }

  const selectedThemeData = selectedTheme ? themes.find((t) => t.id === selectedTheme) : null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="group cursor-pointer border-0 backdrop-blur-md bg-white/60 dark:bg-slate-800/60 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden h-full">
              <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col">
                <motion.div
                  className="text-5xl sm:text-6xl mb-4 sm:mb-6"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {theme.icon}
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3">
                  {theme.label}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 leading-relaxed flex-grow">
                  {theme.description}
                </p>

                {/* Sub-themes indicator */}
                {theme.subThemes && Object.keys(theme.subThemes).length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {Object.values(theme.subThemes)
                        .slice(0, 3)
                        .map((subTheme) => (
                          <span
                            key={subTheme.id}
                            className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                          >
                            {subTheme.label}
                          </span>
                        ))}
                      {Object.keys(theme.subThemes).length > 3 && (
                        <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
                          +{Object.keys(theme.subThemes).length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => handleThemeClick(theme.id)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 sm:py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {t("createRoom", settings?.language || "es")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sub-theme Picker Modal */}
      {selectedThemeData && (
        <SubThemePicker
          theme={selectedThemeData}
          isOpen={showSubThemePicker}
          onClose={handleCloseSubThemePicker}
          onSelect={handleSubThemeSelect}
        />
      )}
    </>
  )
}
