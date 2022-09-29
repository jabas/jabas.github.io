(function () {
//

const clubData = [
    { 
        "location": "Alabama",
        "clubs": [
            {
                "clubId": 201,
                "clubName": "Vestavia Hills",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Arizona",
        "clubs": [
            {
                "clubId":279,
                "clubName": "Biltmore",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": true
            },{
                "clubId":137,
                "clubName": "Gilbert",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":296,
                "clubName": "Happy Valley-Peoria",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":155,
                "clubName": "North Scottsdale",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":156,
                "clubName": "Palm Valley",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":132,
                "clubName": "Tempe",
                "hasPass": false,
                "hasPool": true
            },
        ]
    },{ 
        "location": "California",
        "clubs": [
            {
                "clubId":245,
                "clubName": "Folsom",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":293,
                "clubName": "La Jolla",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":237,
                "clubName": "Laguna Niguel",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":246,
                "clubName": "Rancho San Clemente",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":241,
                "clubName": "Roseville",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },
        ]
    },{ 
        "location": "Colorado",
        "clubs": [
            {
                "clubId":194,
                "clubName": "Centennial",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":231,
                "clubName": "Centennial Tennis",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":319,
                "clubName": "Cherry Creek",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":197,
                "clubName": "Colorado Springs",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":277,
                "clubName": "Flatirons",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":168,
                "clubName": "Parker-Aurora",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":192,
                "clubName": "Westminster",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Florida",
        "clubs": [
            {
                "clubId":178,
                "clubName": "Boca Raton",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":273,
                "clubName": "Coral Gables",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":289,
                "clubName": "Palm Beach Gardens",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":213,
                "clubName": "Tampa",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Georgia",
        "clubs": [
            {
                "clubId":158,
                "clubName": "Alpharetta",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":184,
                "clubName": "Johns Creek",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":232,
                "clubName": "Peachtree Corners",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":208,
                "clubName": "Sandy Springs",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":169,
                "clubName": "Sugarloaf",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":182,
                "clubName": "Woodstock",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Illinois",
        "clubs": [
            {
                "clubId":14,
                "clubName": "Algonquin",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":51,
                "clubName": "Bloomingdale",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":53,
                "clubName": "Burr Ridge",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":255,
                "clubName": "Northbrook",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":276,
                "clubName": "Oakbrook",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":128,
                "clubName": "Old Orchard",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":15,
                "clubName": "Orland Park",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":299,
                "clubName": "River North at One Chicago",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":150,
                "clubName": "Romeoville",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":50,
                "clubName": "Schaumburg",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":183,
                "clubName": "Vernon Hills",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":52,
                "clubName": "Warrenville",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Indiana",
        "clubs": [
            {
                "clubId":30,
                "clubName": "Castle Creek",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":225,
                "clubName": "Fishers",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Iowa",
        "clubs": [
            {
                "clubId":238,
                "clubName": "Des Moines",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Kansas",
        "clubs": [
            {
                "clubId":198,
                "clubName": "Lenexa",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":157,
                "clubName": "Overland Park",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Maryland",
        "clubs": [
            {
                "clubId":148,
                "clubName": "Columbia",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":252,
                "clubName": "Gaithersburg",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 150,
                "openApril": false
            },{
                "clubId":191,
                "clubName": "Rockville",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Massachusetts",
        "clubs": [
            {
                "clubId":254,
                "clubName": "Burlington",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },{
                "clubId":260,
                "clubName": "Chestnut Hill",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":248,
                "clubName": "MetroWest-Boston",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },{
                "clubId":281,
                "clubName": "Northshore",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },{
                "clubId":244,
                "clubName": "Westwood",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },
        ]
    },{ 
        "location": "Michigan",
        "clubs": [
            {
                "clubId":217,
                "clubName": "Bloomfield Township",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":131,
                "clubName": "Canton Township",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":144,
                "clubName": "Commerce Township",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":21,
                "clubName": "Novi",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":126,
                "clubName": "Rochester Hills",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":22,
                "clubName": "Shelby Township",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 75,
                "openApril": false
            },{
                "clubId":20,
                "clubName": "Troy",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Minnesota",
        "clubs": [
            {
                "clubId":10,
                "clubName": "Apple Valley",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":7,
                "clubName": "Bloomington North",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":176,
                "clubName": "Bloomington South",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":12,
                "clubName": "Champlin",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":151,
                "clubName": "Chanhassen",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":6,
                "clubName": "Coon Rapids",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":173,
                "clubName": "Crosstown (Eden Prairie)",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":2,
                "clubName": "Eagan",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":175,
                "clubName": "Eden Prairie Athletic",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":275,
                "clubName": "Edina at Southdale",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },{
                "clubId":170,
                "clubName": "Fridley",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":5,
                "clubName": "Highland Park",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":164,
                "clubName": "Lakeville",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":167,
                "clubName": "Maple Grove",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":166,
                "clubName": "Minnetonka",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":141,
                "clubName": "New Hope",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":171,
                "clubName": "Oakdale Village Tennis",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":8,
                "clubName": "Plymouth",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":133,
                "clubName": "Savage",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":174,
                "clubName": "St. Louis Park",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":172,
                "clubName": "Target Center (Minneapolis)",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":189,
                "clubName": "White Bear Lake",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":3,
                "clubName": "Woodbury",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Missouri",
        "clubs": [
            {
                "clubId":280,
                "clubName": "Frontenac",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":181,
                "clubName": "West County-Chesterfield",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },
        ]
    },{ 
        "location": "Nebraska",
        "clubs": [
            {
                "clubId":161,
                "clubName": "Omaha",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Nevada",
        "clubs": [
            {
                "clubId":239,
                "clubName": "Green Valley",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": true
            },{
                "clubId":193,
                "clubName": "Summerlin",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": true
            },
        ]
    },{ 
        "location": "New Jersey",
        "clubs": [
            {
                "clubId":235,
                "clubName": "Bergen County",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },{
                "clubId":188,
                "clubName": "Berkeley Heights",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },{
                "clubId":261,
                "clubName": "Bridgewater",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },{
                "clubId":165,
                "clubName": "Florham Park",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },{
                "clubId":234,
                "clubName": "Mount Laurel",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 150,
                "openApril": false
            },{
                "clubId":258,
                "clubName": "Princeton",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },{
                "clubId":328,
                "clubName": "The Shops at Riverside",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "New York",
        "clubs": [
            {
                "clubId":312,
                "clubName": "23rd Street",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":259,
                "clubName": "Chappaqua",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":240,
                "clubName": "Garden City",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },{
                "clubId":314,
                "clubName": "NoHo",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":250,
                "clubName": "Sky (Manhattan)",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":701,
                "clubName": "Studio Battery Park",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":200,
                "clubName": "Syosset",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },{
                "clubId":236,
                "clubName": "Westchester",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 250,
                "openApril": false
            },
        ]
    },{ 
        "location": "North Carolina",
        "clubs": [
            {
                "clubId":227,
                "clubName": "Apex",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":160,
                "clubName": "Cary",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":253,
                "clubName": "Charlotte",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":243,
                "clubName": "Raleigh",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Ohio",
        "clubs": [
            {
                "clubId":195,
                "clubName": "Beachwood",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":162,
                "clubName": "Deerfield Township",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":159,
                "clubName": "Dublin",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 75,
                "openApril": false
            },{
                "clubId":40,
                "clubName": "Easton",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":224,
                "clubName": "Pickerington",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":223,
                "clubName": "Upper Arlington",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Oklahoma",
        "clubs": [
            {
                "clubId":263,
                "clubName": "Oklahoma City",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":199,
                "clubName": "South Tulsa",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Pennsylvania",
        "clubs": [
            {
                "clubId":262,
                "clubName": "Ardmore",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":500,
                "clubName": "Fort Washington",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 150,
                "openApril": false
            },{
                "clubId":251,
                "clubName": "King of Prussia",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 200,
                "openApril": false
            },
        ]
    },{ 
        "location": "Tennessee",
        "clubs": [
            {
                "clubId":187,
                "clubName": "Collierville",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },{
                "clubId":257,
                "clubName": "Franklin",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },
        ]
    },{ 
        "location": "Texas",
        "clubs": [
            {
                "clubId":153,
                "clubName": "Allen",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":287,
                "clubName": "Austin - Arboretum",
                "hasPass": false,
                "hasPool": true
            },{
                "clubId":286,
                "clubName": "Austin - Downtown",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":149,
                "clubName": "Austin - North",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":163,
                "clubName": "Austin - South",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":270,
                "clubName": "Baybrook",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":138,
                "clubName": "Champions",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":146,
                "clubName": "Cinco Ranch",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":180,
                "clubName": "City Centre Houston",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":142,
                "clubName": "Colleyville",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":268,
                "clubName": "Cypress",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":147,
                "clubName": "Dallas - Addison",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":190,
                "clubName": "Dallas - Highland Park",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":143,
                "clubName": "Flower Mound",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":266,
                "clubName": "Fort Worth-Alliance",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":285,
                "clubName": "Frisco",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":272,
                "clubName": "Galleria Tennis (Houston)",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":139,
                "clubName": "Garland",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":300,
                "clubName": "GreenStreet",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":271,
                "clubName": "Greenway",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": true
            },{
                "clubId":206,
                "clubName": "Kingwood",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":196,
                "clubName": "Lake Houston",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":185,
                "clubName": "Mansfield",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":136,
                "clubName": "Plano",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":230,
                "clubName": "Plano Tennis",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":152,
                "clubName": "San Antonio 281",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":179,
                "clubName": "San Antonio at the Rim",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },{
                "clubId":140,
                "clubName": "Sugar Land",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": true
            },
        ]
    },{ 
        "location": "Utah",
        "clubs": [
            {
                "clubId":154,
                "clubName": "South Jordan",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 50,
                "openApril": false
            },
        ]
    },{ 
        "location": "Virginia",
        "clubs": [
            {
                "clubId":186,
                "clubName": "Ashburn-Sterling",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":35,
                "clubName": "Centreville",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":36,
                "clubName": "Fairfax",
                "hasPass": false,
                "hasPool": false
            },{
                "clubId":256,
                "clubName": "Gainesville",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 150,
                "openApril": false
            },{
                "clubId":233,
                "clubName": "Reston",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 150,
                "openApril": false
            },
        ]
    },{ 
        "location": "Washington",
        "clubs": [
            {
                "clubId":274,
                "clubName": "Bellevue",
                "hasPass": false,
                "hasPool": false
            },
        ]
    },{ 
        "location": "Wisconsin",
        "clubs": [
            {
                "clubId":284,
                "clubName": "Brookfield",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },
        ]
    },{ 
        "location": "Canada",
        "clubs": [
            {
                "clubId":242,
                "clubName": "Ajax",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":205,
                "clubName": "Mississauga",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },{
                "clubId":249,
                "clubName": "Woodbridge",
                "hasPass": true,
                "hasPool": true,
                "passPrice": 100,
                "openApril": false
            },
        ]
    }
];


	const select = document.getElementById('beachClub');

	clubData.forEach(state => {
		// create state grouping
		const group = document.createElement('optgroup');
		group.setAttribute('label', state.location);
		
		// add individual club options
		state.clubs.forEach(club => {
			if (club.hasPool) {
				const option = document.createElement('option');
				option.setAttribute('value', club.clubId);
				if (club.hasPass) {
					const price = state.location === 'Canada' ? 'C$' + club.passPrice : '$' + club.passPrice;
					option.setAttribute('data-pool-price', price);
					option.setAttribute('data-pool-april', club.openApril);
				}
				option.textContent = club.clubName;
				group.appendChild(option);
			}
		});
		// push all to page/select
		if (group.children.length > 0) {
			select.appendChild(group);
		}
		
	});

	select.addEventListener('change', (event) => {
		const result = document.getElementById('clubRules');
		if (event.target.value > 0) {
			const selection = document.querySelector('[value="' + event.target.value + '"]');
			const data = selection.dataset;

			if (data.poolPrice) {
				if (data.poolApril === "true") {
					result.innerHTML = data.poolPrice + ' per member for Beach Club access';
				} else {
					result.innerHTML = 'Beach Club access fee waived if you join by April&nbsp;30,&nbsp;2022<br/>' +  data.poolPrice + ' fee required for each new member joining after April&nbsp;30,&nbsp;2022';
				}
			} else {
				result.innerHTML = 'Beach Club access to ' + selection.textContent + '<br/> included in membership'
			}
			result.classList.remove('hidden-xs-up');
		} else {
			result.classList.add('hidden-xs-up');
		}
	});

	if (window.LtFramework) {
		const profileStore = window.LtFramework.getStore('ProspectProfileStore');
		const club = profileStore.getInitialData().club.id;
		if (Array.from(select.options).map((opt) => opt.value).includes(club)) {
			select.value = club;
			select.dispatchEvent(new Event('change'));
		}

		select.addEventListener('change', (event) => {
			if (profileStore.getInitialData().club.id !== select.value) {
				profileStore.onUpdateProspectClub(select.value);
			}
		});
	}

//
}( ));