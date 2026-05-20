# DreamCakes - Demo Plan

## 1. Titulli i Projektit
**DreamCakes** - Platformë e-commerce për porositjen e tortave online

## 2. Problemi që Zgjidh
Shumë furra tortash në Kosovë nuk kanë sistem online për porosi. Klientët duhet të kontaktojnë
me telefon ose Instagram për çdo porosi, gjë që është e ngadaltë dhe jo efikase.
DreamCakes zgjidh këtë problem duke ofruar një platformë ku klientët mund të shohin tortat,
i shtojnë në shportë dhe bëjnë porosi online, ndërsa admini i menaxhon të gjitha nga një panel.

## 3. Përdoruesit Kryesorë
- **Customer (Klienti)** — Shikon tortat, bën porosi, sheh statusin e porosisë
- **Admin (Pronari i furrës)** — Menaxhon tortat, sheh dhe përditëson porositë

## 4. Flow-i që do ta Demonstroj

### Flow kryesor (Customer):
`Regjistrim → Login → Shiko Tortat → Filtro sipas kategorisë → Shto në Shportë → Konfirmo Porosinë → Shiko Statusin`

### Flow kryesor (Admin):
`Login → Admin Panel → Shto Tortë të Re → Menaxho Porositë → Ndrysho Statusin`

**Pse ky flow?**
Sepse përfshin të gjitha funksionalitetet kryesore të sistemit dhe tregon vlerën reale të aplikacionit.

## 5. Një Problem Real që e kam Zgjidhur

**Problemi:** MySQL nuk po startonte dhe database nuk ekzistonte, kështu që asgjë nuk funksiononte.

**Ku ishte problemi:** Porta 3306 ishte e bllokuar nga një proces tjetër në Windows,
dhe passwordi në `.env` nuk përputhej me MySQL.

**Si e zgjidha:**
1. Ndalova procesin që bllokonte portën përmes Task Manager
2. Ndryshova `DB_PASSWORD` në `.env` nga `1234` në bosh (XAMPP default)
3. Krijova database `dreamcakes` në phpMyAdmin
4. Ekzekutova `php artisan migrate` dhe të gjitha tabelat u krijuan

## 6. Çka Mbetet Ende e Dobët
- **Fotot e tortave** — nuk ruhen në server të jashtëm (vetëm lokalisht)
- **Sistemi i pagesave** — nuk ka integrим të Stripe apo PayPal
- **Notifikime** — admini nuk merr email kur vjen porosi e re
- **Mobile dizajn** — nuk është plotësisht i optimizuar për telefon

## 7. Struktura e Prezantimit (5-7 min)

### Hyrja (30 sekonda)
"DreamCakes është një platformë e-commerce për porositjen e tortave online.
Zgjidh problemin e furrës që nuk ka sistem dixhital për porosi."

### Demo Live (3-4 minuta)
1. Hap `localhost:8000` — Welcome page
2. Regjistrohu si customer i ri
3. Shiko tortat, filtro sipas kategorisë
4. Shto tortë në shportë
5. Konfirmo porosinë me adresë dhe telefon
6. Shiko porosinë në "Porositë e Mia"
7. Login si admin — shiko porosinë e re
8. Ndrysho statusin nga "Në pritje" në "Konfirmuar"

### Shpjegimi Teknik (1 minutë)
- Stack: Laravel + React + MySQL
- Arkitektura: Controller → Service → Repository → Model
- Role-based access: Customer vs Admin

### Problemi + Zgjidhja (30 sekonda)
"Problemi kryesor ishte database që nuk startonte — porta e bllokuar dhe password i gabuar.
E zgjidha duke konfiguruar XAMPP dhe .env saktë."

### Mbyllja (15 sekonda)
"DreamCakes funksionon si sistem i plotë e-commerce.
Çfarë do të shtoja në të ardhmen: pagesa online dhe notifikime me email."