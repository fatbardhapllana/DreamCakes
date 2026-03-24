# DreamCakes — Dokumentacioni i Arkitekturës

## Përshkrimi i Projektit
DreamCakes është një aplikacion e-commerce për shitjen e tortave online,
ndërtuar me Laravel, React dhe MySQL.

## Shtresat e Projektit

### 1. UI Layer (resources/views, resources/js)
- Blade templates dhe React components
- Shfaq të dhënat dhe merr input nga përdoruesi
- Nuk përmban asnjë logjikë biznesi

### 2. Controllers (app/Http/Controllers)
- Merr kërkesën HTTP nga përdoruesi
- Thërret Services për të kryer veprimet
- Kthen përgjigjen për UI

### 3. Services (app/Services)
- CakeService — menaxhon tortat
- OrderService — menaxhon porositë
- CartService — menaxhon shportën
- Përmban gjithë logjikën e biznesit
- Nuk komunikon drejtpërdrejt me databazën

### 4. Repository Layer (app/Repositories)
- IRepository — interface me 4 metoda bazë
- FileRepository — lexon dhe ruan të dhëna në CSV
- Ndan logjikën e biznesit nga burimi i të dhënave

### 5. Models (app/Models)
- Cake, Order, User, CartItem
- Eloquent ORM modelet e Laravel
- Përfaqësojnë strukturën e të dhënave

## Arsyet e Vendimeve Arkitekturore

### Pse Repository Pattern?
- Ndan logjikën e biznesit nga databaza
- Lejon ndryshimin e burimit të të dhënave pa ndryshuar Services
- Detyrë akademike: demonstron Repository Pattern si në C#

### Pse Services?
- Mban Controllers të shkurtër dhe të lexueshëm
- Centralizon logjikën e biznesit në një vend
- Lehtëson testimin e kodit

### Pse CSV FileRepository?
- Demonstron Repository Pattern pa varësi nga databaza
- Implementon interface IRepository si kërkuar në detyrë
- Ruan të dhëna në storage/data/*.csv