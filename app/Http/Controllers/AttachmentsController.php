<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attachments\UpdateAttachmentRequest;
use App\Services\AttachmentsService;
use App\Services\ProjectsService;
use Illuminate\Http\Request;
use App\Http\Requests\Attachments\UploadAttachmentRequest;
use App\Http\Resources\AttachmentResource;

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
        if(! $attachment = $this->attachmentsService->one($id)) {
            return response(null, 404);
        }

        if($path = $this->attachmentsService->getFullFilePath($id)){
            return response()->file($path);
        }
    }

    public function delete($id)
    {
        if(! $attachment = $this->attachmentsService->one($id)) {
            return response(null, 404);
        }

        if($attachment->author_id != \Auth::id()) {
            return response(null, 403);
        }

        if(! $this->attachmentsService->delete($id)){
            return response(null, 404);
        }

        return response(null, 204);
    }

    public function update($id, UpdateAttachmentRequest $request) {
        if(! $attachment = $this->attachmentsService->one($id)) {
            return response(null, 404);
        }

        if($attachment->author_id != \Auth::id()) {
            return response(null, 403);
        }
        if(! $this->attachmentsService->update($id, $request->validated())){
            return response(null, 404);
        }

        return response(null, 204);
    }

    public function upload(UploadAttachmentRequest $request) {

        if(! $data = $request->validated()) {
            return response(null, 422);
        }

        $result = $this->attachmentsService->upload(array_only($data, [
            'file_name',
            'file_total_size',
            'chunk_amount',
            'file_chunk_id',
            'file_total_size',
            'description'
        ]), $request->file('file_content'), \Auth::id());

        switch($result['status']) {
            case $this->attachmentsService::UPLOAD_STATUS_SUCCESS:
                return AttachmentResource::make($result['attachment']);
                break;
            case $this->attachmentsService::FILE_NOT_MOVED:
                return response('File was not moved.');
                break;
            case $this->attachmentsService::FILE_SIZE_NOT_MATCH:
                return response("Filesize did not match. Local filesize {$result['filesize_local']}"
                    . ", expected filesize {$request->get('file_total_size')}");
                break;
            case $this->attachmentsService::CHUNK_AMOUNT_NOT_REACHED:
                return response("Chunk amount {$request->get('chunk_amount')} was not reached, "
                . "{$result['chunk_amount_local']} currently.");
                break;
            default:
                return response('Unknown result', 520);
        }
    }
}
