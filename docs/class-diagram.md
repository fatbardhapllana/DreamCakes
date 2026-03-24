# Class Diagram — DreamCakes

## IRepository (Interface)
- **Metodat publike:**
  - `getAll(): array`
  - `getById(int $id): ?array`
  - `add(array $data): bool`
  - `save(): bool`

## FileRepository
- **Atributet private:**
  - `$filePath: string`
  - `$data: array`
- **Metodat publike:**
  - `getAll(): array`
  - `getById(int $id): ?array`
  - `add(array $data): bool`
  - `save(): bool`
- **Lidhje:** implementon IRepository

## CakeService
- **Atributet private:**
  - `$repository: FileRepository`
- **Metodat publike:**
  - `getAllCakes(): array`
  - `getCakeById(int $id): ?array`
  - `addCake(array $data): bool`
- **Lidhje:** përdor FileRepository

## OrderService
- **Atributet private:**
  - `$repository: FileRepository`
- **Metodat publike:**
  - `getAllOrders(): array`
  - `getOrderById(int $id): ?array`
  - `placeOrder(array $data): bool`
- **Lidhje:** përdor FileRepository

## CartService
- **Atributet private:**
  - `$repository: FileRepository`
- **Metodat publike:**
  - `getCartItems(): array`
  - `addToCart(array $data): bool`
  - `removeFromCart(int $id): ?array`
- **Lidhje:** përdor FileRepository

## Cake (Model)
- **Atributet private:**
  - `$id: int`
  - `$name: string`
  - `$price: float`
  - `$description: string`
  - `$image: string`
- **Lidhje:** ka shumë Order

## Order (Model)
- **Atributet private:**
  - `$id: int`
  - `$user_id: int`
  - `$total: float`
  - `$status: string`
- **Lidhje:** i përket User, ka shumë Cake

## User (Model)
- **Atributet private:**
  - `$id: int`
  - `$name: string`
  - `$email: string`
  - `$password: string`
- **Lidhje:** ka shumë Order