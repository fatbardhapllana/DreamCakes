<?php

namespace App\Repositories\Interfaces;

interface IRepository
{
    public function getAll(): array;
    public function getById(int $id): ?array;
    public function add(array $data): bool;
    public function save(): bool;
}