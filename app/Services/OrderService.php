<?php

namespace App\Services;

use App\Repositories\FileRepository;

class OrderService
{
    private FileRepository $repository;

    public function __construct()
    {
        $this->repository = new FileRepository('orders.csv');
    }

    public function getAllOrders(): array
    {
        return $this->repository->getAll();
    }

    public function getOrderById(int $id): ?array
    {
        return $this->repository->getById($id);
    }

    public function placeOrder(array $data): bool
    {
        $this->repository->add($data);
        return $this->repository->save();
    }
}