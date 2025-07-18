"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/lib/store"
import { getWordsForDifficulty } from "@/data/themes"
import { t } from "@/lib/i18n"
import { Edit3, Plus, Trash2, RotateCcw, Save } from "lucide-react"

interface WordEditorModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WordEditorModal({ isOpen, onClose }: WordEditorModalProps) {
  const { currentGame, updateCustomWords, settings } = useGameStore()
  const [words, setWords] = useState<string[]>([])
  const [newWord, setNewWord] = useState("")

  useEffect(() => {
    if (currentGame && isOpen) {
      const currentWords = currentGame.customWords?.length
        ? currentGame.customWords
        : getWordsForDifficulty(currentGame.themeId, currentGame.subThemeId, currentGame.difficulty)
      setWords([...currentWords])
    }
  }, [currentGame, isOpen])

  const handleAddWord = () => {
    if (newWord.trim() && !words.includes(newWord.trim())) {
      setWords([...words, newWord.trim()])
      setNewWord("")
    }
  }

  const handleRemoveWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    updateCustomWords(words)
    onClose()
  }

  const handleReset = () => {
    if (currentGame) {
      const originalWords = getWordsForDifficulty(currentGame.themeId, currentGame.subThemeId, currentGame.difficulty)
      setWords([...originalWords])
    }
  }

  if (!currentGame) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-2xl border-0 backdrop-blur-md bg-white/90 dark:bg-slate-800/90 rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <DialogHeader className="text-center pb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Edit3 className="w-8 h-8 text-white" />
                </motion.div>
                <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {t("wordEditor", settings.language)}
                </DialogTitle>
                <Badge variant="secondary" className="mx-auto">
                  {words.length} palabras
                </Badge>
              </DialogHeader>

              <div className="flex-1 overflow-hidden flex flex-col space-y-4">
                {/* Add Word */}
                <div className="flex gap-2">
                  <Input
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder={t("addWord", settings.language)}
                    className="rounded-2xl border-slate-200 dark:border-slate-600"
                    onKeyPress={(e) => e.key === "Enter" && handleAddWord()}
                  />
                  <Button
                    onClick={handleAddWord}
                    disabled={!newWord.trim()}
                    className="rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Words List */}
                <div className="overflow-y-auto max-h-[40vh] pr-2 pb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {words.map((word, index) => (
                      <motion.div
                        key={`${word}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/50"
                      >
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{word}</span>
                        <Button
                          onClick={() => handleRemoveWord(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 rounded-2xl border-slate-200 dark:border-slate-600 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {t("resetWords", settings.language)}
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-2xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t("saveWords", settings.language)}
                  </Button>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
