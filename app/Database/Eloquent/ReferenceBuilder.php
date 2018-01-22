<?php

namespace App\Database\Eloquent;

use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Str;

class ReferenceBuilder extends QueryBuilder
{

    /**
     * Is need add columns to select
     *
     * @var bool
     */
    protected $addColumns = true;

    /**
     * Field name prefix
     *
     * @var string
     */
    public static $prefix = 'rf-';

    /**
     * Feild name devider for select
     *
     * @var string
     */
    public static $devider = '$';

    /**
     * Connected relations
     *
     * @var array
     */
    protected $references = [];

    /**
     * @inheritdoc
     */
    public function getModels($columns = ['*'])
    {
        foreach ($this->eagerLoad as $name => $constraints) {
            // skip nested relation
            if (Str::contains($name, '.')) {
                continue;
            }

            $relation = $this->getRelation($name);

            if ($this->isReferencedInQuery($name) && $this->isRelationSupported($relation)) {
                $this->addJoinToQuery($name, $this->model->getTable(), $relation);
                $this->addNestedRelations($name, $relation);

                $query = $relation->getQuery()->getQuery();
                $this->mergeWheres($query->wheres, $query->getBindings());
            }
        }

        if ($this->addColumns) {
            $this->selectFromQuery($this->model->getTable(), '*');
        }

        return parent::getModels($columns);
    }

    /**
     * Join nested relation
     *
     * @param string $name
     * @param Relation $relation
     */
    protected function addNestedRelations($name, Relation $relation)
    {
        $nestedRelations = $this->relationsNestedUnder($name);

        if (count($nestedRelations) <= 0) {
            // if no nested relation - remove from eager load
            $this->disableEagerLoad($name);
            return;
        }

        // current related class
        $class = $relation->getRelated();

        // if one or more nested relation not support - skip remove from eager load
        $eagerLoad = false;

        foreach ($nestedRelations as $nestedName => $nestedConstraints) {
            $relation = $class->{$nestedName}();
            if ($this->isRelationSupported($relation)) {
                $this->addJoinToQuery($nestedName, $name, $relation, $name . static::$devider . static::$prefix);
            } else {
                $eagerLoad = true;
            }
        }

        if (!$eagerLoad) {
            $this->disableEagerLoad($name);
        }
    }

    /**
     * Add join logic to query
     *
     * @param string $joinTableAlias
     * @param string $currentTableAlias
     * @param BelongsTo|Relation $relation
     * @param string $columnsPrefix
     */
    protected function addJoinToQuery($joinTableAlias, $currentTableAlias, Relation $relation, $columnsPrefix = '')
    {
        $joinTableName = $relation->getRelated()->getTable();

        $this->query->leftJoin(
            $joinTableName . ' as ' . $joinTableAlias,
            $joinTableAlias . '.' . $relation->getOwnerKey(),
            '=',
            $currentTableAlias . '.' . $relation->getForeignKey()
        );

        if ($this->addColumns) {
            foreach ($this->getColumns($joinTableName) as $column) {
                $this->selectFromQuery(
                    $joinTableAlias,
                    $column,
                    static::$prefix . $columnsPrefix . $joinTableAlias . static::$devider . $column
                );
            }
        }
    }

    /**
     * Do not add reletion field to select
     *
     * @return $this
     */
    public function disableRelationColumns()
    {
        $this->addColumns = false;

        return $this;
    }

    /**
     * Check is relation or relation parent in reference list
     *
     * @param string $name
     * @return bool
     */
    protected function isReferencedInQuery($name)
    {
        if (in_array($name, $this->references)) {
            return true;
        }

        foreach ($this->references as $reference) {
            if (strpos($reference, $name . '.') === 0) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check is relation instance of BelongsTo
     *
     * @param mixed $relation
     * @return bool
     */
    public function isRelationSupported($relation)
    {
        return $relation instanceof BelongsTo;
    }

    /**
     * Remove relation from eager load list
     *
     * @param string $name
     */
    protected function disableEagerLoad($name)
    {
        unset($this->eagerLoad[$name]);
    }

    /**
     * Add a new select column to the query
     *
     * @param string $table
     * @param string $column
     * @param string|null $as
     */
    protected function selectFromQuery($table, $column, $as = null)
    {
        $this->query->addSelect(
            implode('.', [$table, $column]) . (!is_null($as) ? ' as ' . $as : '')
        );
    }

    /**
     * Add referaces of relations
     *
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Query\Builder|static
     */
    public function references($relations)
    {
        if (!is_array($relations)) {
            $relations = func_get_args();
        }

        $this->references = $relations;

        return $this;
    }

    /**
     * Get current referances list
     *
     * @return array
     */
    public function getReferences()
    {
        return $this->references;
    }

    /**
     * Get columns list of table
     *
     * @param string $table
     * @return array
     */
    protected function getColumns($table)
    {
        return $this->model->getConnection()->getSchemaBuilder()->getColumnListing($table);
    }

    /**
     * @inheritdoc
     */
    public function find($id, $columns = ['*'])
    {
        if (is_array($id)) {
            return $this->findMany($id, $columns);
        }

        $this->query->where($this->model->getQualifiedKeyName(), '=', $id);

        return $this->first($columns);
    }

    /**
     * @inheritdoc
     */
    public function with($relations)
    {
        //if passing the relations as arguments, pass on to eloquents with
        if (is_string($relations)) {
            $relations = func_get_args();
        }

        $includes = null;

        try {
            $includes = $this->getModel()->getIncludes();
        } catch (\BadMethodCallException $e) {
        }

        if (is_array($includes)) {
            $relations = array_merge($relations, $includes);
            $this->references(array_keys($this->parseRelations($relations)));
        }

        parent::with($relations);

        return $this;
    }
}