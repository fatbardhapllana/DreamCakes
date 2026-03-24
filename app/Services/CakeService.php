<?php

namespace App\Services;

use App\Repositories\FileRepository;

class CakeService
{
    private FileRepository $repository;

    public function __construct()
    {
        $this->repository = new FileRepository('cakes.csv');
    }

    public function getAllCakes(): array
    {
        return $this->repository->getAll();
    }

    public function getCakeById(int $id): ?array
    {
        return $this->repository->getById($id);
    }

    public function addCake(array $data): bool
    {
        $this->repository->add($data);
        return $this->repository->save();
    }
}
