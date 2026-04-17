<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function getAll(): array
    {
        return Order::with('user')->get()->toArray();
    }

    public function getByUser(int $userId): array
    {
        return Order::where('user_id', $userId)->get()->toArray();
    }

    public function getById(int $id): ?array
    {
        $order = Order::find($id);
        return $order ? $order->toArray() : null;
    }

    public function create(array $data): bool
    {
        try {
            Order::create($data);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function updateStatus(int $id, string $status): bool
    {
        try {
            $order = Order::find($id);
            if (!$order) return false;
            $order->update(['status' => $status]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}