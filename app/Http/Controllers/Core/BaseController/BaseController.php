<?php

namespace App\Http\Controllers\Core\BaseController;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Class BaseController
 *
 * @package App\Http\Controllers\Base
 */
abstract class BaseController extends Controller implements BaseControllerInterface
{
    /**
     * Get model class
     *
     * This method returns the model class name
     *
     * @return mixed
     */
    protected abstract function getModelClass();

    /**
     * Index
     *
     * This method returns the all data
     *
     * @return mixed
     */
    public function index()
    {
        return call_user_func([$this->getModelClass(), 'all']);
    }

    /**
     * Show
     *
     * This method returns the data find by param id
     *
     * @param $id
     * @return mixed
     */
    public function show($id)
    {
       return call_user_func([$this->getModelClass(), 'find'], $id);
    }

    /**
     * Update
     *
     * This method updates data by param id
     *
     * @param Request $request
     * @param $id
     * @return mixed
     */
    public function update(Request $request, $id)
    {
        return call_user_func([$this->getModelClass(), 'find'], $id)->update($request);
    }

    /**
     * Create
     *
     * This method creates data
     *
     * @param Request $request
     * @return mixed
     */
    public function create(Request $request)
    {
        return call_user_func([$this->getModelClass(), 'create'], $request);
    }

    /**
     * Destroy
     *
     * This method deletes data by param id
     *
     * @param $id
     * @return mixed
     */
    public function destroy($id)
    {
        return call_user_func([$this->getModelClass(), 'delete'], $id);
    }
}