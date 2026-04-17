<?php

namespace App\Repositories;

use App\Models\Cake;

class CakeRepository
{
    public function getAll(): array
    {
        return Cake::all()->toArray();
    }

    public function getById(int $id): ?array
    {
        $cake = Cake::find($id);
        return $cake ? $cake->toArray() : null;
    }

    public function add(array $data): bool
    {
        try {
            Cake::create($data);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function update(int $id, array $data): bool
    {
        try {
            $cake = Cake::find($id);
            if (!$cake) return false;
            $cake->update($data);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function delete(int $id): bool
    {
        try {
            $cake = Cake::find($id);
            if (!$cake) return false;
            $cake->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function search(string $query): array
    {
        return Cake::where('name', 'like', "%{$query}%")
            ->orWhere('category', 'like', "%{$query}%")
            ->get()
            ->toArray();
    }

    public function filterByCategory(string $category): array
    {
        return Cake::where('category', $category)
            ->get()
            ->toArray();
    }
}