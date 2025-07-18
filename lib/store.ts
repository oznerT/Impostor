"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getWordsForDifficulty, type DifficultyLevel } from "@/data/themes"

export interface Player {
  id: string
  name: string
  score: number
  lastRole?: "impostor" | "citizen"
  joinOrder: number
}

export interface RoundHistory {
  round: number
  word: string
  subTheme: string
  impostorId: string
  impostorName: string
  outcome: "citizens" | "impostor"
  timestamp: string
}

export interface GameRound {
  words: string[]
  impostorIndex: number
}

export interface Game {
  id: string
  themeId: string
  subThemeId: string
  difficulty: DifficultyLevel
  speedMode: boolean
  playerCount: number
  phase: "setup" | "player-setup" | "round" | "waiting" | "reveal" | "results"
  currentRound: GameRound | null
  currentRoundNumber: number
  players: Player[]
  usedWords: Set<string>
  history: RoundHistory[]
  customWords?: string[]
}

export interface GameHistory {
  id: string
  date: string
  themeId: string
  subThemeId: string
  difficulty: DifficultyLevel
  rounds: number
  players: Player[]
  winner: Player | null
}

export interface Settings {
  sound: boolean
  vibration: boolean
  theme: "light" | "dark" | "auto"
  language: "es" | "en"
}

interface GameStore {
  games: Game[]
  currentGame: Game | null
  currentPlayer: number
  nickname: string
  gameHistory: GameHistory[]
  settings: Settings

  // Actions
  setNickname: (nickname: string) => void
  createGame: (
    themeId: string,
    subThemeId: string,
    difficulty: DifficultyLevel,
    speedMode: boolean,
    playerCount: number,
  ) => string
  setCurrentGame: (game: Game) => void
  setPhase: (phase: Game["phase"]) => void
  startRound: () => void
  nextPlayer: () => void
  nextRound: () => void
  addPlayer: (name: string) => string
  updatePlayerName: (playerId: string, name: string) => void
  updatePlayerRole: (playerId: string, role: "impostor" | "citizen") => void
  handleRoundEnd: (outcome: "citizens" | "impostor") => void
  saveGameToHistory: () => void
  updateSettings: (settings: Partial<Settings>) => void
  playSound: (type: "start" | "end" | "beep") => void
  vibrate: (pattern?: number | number[]) => void
  resetGame: () => void
  updateCustomWords: (words: string[]) => void
  addToHistory: (entry: RoundHistory) => void
}

const defaultSettings: Settings = {
  sound: true,
  vibration: true,
  theme: "auto",
  language: "es",
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      games: [],
      currentGame: null,
      currentPlayer: 0,
      nickname: "",
      gameHistory: [],
      settings: defaultSettings,

      setNickname: (nickname) => set({ nickname }),

      createGame: (themeId, subThemeId, difficulty, speedMode, playerCount) => {
        console.log("Store: Creating game with:", { themeId, subThemeId, difficulty, speedMode, playerCount })

        const gameId = Math.random().toString(36).substring(2, 8).toUpperCase()
        const { nickname } = get()

        const players: Player[] = []

        if (nickname) {
          players.push({
            id: "host",
            name: nickname,
            score: 0,
            joinOrder: 0,
          })
        }

        for (let i = players.length; i < playerCount; i++) {
          players.push({
            id: `player-${i}`,
            name: `Jugador ${i + 1}`,
            score: 0,
            joinOrder: i,
          })
        }

        const newGame: Game = {
          id: gameId,
          themeId,
          subThemeId,
          difficulty,
          speedMode,
          playerCount,
          phase: "player-setup",
          currentRound: null,
          currentRoundNumber: 0,
          players,
          usedWords: new Set(),
          history: [],
        }

        console.log("Store: Created game:", newGame)

        set((state) => ({
          games: [...state.games, newGame],
          currentGame: newGame,
        }))

        return gameId
      },

      setCurrentGame: (game) => set({ currentGame: game }),

      setPhase: (phase) =>
        set((state) => {
          if (!state.currentGame) return state

          const updatedGame = { ...state.currentGame, phase }
          return {
            currentGame: updatedGame,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),

      startRound: () =>
        set((state) => {
          if (!state.currentGame) return state

          console.log("Store: Starting round for game:", {
            themeId: state.currentGame.themeId,
            subThemeId: state.currentGame.subThemeId,
            difficulty: state.currentGame.difficulty,
          })

          const wordPool = state.currentGame.customWords?.length
            ? state.currentGame.customWords
            : getWordsForDifficulty(
                state.currentGame.themeId,
                state.currentGame.subThemeId,
                state.currentGame.difficulty,
              )

          console.log("Store: Word pool:", wordPool)

          if (wordPool.length === 0) {
            console.error("Store: No words available for this configuration")
            return state
          }

          const availableWords = wordPool.filter((word) => !state.currentGame!.usedWords.has(word))

          if (availableWords.length === 0) {
            console.log("Store: All words used, clearing used words set")
            state.currentGame.usedWords.clear()
          }

          const wordsToUse = availableWords.length > 0 ? availableWords : wordPool
          const shuffled = [...wordsToUse].sort(() => 0.5 - Math.random())
          const selectedWord = shuffled[0]
          const words = Array(state.currentGame.playerCount).fill(selectedWord)

          const impostorIndex = Math.floor(Math.random() * state.currentGame.playerCount)
          words[impostorIndex] = "IMPOSTOR"

          console.log("Store: Selected word:", selectedWord, "Impostor index:", impostorIndex)

          const newRound: GameRound = {
            words,
            impostorIndex,
          }

          state.currentGame.usedWords.add(selectedWord)

          const updatedPlayers = state.currentGame.players.map((player, index) => ({
            ...player,
            lastRole: index === impostorIndex ? ("impostor" as const) : ("citizen" as const),
          }))

          const updatedGame = {
            ...state.currentGame,
            phase: "round" as const,
            currentRound: newRound,
            currentRoundNumber: state.currentGame.currentRoundNumber + 1,
            players: updatedPlayers,
          }

          get().playSound("start")

          return {
            currentGame: updatedGame,
            currentPlayer: 0,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),

      nextPlayer: () =>
        set((state) => ({
          currentPlayer: state.currentPlayer + 1,
        })),

      nextRound: () =>
        set((state) => {
          if (!state.currentGame) return state

          const updatedGame = {
            ...state.currentGame,
            phase: "setup" as const,
            currentRound: null,
          }

          return {
            currentGame: updatedGame,
            currentPlayer: 0,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),

      addPlayer: (name) => {
        const playerId = Math.random().toString(36).substring(2, 8)

        set((state) => {
          if (!state.currentGame) return state

          const newPlayer: Player = {
            id: playerId,
            name,
            score: 0,
            joinOrder: state.currentGame.players.length,
          }

          const updatedGame = {
            ...state.currentGame,
            players: [...state.currentGame.players, newPlayer],
          }

          return {
            currentGame: updatedGame,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        })

        return playerId
      },

      updatePlayerName: (playerId, name) =>
        set((state) => {
          if (!state.currentGame) return state

          const updatedPlayers = state.currentGame.players.map((player) =>
            player.id === playerId ? { ...player, name } : player,
          )

          const updatedGame = {
            ...state.currentGame,
            players: updatedPlayers,
          }

          return {
            currentGame: updatedGame,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),

      updatePlayerRole: (playerId, role) =>
        set((state) => {
          if (!state.currentGame) return state

          const updatedPlayers = state.currentGame.players.map((player) =>
            player.id === playerId ? { ...player, lastRole: role } : player,
          )

          const updatedGame = {
            ...state.currentGame,
            players: updatedPlayers,
          }

          return {
            currentGame: updatedGame,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),

      handleRoundEnd: (outcome) => {
        const state = get()
        if (!state.currentGame || !state.currentGame.currentRound) return

        const impostorPlayer = state.currentGame.players[state.currentGame.currentRound.impostorIndex]
        const selectedWord = state.currentGame.currentRound.words.find((w) => w !== "IMPOSTOR") || "Unknown"

        // Add to history
        const historyEntry: RoundHistory = {
          round: state.currentGame.currentRoundNumber,
          word: selectedWord,
          subTheme: state.currentGame.subThemeId,
          impostorId: impostorPlayer.id,
          impostorName: impostorPlayer.name,
          outcome,
          timestamp: new Date().toISOString(),
        }

        const updatedPlayers = state.currentGame.players.map((player) => {
          if (outcome === "citizens") {
            if (player.lastRole === "citizen") {
              return { ...player, score: Number((player.score + 0.5).toFixed(1)) }
            }
          } else if (outcome === "impostor") {
            if (player.lastRole === "impostor") {
              return { ...player, score: Number((player.score + 1).toFixed(1)) }
            }
          }
          return player
        })

        const updatedGame = {
          ...state.currentGame,
          players: updatedPlayers,
          history: [...state.currentGame.history, historyEntry],
        }

        set({
          currentGame: updatedGame,
          games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
        })
      },

      saveGameToHistory: () =>
        set((state) => {
          if (!state.currentGame) return state

          const sortedPlayers = [...state.currentGame.players].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score
            return a.joinOrder - b.joinOrder
          })

          const historyEntry: GameHistory = {
            id: state.currentGame.id,
            date: new Date().toISOString(),
            themeId: state.currentGame.themeId,
            subThemeId: state.currentGame.subThemeId,
            difficulty: state.currentGame.difficulty,
            rounds: state.currentGame.currentRoundNumber,
            players: sortedPlayers,
            winner: sortedPlayers[0] || null,
          }

          return {
            gameHistory: [historyEntry, ...state.gameHistory.slice(0, 9)],
          }
        }),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      playSound: (type) => {
        const { settings } = get()
        if (!settings.sound) return

        try {
          const audio = new Audio(`/sounds/${type}.wav`)
          audio.volume = 0.3
          audio.play().catch(() => {})
        } catch (error) {
          // Ignore audio errors
        }
      },

      vibrate: (pattern = 200) => {
        const { settings } = get()
        if (!settings.vibration) return

        if (typeof navigator !== "undefined" && navigator.vibrate) {
          navigator.vibrate(pattern)
        }
      },

      resetGame: () =>
        set((state) => ({
          currentGame: null,
          currentPlayer: 0,
        })),

      updateCustomWords: (words) =>
        set((state) => {
          if (!state.currentGame) return state

          const updatedGame = {
            ...state.currentGame,
            customWords: words,
          }

          return {
            currentGame: updatedGame,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),

      addToHistory: (entry) =>
        set((state) => {
          if (!state.currentGame) return state

          const updatedGame = {
            ...state.currentGame,
            history: [...state.currentGame.history, entry],
          }

          return {
            currentGame: updatedGame,
            games: state.games.map((g) => (g.id === updatedGame.id ? updatedGame : g)),
          }
        }),
    }),
    {
      name: "impostor-game-storage",
      partialize: (state) => ({
        nickname: state.nickname,
        gameHistory: state.gameHistory,
        settings: state.settings,
      }),
    },
  ),
)
