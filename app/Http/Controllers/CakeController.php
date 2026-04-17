<?php

namespace App\Http\Controllers;

use App\Services\CakeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CakeController extends Controller
{
    private CakeService $service;

    public function __construct()
    {
        $this->service = new CakeService();
    }

    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $category = $request->query('category', '');

        if (!empty($search)) {
            $cakes = $this->service->searchCakes($search);
        } elseif (!empty($category)) {
            $cakes = $this->service->filterByCategory($category);
        } else {
            $cakes = $this->service->getAllCakes();
        }

        return Inertia::render('cakes/Index', [
            'cakes' => $cakes,
            'search' => $search,
            'category' => $category,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
            'category' => 'required|string',
            'is_available' => 'boolean',
        ]);

        $result = $this->service->addCake($validated);

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return redirect()->route('cakes.index')
            ->with('success', 'Torta u shtua me sukses!');
    }

    public function show(string $id)
    {
        $cake = $this->service->getCakeById((int)$id);

        if (!$cake) {
            return redirect()->route('cakes.index')
                ->withErrors(['message' => 'Torta nuk u gjet!']);
        }

        return Inertia::render('cakes/Show', [
            'cake' => $cake,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:2|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0.01',
            'category' => 'required|string',
            'is_available' => 'boolean',
        ]);

        $result = $this->service->updateCake((int)$id, $validated);

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return redirect()->route('cakes.index')
            ->with('success', 'Torta u perditesua me sukses!');
    }

    public function destroy(string $id)
    {
        $result = $this->service->deleteCake((int)$id);

        if ($result !== true) {
            return back()->withErrors(['message' => $result]);
        }

        return redirect()->route('cakes.index')
            ->with('success', 'Torta u fshi me sukses!');
    }
}