"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Theme } from "@/data/themes"
import { Search, Sparkles, Grid3X3 } from "lucide-react"

interface SubThemePickerProps {
  theme: Theme
  isOpen: boolean
  onClose: () => void
  onSelect: (subThemeId: string) => void
}

export function SubThemePicker({ theme, isOpen, onClose, onSelect }: SubThemePickerProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const subThemes = theme.subThemes ? Object.values(theme.subThemes) : []

  const filteredSubThemes = subThemes.filter((subTheme) =>
    subTheme.label.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSelect = (subThemeId: string) => {
    console.log("SubThemePicker: Selecting subTheme:", subThemeId)
    onSelect(subThemeId)
    setSearchTerm("")

    // Analytics
    if (typeof window !== "undefined" && (window as any).plausible) {
      ;(window as any).plausible("select_subtheme", {
        props: { theme: theme.id, subtheme: subThemeId },
      })
    }
  }

  const handleClose = () => {
    setSearchTerm("")
    onClose()
  }

  const getTotalWords = (words: any) => {
    if (typeof words === "object" && words.easy) {
      return words.easy.length + words.medium.length + words.hard.length
    }
    return Array.isArray(words) ? words.length : 0
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-4xl border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <DialogHeader className="text-center pb-6">
                <motion.div
                  className="text-6xl mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  {theme.icon}
                </motion.div>
                <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {theme.label}
                </DialogTitle>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Elegí una sub-categoría</p>
              </DialogHeader>

              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Search Bar */}
                {subThemes.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative mb-6"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar sub-categoría..."
                      className="pl-10 rounded-2xl border-slate-200 dark:border-slate-600 backdrop-blur-sm bg-white/50 dark:bg-slate-700/50"
                    />
                  </motion.div>
                )}

                {/* General Option */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <Button
                    onClick={() => handleSelect("general")}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span className="text-2xl mr-2">⚽</span>
                    General
                    <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
                      {getTotalWords(theme.words)} palabras
                    </Badge>
                  </Button>
                </motion.div>

                {/* Sub-themes Grid */}
                {subThemes.length > 0 && (
                  <div className="overflow-y-auto max-h-[60vh] pr-1 pb-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pb-2"
                    >
                      {filteredSubThemes.map((subTheme, index) => (
                        <motion.div
                          key={subTheme.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.03 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => handleSelect(subTheme.id)}
                            variant="outline"
                            className="w-full h-auto p-4 rounded-2xl border-slate-200 dark:border-slate-600 backdrop-blur-sm bg-white/50 dark:bg-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-700/80 text-left flex flex-col items-start gap-2"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{subTheme.emoji}</span>
                                <span className="font-medium text-slate-800 dark:text-slate-200 text-sm leading-tight">
                                  {subTheme.label}
                                </span>
                              </div>
                              <Grid3X3 className="w-4 h-4 text-slate-400" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {getTotalWords(subTheme.words)} palabras
                            </Badge>
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {filteredSubThemes.length === 0 && searchTerm && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <p className="text-slate-500 dark:text-slate-400">
                      No se encontraron sub-categorías que coincidan con "{searchTerm}"
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
