<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CakeRepository;
use App\Repositories\Interfaces\CakeRepositoryInterface;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
            $this->app->bind(
        CakeRepositoryInterface::class,
        CakeRepository::class
    );

        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
