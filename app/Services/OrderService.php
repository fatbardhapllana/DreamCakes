<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use App\Repositories\CartRepository;

class OrderService
{
    private OrderRepository $orderRepository;
    private CartRepository $cartRepository;

    public function __construct()
    {
        $this->orderRepository = new OrderRepository();
        $this->cartRepository = new CartRepository();
    }

    public function getAllOrders(): array
    {
        return $this->orderRepository->getAll();
    }

    public function getOrderById(int $id): ?array
    {
        $order = $this->orderRepository->getById($id);
        if (!$order) return null;
        return $order;
    }

    public function getOrdersByUser(int $userId): array
    {
        return $this->orderRepository->getByUser($userId);
    }

    public function placeOrder(int $userId, string $notes = ''): bool|string
    {
        // Merr items nga shporta
        $cartItems = $this->cartRepository->getByUser($userId);
        
        if (empty($cartItems)) return "Shporta është bosh!";

        // Llogarit totalin
        $total = 0;
        foreach ($cartItems as $item) {
            $total += $item['cake']['price'] * $item['quantity'];
        }

        // Krijo porosinë
        $result = $this->orderRepository->create([
            'user_id' => $userId,
            'total_price' => $total,
            'status' => 'pending',
            'notes' => $notes,
        ]);

        if (!$result) return "Porosia nuk u krye!";

        // Pastro shportën
        $this->cartRepository->clearByUser($userId);

        return true;
    }

    public function updateOrderStatus(int $id, string $status): bool|string
    {
        $validStatuses = ['pending', 'confirmed', 'delivered', 'cancelled'];
        if (!in_array($status, $validStatuses)) return "Status i pavlefshëm!";
        
        return $this->orderRepository->updateStatus($id, $status);
    }
}