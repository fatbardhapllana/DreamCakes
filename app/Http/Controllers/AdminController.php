<?php
namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\CakeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    private OrderService $orderService;
    private CakeService $cakeService;

    public function __construct()
    {
        $this->orderService = new OrderService();
        $this->cakeService = new CakeService();
    }

    public function index(Request $request)
    {
        $status = $request->query('status', '');
        $orders = $this->orderService->getAllOrders();

        if (!empty($status)) {
            $orders = array_filter($orders, fn($o) => $o['status'] === $status);
            $orders = array_values($orders);
        }

        $cakes = $this->cakeService->getAllCakes();

        return Inertia::render('admin/Index', [
            'orders' => $orders,
            'cakes' => $cakes,
            'filterStatus' => $status,
        ]);
    }

    public function updateOrderStatus(Request $request, int $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,delivered,cancelled',
        ]);

        $result = $this->orderService->updateOrderStatus($id, $validated['status']);

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return back()->with('success', 'Statusi u ndryshua!');
    }

    public function deleteOrder(int $id)
    {
        $result = $this->orderService->deleteOrder($id);

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return back()->with('success', 'Porosia u fshi!');
    }
}