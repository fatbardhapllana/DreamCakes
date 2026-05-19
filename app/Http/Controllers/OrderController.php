<?php
namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    private OrderService $service;

    public function __construct()
    {
        $this->service = new OrderService();
    }

    public function index()
    {
        $orders = $this->service->getOrdersByUser(Auth::id());

        return Inertia::render('orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'notes' => 'nullable|string|max:500',
        ]);

        $result = $this->service->placeOrder(
            Auth::id(),
            $validated['notes'] ?? ''
        );

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return redirect()->route('orders.index')
            ->with('success', 'Porosia u krye me sukses!');
    }
}