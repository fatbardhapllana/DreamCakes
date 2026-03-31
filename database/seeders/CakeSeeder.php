<?php

namespace Database\Seeders;

use App\Models\Cake;
use Illuminate\Database\Seeder;

class CakeSeeder extends Seeder
{
    public function run(): void
    {
        $cakes = [
            ['name' => 'Torta Çokollatë',  'description' => 'Tortë me çokollatë të zezë',     'price' => 2500, 'category' => 'çokollatë', 'is_available' => true],
            ['name' => 'Torta Vanilje',     'description' => 'Tortë klasike me krem vanilje',   'price' => 2200, 'category' => 'klasike',    'is_available' => true],
            ['name' => 'Torta Red Velvet',  'description' => 'Red Velvet me krem djathi',       'price' => 2800, 'category' => 'premium',    'is_available' => true],
            ['name' => 'Torta Limon',       'description' => 'Tortë e freskët me krem limoni',  'price' => 2000, 'category' => 'fruta',      'is_available' => true],
            ['name' => 'Torta Çilek',       'description' => 'Tortë me çilek të freskët',       'price' => 2400, 'category' => 'fruta',      'is_available' => true],
            ['name' => 'Torta Tiramisu',    'description' => 'Klasiku italian me maskarpone',   'price' => 3000, 'category' => 'premium',    'is_available' => false],
        ];

        foreach ($cakes as $cake) {
            Cake::create($cake);
        }
    }
}