<?php

namespace App\Traits;

use App\Database\Query\NodeBuilder;

/**
 * Class NodeTrait
 *
 * This class is intended for generation of nested tree
 *
 * @package App\Http\Traits
 */
trait NodeTrait
{

	public static function bootNodeTrait() {

		static::creating(function($node) {
			$node->setDefaultLeftAndRight();
		});

		static::saving(function($node) {

			$node->storeNewParent();
		});

		static::saved(function($node) {

			$node->moveToNewParent();
		});

		static::deleting(function($node) {

			$node->destroyDescendants();
		});

	}

	/**
	 * Column name to store the reference to parent's node.
	 *
	 * @var string
	 */
	protected $parentColumn = 'parent_id';

	/**
	 * Column name for left index.
	 *
	 * @var string
	 */
	protected $leftColumn = 'lft';

	/**
	 * Column name for right index.
	 *
	 * @var string
	 */
	protected $rightColumn = 'rgt';

	/**
	 * Column to perform the default sorting
	 *
	 * @var string
	 */
	protected $orderColumn = null;

	/**
	 * Indicates whether we should move to a new parent.
	 *
	 * @var int
	 */
	protected static $moveToNewParentId = NULL;

	/**
	 * Columns which restrict what we consider our Nested Set list
	 *
	 * @var array
	 */
	protected $scoped = array();

	public function getParentColumnName() {
		return $this->parentColumn;
	}

	/**
	 * Get the value of the models "parent_id" field.
	 *
	 * @return int
	 */
	public function getParentId() {
		return $this->getAttribute($this->getparentColumnName());
	}

	/**
	 * Get the "left" field column name.
	 *
	 * @return string
	 */
	public function getLeftColumnName() {
		return $this->leftColumn;
	}

	/**
	 * Get the value of the model's "left" field.
	 *
	 * @return int
	 */
	public function getLeft() {
		return $this->getAttribute($this->getLeftColumnName());
	}

	/**
	 * Get the "right" field column name.
	 *
	 * @return string
	 */
	public function getRightColumnName() {
		return $this->rightColumn;
	}

	/**
	 * Get the table qualified "right" field column name.
	 *
	 * @return string
	 */
	public function getQualifiedRightColumnName() {
		return $this->getTable() . '.' . $this->getRightColumnName();
	}

	/**
	 * Get the value of the model's "right" field.
	 *
	 * @return int
	 */
	public function getRight() {
		return $this->getAttribute($this->getRightColumnName());
	}

	/**
	 * Get the "order" field column name.
	 *
	 * @return string
	 */
	public function getOrderColumnName() {
		return is_null($this->orderColumn) ? $this->getLeftColumnName() : $this->orderColumn;
	}

	/**
	 * Get the table qualified "order" field column name.
	 *
	 * @return string
	 */
	public function getQualifiedOrderColumnName() {
		return $this->getTable() . '.' . $this->getOrderColumnName();
	}

	/**
	 * Get the column names which define our scope
	 *
	 * @return array
	 */
	public function getScopedColumns() {
		return (array) $this->scoped;
	}

	/**
	 * Returns wether this particular node instance is scoped by certain fields
	 * or not.
	 *
	 * @return boolean
	 */
	public function isScoped() {
		return !!(count($this->getScopedColumns()) > 0);
	}

	/**
	 * Get a new "scoped" query builder for the Node's model.
	 *
	 * @param  bool  $excludeDeleted
	 * @return \Illuminate\Database\Eloquent\Builder|static
	 */
	public function newNestedSetQuery($excludeDeleted = true) {
		$builder = $this->newQuery($excludeDeleted)->orderBy($this->getQualifiedOrderColumnName());

		if ( $this->isScoped() ) {
			foreach($this->scoped as $scopeFld)
				$builder->where($scopeFld, '=', $this->$scopeFld);
		}

		return $builder;
	}

	/**
	 * Returns true if this is a root node.
	 *
	 * @return boolean
	 */
	public function isRoot() {
		return is_null($this->getParentId());
	}

	/**
	 * Make the node a child of ...
	 *
	 * @return  \Node
	 */
	public function makeChildOf($node) {
		return $this->moveTo($node, 'child');
	}

	/**
	 * Make current node a root node.
	 *
	 * @return  \Node
	 */
	public function makeRoot() {
		return $this->moveTo($this, 'root');
	}

	/**
	 * Equals?
	 *
	 * @param  \Node
	 * @return boolean
	 */
	public function equals($node) {
		return ($this == $node);
	}

	/**
	 * Checkes if the given node is in the same scope as the current one.
	 *
	 * @param  \Node
	 * @return boolean
	 */
	public function inSameScope($other) {
		foreach($this->getScopedColumns() as $fld) {
			if ( $this->$fld != $other->$fld ) return false;
		}

		return true;
	}

	/**
	 * Checks wether the given node is a descendant of itself. Basically, whether
	 * its in the subtree defined by the left and right indices.
	 *
	 * @param  \Node
	 * @return boolean
	 */
	public function insideSubtree($node) {
		return (
			$this->getLeft()  >= $node->getLeft()   &&
			$this->getLeft()  <= $node->getRight()  &&
			$this->getRight() >= $node->getLeft()   &&
			$this->getRight() <= $node->getRight()
		);
	}

	public function setDefaultLeftAndRight() {


		$withHighestRight = $this->newNestedSetQuery()->reOrderBy($this->getRightColumnName(), 'desc')->take(1)->sharedLock()->first();

		$maxRgt = 0;
		if ( !is_null($withHighestRight) ) $maxRgt = $withHighestRight->getRight();

		$this->setAttribute($this->getLeftColumnName()  , $maxRgt + 1);
		$this->setAttribute($this->getRightColumnName() , $maxRgt + 2);
	}

	protected function newBaseQueryBuilder()
	{
		$connection = $this->getConnection();

		return new NodeBuilder(
			$connection, $connection->getQueryGrammar(), $connection->getPostProcessor()
		);
	}

	/**
	 * Store the parent_id if the attribute is modified so as we are able to move
	 * the node to this new parent after saving.
	 *
	 * @return void
	 */
	public function storeNewParent() {
		if ( $this->isDirty($this->getParentColumnName()) && ($this->exists || !$this->isRoot()) )
			static::$moveToNewParentId = $this->getParentId();
		else
			static::$moveToNewParentId = FALSE;
	}

	/**
	 * Move to the new parent if appropiate.
	 *
	 * @return void
	 */
	public function moveToNewParent() {
		$pid = static::$moveToNewParentId;

		if ( is_null($pid) )
			$this->makeRoot();
		else if ( $pid !== FALSE )
			$this->makeChildOf($pid);
	}

	/**
	 * Prunes a branch off the tree, shifting all the elements on the right
	 * back to the left so the counts work.
	 *
	 * @return void;
	 */
	public function destroyDescendants() {
		if ( is_null($this->getRight()) || is_null($this->getLeft()) ) return;

		$self = $this;

		$this->getConnection()->transaction(function() use ($self) {
			$lftCol = $self->getLeftColumnName();
			$rgtCol = $self->getRightColumnName();
			$lft    = $self->getLeft();
			$rgt    = $self->getRight();

			// Apply a lock to the rows which fall past the deletion point
			$self->newNestedSetQuery()->where($lftCol, '>=', $lft)->select($self->getKeyName())->lockForUpdate()->get();

			// Prune children
			$self->newNestedSetQuery()->where($lftCol, '>', $lft)->where($rgtCol, '<', $rgt)->delete();

			// Update left and right indexes for the remaining nodes
			$diff = $rgt - $lft + 1;

			$self->newNestedSetQuery()->where($lftCol, '>', $rgt)->decrement($lftCol, $diff);
			$self->newNestedSetQuery()->where($rgtCol, '>', $rgt)->decrement($rgtCol, $diff);
		});
	}

	/**
	 * Main move method. Here we handle all node movements with the corresponding
	 * lft/rgt index updates.
	 */
	protected function moveTo($target, $position) {
		$model = new \App\Events\Dispatcher\Move($this, $target, $position);
		return $model::to($this, $target, $position);
	}
}