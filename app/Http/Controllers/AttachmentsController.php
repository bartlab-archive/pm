<?php

namespace App\Http\Controllers;

use App\Services\AttachmentsService;
use App\Services\ProjectsService;
use Illuminate\Http\Request;

class AttachmentsController extends Controller
{
    public function __construct(ProjectsService $projectsService,
                                AttachmentsService $attachmentsService)
    {
        $this->projectsService = $projectsService;
        $this->attachmentsService = $attachmentsService;
    }

    public function index(Request $request)
    {
        $this->validate($request, ['project_id' => 'numeric']);
        return $this->projectsService->getAttachments($request->identifier);
    }

    public function download($id)
    {
        if($path = $this->projectsService->getAttachmentPath($id)){
            return response()->file($path);
        }
        abort(404);
    }

    public function delete($id)
    {
        if($this->attachmentsService->delete($id)){
            return response(null, 204);
        }
        abort(404);
    }
}
