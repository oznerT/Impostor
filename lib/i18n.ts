export const i18n = {
  es: {
    // Landing
    findImpostor: "Encuentra al Impostor",
    chooseTheme: "Elige tu temática",
    createRoom: "Crear sala",
    version: "v2.0 PRO",

    // Difficulty
    difficulty: "Dificultad",
    easy: "Fácil",
    medium: "Media",
    hard: "Difícil",
    speedMode: "Modo Speed",
    speedModeDesc: "Rondas de 15 segundos",

    // Categories
    football: "Fútbol",
    footballDesc: "Jugadores, equipos, términos futbolísticos",
    movies: "Cine",
    moviesDesc: "Películas, actores, directores famosos",
    music: "Música",
    musicDesc: "Artistas, géneros, instrumentos musicales",
    random: "Random",
    randomDesc: "Palabras variadas de diferentes categorías",

    // Create Room
    yourName: "Tu nombre",
    enterName: "Ingresa tu nombre",
    players: "Jugadores",
    startGame: "Iniciar juego",
    shareRoom: "Compartir sala",
    editWords: "Editar palabras",

    // Game
    player: "Jugador",
    of: "de",
    yourWordIs: "Tu palabra es:",
    youAreThe: "Eres el",
    impostor: "IMPOSTOR",
    ready: "Listo",
    wait: "Espera",
    passDevice: "Pasa el dispositivo al siguiente jugador",
    allPlayersReady: "Todos los jugadores han visto su palabra",

    // Waiting
    roundStarts: "¡Comienza la ronda!",
    discussAndVote: "Conversen entre todos y traten de descubrir quién es el impostor.",
    remember: "Recuerda:",
    votingInPerson: "La votación se hace cara a cara, no en la app.",
    endVoting: "Terminar votación",

    // Reveal
    whoWon: "¿Quién ganó?",
    selectResult: "Selecciona el resultado de la votación",
    groupWon: "El grupo ganó",
    impostorWon: "El impostor ganó",
    groupWonMsg: "¡El grupo ganó!",
    foundImpostor: "Encontraron al impostor",
    impostorWonMsg: "¡El impostor ganó!",
    fooledGroup: "Logró engañar al grupo",

    // Results
    score: "Puntuación",
    group: "Grupo",
    roundCompleted: "Ronda {round} completada",
    nextRound: "Siguiente ronda",
    exitGame: "Salir del juego",
    personalStats: "Estadísticas personales",
    gamesPlayed: "Partidas jugadas",
    history: "Historial",
    showHistory: "Ver historial",
    hideHistory: "Ocultar historial",

    // Settings
    settings: "Ajustes",
    sound: "Sonido",
    vibration: "Vibración",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    auto: "Automático",

    // Footer
    madeWith: "",
    renzoTari: "Renzo Tari",

    // Word Editor
    wordEditor: "Editor de Palabras",
    addWord: "Agregar palabra",
    saveWords: "Guardar cambios",
    resetWords: "Restaurar originales",
    customWords: "Palabras personalizadas",
  },
  en: {
    // Landing
    findImpostor: "Find the Impostor",
    chooseTheme: "Choose your theme",
    createRoom: "Create room",
    version: "v2.0 PRO",

    // Difficulty
    difficulty: "Difficulty",
    easy: "Easy",
    medium: "Medium",
    hard: "Hard",
    speedMode: "Speed Mode",
    speedModeDesc: "15-second rounds",

    // Categories
    football: "Football",
    footballDesc: "Players, teams, football terms",
    movies: "Movies",
    moviesDesc: "Films, actors, famous directors",
    music: "Music",
    musicDesc: "Artists, genres, musical instruments",
    random: "Random",
    randomDesc: "Various words from different categories",

    // Create Room
    yourName: "Your name",
    enterName: "Enter your name",
    players: "Players",
    startGame: "Start game",
    shareRoom: "Share room",
    editWords: "Edit words",

    // Game
    player: "Player",
    of: "of",
    yourWordIs: "Your word is:",
    youAreThe: "You are the",
    impostor: "IMPOSTOR",
    ready: "Ready",
    wait: "Wait",
    passDevice: "Pass the device to the next player",
    allPlayersReady: "All players have seen their word",

    // Waiting
    roundStarts: "Round starts!",
    discussAndVote: "Discuss among yourselves and try to discover who the impostor is.",
    remember: "Remember:",
    votingInPerson: "Voting is done face to face, not in the app.",
    endVoting: "End voting",

    // Reveal
    whoWon: "Who won?",
    selectResult: "Select the voting result",
    groupWon: "The group won",
    impostorWon: "The impostor won",
    groupWonMsg: "The group won!",
    foundImpostor: "They found the impostor",
    impostorWonMsg: "The impostor won!",
    fooledGroup: "Managed to fool the group",

    // Results
    score: "Score",
    group: "Group",
    roundCompleted: "Round {round} completed",
    nextRound: "Next round",
    exitGame: "Exit game",
    personalStats: "Personal stats",
    gamesPlayed: "Games played",
    history: "History",
    showHistory: "Show history",
    hideHistory: "Hide history",

    // Settings
    settings: "Settings",
    sound: "Sound",
    vibration: "Vibration",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    auto: "Auto",

    // Footer
    madeWith: " ",
    renzoTari: "Renzo Tari",

    // Word Editor
    wordEditor: "Word Editor",
    addWord: "Add word",
    saveWords: "Save changes",
    resetWords: "Reset to original",
    customWords: "Custom words",
  },
}

export type Language = keyof typeof i18n
export type TranslationKey = keyof typeof i18n.es

export function t(key: string, lang: Language = "es", params?: Record<string, string>): string {
  const langData = i18n[lang] || i18n.es
  let text = langData[key as keyof typeof langData] || i18n.es[key as keyof typeof i18n.es] || key

  text = String(text)

  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, String(value))
    })
  }

  return text
}
