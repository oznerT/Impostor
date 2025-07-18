"use client"

import { useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useGameStore } from "@/lib/store"

export default function JoinRoomPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { games, setCurrentGame } = useGameStore()

  const roomId = params.room as string
  const themeId = searchParams.get("theme")
  const subId = searchParams.get("sub")

  useEffect(() => {
    // Try to find existing game
    const game = games.find((g) => g.id === roomId)

    if (game) {
      setCurrentGame(game)
      router.push(`/game/${roomId}`)
    } else {
      // Redirect to home with theme/sub params if available
      const queryParams = new URLSearchParams()
      if (themeId) queryParams.set("theme", themeId)
      if (subId) queryParams.set("sub", subId)

      const redirectUrl = queryParams.toString() ? `/?${queryParams.toString()}` : "/"

      router.push(redirectUrl)
    }
  }, [roomId, themeId, subId, games, setCurrentGame, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 dark:text-slate-400">Buscando sala...</p>
      </div>
    </div>
  )
}
