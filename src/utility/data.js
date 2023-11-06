import { MdOutlineSettings, MdShoppingBag } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";

export const dropdownData = [
    {
        id: 1,
        title: "Orders",
        icon: MdShoppingBag,
        action: "handleOrders",
    },
    {
        id: 2,
        title: "Address",
        icon: FaRegAddressCard,
        action: "handleAddress",
    },
    {
        id: 3,
        title: "Settings",
        icon: MdOutlineSettings,
        action: "handleSettings",
    },
    {
        id: 4,
        title: "Logout",
        icon: IoLogOut,
        action: "handleLogout",
    },
];

export const stateProvince = [
    {
        "name": "Alabama",
        "abbreviation": "AL"
    },
    {
        "name": "Alaska",
        "abbreviation": "AK"
    },
    {
        "name": "American Samoa",
        "abbreviation": "AS"
    },
    {
        "name": "Arizona",
        "abbreviation": "AZ"
    },
    {
        "name": "Arkansas",
        "abbreviation": "AR"
    },
    {
        "name": "California",
        "abbreviation": "CA"
    },
    {
        "name": "Colorado",
        "abbreviation": "CO"
    },
    {
        "name": "Connecticut",
        "abbreviation": "CT"
    },
    {
        "name": "Delaware",
        "abbreviation": "DE"
    },
    {
        "name": "District Of Columbia",
        "abbreviation": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "abbreviation": "FM"
    },
    {
        "name": "Florida",
        "abbreviation": "FL"
    },
    {
        "name": "Georgia",
        "abbreviation": "GA"
    },
    {
        "name": "Guam",
        "abbreviation": "GU"
    },
    {
        "name": "Hawaii",
        "abbreviation": "HI"
    },
    {
        "name": "Idaho",
        "abbreviation": "ID"
    },
    {
        "name": "Illinois",
        "abbreviation": "IL"
    },
    {
        "name": "Indiana",
        "abbreviation": "IN"
    },
    {
        "name": "Iowa",
        "abbreviation": "IA"
    },
    {
        "name": "Kansas",
        "abbreviation": "KS"
    },
    {
        "name": "Kentucky",
        "abbreviation": "KY"
    },
    {
        "name": "Louisiana",
        "abbreviation": "LA"
    },
    {
        "name": "Maine",
        "abbreviation": "ME"
    },
    {
        "name": "Marshall Islands",
        "abbreviation": "MH"
    },
    {
        "name": "Maryland",
        "abbreviation": "MD"
    },
    {
        "name": "Massachusetts",
        "abbreviation": "MA"
    },
    {
        "name": "Michigan",
        "abbreviation": "MI"
    },
    {
        "name": "Minnesota",
        "abbreviation": "MN"
    },
    {
        "name": "Mississippi",
        "abbreviation": "MS"
    },
    {
        "name": "Missouri",
        "abbreviation": "MO"
    },
    {
        "name": "Montana",
        "abbreviation": "MT"
    },
    {
        "name": "Nebraska",
        "abbreviation": "NE"
    },
    {
        "name": "Nevada",
        "abbreviation": "NV"
    },
    {
        "name": "New Hampshire",
        "abbreviation": "NH"
    },
    {
        "name": "New Jersey",
        "abbreviation": "NJ"
    },
    {
        "name": "New Mexico",
        "abbreviation": "NM"
    },
    {
        "name": "New York",
        "abbreviation": "NY"
    },
    {
        "name": "North Carolina",
        "abbreviation": "NC"
    },
    {
        "name": "North Dakota",
        "abbreviation": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "abbreviation": "MP"
    },
    {
        "name": "Ohio",
        "abbreviation": "OH"
    },
    {
        "name": "Oklahoma",
        "abbreviation": "OK"
    },
    {
        "name": "Oregon",
        "abbreviation": "OR"
    },
    {
        "name": "Palau",
        "abbreviation": "PW"
    },
    {
        "name": "Pennsylvania",
        "abbreviation": "PA"
    },
    {
        "name": "Puerto Rico",
        "abbreviation": "PR"
    },
    {
        "name": "Rhode Island",
        "abbreviation": "RI"
    },
    {
        "name": "South Carolina",
        "abbreviation": "SC"
    },
    {
        "name": "South Dakota",
        "abbreviation": "SD"
    },
    {
        "name": "Tennessee",
        "abbreviation": "TN"
    },
    {
        "name": "Texas",
        "abbreviation": "TX"
    },
    {
        "name": "Utah",
        "abbreviation": "UT"
    },
    {
        "name": "Vermont",
        "abbreviation": "VT"
    },
    {
        "name": "Virgin Islands",
        "abbreviation": "VI"
    },
    {
        "name": "Virginia",
        "abbreviation": "VA"
    },
    {
        "name": "Washington",
        "abbreviation": "WA"
    },
    {
        "name": "West Virginia",
        "abbreviation": "WV"
    },
    {
        "name": "Wisconsin",
        "abbreviation": "WI"
    },
    {
        "name": "Wyoming",
        "abbreviation": "WY"
    }
]

export const stateCities = {
    "New York": [
        "New York",
        "Buffalo",
        "Rochester",
        "Yonkers",
        "Syracuse",
        "Albany",
        "New Rochelle",
        "Mount Vernon",
        "Schenectady",
        "Utica",
        "White Plains",
        "Hempstead",
        "Troy",
        "Niagara Falls",
        "Binghamton",
        "Freeport",
        "Valley Stream"
    ],
    "California": [
        "Los Angeles",
        "San Diego",
        "San Jose",
        "San Francisco",
        "Fresno",
        "Sacramento",
        "Long Beach",
        "Oakland",
        "Bakersfield",
        "Anaheim",
        "Santa Ana",
        "Riverside",
        "Stockton",
        "Chula Vista",
        "Irvine",
        "Fremont",
        "San Bernardino",
        "Modesto",
        "Fontana",
        "Oxnard",
        "Moreno Valley",
        "Huntington Beach",
        "Glendale",
        "Santa Clarita",
        "Garden Grove",
        "Oceanside",
        "Rancho Cucamonga",
        "Santa Rosa",
        "Ontario",
        "Lancaster",
        "Elk Grove",
        "Corona",
        "Palmdale",
        "Salinas",
        "Pomona",
        "Hayward",
        "Escondido",
        "Torrance",
        "Sunnyvale",
        "Orange",
        "Fullerton",
        "Pasadena",
        "Thousand Oaks",
        "Visalia",
        "Simi Valley",
        "Concord",
        "Roseville",
        "Victorville",
        "Santa Clara",
        "Vallejo",
        "Berkeley",
        "El Monte",
        "Downey",
        "Costa Mesa",
        "Inglewood",
        "Carlsbad",
        "San Buenaventura (Ventura)",
        "Fairfield",
        "West Covina",
        "Murrieta",
        "Richmond",
        "Norwalk",
        "Antioch",
        "Temecula",
        "Burbank",
        "Daly City",
        "Rialto",
        "Santa Maria",
        "El Cajon",
        "San Mateo",
        "Clovis",
        "Compton",
        "Jurupa Valley",
        "Vista",
        "South Gate",
        "Mission Viejo",
        "Vacaville",
        "Carson",
        "Hesperia",
        "Santa Monica",
        "Westminster",
        "Redding",
        "Santa Barbara",
        "Chico",
        "Newport Beach",
        "San Leandro",
        "San Marcos",
        "Whittier",
        "Hawthorne",
        "Citrus Heights",
        "Tracy",
        "Alhambra",
        "Livermore",
        "Buena Park",
        "Menifee",
        "Hemet",
        "Lakewood",
        "Merced",
        "Chino",
        "Indio",
        "Redwood City",
        "Lake Forest",
        "Napa",
        "Tustin",
        "Bellflower",
        "Mountain View",
        "Chino Hills",
        "Baldwin Park",
        "Alameda",
        "Upland",
        "San Ramon",
        "Folsom",
        "Pleasanton",
        "Union City",
        "Perris",
        "Manteca",
        "Lynwood",
        "Apple Valley",
        "Redlands",
        "Turlock",
        "Milpitas",
        "Redondo Beach",
        "Rancho Cordova",
        "Yorba Linda",
        "Palo Alto",
        "Davis",
        "Camarillo",
        "Walnut Creek",
        "Pittsburg",
        "South San Francisco",
        "Yuba City",
        "San Clemente",
        "Laguna Niguel",
        "Pico Rivera",
        "Montebello",
        "Lodi",
        "Madera",
        "Santa Cruz",
        "La Habra",
        "Encinitas",
        "Monterey Park",
        "Tulare",
        "Cupertino",
        "Gardena",
        "National City",
        "Rocklin",
        "Petaluma",
        "Huntington Park",
        "San Rafael",
        "La Mesa",
        "Arcadia",
        "Fountain Valley",
        "Diamond Bar",
        "Woodland",
        "Santee",
        "Lake Elsinore",
        "Porterville",
        "Paramount",
        "Eastvale",
        "Rosemead",
        "Hanford",
        "Highland",
        "Brentwood",
        "Novato",
        "Colton",
        "Cathedral City",
        "Delano",
        "Yucaipa",
        "Watsonville",
        "Placentia",
        "Glendora",
        "Gilroy",
        "Palm Desert",
        "Cerritos",
        "West Sacramento",
        "Aliso Viejo",
        "Poway",
        "La Mirada",
        "Rancho Santa Margarita",
        "Cypress",
        "Dublin",
        "Covina",
        "Azusa",
        "Palm Springs",
        "San Luis Obispo",
        "Ceres",
        "San Jacinto",
        "Lincoln",
        "Newark",
        "Lompoc",
        "El Centro",
        "Danville",
        "Bell Gardens",
        "Coachella",
        "Rancho Palos Verdes",
        "San Bruno",
        "Rohnert Park",
        "Brea",
        "La Puente",
        "Campbell",
        "San Gabriel",
        "Beaumont",
        "Morgan Hill",
        "Culver City",
        "Calexico",
        "Stanton",
        "La Quinta",
        "Pacifica",
        "Montclair",
        "Oakley",
        "Monrovia",
        "Los Banos",
        "Martinez"
    ],
    "Illinois": [
        "Chicago",
        "Aurora",
        "Rockford",
        "Joliet",
        "Naperville",
        "Springfield",
        "Peoria",
        "Elgin",
        "Waukegan",
        "Cicero",
        "Champaign",
        "Bloomington",
        "Arlington Heights",
        "Evanston",
        "Decatur",
        "Schaumburg",
        "Bolingbrook",
        "Palatine",
        "Skokie",
        "Des Plaines",
        "Orland Park",
        "Tinley Park",
        "Oak Lawn",
        "Berwyn",
        "Mount Prospect",
        "Normal",
        "Wheaton",
        "Hoffman Estates",
        "Oak Park",
        "Downers Grove",
        "Elmhurst",
        "Glenview",
        "DeKalb",
        "Lombard",
        "Belleville",
        "Moline",
        "Buffalo Grove",
        "Bartlett",
        "Urbana",
        "Quincy",
        "Crystal Lake",
        "Plainfield",
        "Streamwood",
        "Carol Stream",
        "Romeoville",
        "Rock Island",
        "Hanover Park",
        "Carpentersville",
        "Wheeling",
        "Park Ridge",
        "Addison",
        "Calumet City"
    ],
    "Texas": [
        "Houston",
        "San Antonio",
        "Dallas",
        "Austin",
        "Fort Worth",
        "El Paso",
        "Arlington",
        "Corpus Christi",
        "Plano",
        "Laredo",
        "Lubbock",
        "Garland",
        "Irving",
        "Amarillo",
        "Grand Prairie",
        "Brownsville",
        "Pasadena",
        "McKinney",
        "Mesquite",
        "McAllen",
        "Killeen",
        "Frisco",
        "Waco",
        "Carrollton",
        "Denton",
        "Midland",
        "Abilene",
        "Beaumont",
        "Round Rock",
        "Odessa",
        "Wichita Falls",
        "Richardson",
        "Lewisville",
        "Tyler",
        "College Station",
        "Pearland",
        "San Angelo",
        "Allen",
        "League City",
        "Sugar Land",
        "Longview",
        "Edinburg",
        "Mission",
        "Bryan",
        "Baytown",
        "Pharr",
        "Temple",
        "Missouri City",
        "Flower Mound",
        "Harlingen",
        "North Richland Hills",
        "Victoria",
        "Conroe",
        "New Braunfels",
        "Mansfield",
        "Cedar Park",
        "Rowlett",
        "Port Arthur",
        "Euless",
        "Georgetown",
        "Pflugerville",
        "DeSoto",
        "San Marcos",
        "Grapevine",
        "Bedford",
        "Galveston",
        "Cedar Hill",
        "Texas City",
        "Wylie",
        "Haltom City",
        "Keller",
        "Coppell",
        "Rockwall",
        "Huntsville",
        "Duncanville",
        "Sherman",
        "The Colony",
        "Burleson",
        "Hurst",
        "Lancaster",
        "Texarkana",
        "Friendswood",
        "Weslaco"
    ],
    "Pennsylvania": [
        "Philadelphia",
        "Pittsburgh",
        "Allentown",
        "Erie",
        "Reading",
        "Scranton",
        "Bethlehem",
        "Lancaster",
        "Harrisburg",
        "Altoona",
        "York",
        "State College",
        "Wilkes-Barre"
    ],
    "Arizona": [
        "Phoenix",
        "Tucson",
        "Mesa",
        "Chandler",
        "Glendale",
        "Scottsdale",
        "Gilbert",
        "Tempe",
        "Peoria",
        "Surprise",
        "Yuma",
        "Avondale",
        "Goodyear",
        "Flagstaff",
        "Buckeye",
        "Lake Havasu City",
        "Casa Grande",
        "Sierra Vista",
        "Maricopa",
        "Oro Valley",
        "Prescott",
        "Bullhead City",
        "Prescott Valley",
        "Marana",
        "Apache Junction"
    ],
    "Florida": [
        "Jacksonville",
        "Miami",
        "Tampa",
        "Orlando",
        "St. Petersburg",
        "Hialeah",
        "Tallahassee",
        "Fort Lauderdale",
        "Port St. Lucie",
        "Cape Coral",
        "Pembroke Pines",
        "Hollywood",
        "Miramar",
        "Gainesville",
        "Coral Springs",
        "Miami Gardens",
        "Clearwater",
        "Palm Bay",
        "Pompano Beach",
        "West Palm Beach",
        "Lakeland",
        "Davie",
        "Miami Beach",
        "Sunrise",
        "Plantation",
        "Boca Raton",
        "Deltona",
        "Largo",
        "Deerfield Beach",
        "Palm Coast",
        "Melbourne",
        "Boynton Beach",
        "Lauderhill",
        "Weston",
        "Fort Myers",
        "Kissimmee",
        "Homestead",
        "Tamarac",
        "Delray Beach",
        "Daytona Beach",
        "North Miami",
        "Wellington",
        "North Port",
        "Jupiter",
        "Ocala",
        "Port Orange",
        "Margate",
        "Coconut Creek",
        "Sanford",
        "Sarasota",
        "Pensacola",
        "Bradenton",
        "Palm Beach Gardens",
        "Pinellas Park",
        "Coral Gables",
        "Doral",
        "Bonita Springs",
        "Apopka",
        "Titusville",
        "North Miami Beach",
        "Oakland Park",
        "Fort Pierce",
        "North Lauderdale",
        "Cutler Bay",
        "Altamonte Springs",
        "St. Cloud",
        "Greenacres",
        "Ormond Beach",
        "Ocoee",
        "Hallandale Beach",
        "Winter Garden",
        "Aventura"
    ],
    "Indiana": [
        "Indianapolis",
        "Fort Wayne",
        "Evansville",
        "South Bend",
        "Carmel",
        "Bloomington",
        "Fishers",
        "Hammond",
        "Gary",
        "Muncie",
        "Lafayette",
        "Terre Haute",
        "Kokomo",
        "Anderson",
        "Noblesville",
        "Greenwood",
        "Elkhart",
        "Mishawaka",
        "Lawrence",
        "Jeffersonville",
        "Columbus",
        "Portage"
    ],
    "Ohio": [
        "Columbus",
        "Cleveland",
        "Cincinnati",
        "Toledo",
        "Akron",
        "Dayton",
        "Parma",
        "Canton",
        "Youngstown",
        "Lorain",
        "Hamilton",
        "Springfield",
        "Kettering",
        "Elyria",
        "Lakewood",
        "Cuyahoga Falls",
        "Middletown",
        "Euclid",
        "Newark",
        "Mansfield",
        "Mentor",
        "Beavercreek",
        "Cleveland Heights",
        "Strongsville",
        "Dublin",
        "Fairfield",
        "Findlay",
        "Warren",
        "Lancaster",
        "Lima",
        "Huber Heights",
        "Westerville",
        "Marion",
        "Grove City"
    ],
    "North Carolina": [
        "Charlotte",
        "Raleigh",
        "Greensboro",
        "Durham",
        "Winston-Salem",
        "Fayetteville",
        "Cary",
        "Wilmington",
        "High Point",
        "Greenville",
        "Asheville",
        "Concord",
        "Gastonia",
        "Jacksonville",
        "Chapel Hill",
        "Rocky Mount",
        "Burlington",
        "Wilson",
        "Huntersville",
        "Kannapolis",
        "Apex",
        "Hickory",
        "Goldsboro"
    ],
    "Michigan": [
        "Detroit",
        "Grand Rapids",
        "Warren",
        "Sterling Heights",
        "Ann Arbor",
        "Lansing",
        "Flint",
        "Dearborn",
        "Livonia",
        "Westland",
        "Troy",
        "Farmington Hills",
        "Kalamazoo",
        "Wyoming",
        "Southfield",
        "Rochester Hills",
        "Taylor",
        "Pontiac",
        "St. Clair Shores",
        "Royal Oak",
        "Novi",
        "Dearborn Heights",
        "Battle Creek",
        "Saginaw",
        "Kentwood",
        "East Lansing",
        "Roseville",
        "Portage",
        "Midland",
        "Lincoln Park",
        "Muskegon"
    ],
    "Tennessee": [
        "Memphis",
        "Nashville-Davidson",
        "Knoxville",
        "Chattanooga",
        "Clarksville",
        "Murfreesboro",
        "Jackson",
        "Franklin",
        "Johnson City",
        "Bartlett",
        "Hendersonville",
        "Kingsport",
        "Collierville",
        "Cleveland",
        "Smyrna",
        "Germantown",
        "Brentwood"
    ],
    "Massachusetts": [
        "Boston",
        "Worcester",
        "Springfield",
        "Lowell",
        "Cambridge",
        "New Bedford",
        "Brockton",
        "Quincy",
        "Lynn",
        "Fall River",
        "Newton",
        "Lawrence",
        "Somerville",
        "Waltham",
        "Haverhill",
        "Malden",
        "Medford",
        "Taunton",
        "Chicopee",
        "Weymouth Town",
        "Revere",
        "Peabody",
        "Methuen",
        "Barnstable Town",
        "Pittsfield",
        "Attleboro",
        "Everett",
        "Salem",
        "Westfield",
        "Leominster",
        "Fitchburg",
        "Beverly",
        "Holyoke",
        "Marlborough",
        "Woburn",
        "Chelsea"
    ],
    "Washington": [
        "Seattle",
        "Spokane",
        "Tacoma",
        "Vancouver",
        "Bellevue",
        "Kent",
        "Everett",
        "Renton",
        "Yakima",
        "Federal Way",
        "Spokane Valley",
        "Bellingham",
        "Kennewick",
        "Auburn",
        "Pasco",
        "Marysville",
        "Lakewood",
        "Redmond",
        "Shoreline",
        "Richland",
        "Kirkland",
        "Burien",
        "Sammamish",
        "Olympia",
        "Lacey",
        "Edmonds",
        "Bremerton",
        "Puyallup"
    ],
    "Colorado": [
        "Denver",
        "Colorado Springs",
        "Aurora",
        "Fort Collins",
        "Lakewood",
        "Thornton",
        "Arvada",
        "Westminster",
        "Pueblo",
        "Centennial",
        "Boulder",
        "Greeley",
        "Longmont",
        "Loveland",
        "Grand Junction",
        "Broomfield",
        "Castle Rock",
        "Commerce City",
        "Parker",
        "Littleton",
        "Northglenn"
    ],
    "District of Columbia": [
        "Washington"
    ],
    "Maryland": [
        "Baltimore",
        "Frederick",
        "Rockville",
        "Gaithersburg",
        "Bowie",
        "Hagerstown",
        "Annapolis"
    ],
    "Kentucky": [
        "Louisville/Jefferson County",
        "Lexington-Fayette",
        "Bowling Green",
        "Owensboro",
        "Covington"
    ],
    "Oregon": [
        "Portland",
        "Eugene",
        "Salem",
        "Gresham",
        "Hillsboro",
        "Beaverton",
        "Bend",
        "Medford",
        "Springfield",
        "Corvallis",
        "Albany",
        "Tigard",
        "Lake Oswego",
        "Keizer"
    ],
    "Oklahoma": [
        "Oklahoma City",
        "Tulsa",
        "Norman",
        "Broken Arrow",
        "Lawton",
        "Edmond",
        "Moore",
        "Midwest City",
        "Enid",
        "Stillwater",
        "Muskogee"
    ],
    "Wisconsin": [
        "Milwaukee",
        "Madison",
        "Green Bay",
        "Kenosha",
        "Racine",
        "Appleton",
        "Waukesha",
        "Eau Claire",
        "Oshkosh",
        "Janesville",
        "West Allis",
        "La Crosse",
        "Sheboygan",
        "Wauwatosa",
        "Fond du Lac",
        "New Berlin",
        "Wausau",
        "Brookfield",
        "Greenfield",
        "Beloit"
    ],
    "Nevada": [
        "Las Vegas",
        "Henderson",
        "Reno",
        "North Las Vegas",
        "Sparks",
        "Carson City"
    ],
    "New Mexico": [
        "Albuquerque",
        "Las Cruces",
        "Rio Rancho",
        "Santa Fe",
        "Roswell",
        "Farmington",
        "Clovis"
    ],
    "Missouri": [
        "Kansas City",
        "St. Louis",
        "Springfield",
        "Independence",
        "Columbia",
        "Lee's Summit",
        "O'Fallon",
        "St. Joseph",
        "St. Charles",
        "St. Peters",
        "Blue Springs",
        "Florissant",
        "Joplin",
        "Chesterfield",
        "Jefferson City",
        "Cape Girardeau"
    ],
    "Virginia": [
        "Virginia Beach",
        "Norfolk",
        "Chesapeake",
        "Richmond",
        "Newport News",
        "Alexandria",
        "Hampton",
        "Roanoke",
        "Portsmouth",
        "Suffolk",
        "Lynchburg",
        "Harrisonburg",
        "Leesburg",
        "Charlottesville",
        "Danville",
        "Blacksburg",
        "Manassas"
    ],
    "Georgia": [
        "Atlanta",
        "Columbus",
        "Augusta-Richmond County",
        "Savannah",
        "Athens-Clarke County",
        "Sandy Springs",
        "Roswell",
        "Macon",
        "Johns Creek",
        "Albany",
        "Warner Robins",
        "Alpharetta",
        "Marietta",
        "Valdosta",
        "Smyrna",
        "Dunwoody"
    ],
    "Nebraska": [
        "Omaha",
        "Lincoln",
        "Bellevue",
        "Grand Island"
    ],
    "Minnesota": [
        "Minneapolis",
        "St. Paul",
        "Rochester",
        "Duluth",
        "Bloomington",
        "Brooklyn Park",
        "Plymouth",
        "St. Cloud",
        "Eagan",
        "Woodbury",
        "Maple Grove",
        "Eden Prairie",
        "Coon Rapids",
        "Burnsville",
        "Blaine",
        "Lakeville",
        "Minnetonka",
        "Apple Valley",
        "Edina",
        "St. Louis Park",
        "Mankato",
        "Maplewood",
        "Moorhead",
        "Shakopee"
    ],
    "Kansas": [
        "Wichita",
        "Overland Park",
        "Kansas City",
        "Olathe",
        "Topeka",
        "Lawrence",
        "Shawnee",
        "Manhattan",
        "Lenexa",
        "Salina",
        "Hutchinson"
    ],
    "Louisiana": [
        "New Orleans",
        "Baton Rouge",
        "Shreveport",
        "Lafayette",
        "Lake Charles",
        "Kenner",
        "Bossier City",
        "Monroe",
        "Alexandria"
    ],
    "Hawaii": [
        "Honolulu"
    ],
    "Alaska": [
        "Anchorage"
    ],
    "New Jersey": [
        "Newark",
        "Jersey City",
        "Paterson",
        "Elizabeth",
        "Clifton",
        "Trenton",
        "Camden",
        "Passaic",
        "Union City",
        "Bayonne",
        "East Orange",
        "Vineland",
        "New Brunswick",
        "Hoboken",
        "Perth Amboy",
        "West New York",
        "Plainfield",
        "Hackensack",
        "Sayreville",
        "Kearny",
        "Linden",
        "Atlantic City"
    ],
    "Idaho": [
        "Boise City",
        "Nampa",
        "Meridian",
        "Idaho Falls",
        "Pocatello",
        "Caldwell",
        "Coeur d'Alene",
        "Twin Falls"
    ],
    "Alabama": [
        "Birmingham",
        "Montgomery",
        "Mobile",
        "Huntsville",
        "Tuscaloosa",
        "Hoover",
        "Dothan",
        "Auburn",
        "Decatur",
        "Madison",
        "Florence",
        "Gadsden"
    ],
    "Iowa": [
        "Des Moines",
        "Cedar Rapids",
        "Davenport",
        "Sioux City",
        "Iowa City",
        "Waterloo",
        "Council Bluffs",
        "Ames",
        "West Des Moines",
        "Dubuque",
        "Ankeny",
        "Urbandale",
        "Cedar Falls"
    ],
    "Arkansas": [
        "Little Rock",
        "Fort Smith",
        "Fayetteville",
        "Springdale",
        "Jonesboro",
        "North Little Rock",
        "Conway",
        "Rogers",
        "Pine Bluff",
        "Bentonville"
    ],
    "Utah": [
        "Salt Lake City",
        "West Valley City",
        "Provo",
        "West Jordan",
        "Orem",
        "Sandy",
        "Ogden",
        "St. George",
        "Layton",
        "Taylorsville",
        "South Jordan",
        "Lehi",
        "Logan",
        "Murray",
        "Draper",
        "Bountiful",
        "Riverton",
        "Roy"
    ],
    "Rhode Island": [
        "Providence",
        "Warwick",
        "Cranston",
        "Pawtucket",
        "East Providence",
        "Woonsocket"
    ],
    "Mississippi": [
        "Jackson",
        "Gulfport",
        "Southaven",
        "Hattiesburg",
        "Biloxi",
        "Meridian"
    ],
    "South Dakota": [
        "Sioux Falls",
        "Rapid City"
    ],
    "Connecticut": [
        "Bridgeport",
        "New Haven",
        "Stamford",
        "Hartford",
        "Waterbury",
        "Norwalk",
        "Danbury",
        "New Britain",
        "Meriden",
        "Bristol",
        "West Haven",
        "Milford",
        "Middletown",
        "Norwich",
        "Shelton"
    ],
    "South Carolina": [
        "Columbia",
        "Charleston",
        "North Charleston",
        "Mount Pleasant",
        "Rock Hill",
        "Greenville",
        "Summerville",
        "Sumter",
        "Goose Creek",
        "Hilton Head Island",
        "Florence",
        "Spartanburg"
    ],
    "New Hampshire": [
        "Manchester",
        "Nashua",
        "Concord"
    ],
    "North Dakota": [
        "Fargo",
        "Bismarck",
        "Grand Forks",
        "Minot"
    ],
    "Montana": [
        "Billings",
        "Missoula",
        "Great Falls",
        "Bozeman"
    ],
    "Delaware": [
        "Wilmington",
        "Dover"
    ],
    "Maine": [
        "Portland"
    ],
    "Wyoming": [
        "Cheyenne",
        "Casper"
    ],
    "West Virginia": [
        "Charleston",
        "Huntington"
    ],
    "Vermont": [
        "Burlington"
    ]
}
