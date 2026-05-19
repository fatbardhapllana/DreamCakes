<?php
namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CartController extends Controller
{
    private CartService $service;

    public function __construct()
    {
        $this->service = new CartService();
    }

    public function index()
    {
        $items = $this->service->getCartItems(Auth::id());
        $total = $this->service->getTotal(Auth::id());

        return Inertia::render('cart/Index', [
            'items' => $items,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cake_id' => 'required|integer|exists:cakes,id',
            'quantity' => 'integer|min:1',
        ]);

        $result = $this->service->addToCart(
            Auth::id(),
            $validated['cake_id'],
            $validated['quantity'] ?? 1
        );

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return back()->with('success', 'Torta u shtua në shportë!');
    }

    public function destroy(int $id)
    {
        $result = $this->service->removeFromCart($id);

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return back()->with('success', 'Itemi u hoq nga shporta!');
    }
}