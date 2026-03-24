<?php

namespace App\Services;

use App\Repositories\FileRepository;

class CartService
{
    private FileRepository $repository;

    public function __construct()
    {
        $this->repository = new FileRepository('cart.csv');
    }

    public function getCartItems(): array
    {
        return $this->repository->getAll();
    }

    public function addToCart(array $data): bool
    {
        $this->repository->add($data);
        return $this->repository->save();
    }

    public function removeFromCart(int $id): ?array
    {
        return $this->repository->getById($id);
    }
}