# Information
Detta projekt är en webbapplication där backend-delen drivs av Node och Express och frontend-delen drivs av React och där Redux används för hantering av state.

Servern kan vid start nås på port 4000. [http://localhost:4000](http://localhost:4000)

Clienten kan vid start på port 3000. [http://localhost:3000](http://localhost:3000)

---

Efter installation av paket kan man starta applikationen med:

```sh
npm run start
```

# Installation

```sh
npm install
```
därefter

```sh
cd client && npm install
```

---

### Kommandon ###
| Kommando               | Beskrivning                                                                                                            |
|------------------------|------------------------------------------------------------------------------------------------------------------------|
| `npm run server:dev`   | Startar servern med nodemon. Ändringar i filer startar om servern.                                                     |
| `npm run server:start` | Startar en lokal server på [port 4000](http://localhost:4000).                                                         |
| `npm run db:seed`      | Seeder in lite randomiserad data i 3st json-databaser och sparas i /data (users.json, vehicles.json och passages.json) |
| `npm run client`       | Kör react-scripts start i client-mappen                                                                                |
| `npm run client:build` | Kör react-scripts build i client-mappen                                                                                |
| `npm run dev`          | Startar server och client samtidigt med nodemon (utvecklar-läge)                                                       |
| `npm run start`        | Startar server och client samtidigt (Använd denna)                                                                     | 
|
<br />

---
## Projektstruktur

### Server

Koden för express-servern hittas i [/server/index.js](./server/index.js). Routehandlers för individuella routes hittas i mappen [/server/api-routes](./server/api-routes) och Controllers för routes hittas i [/server/api-controllers](./server/api-controllers). Server hanterar requests för att lägga till och hämta fordonsägare, lägga till och hämta fordon och lägga till och hämta uppgifter om ett fordons passeringar av en tullstation samt beräkningar av ett fordons dagliga passeringar.

Det finns också möjlighet att seeda databasen med lite randomiserad data. I dagsläget skapas 5 fordon som gör 5 dagliga passeringar under perioden 2022-06-22 - 2022-07-01. Detta för att få med nationella helgdagar, dag före nationell helgdag, dagar under veckoslut samt Juli månad (avgiftsfri månad). 

Man kan göra vissa egna justeringar för randomiseringen, såsom sannolikheten att det skapas ett avgiftsfri typ av fordon. Eller mellan vilka tider, eller datum passeringsevent ska skapas etc. Se [databaseSeeder.mjs](./server/business-logic/util-functions/databaseSeeder.mjs) och [vehicleFactory.mjs](./server/business-logic/util-functions/vehicleFactory.mjs)

Server använder en json-databas (LowDB) för att spara data. Det går att seeda om databasen med:

```sh
npm run db:seed
```

---

### Client

Klient-delen består av en Create React App för att spara tid. Via gränssnittet ska man kunna skapa nya fordon (fordonsägare skapas automatiskt) och lägga till passeringsevent för ett fordon. 

Det ska också vara möjligt att randomisera fram all data som är nödvändig.

Beräkningar för ett fordon presenteras som en lista med datum, där man kan se de tider ett fordon har gjort passeringar och en daglig totalkostnad. Skulle avgiften vara 0kr så ska det framgå varför. 