<?php
namespace App\Services;

use App\Repositories\OrderRepository;
use App\Repositories\CartRepository;
use App\Models\OrderItem;

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
        return $this->orderRepository->getById($id);
    }

    public function getOrdersByUser(int $userId): array
    {
        return $this->orderRepository->getByUser($userId);
    }

    public function placeOrder(int $userId, string $notes = ''): bool|string
    {
        $cartItems = $this->cartRepository->getByUser($userId);

        if (empty($cartItems)) return "Shporta është bosh!";

        $total = 0;
        foreach ($cartItems as $item) {
            $total += $item['cake']['price'] * $item['quantity'];
        }

        $orderId = $this->orderRepository->create([
            'user_id' => $userId,
            'total_price' => $total,
            'status' => 'pending',
            'notes' => $notes,
        ]);

        if (!$orderId) return "Porosia nuk u krye!";

        // Ruaj order items
        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $orderId,
                'cake_id' => $item['cake_id'],
                'quantity' => $item['quantity'],
                'price' => $item['cake']['price'],
            ]);
        }

        $this->cartRepository->clearByUser($userId);

        return true;
    }

    public function updateOrderStatus(int $id, string $status): bool|string
    {
        $validStatuses = ['pending', 'confirmed', 'delivered', 'cancelled'];
        if (!in_array($status, $validStatuses)) return "Status i pavlefshëm!";
        return $this->orderRepository->updateStatus($id, $status);
    }

    public function deleteOrder(int $id): bool|string
    {
        return $this->orderRepository->delete($id);
    }
}