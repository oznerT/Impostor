import { futbolWords } from "./futbolWords"

export interface WordDifficulty {
  easy: string[]
  medium: string[]
  hard: string[]
}

export interface SubTheme {
  id: string
  label: string
  emoji: string
  words: WordDifficulty
}

export interface Theme {
  id: string
  label: string
  icon: string
  description: string
  words: WordDifficulty
  subThemes?: Record<string, SubTheme>
}

// Helper function to split words into difficulty levels
function splitWordsByDifficulty(words: string[]): WordDifficulty {
  const shuffled = [...words].sort(() => 0.5 - Math.random())
  const third = Math.ceil(shuffled.length / 3)

  return {
    easy: shuffled.slice(0, third),
    medium: shuffled.slice(third, third * 2),
    hard: shuffled.slice(third * 2),
  }
}

export const themes: Theme[] = [
  {
    id: "football",
    label: "Fútbol",
    icon: "⚽",
    description: "Jugadores, equipos, términos futbolísticos",
    words: splitWordsByDifficulty(futbolWords.general.words),
    subThemes: {
      // Jugadores actuales
      jugadoresGlobal: {
        id: "jugadoresGlobal",
        label: "Jugadores actuales (Global)",
        emoji: "🌍⚽",
        words: splitWordsByDifficulty(futbolWords.jugadores.actuales.global.words),
      },
      jugadoresArgentina: {
        id: "jugadoresArgentina",
        label: "Jugadores actuales (Argentina)",
        emoji: "🇦🇷⚽",
        words: splitWordsByDifficulty(futbolWords.jugadores.actuales.ligaArgentina.words),
      },
      jugadoresPremier: {
        id: "jugadoresPremier",
        label: "Jugadores actuales (Premier League)",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿⚽",
        words: splitWordsByDifficulty(futbolWords.jugadores.actuales.premierLeague.words),
      },
      jugadoresBrasil: {
        id: "jugadoresBrasil",
        label: "Jugadores actuales (Brasil)",
        emoji: "🇧🇷⚽",
        words: splitWordsByDifficulty(futbolWords.jugadores.actuales.brasileirao.words),
      },
      jugadoresLaLiga: {
        id: "jugadoresLaLiga",
        label: "Jugadores actuales (LaLiga)",
        emoji: "🇪🇸⚽",
        words: splitWordsByDifficulty(futbolWords.jugadores.actuales.laLiga.words),
      },

      // Jugadores retirados
      retiradosGlobal: {
        id: "retiradosGlobal",
        label: "Leyendas del fútbol",
        emoji: "👑⚽",
        words: splitWordsByDifficulty(futbolWords.jugadores.retirados.global.words),
      },
      retiradosArgentina: {
        id: "retiradosArgentina",
        label: "Leyendas argentinas",
        emoji: "🇦🇷👑",
        words: splitWordsByDifficulty(futbolWords.jugadores.retirados.ligaArgentina.words),
      },
      retiradosPremier: {
        id: "retiradosPremier",
        label: "Leyendas Premier League",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿👑",
        words: splitWordsByDifficulty(futbolWords.jugadores.retirados.premierLeague.words),
      },
      retiradosBrasil: {
        id: "retiradosBrasil",
        label: "Leyendas brasileñas",
        emoji: "🇧🇷👑",
        words: splitWordsByDifficulty(futbolWords.jugadores.retirados.brasileirao.words),
      },

      // Equipos
      equiposGlobal: {
        id: "equiposGlobal",
        label: "Equipos del mundo",
        emoji: "🌍🏆",
        words: splitWordsByDifficulty(futbolWords.equipos.global.words),
      },
      equiposArgentina: {
        id: "equiposArgentina",
        label: "Equipos argentinos",
        emoji: "🇦🇷🏆",
        words: splitWordsByDifficulty(futbolWords.equipos.argentina.words),
      },
      equiposInglaterra: {
        id: "equiposInglaterra",
        label: "Equipos ingleses",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿🏆",
        words: splitWordsByDifficulty(futbolWords.equipos.inglaterra.words),
      },
      equiposBrasil: {
        id: "equiposBrasil",
        label: "Equipos brasileños",
        emoji: "🇧🇷🏆",
        words: splitWordsByDifficulty(futbolWords.equipos.brasil.words),
      },
      equiposEspaña: {
        id: "equiposEspaña",
        label: "Equipos españoles",
        emoji: "🇪🇸🏆",
        words: splitWordsByDifficulty(futbolWords.equipos.españa.words),
      },
      equiposItalia: {
        id: "equiposItalia",
        label: "Equipos italianos",
        emoji: "🇮🇹🏆",
        words: splitWordsByDifficulty(futbolWords.equipos.italia.words),
      },

      // Selecciones
      seleccionesMundial: {
        id: "seleccionesMundial",
        label: "Selecciones mundialistas",
        emoji: "🏆🌍",
        words: splitWordsByDifficulty(futbolWords.selecciones.mundial.words),
      },
      seleccionesSudamerica: {
        id: "seleccionesSudamerica",
        label: "Selecciones sudamericanas",
        emoji: "🇦🇷🇧🇷🇺🇾",
        words: splitWordsByDifficulty(futbolWords.selecciones.sudamerica.words),
      },
      seleccionesEuropa: {
        id: "seleccionesEuropa",
        label: "Selecciones europeas",
        emoji: "🇪🇺⚽",
        words: splitWordsByDifficulty(futbolWords.selecciones.europa.words),
      },

      // Competiciones
      competicionesInternacionales: {
        id: "competicionesInternacionales",
        label: "Competiciones internacionales",
        emoji: "🏆🌍",
        words: splitWordsByDifficulty(futbolWords.competiciones.internacionales.words),
      },
      competicionesArgentina: {
        id: "competicionesArgentina",
        label: "Competiciones argentinas",
        emoji: "🇦🇷🏆",
        words: splitWordsByDifficulty(futbolWords.competiciones.argentina.words),
      },

      // Estadios
      estadiosIconicos: {
        id: "estadiosIconicos",
        label: "Estadios icónicos",
        emoji: "🏟️⚽",
        words: splitWordsByDifficulty(futbolWords.estadios.iconicos.words),
      },
      estadiosArgentina: {
        id: "estadiosArgentina",
        label: "Estadios argentinos",
        emoji: "🇦🇷🏟️",
        words: splitWordsByDifficulty(futbolWords.estadios.argentina.words),
      },
    },
  },
  {
    id: "movies",
    label: "Cine",
    icon: "🎬",
    description: "Películas, actores, directores famosos",
    words: {
      easy: [
        "Titanic",
        "Avatar",
        "Batman",
        "Superman",
        "Spider-Man",
        "Star Wars",
        "Harry Potter",
        "Frozen",
        "Toy Story",
        "Shrek",
      ],
      medium: [
        "Leonardo DiCaprio",
        "Brad Pitt",
        "Scarlett Johansson",
        "Tom Hanks",
        "Will Smith",
        "Johnny Depp",
        "Robert Downey Jr",
        "Angelina Jolie",
        "Meryl Streep",
        "Denzel Washington",
      ],
      hard: [
        "Christopher Nolan",
        "Quentin Tarantino",
        "Martin Scorsese",
        "Stanley Kubrick",
        "Steven Spielberg",
        "Alfred Hitchcock",
        "Francis Ford Coppola",
        "Ridley Scott",
        "David Fincher",
        "Tim Burton",
      ],
    },
    subThemes: {
      marvel: {
        id: "marvel",
        label: "Marvel",
        emoji: "🦸‍♂️⚡",
        words: {
          easy: [
            "Iron Man",
            "Capitán América",
            "Thor",
            "Hulk",
            "Spider-Man",
            "Viuda Negra",
            "Hawkeye",
            "Ant-Man",
            "Doctor Strange",
            "Capitana Marvel",
          ],
          medium: [
            "Tony Stark",
            "Steve Rogers",
            "Natasha Romanoff",
            "Bruce Banner",
            "Peter Parker",
            "Stephen Strange",
            "Carol Danvers",
            "Scott Lang",
            "Wanda Maximoff",
            "Vision",
          ],
          hard: [
            "Thanos",
            "Loki",
            "Ultron",
            "Dormammu",
            "Red Skull",
            "Winter Soldier",
            "Falcon",
            "War Machine",
            "Scarlet Witch",
            "Quicksilver",
          ],
        },
      },
      classics: {
        id: "classics",
        label: "Clásicos del cine",
        emoji: "🎭🎞️",
        words: {
          easy: [
            "Casablanca",
            "El Padrino",
            "Star Wars",
            "Jaws",
            "E.T.",
            "Rocky",
            "Grease",
            "Dirty Dancing",
            "Top Gun",
            "Back to the Future",
          ],
          medium: [
            "Ciudadano Kane",
            "Vértigo",
            "Psicosis",
            "Lawrence de Arabia",
            "El Mago de Oz",
            "Cantando bajo la lluvia",
            "Ben-Hur",
            "Gone with the Wind",
            "Sunset Boulevard",
            "Some Like It Hot",
          ],
          hard: [
            "8½",
            "Los siete samuráis",
            "El acorazado Potemkin",
            "Metrópolis",
            "Rashomon",
            "Tokyo Story",
            "The Rules of the Game",
            "Bicycle Thieves",
            "L'Atalante",
            "The Passion of Joan of Arc",
          ],
        },
      },
      directors: {
        id: "directors",
        label: "Directores famosos",
        emoji: "🎬👨‍💼",
        words: {
          easy: [
            "Steven Spielberg",
            "George Lucas",
            "James Cameron",
            "Tim Burton",
            "Quentin Tarantino",
            "Christopher Nolan",
            "Martin Scorsese",
            "Ridley Scott",
            "David Fincher",
            "Woody Allen",
          ],
          medium: [
            "Stanley Kubrick",
            "Alfred Hitchcock",
            "Francis Ford Coppola",
            "Orson Welles",
            "Billy Wilder",
            "John Ford",
            "Akira Kurosawa",
            "Federico Fellini",
            "Ingmar Bergman",
            "Jean-Luc Godard",
          ],
          hard: [
            "Andrei Tarkovsky",
            "Luis Buñuel",
            "Sergei Eisenstein",
            "F.W. Murnau",
            "Carl Theodor Dreyer",
            "Robert Bresson",
            "Yasujirō Ozu",
            "Kenji Mizoguchi",
            "Jean Renoir",
            "Michelangelo Antonioni",
          ],
        },
      },
    },
  },
  {
    id: "music",
    label: "Música",
    icon: "🎵",
    description: "Artistas, géneros, instrumentos musicales",
    words: {
      easy: [
        "Beatles",
        "Queen",
        "Michael Jackson",
        "Madonna",
        "Elvis",
        "Bob Marley",
        "ABBA",
        "U2",
        "Coldplay",
        "Adele",
      ],
      medium: [
        "Bob Dylan",
        "Taylor Swift",
        "Drake",
        "Beyoncé",
        "Ed Sheeran",
        "Bruno Mars",
        "Lady Gaga",
        "Eminem",
        "Rihanna",
        "Justin Bieber",
      ],
      hard: [
        "Radiohead",
        "Pink Floyd",
        "Led Zeppelin",
        "The Rolling Stones",
        "The Who",
        "Deep Purple",
        "Black Sabbath",
        "Iron Maiden",
        "Metallica",
        "Nirvana",
      ],
    },
    subThemes: {
      rock: {
        id: "rock",
        label: "Rock",
        emoji: "🎸🤘",
        words: {
          easy: [
            "The Beatles",
            "Queen",
            "AC/DC",
            "Nirvana",
            "Guns N' Roses",
            "Bon Jovi",
            "Aerosmith",
            "Kiss",
            "The Eagles",
            "Fleetwood Mac",
          ],
          medium: [
            "Led Zeppelin",
            "Pink Floyd",
            "The Rolling Stones",
            "U2",
            "The Who",
            "Deep Purple",
            "Black Sabbath",
            "Iron Maiden",
            "Metallica",
            "Pearl Jam",
          ],
          hard: [
            "Radiohead",
            "Red Hot Chili Peppers",
            "Foo Fighters",
            "Green Day",
            "Linkin Park",
            "Muse",
            "Arctic Monkeys",
            "The Strokes",
            "Kings of Leon",
            "Imagine Dragons",
          ],
        },
      },
      latin: {
        id: "latin",
        label: "Música Latina",
        emoji: "🎺🌶️",
        words: {
          easy: [
            "Shakira",
            "Bad Bunny",
            "J Balvin",
            "Maluma",
            "Daddy Yankee",
            "Luis Fonsi",
            "Ozuna",
            "Karol G",
            "Rosalía",
            "Jesse & Joy",
          ],
          medium: [
            "Soda Stereo",
            "Gustavo Cerati",
            "Charly García",
            "Fito Páez",
            "Maná",
            "Julieta Venegas",
            "Natalia Lafourcade",
            "Mon Laferte",
            "Álvaro Soler",
            "Mau y Ricky",
          ],
          hard: [
            "Los Fabulosos Cadillacs",
            "Manu Chao",
            "Café Tacvba",
            "Aterciopelados",
            "Molotov",
            "Los Tigres del Norte",
            "Vicente Fernández",
            "Juan Gabriel",
            "Selena",
            "Celia Cruz",
          ],
        },
      },
      pop: {
        id: "pop",
        label: "Pop",
        emoji: "🎤✨",
        words: {
          easy: [
            "Michael Jackson",
            "Madonna",
            "Whitney Houston",
            "Britney Spears",
            "Christina Aguilera",
            "Mariah Carey",
            "Celine Dion",
            "Alanis Morissette",
            "Janet Jackson",
            "Tina Turner",
          ],
          medium: [
            "Taylor Swift",
            "Beyoncé",
            "Lady Gaga",
            "Katy Perry",
            "Ariana Grande",
            "Dua Lipa",
            "Billie Eilish",
            "The Weeknd",
            "Bruno Mars",
            "Justin Timberlake",
          ],
          hard: [
            "Prince",
            "David Bowie",
            "George Michael",
            "Elton John",
            "Stevie Wonder",
            "Lionel Richie",
            "Phil Collins",
            "Annie Lennox",
            "Cyndi Lauper",
            "Boy George",
          ],
        },
      },
    },
  },
  {
    id: "random",
    label: "Random",
    icon: "🎲",
    description: "Palabras variadas de diferentes categorías",
    words: {
      easy: ["Pizza", "Café", "Playa", "Montaña", "Libro", "Teléfono", "Coche", "Perro", "Gato", "Casa"],
      medium: ["Árbol", "Flor", "Sol", "Luna", "Estrella", "Escuela", "Hospital", "Parque", "Museo", "Teatro"],
      hard: ["Agua", "Fuego", "Tierra", "Aire", "Tiempo", "Espacio", "Amor", "Amistad", "Familia", "Trabajo"],
    },
  },
]

export type DifficultyLevel = "easy" | "medium" | "hard"

export function getWordsForDifficulty(themeId: string, subThemeId: string, difficulty: DifficultyLevel): string[] {
  console.log("getWordsForDifficulty called with:", { themeId, subThemeId, difficulty })

  const theme = themes.find((t) => t.id === themeId)
  if (!theme) {
    console.error("Theme not found:", themeId)
    return []
  }

  if (subThemeId === "general") {
    const words = theme.words[difficulty] || []
    console.log("Using general theme words:", words.length, "words")
    return words
  }

  const subTheme = theme.subThemes?.[subThemeId]
  if (!subTheme) {
    console.error("SubTheme not found:", subThemeId, "Available subThemes:", Object.keys(theme.subThemes || {}))
    // Fallback to general theme words
    const words = theme.words[difficulty] || []
    console.log("Fallback to general theme words:", words.length, "words")
    return words
  }

  const words = subTheme.words[difficulty] || []
  console.log("Using subTheme words:", words.length, "words from", subTheme.label)
  return words
}

export function getTimerForDifficulty(difficulty: DifficultyLevel, speedMode: boolean): number {
  if (speedMode) return 15

  switch (difficulty) {
    case "easy":
      return 45
    case "medium":
      return 30
    case "hard":
      return 20
    default:
      return 30
  }
}
