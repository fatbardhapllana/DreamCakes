<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = ['order_id', 'cake_id', 'quantity', 'price'];

    public function cake()
    {
        return $this->belongsTo(Cake::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}