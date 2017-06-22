<?php

namespace App\Traits;

/**
 * Class NestedTreeTrait
 *
 * This class is intended for generation of nested tree
 *
 * @package App\Http\Traits
 */
trait NestedTreeTrait
{
    /**
     * @var bool
     */
    private static $is_refresh_nested_tree = false;

    /**
     * Refresh nested tree
     *
     * This method runs refresh the tree
     */
    public static function refreshNestedTree()
    {
        static::calcNestedTree(static::all());
    }

    /**
     * Calc nested tree
     *
     * This method calculates the all levels tree
     *
     * @param array $projects
     * @param null $p_id
     * @param int $level
     */
    private static function calcNestedTree($projects = [], $p_id = null, $level = 1)
    {
        $list = $projects->where('parent_id', $p_id)->sortBy('id')->all();
        $parent = $projects->find($p_id);

        $rgt = null;
        $level = $level > 2 ? 2 : $level;

        foreach ($list as $n => $project) {
            $count = static::nestedTreeCount($projects, $project->id);

            $project->lft = $rgt ? $rgt + 1 : ($parent ? $parent->lft + 1 : 1);
            $project->rgt = $rgt = $rgt ? $rgt + ($count * 2) + 2 : ($parent ? ($count * 2) + $level + $parent->lft : ($count * 2) + $level + 1);

            $project->save();

            static::calcNestedTree($projects, $project->id, $level + 1);
        }
    }

    /**
     * Nested tree count
     *
     * This method returns the count all nodes tree by parent id
     *
     * @param array $projects
     * @param $p_id
     * @return int
     */
    private static function nestedTreeCount($projects = [], $p_id)
    {
        $list = $projects->where('parent_id', $p_id)->all();
        $count = count($list);

        foreach ($list as $item) {
            $count += static::nestedTreeCount($projects, $item->id);
        }

        return $count;
    }


    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            try {
                $last_project = static::orderBy('id', 'desc')->first();

                $model->lft = $model->lft ? $model->lft : $last_project ? $last_project->rgt + 1 : 1;
                $model->rgt = $model->rgt ? $model->rgt : $last_project ? $last_project->rgt + 2 : 2;

                if ($model->parent_id) {
                    static::$is_refresh_nested_tree = true;
                }
            } catch (\Exception $e) {}
        });

        static::created(function () {
            if (static::$is_refresh_nested_tree) {
                static::refreshNestedTree();
            }
        });

        static::updating(function ($new_model) {
            try {
                $old_model = static::find($new_model->id);

                if ($old_model->parent_id !== $new_model->parent_id) {
                    static::$is_refresh_nested_tree = true;
                }
            } catch (\Exception $e) {}
        });

        static::updated(function () {
            if (static::$is_refresh_nested_tree) {
                static::refreshNestedTree();
            }
        });
    }
}