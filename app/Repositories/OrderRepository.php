<?php
namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function getAll(): array
    {
        return Order::with(['user', 'items.cake'])->get()->toArray();
    }

    public function getByUser(int $userId): array
    {
        return Order::with(['items.cake'])->where('user_id', $userId)->get()->toArray();
    }

    public function getById(int $id): ?array
    {
        $order = Order::with(['user', 'items.cake'])->find($id);
        return $order ? $order->toArray() : null;
    }

    public function create(array $data): int|false
    {
        try {
            $order = Order::create($data);
            return $order->id;
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

    public function delete(int $id): bool
    {
        try {
            $order = Order::find($id);
            if (!$order) return false;
            $order->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}