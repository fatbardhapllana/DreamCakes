<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'cake_id', 'quantity'];

    public function cake()
    {
        return $this->belongsTo(Cake::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}