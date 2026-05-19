<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CakeController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        $cakeService = new \App\Services\CakeService();
        $orderService = new \App\Services\OrderService();
        $isAdmin = auth()->user()->isAdmin();

        $activeOrder = null;
        if (!$isAdmin) {
            $orders = $orderService->getOrdersByUser(auth()->id());
            foreach ($orders as $order) {
                if (in_array($order['status'], ['pending', 'confirmed'])) {
                    $activeOrder = $order;
                    break;
                }
            }
        }

        return Inertia::render('dashboard', [
            'totalCakes' => count($cakeService->getAllCakes()),
            'totalOrders' => $isAdmin
                ? count($orderService->getAllOrders())
                : count($orderService->getOrdersByUser(auth()->id())),
            'isAdmin' => $isAdmin,
            'activeOrder' => $activeOrder,
        ]);
    })->name('dashboard');

    Route::get('cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('cart/{id}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('orders', [OrderController::class, 'store'])->name('orders.store');

    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('admin', [AdminController::class, 'index'])->name('admin.index');
        Route::patch('admin/orders/{id}/status', [AdminController::class, 'updateOrderStatus'])->name('admin.orders.status');
        Route::delete('admin/orders/{id}', [AdminController::class, 'deleteOrder'])->name('admin.orders.delete');
    });
});

Route::resource('cakes', CakeController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';