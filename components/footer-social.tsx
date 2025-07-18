"use client"

import { motion } from "framer-motion"
import { t } from "@/lib/i18n"
import { useGameStore } from "@/lib/store"
import { Instagram, Github, Heart } from "lucide-react"

export function FooterSocial() {
  const { settings } = useGameStore()

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.7, y: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-16 mb-8 text-center"
    >
      <div className="backdrop-blur-md bg-white/80 dark:bg-slate-800/80 rounded-2xl px-6 py-3 mx-auto max-w-sm shadow-lg">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <span>{t("madeWith", settings.language)}</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>por</span>
          <a
            href="https://www.instagram.com/renzotari/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t("renzoTari", settings.language)}
          </a>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2">
          <a
            href="https://www.instagram.com/renzotari/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-pink-500 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/oznerT"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
