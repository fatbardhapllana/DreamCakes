<?php

namespace App\Repositories;

use App\Models\Cart;

class CartRepository
{
    public function getByUser(int $userId): array
    {
        return Cart::with('cake')
            ->where('user_id', $userId)
            ->get()
            ->toArray();
    }

    public function add(array $data): bool
    {
        try {
            $existing = Cart::where('user_id', $data['user_id'])
                ->where('cake_id', $data['cake_id'])
                ->first();

            if ($existing) {
                $existing->increment('quantity');
            } else {
                Cart::create($data);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function remove(int $id): bool
    {
        try {
            $item = Cart::find($id);
            if (!$item) return false;
            $item->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function clearByUser(int $userId): bool
    {
        try {
            Cart::where('user_id', $userId)->delete();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}