<?php

namespace App\Services;

use App\Repositories\CakeRepository;

class CakeService
{
    private CakeRepository $repository;

    public function __construct()
    {
        $this->repository = new CakeRepository();
    }

    public function getAllCakes(): array
    {
        return $this->repository->getAll();
    }

    public function getCakeById(int $id): ?array
    {
        $cake = $this->repository->getById($id);
        if (!$cake) return null;
        return $cake;
    }

    public function addCake(array $data): bool|string
    {
        if (empty($data['name'])) return "Emri i tortes nuk mund te jete bosh!";
        if (!isset($data['price']) || $data['price'] <= 0) return "Cmimi duhet te jete me shume se 0!";
        return $this->repository->add($data);
    }

    public function updateCake(int $id, array $data): bool|string
    {
        $cake = $this->repository->getById($id);
        if (!$cake) return "Torta nuk u gjet!";
        if (isset($data['price']) && $data['price'] <= 0) return "Cmimi duhet te jete me shume se 0!";
        return $this->repository->update($id, $data);
    }

    public function deleteCake(int $id): bool|string
    {
        $cake = $this->repository->getById($id);
        if (!$cake) return "Torta nuk u gjet!";
        return $this->repository->delete($id);
    }

    public function searchCakes(string $query): array
    {
        if (empty($query)) return $this->repository->getAll();
        return $this->repository->search($query);
    }

    public function filterByCategory(string $category): array
    {
        if (empty($category)) return $this->repository->getAll();
        return $this->repository->filterByCategory($category);
    }
}