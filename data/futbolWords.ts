// /data/futbolWords.ts
// Cada grupo debe tener al menos 30 palabras para dividir correctamente en dificultades

type WordGroup = {
  label: string
  emoji: string
  words: string[]
}

export const futbolWords = {
  // ------------- GENERAL (120+) -------------
  general: {
    label: "General",
    emoji: "⚽",
    words: [
      // Jugadores leyenda
      "Pelé",
      "Maradona",
      "Messi",
      "Cristiano Ronaldo",
      "Zidane",
      "Johan Cruyff",
      "Ronaldo Nazário",
      "Ronaldinho",
      "Di Stéfano",
      "Platini",
      "Franz Beckenbauer",
      "Garrincha",
      "Paolo Maldini",
      "Iniesta",
      "Xavi",
      "George Best",
      "Lev Yashin",
      "Iker Casillas",
      "Gianluigi Buffon",
      "Thierry Henry",

      // Jugadores actuales top
      "Erling Haaland",
      "Kylian Mbappé",
      "Kevin De Bruyne",
      "Mohamed Salah",
      "Harry Kane",
      "Luka Modrić",
      "Robert Lewandowski",
      "Vinícius Júnior",
      "Jude Bellingham",
      "Son Heung-min",

      // Equipos emblemáticos
      "Boca Juniors",
      "River Plate",
      "Barcelona",
      "Real Madrid",
      "Manchester United",
      "Liverpool",
      "Bayern Múnich",
      "Juventus",
      "Santos FC",
      "Flamengo",
      "AC Milan",
      "Inter de Milán",
      "Ajax",
      "Benfica",
      "Borussia Dortmund",

      // Selecciones y campeonatos
      "Argentina",
      "Brasil",
      "Alemania",
      "Francia",
      "Italia",
      "España",
      "Inglaterra",
      "Países Bajos",
      "Uruguay",
      "Portugal",
      "Copa del Mundo",
      "Eurocopa",
      "Copa América",
      "Champions League",
      "Copa Libertadores",
      "Premier League",
      "LaLiga",
      "Serie A",
      "Bundesliga",
      "Brasileirão",

      // Términos futbolísticos
      "Balón de Oro",
      "VAR",
      "Offside",
      "Tiki-taka",
      "Catenaccio",
      "La Bombonera",
      "Anfield",
      "Maracaná",
      "Bernabéu",
      "Monumental",
      "Árbitro",
      "Hinchas",
      "Director Técnico",
      "Clásico",
      "Derby",
      "Gol",
      "Penalti",
      "Córner",
      "Fuera de juego",
      "Tarjeta roja",
      "Portero",
      "Defensa",
      "Centrocampista",
      "Delantero",
      "Entrenador",
      "Estadio",
      "Hinchada",
      "Pelota",
      "Cancha",
      "Arco",
      "Lateral",
      "Tiro libre",
      "Cabezazo",
      "Volea",
      "Chilena",
      "Gambeta",
      "Pase",
      "Centro",
      "Remate",
      "Atajada",
      "Lesión",
      "Sustitución",
      "Tiempo extra",
      "Penales",
      "Hat-trick",
      "Autogol",
      "Expulsión",
      "Amonestación",
    ],
  },

  // ------------- JUGADORES -------------
  jugadores: {
    // --- ACTUALES ---
    actuales: {
      // Cualquier liga
      global: {
        label: "Jugadores actuales (Global)",
        emoji: "🌍",
        words: [
          "Erling Haaland",
          "Kylian Mbappé",
          "Kevin De Bruyne",
          "Mohamed Salah",
          "Jude Bellingham",
          "Luka Modrić",
          "Robert Lewandowski",
          "Vinícius Júnior",
          "Harry Kane",
          "Rodri",
          "Phil Foden",
          "Bukayo Saka",
          "Martin Ødegaard",
          "Declan Rice",
          "Pedri",
          "Jamál Musiala",
          "Antoine Griezmann",
          "Federico Valverde",
          "Bruno Fernandes",
          "Son Heung-min",
          "Rafael Leão",
          "Khvicha Kvaratskhelia",
          "Victor Osimhen",
          "Darwin Núñez",
          "Lautaro Martínez",
          "Josko Gvardiol",
          "Achraf Hakimi",
          "Ederson",
          "Mike Maignan",
          "Thibaut Courtois",
          "Gianluigi Donnarumma",
          "Alisson Becker",
          "Virgil van Dijk",
          "Rúben Dias",
          "William Saliba",
          "Alessandro Bastoni",
          "Theo Hernández",
          "João Cancelo",
          "Reece James",
          "Trent Alexander-Arnold",
        ],
      },

      // Liga argentina (2025 aprox.)
      ligaArgentina: {
        label: "Jugadores actuales – Liga Argentina",
        emoji: "🇦🇷",
        words: [
          "Edinson Cavani",
          "Cristian Medina",
          "Miguel Borja",
          "Ezequiel Barco",
          "Gabriel Arias",
          "Maximiliano Romero",
          "Martín Cauteruccio",
          "Santiago Toloza",
          "Adam Bareiro",
          "Nahuel Barrios",
          "Guido Carrillo",
          "Javier Correa",
          "Brahian Alemán",
          "Rodrigo Castillo",
          "Alejo Véliz",
          "Ignacio Malcorra",
          "Jorge Recalde",
          "Justo Giani",
          "Lucas Pratto",
          "Francisco Ortega",
          "José Sand",
          "Pedro De la Vega",
          "Milton Giménez",
          "Alejandro Cabrera",
          "Luis Rodríguez",
          "Facundo Farías",
          "Nahuel Bustos",
          "Rodrigo Garro",
          "Gabriel Ávalos",
          "Kevin Mac Allister",
          "Franco Armani",
          "Agustín Rossi",
          "Sergio Romero",
          "Leandro Brey",
          "Marcos Acuña",
          "Nicolás Tagliafico",
          "Germán Pezzella",
          "Lucas Martínez Quarta",
          "Enzo Fernández",
          "Alexis Mac Allister",
        ],
      },

      // Premier League
      premierLeague: {
        label: "Jugadores actuales – Premier League",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        words: [
          "Erling Haaland",
          "Kevin De Bruyne",
          "Phil Foden",
          "Rodri",
          "Mohamed Salah",
          "Trent Alexander-Arnold",
          "Virgil van Dijk",
          "Darwin Núñez",
          "Bukayo Saka",
          "Martin Ødegaard",
          "Declan Rice",
          "Gabriel Jesus",
          "Kai Havertz",
          "Reece James",
          "Cole Palmer",
          "Enzo Fernández",
          "Nicolas Jackson",
          "Bruno Fernandes",
          "Marcus Rashford",
          "Casemiro",
          "Alejandro Garnacho",
          "Rasmus Højlund",
          "Son Heung-min",
          "James Maddison",
          "Richarlison",
          "Jarrod Bowen",
          "Lucas Paquetá",
          "Ollie Watkins",
          "Dominic Calvert-Lewin",
          "Kobbie Mainoo",
          "Alisson Becker",
          "Jordan Pickford",
          "Aaron Ramsdale",
          "William Saliba",
          "Gabriel Magalhães",
          "Rúben Dias",
          "John Stones",
          "Kyle Walker",
          "Andy Robertson",
          "Thiago Silva",
        ],
      },

      // Brasileirao
      brasileirao: {
        label: "Jugadores actuales – Brasileirao",
        emoji: "🇧🇷",
        words: [
          "Endrick",
          "Gabriel Barbosa",
          "Pedro Guilherme",
          "Giorgian De Arrascaeta",
          "Everton Ribeiro",
          "Hulk",
          "Paulinho",
          "Matheus França",
          "Yuri Alberto",
          "Mayke",
          "Raphael Veiga",
          "Rony",
          "Dudu",
          "Germán Cano",
          "Ganso",
          "Lucas Moura",
          "Calleri",
          "Rodrigo Nestor",
          "Weverton",
          "Júnior Santos",
          "Marcos Leonardo",
          "Ângelo Gabriel",
          "Vitor Roque",
          "Bruno Henrique",
          "Luan Cândido",
          "Allan",
          "André Trindade",
          "Nino",
          "João Gomes",
          "Danilo Barbosa",
          "Alisson",
          "Ederson",
          "Marquinhos",
          "Thiago Silva",
          "Casemiro",
          "Fabinho",
          "Fred",
          "Philippe Coutinho",
          "Vinícius Júnior",
          "Rodrygo",
        ],
      },

      // LaLiga
      laLiga: {
        label: "Jugadores actuales – LaLiga",
        emoji: "🇪🇸",
        words: [
          "Jude Bellingham",
          "Vinícius Júnior",
          "Luka Modrić",
          "Federico Valverde",
          "Thibaut Courtois",
          "Robert Lewandowski",
          "Pedri",
          "Gavi",
          "Frenkie de Jong",
          "Marc-André ter Stegen",
          "Antoine Griezmann",
          "Álvaro Morata",
          "Koke",
          "Jan Oblak",
          "Iago Aspas",
          "Mikel Oyarzabal",
          "Alexander Sørloth",
          "Takefusa Kubo",
          "Dani Parejo",
          "Gerard Moreno",
          "Karim Benzema",
          "Toni Kroos",
          "Sergio Ramos",
          "Jordi Alba",
          "Ansu Fati",
          "Ferran Torres",
          "Raphinha",
          "Jules Koundé",
          "Ronald Araújo",
          "Pau Cubarsí",
          "Lamine Yamal",
          "Rodri",
          "Dani Olmo",
          "Mikel Merino",
          "Nico Williams",
          "Iñaki Williams",
          "Unai Simón",
          "David Raya",
          "Pau Torres",
          "Aymeric Laporte",
        ],
      },
    },

    // --- RETIRADOS ---
    retirados: {
      // global
      global: {
        label: "Leyendas del fútbol",
        emoji: "👑",
        words: [
          "Diego Maradona",
          "Pelé",
          "Zinedine Zidane",
          "Ronaldinho",
          "Ronaldo Nazário",
          "Johan Cruyff",
          "Franz Beckenbauer",
          "Paolo Maldini",
          "Xavi",
          "Andrés Iniesta",
          "Iker Casillas",
          "Gianluigi Buffon",
          "Andrea Pirlo",
          "Steven Gerrard",
          "Frank Lampard",
          "Thierry Henry",
          "Didier Drogba",
          "Wayne Rooney",
          "David Beckham",
          "Luis Suárez Miramontes",
          "Alessandro Del Piero",
          "Samuel Eto'o",
          "Kaká",
          "Carlos Valderrama",
          "George Weah",
          "Hristo Stoichkov",
          "Roberto Carlos",
          "Cafu",
          "Gabriel Batistuta",
          "Lothar Matthäus",
          "Michel Platini",
          "Ruud Gullit",
          "Marco van Basten",
          "Franco Baresi",
          "Roberto Baggio",
          "Francesco Totti",
          "Raúl González",
          "Rivaldo",
          "Romário",
          "Garrincha",
        ],
      },

      ligaArgentina: {
        label: "Leyendas argentinas",
        emoji: "🇦🇷👑",
        words: [
          "Juan Román Riquelme",
          "Ariel Ortega",
          "Marcelo Gallardo",
          "Gabriel Batistuta",
          "Oscar Ruggeri",
          "Fernando Gago",
          "Juan Sebastián Verón",
          "Esteban Cambiasso",
          "Pablo Aimar",
          "Hernán Crespo",
          "Claudio Caniggia",
          "Roberto Ayala",
          "Diego Milito",
          "Javier Saviola",
          "Sergio Goycochea",
          "Leandro Romagnoli",
          "Martín Palermo",
          "Rolando Schiavi",
          "Maxi Rodríguez",
          "Gonzalo Higuaín",
          "Lucho González",
          "Carlos Tevez",
          "Lisandro López",
          "Diego Simeone",
          "Matías Almeyda",
          "José Luis Félix Chilavert",
          "Andrés D'Alessandro",
          "Ernesto Farías",
          "Santiago Solari",
          "Ignacio Scocco",
          "Mario Kempes",
          "Daniel Passarella",
          "Ubaldo Fillol",
          "Ricardo Bochini",
          "Norberto Alonso",
          "Carlos Bianchi",
          "Enzo Francescoli",
          "Claudio López",
          "Walter Samuel",
          "Javier Zanetti",
        ],
      },

      premierLeague: {
        label: "Leyendas Premier League",
        emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿👑",
        words: [
          "Thierry Henry",
          "Dennis Bergkamp",
          "Ryan Giggs",
          "Paul Scholes",
          "Steven Gerrard",
          "Frank Lampard",
          "John Terry",
          "Petr Čech",
          "Didier Drogba",
          "Wayne Rooney",
          "Michael Owen",
          "Alan Shearer",
          "Patrick Vieira",
          "Rio Ferdinand",
          "Nemanja Vidić",
          "Ashley Cole",
          "Gary Neville",
          "David Beckham",
          "Sol Campbell",
          "Jamie Carragher",
          "Robin van Persie",
          "Yaya Touré",
          "Sergio Agüero",
          "Vincent Kompany",
          "Joe Hart",
          "Dimitar Berbatov",
          "Gareth Barry",
          "Carlos Tévez",
          "Nani",
          "Peter Schmeichel",
          "Eric Cantona",
          "Roy Keane",
          "Tony Adams",
          "Ian Wright",
          "Gianfranco Zola",
          "Matt Le Tissier",
          "Robbie Fowler",
          "Andy Cole",
          "Teddy Sheringham",
          "David Seaman",
        ],
      },

      brasileirao: {
        label: "Leyendas brasileñas",
        emoji: "🇧🇷👑",
        words: [
          "Pelé",
          "Ronaldinho",
          "Romário",
          "Rivaldo",
          "Bebeto",
          "Kaká",
          "Cafú",
          "Zico",
          "Dida",
          "Roberto Carlos",
          "Adriano",
          "Edmundo",
          "Taffarel",
          "Sócrates",
          "Garrincha",
          "Júnior",
          "Nilton Santos",
          "Careca",
          "Müller",
          "Amaral",
          "Alex",
          "Elano",
          "Emerson",
          "Fred",
          "Renato Gaúcho",
          "Edílson",
          "Juninho Pernambucano",
          "Ricardinho",
          "Leonardo",
          "Paulo Nunes",
          "Jairzinho",
          "Falcão",
          "Cerezo",
          "Toninho Cerezo",
          "Djalma Santos",
          "Carlos Alberto Torres",
          "Gerson",
          "Rivelino",
          "Tostão",
          "Vavá",
        ],
      },
    },
  },

  // ------------- EQUIPOS -------------
  equipos: {
    global: {
      label: "Equipos del mundo",
      emoji: "🌍🏆",
      words: [
        "Barcelona",
        "Real Madrid",
        "Manchester United",
        "Liverpool",
        "Bayern Múnich",
        "Juventus",
        "Paris Saint-Germain",
        "Chelsea",
        "Manchester City",
        "Arsenal",
        "Ajax",
        "Inter de Milán",
        "AC Milan",
        "Atlético de Madrid",
        "Borussia Dortmund",
        "Tottenham Hotspur",
        "Benfica",
        "Porto",
        "Sevilla",
        "Olympique de Marsella",
        "Flamengo",
        "Boca Juniors",
        "River Plate",
        "Santos FC",
        "Palmeiras",
        "Celtic",
        "Rangers",
        "Galatasaray",
        "Club América",
        "LA Galaxy",
        "Napoli",
        "AS Roma",
        "Lazio",
        "Fiorentina",
        "Atalanta",
        "Valencia",
        "Athletic Bilbao",
        "Real Sociedad",
        "Villarreal",
        "Real Betis",
      ],
    },

    argentina: {
      label: "Equipos argentinos",
      emoji: "🇦🇷⚽",
      words: [
        "River Plate",
        "Boca Juniors",
        "Racing Club",
        "Talleres",
        "Rosario Central",
        "Estudiantes",
        "Godoy Cruz",
        "Argentinos Juniors",
        "Independiente",
        "Vélez Sarsfield",
        "Huracán",
        "San Lorenzo",
        "Lanús",
        "Defensa y Justicia",
        "Platense",
        "Deportivo Riestra",
        "Barracas Central",
        "Instituto",
        "Belgrano",
        "Independiente Rivadavia",
        "Newell's Old Boys",
        "Atlético Tucumán",
        "Unión",
        "Tigre",
        "Central Córdoba",
        "Gimnasia",
        "Banfield",
        "Sarmiento",
        "Aldosivi",
        "San Martín de Tucumán",
        "Colón",
        "Arsenal de Sarandí",
        "Patronato",
        "Estudiantes de Río Cuarto",
        "Ferro Carril Oeste",
        "Chacarita Juniors",
        "Nueva Chicago",
        "All Boys",
        "Temperley",
        "Almirante Brown",
      ],
    },

    inglaterra: {
      label: "Equipos ingleses",
      emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿⚽",
      words: [
        "Manchester United",
        "Liverpool",
        "Arsenal",
        "Chelsea",
        "Manchester City",
        "Tottenham Hotspur",
        "Everton",
        "Aston Villa",
        "Newcastle United",
        "Leeds United",
        "Leicester City",
        "West Ham United",
        "Wolverhampton",
        "Nottingham Forest",
        "Crystal Palace",
        "Fulham",
        "Brighton",
        "Sheffield United",
        "Burnley",
        "Southampton",
        "Norwich City",
        "Watford",
        "Bournemouth",
        "Brentford",
        "Derby County",
        "Sunderland",
        "Middlesbrough",
        "Blackburn Rovers",
        "Stoke City",
        "Cardiff City",
        "Swansea City",
        "Hull City",
        "Queens Park Rangers",
        "Reading",
        "Birmingham City",
        "Coventry City",
        "Preston North End",
        "Blackpool",
        "Millwall",
        "Luton Town",
      ],
    },

    brasil: {
      label: "Equipos brasileños",
      emoji: "🇧🇷⚽",
      words: [
        "Flamengo",
        "Palmeiras",
        "Santos",
        "Corinthians",
        "São Paulo",
        "Grêmio",
        "Internacional",
        "Cruzeiro",
        "Atlético Mineiro",
        "Botafogo",
        "Vasco da Gama",
        "Fluminense",
        "Athletico Paranaense",
        "Bahia",
        "Fortaleza",
        "Ceará",
        "Sport Recife",
        "Chapecoense",
        "Goiás",
        "Red Bull Bragantino",
        "América Mineiro",
        "Coritiba",
        "Vitória",
        "Ponte Preta",
        "Figueirense",
        "Atlético Goianiense",
        "Avaí",
        "Criciúma",
        "Juventude",
        "Paysandu",
        "Náutico",
        "Santa Cruz",
        "ABC",
        "Sampaio Corrêa",
        "Vila Nova",
        "Guarani",
        "Operário",
        "CRB",
        "CSA",
        "Remo",
      ],
    },

    españa: {
      label: "Equipos españoles",
      emoji: "🇪🇸⚽",
      words: [
        "Real Madrid",
        "Barcelona",
        "Atlético de Madrid",
        "Sevilla",
        "Valencia",
        "Athletic Bilbao",
        "Real Sociedad",
        "Villarreal",
        "Real Betis",
        "Celta de Vigo",
        "Espanyol",
        "Getafe",
        "Osasuna",
        "Rayo Vallecano",
        "Mallorca",
        "Cádiz",
        "Elche",
        "Alavés",
        "Granada",
        "Levante",
        "Deportivo La Coruña",
        "Real Zaragoza",
        "Sporting Gijón",
        "Real Oviedo",
        "Málaga",
        "Las Palmas",
        "Tenerife",
        "Albacete",
        "Burgos",
        "Cartagena",
        "Eibar",
        "Girona",
        "Huesca",
        "Leganés",
        "Lugo",
        "Mirandés",
        "Ponferradina",
        "Real Valladolid",
        "Almería",
        "Racing Santander",
      ],
    },

    italia: {
      label: "Equipos italianos",
      emoji: "🇮🇹⚽",
      words: [
        "Juventus",
        "AC Milan",
        "Inter de Milán",
        "Napoli",
        "AS Roma",
        "Lazio",
        "Atalanta",
        "Fiorentina",
        "Torino",
        "Bologna",
        "Sassuolo",
        "Udinese",
        "Sampdoria",
        "Genoa",
        "Cagliari",
        "Spezia",
        "Venezia",
        "Salernitana",
        "Empoli",
        "Verona",
        "Parma",
        "Brescia",
        "Lecce",
        "Crotone",
        "Benevento",
        "SPAL",
        "Frosinone",
        "Chievo",
        "Palermo",
        "Catania",
        "Bari",
        "Reggina",
        "Livorno",
        "Pescara",
        "Ascoli",
        "Cittadella",
        "Cremonese",
        "Pisa",
        "Monza",
        "Como",
      ],
    },
  },

  // ------------- SELECCIONES -------------
  selecciones: {
    mundial: {
      label: "Selecciones mundialistas",
      emoji: "🏆🌍",
      words: [
        "Argentina",
        "Brasil",
        "Francia",
        "Alemania",
        "España",
        "Italia",
        "Inglaterra",
        "Portugal",
        "Países Bajos",
        "Bélgica",
        "Croacia",
        "Uruguay",
        "Colombia",
        "México",
        "Estados Unidos",
        "Marruecos",
        "Senegal",
        "Ghana",
        "Nigeria",
        "Japón",
        "Corea del Sur",
        "Australia",
        "Polonia",
        "Dinamarca",
        "Suecia",
        "Noruega",
        "Suiza",
        "Austria",
        "República Checa",
        "Ucrania",
        "Rusia",
        "Serbia",
        "Túnez",
        "Argelia",
        "Egipto",
        "Camerún",
        "Costa de Marfil",
        "Sudáfrica",
        "Ecuador",
        "Perú",
      ],
    },

    sudamerica: {
      label: "Selecciones sudamericanas",
      emoji: "🇦🇷🇧🇷🇺🇾",
      words: [
        "Argentina",
        "Brasil",
        "Uruguay",
        "Colombia",
        "Chile",
        "Perú",
        "Ecuador",
        "Paraguay",
        "Bolivia",
        "Venezuela",
        "Guyana",
        "Surinam",
        "Guayana Francesa",
      ],
    },

    europa: {
      label: "Selecciones europeas",
      emoji: "🇪🇺⚽",
      words: [
        "Francia",
        "Alemania",
        "España",
        "Italia",
        "Inglaterra",
        "Portugal",
        "Países Bajos",
        "Bélgica",
        "Croacia",
        "Polonia",
        "Dinamarca",
        "Suecia",
        "Noruega",
        "Suiza",
        "Austria",
        "República Checa",
        "Ucrania",
        "Rusia",
        "Serbia",
        "Grecia",
        "Turquía",
        "Rumania",
        "Bulgaria",
        "Hungría",
        "Eslovaquia",
        "Eslovenia",
        "Finlandia",
        "Irlanda",
        "Escocia",
        "Gales",
        "Islandia",
        "Bosnia",
        "Montenegro",
        "Macedonia del Norte",
        "Albania",
        "Kosovo",
        "Moldavia",
        "Estonia",
        "Letonia",
        "Lituania",
      ],
    },
  },

  // ------------- COMPETICIONES -------------
  competiciones: {
    internacionales: {
      label: "Competiciones internacionales",
      emoji: "🏆🌍",
      words: [
        "Copa del Mundo",
        "Eurocopa",
        "Copa América",
        "Champions League",
        "Europa League",
        "Conference League",
        "Copa Libertadores",
        "Copa Sudamericana",
        "Recopa Sudamericana",
        "Mundial de Clubes",
        "Supercopa de Europa",
        "Copa Intercontinental",
        "Copa de la UEFA",
        "Recopa de Europa",
        "Copa Intertoto",
        "Copa de Campeones",
        "Copa de Ferias",
        "Copa Anglo-Italiana",
        "Copa Mitropa",
        "Copa de los Balcanes",
        "Copa Africana de Naciones",
        "Copa Asiática",
        "Copa de Oro CONCACAF",
        "Copa de las Naciones OFC",
        "Juegos Olímpicos",
        "Mundial Sub-20",
        "Mundial Sub-17",
        "Eurocopa Sub-21",
        "Copa América Sub-20",
        "Sudamericano Sub-17",
        "Copa Confederaciones",
        "Nations League",
        "Finalissima",
        "Copa de Campeones CONCACAF",
        "Liga de Campeones AFC",
        "Liga de Campeones CAF",
        "Liga de Campeones OFC",
        "Copa Suruga Bank",
        "Copa J.League",
        "Trofeo Joan Gamper",
      ],
    },

    argentina: {
      label: "Competiciones argentinas",
      emoji: "🇦🇷🏆",
      words: [
        "Liga Profesional",
        "Copa Argentina",
        "Supercopa Argentina",
        "Trofeo de Campeones",
        "Copa de la Liga",
        "Torneo Apertura",
        "Torneo Clausura",
        "Copa Diego Maradona",
        "Copa de la Superliga",
        "Primera División",
        "Primera Nacional",
        "Primera B",
        "Primera C",
        "Primera D",
        "Torneo Federal A",
        "Torneo Federal B",
        "Torneo Regional Federal Amateur",
        "Copa Centenario",
        "Copa Bicentenario",
        "Copa Presidente de la Nación",
        "Copa Challenger",
        "Supercopa Internacional",
        "Copa de Oro",
        "Copa de Honor",
        "Copa Competencia",
        "Copa Aldao",
        "Copa Escobar-Gerona",
        "Copa Ibarguren",
        "Copa Dr. Carlos Ibarguren",
        "Copa Tie Break",
        "Copa de Campeones",
        "Copa Centenario AFA",
        "Copa Jockey Club",
        "Copa de Competencia Jockey Club",
        "Copa Estímulo",
        "Copa de Honor Municipalidad de Buenos Aires",
        "Copa de Honor Cousenier",
        "Copa Beccar Varela",
        "Copa Bullrich",
        "Copa Círculo de Armas",
      ],
    },
  },

  // ------------- ESTADIOS -------------
  estadios: {
    iconicos: {
      label: "Estadios icónicos",
      emoji: "🏟️⚽",
      words: [
        "Maracaná",
        "La Bombonera",
        "El Monumental",
        "Wembley",
        "Santiago Bernabéu",
        "Camp Nou",
        "San Siro",
        "Allianz Arena",
        "Old Trafford",
        "Anfield",
        "Emirates Stadium",
        "Stamford Bridge",
        "Signal Iduna Park",
        "Parc des Princes",
        "Juventus Stadium",
        "Estadio Olímpico",
        "Azteca",
        "La Bombonera",
        "Cilindro de Avellaneda",
        "El Gasómetro",
        "Libertadores de América",
        "José Amalfitani",
        "Tomás Adolfo Ducó",
        "Pedro Bidegain",
        "Néstor Díaz Pérez",
        "Ciudad de La Plata",
        "Mario Alberto Kempes",
        "Malvinas Argentinas",
        "15 de Abril",
        "Marcelo Bielsa",
        "Presidente Perón",
        "Eva Perón",
        "Antonio Vespucio Liberti",
        "Alberto J. Armando",
        "Juan Domingo Perón",
        "Diego Armando Maradona",
        "Único Madre de Ciudades",
        "Brigadier General Estanislao López",
        "Gigante de Arroyito",
        "Coloso del Parque",
      ],
    },

    argentina: {
      label: "Estadios argentinos",
      emoji: "🇦🇷🏟️",
      words: [
        "La Bombonera",
        "El Monumental",
        "Cilindro de Avellaneda",
        "El Gasómetro",
        "Libertadores de América",
        "José Amalfitani",
        "Tomás Adolfo Ducó",
        "Pedro Bidegain",
        "Néstor Díaz Pérez",
        "Ciudad de La Plata",
        "Mario Alberto Kempes",
        "Malvinas Argentinas",
        "15 de Abril",
        "Marcelo Bielsa",
        "Presidente Perón",
        "Eva Perón",
        "Gigante de Arroyito",
        "Coloso del Parque",
        "Brigadier General Estanislao López",
        "Único Madre de Ciudades",
        "Diego Armando Maradona",
        "Juan Domingo Perón",
        "Estadio Mundialista",
        "Estadio del Bicentenario",
        "Estadio Malvinas Argentinas",
        "Estadio San Juan del Bicentenario",
        "Estadio Padre Ernesto Martearena",
        "Estadio La Boutique",
        "Estadio Centenario",
        "Estadio Alfredo Beranger",
        "Estadio Julio César Villagra",
        "Estadio Roberto Carminatti",
        "Estadio Presbítero Bartolomé Grella",
        "Estadio Feliciano Gambarte",
        "Estadio Miguel Morales",
        "Estadio Bautista Gargantini",
        "Estadio Carlos Augusto Mercado Luna",
        "Estadio Monumental José Fierro",
        "Estadio Nuevo Francisco Urbano",
        "Estadio Lucio Fariña Zeballos",
      ],
    },
  },
}
