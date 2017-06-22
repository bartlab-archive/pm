<?php

namespace App\Http\Controllers;

use App\Services\ProjectsService;
use Illuminate\Http\Request;

class AttachmentController extends Controller
{
    public function __construct(ProjectsService $projectsService)
    {
        $this->projectsService = $projectsService;
    }

    public function index(Request $request)
    {
        $this->validate($request, ['project_id' => 'numeric']);
        return $this->projectsService->getAttachments($request->only('project_id'));
    }
}
