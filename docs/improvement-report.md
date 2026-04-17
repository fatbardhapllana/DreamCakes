\# Improvement Report — DreamCakes

\*\*Autori:\*\* Fatbardha Pllana  

\*\*Data:\*\* Prill 2026



\---



\## Përmirësimi 1: Rregullimi i filterByCategory()



\*\*Çka ishte problem:\*\*  

Metoda `filterByCategory()` në CakeService kthente të gjitha tortat pavarësisht kategorisë së kërkuar. Kodi ishte:

```php

public function filterByCategory(string $category): array

{

&#x20;   return $this->repository->getAll(); // gabim — nuk filtron!

}

```



\*\*Çfarë ndryshova:\*\*  

Shtova metodën `filterByCategory()` në CakeRepository që filtron saktë nga databaza, dhe rregullova CakeService që ta përdorë:

```php

public function filterByCategory(string $category): array

{

&#x20;   return Cake::where('category', $category)->get()->toArray();

}

```



\*\*Pse versioni i ri është më i mirë:\*\*  

Metoda tani bën saktësisht çfarë thotë emri i saj. Kodi mashtrues është një burim i madh gabimesh sepse programerët e tjerë (dhe ti vetë në të ardhmen) besojnë se filtri funksionon kur në fakt nuk funksionon.



\---



\## Përmirësimi 2: Validim i inputit në CakeController



\*\*Çka ishte problem:\*\*  

Metodat `store()` dhe `update()` pranonin çdo input pa kontrolluar:

```php

$result = $this->service->addCake($request->all()); // asnjë validim!

```



\*\*Çfarë ndryshova:\*\*  

Shtova `$request->validate()` me rregulla specifike:

```php

$validated = $request->validate(\[

&#x20;   'name' => 'required|string|min:2|max:255',

&#x20;   'price' => 'required|numeric|min:0.01',

&#x20;   'category' => 'required|string',

&#x20;   'is\_available' => 'boolean',

]);

```



\*\*Pse versioni i ri është më i mirë:\*\*  

Pa validim, databaza mund të marrë të dhëna të gabuara. Tani Laravel kthen automatikisht mesazhe gabimi të qarta nëse inputi nuk është i saktë.



\---



\## Përmirësimi 3: Shtim i testeve për CakeService



\*\*Çka ishte problem:\*\*  

Projekti nuk kishte asnjë test për logjikën kryesore. Nëse dikush ndryshonte `addCake()` ose `searchCakes()`, nuk kishte asnjë mënyrë automatike për të zbuluar gabime.



\*\*Çfarë ndryshova:\*\*  

Shkrova 5 teste në `tests/Unit/CakeServiceTest.php`:

\- Test për shtim të tortës me të dhëna valide

\- Test për shtim me emër bosh — duhet kthyer error

\- Test për shtim me çmim negativ — duhet kthyer error

\- Test për kërkim me ID që nuk ekziston — duhet kthyer null

\- Test për kërkim që nuk gjen rezultate — duhet kthyer array bosh



\*\*Rezultati:\*\* 5/5 teste kaluan ✓



\*\*Pse versioni i ri është më i mirë:\*\*  

Testet garantojnë që logjika e biznesit funksionon si duhet. Çdo ndryshim i ardhshëm në kod do të testohet automatikisht.



\---



\## Çka mbetet ende e dobët



1\. \*\*Dependency Injection\*\* — CakeService ende krijon `new CakeRepository()` direkt, gjë që e bën testimin e izoluar të vështirë.

2\. \*\*Encoding i shqipes\*\* — karakteret shqipe në mesazhet e error shfaqen gabim.

3\. \*\*Asnjë UI për admin\*\* — nuk ka faqe për të shtuar, edituar, ose fshirë torta nga frontend.

4\. \*\*Cart dhe Order\*\* — janë të implementuara në backend por nuk kanë UI.

