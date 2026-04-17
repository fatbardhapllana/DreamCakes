<?php

namespace App\Services;

use App\Repositories\CartRepository;

class CartService
{
    private CartRepository $repository;

    public function __construct()
    {
        $this->repository = new CartRepository();
    }

    public function getCartItems(int $userId): array
    {
        return $this->repository->getByUser($userId);
    }

    public function addToCart(int $userId, int $cakeId, int $quantity = 1): bool|string
    {
        if ($quantity <= 0) return "Sasia duhet të jetë më shumë se 0!";
        
        return $this->repository->add([
            'user_id' => $userId,
            'cake_id' => $cakeId,
            'quantity' => $quantity,
        ]);
    }

    public function removeFromCart(int $itemId): bool|string
    {
        $result = $this->repository->remove($itemId);
        if (!$result) return "Itemi nuk u gjet në shportë!";
        return true;
    }

    public function clearCart(int $userId): bool
    {
        return $this->repository->clearByUser($userId);
    }

    public function getTotal(int $userId): float
    {
        $items = $this->repository->getByUser($userId);
        $total = 0;
        foreach ($items as $item) {
            $total += $item['cake']['price'] * $item['quantity'];
        }
        return $total;
    }
}