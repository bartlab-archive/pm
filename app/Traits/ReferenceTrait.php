<?php

namespace App\Traits;

use App\Database\Eloquent\ReferenceBuilder;
use Illuminate\Support\Arr;

trait ReferenceTrait
{

    /**
     * @param $query
     * @return ReferenceBuilder
     */
    public function newEloquentBuilder($query)
    {
        return new ReferenceBuilder($query);
    }

    public function newFromBuilder($attributes = [], $connection = null)
    {
        $nestedData = [];

        foreach ((array)$attributes as $key => $value) {
            Arr::set(
                $nestedData,
                str_replace(ReferenceBuilder::$devider, '.', $key),
                $value
            );
        }

        return $this->buildForeignEntity(null, $nestedData);
    }

    private function buildForeignEntity($entityName = null, $nestedData, $parentInstance = null)
    {
        $prefix = ReferenceBuilder::$prefix;
        $children = [];

        foreach ($nestedData as $key => $data) {
            if (strpos($key, $prefix) === 0) {
                $children[str_replace($prefix, '', $key)] = $data;
                unset($nestedData[$key]);
            }
        }

        $instance = $entityName ?
            $parentInstance->{$entityName}()->getRelated()->newFromBuilder($nestedData) :
            parent::newFromBuilder($nestedData);

        foreach ($children as $newEntityName => $data) {
            $foreign = $this->buildForeignEntity($newEntityName, $data, $instance);

            // get primary key of table.
            // if the value of the primary key is empty dont create the relation so continue
            if (empty($foreign->getKeyForSaveQuery())) {
                continue;
            }

            $instance->setRelation($newEntityName, $foreign);
        }

        return $instance;
    }

    public static function includes($relations)
    {
        if (is_string($relations)) {
            $relations = func_get_args();
        }

        return parent::with($relations)->references($relations);
    }

    public function getIncludes()
    {
        return property_exists($this, 'includes') ? $this->includes : null;
    }
}