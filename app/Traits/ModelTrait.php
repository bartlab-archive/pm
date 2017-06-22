<?php

namespace App\Traits;

trait ModelTrait
{
    public static function getTableName()
    {
        return (new static)->getTable();
    }
}