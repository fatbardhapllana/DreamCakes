\# Project Audit — DreamCakes

\*\*Autori:\*\* Fatbardha Pllana  

\*\*Data:\*\* Prill 2026



\---



\## 1. Përshkrimi i shkurtër i projektit



\*\*Çka bën sistemi?\*\*  

DreamCakes është një aplikacion e-commerce për shitjen e tortave online. Sistemi lejon përdoruesit të shikojnë tortat e disponueshme, të kërkojnë sipas emrit ose kategorisë, dhe në të ardhmen të blejnë online.



\*\*Kush janë përdoruesit kryesorë?\*\*  

\- Klientët — shikojnë dhe blejnë torta  

\- Administratorët — menaxhojnë produktet dhe porositë



\*\*Funksionaliteti kryesor:\*\*  

\- Listimi i tortave nga databaza MySQL  

\- Kërkimi/filtrimi i tortave sipas emrit dhe kategorisë  

\- Sistemi i autentikimit (login/register)  

\- Arkitektura UI → Service → Repository → Database



\---



\## 2. Çka funksionon mirë



1\. \*\*Arkitektura e shtresave\*\* — projekti ndjek qartë ndarjen UI → Controller → Service → Repository → Model, gjë që e bën kodin të organizuar dhe të lehtë për t'u mirëmbajtur.



2\. \*\*Repository Pattern\*\* — CakeRepository izolон logjikën e databazës nga pjesa tjetër e aplikacionit. Nëse ndryshojmë nga MySQL në një databazë tjetër, ndryshojmë vetëm Repository.



3\. \*\*Search/Filter funksional\*\* — useri mund të kërkojë torta sipas emrit ose kategorisë dhe rezultatet filtrohen në kohë reale nga databaza.



4\. \*\*Error Handling bazik\*\* — CakeService kontrollon nëse emri është bosh dhe nëse çmimi është valid para se të shtojë një tortë.



5\. \*\*Sistemi i autentikimit\*\* — login, register, dhe profile settings funksionojnë plotësisht.



\---



\## 3. Dobësitë e projektit



1\. \*\*CakeService instaicon Repository direkt\*\* — `new CakeRepository()` brenda konstruktorit e bën të pamundur testimin e izoluar. Duhet të injektohet si dependency (Dependency Injection).



2\. \*\*filterByCategory() nuk funksionon\*\* — metoda `filterByCategory` në CakeService thjesht kthen të gjitha tortat pa asnjë filtrim sipas kategorisë. Është kod i gabuar dhe mashtrues.



3\. \*\*Mesazhet e error me encoding të gabuar\*\* — mesazhet shqipe si "Emri i tortës nuk mund të jetë bosh!" shfaqen me karaktere të gabuara (Ã«, Ã§) sepse encoding-u nuk është vendosur saktë.



4\. \*\*Asnjë test i shkruar për CakeService dhe CakeRepository\*\* — testet ekzistuese janë vetëm nga Laravel Breeze (auth tests). Nuk ka asnjë test për funksionalitetin kryesor të projektit.



5\. \*\*CakeController nuk ka validim të inputit\*\* — metodat `store` dhe `update` marrin `$request->all()` pa asnjë validim të formatit. Një user mund të dërgojë çfarëdo të dhëne.



6\. \*\*FileRepository ekziston por nuk përdoret\*\* — mbetet në projekt dhe krijon konfuzion. Duhet fshirë ose dokumentuar pse ekziston.



7\. \*\*Faqja `/cakes` kërkon login\*\* — useri nuk mund të shohë tortat pa u loguar, gjë që nuk ka sens për një dyqan online.



\---



\## 4. Tre përmirësime që do t'i implementoj



\### Përmirësimi 1: Rregullimi i filterByCategory()

\*\*Problemi:\*\* Metoda `filterByCategory()` në CakeService kthen të gjitha tortat, jo ato të kategorisë së kërkuar.  

\*\*Zgjidhja:\*\* Shtoj metodë `filterByCategory()` në CakeRepository që filtron sipas kategorisë, dhe e lidh me Service.  

\*\*Pse ka rëndësi:\*\* Një metodë që nuk bën çfarë thotë emri i saj është burim i gabimeve dhe konfuzionit.



\### Përmirësimi 2: Validim i inputit në CakeController

\*\*Problemi:\*\* `store()` dhe `update()` pranojnë çdo input pa kontrolluar formatin.  

\*\*Zgjidhja:\*\* Shtoj `$request->validate()` me rregulla specifike për çdo fushë.  

\*\*Pse ka rëndësi:\*\* Pa validim, databaza mund të marrë të dhëna të gabuara ose të rrezikshme.



\### Përmirësimi 3: Shtim i testeve për CakeService

\*\*Problemi:\*\* Nuk ka asnjë test për logjikën kryesore të biznesit.  

\*\*Zgjidhja:\*\* Shkruaj teste për `addCake()`, `searchCakes()`, dhe `getCakeById()`.  

\*\*Pse ka rëndësi:\*\* Testet garantojnë që kodi funksionon si duhet dhe ndihmojnë të gjejmë gabime herët.



\---



\## 5. Një pjesë që ende nuk e kuptoj plotësisht



\*\*Dependency Injection në Laravel\*\* — e di që duhet të injektoj `CakeRepository` si parameter në konstruktorin e `CakeService` në vend se të bëj `new CakeRepository()`, por nuk e kuptoj plotësisht si funksionon Service Container i Laravel që e krijon automatikisht. Do të doja të mësoja më shumë se si Laravel i menaxhon këto varësi automatikisht.

