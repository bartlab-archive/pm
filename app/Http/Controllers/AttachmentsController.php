<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attachments\UpdateAttachmentRequest;
use App\Services\AttachmentsService;
use App\Services\ProjectsService;
use App\Http\Requests\Attachments\UploadAttachmentRequest;
use App\Http\Resources\AttachmentResource;

class AttachmentsController extends Controller
{
    protected $attachmentsService;
    protected $projectsService;

    public function __construct(
        ProjectsService $projectsService,
        AttachmentsService $attachmentsService
    )
    {
        $this->projectsService = $projectsService;
        $this->attachmentsService = $attachmentsService;
    }

    public function download($id)
    {
//        if (!$attachment = $this->attachmentsService->one($id)) {
//            abort(404);
//        }

        if (!($path = $this->attachmentsService->path($id)) || !is_file($path) || !is_readable($path)) {
            abort(404);
        }

        // todo: move to resource
        return response()->json([
            'content' => base64_encode(file_get_contents($path))
        ]);
    }

    public function delete($id)
    {
        if (!$attachment = $this->attachmentsService->one($id)) {
            return abort(404);
        }

        if ($attachment->author_id !== \Auth::id()) {
            return response(null, 403);
        }

        if (!$this->attachmentsService->delete($id)) {
            return abort(404);
        }

        return response(null, 204);
    }

    public function update($id, UpdateAttachmentRequest $request)
    {
        if (!$attachment = $this->attachmentsService->one($id)) {
            return abort(404);
        }

        if ($attachment->author_id !== \Auth::id()) {
            return response(null, 403);
        }
        if (!$this->attachmentsService->update($id, $request->validated())) {
            return abort(404);
        }

        return response(null, 204);
    }

    public function upload(UploadAttachmentRequest $request)
    {

        $result = $this->attachmentsService->upload($request->validated(),
            $request->file('file_content'), \Auth::id());

        switch ($result['status']) {
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
                return response('Unknown result', 422);
        }
    }
}
