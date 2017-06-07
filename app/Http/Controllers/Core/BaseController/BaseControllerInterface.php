<?php

namespace App\Http\Controllers\Core\BaseController;


use Illuminate\Http\Request;

interface BaseControllerInterface
{
    public function index();
    public function show($id);
    public function create(Request $request);
    public function update(Request $request, $id);
    public function destroy($id);
}