<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\CakeService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CakeServiceTest extends TestCase
{
    use RefreshDatabase;

    private CakeService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new CakeService();
    }

    /** @test */
    public function test_add_cake_with_valid_data()
    {
        $result = $this->service->addCake([
            'name' => 'Torta Test',
            'description' => 'Pershkrim test',
            'price' => 1500,
            'category' => 'test',
            'is_available' => true,
        ]);

        $this->assertTrue($result === true);
    }

    /** @test */
    public function test_add_cake_with_empty_name_returns_error()
    {
        $result = $this->service->addCake([
            'name' => '',
            'price' => 1500,
            'category' => 'test',
        ]);

        $this->assertIsString($result);
    }

    /** @test */
    public function test_add_cake_with_invalid_price_returns_error()
    {
        $result = $this->service->addCake([
            'name' => 'Torta Test',
            'price' => -10,
            'category' => 'test',
        ]);

        $this->assertIsString($result);
    }

    /** @test */
    public function test_get_cake_by_id_returns_null_when_not_found()
    {
        $result = $this->service->getCakeById(9999);
        $this->assertNull($result);
    }

    /** @test */
    public function test_search_cakes_returns_empty_when_no_match()
    {
        $result = $this->service->searchCakes('nuk-ekziston-123');
        $this->assertIsArray($result);
        $this->assertEmpty($result);
    }
}