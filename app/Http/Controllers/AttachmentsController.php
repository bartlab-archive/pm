<?php

namespace App\Http\Controllers;

use App\Http\Requests\Attachments\UpdateAttachmentRequest;
use App\Services\AttachmentsService;
use App\Services\ProjectsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
        if($path = $this->projectsService->getAttachmentPath($id)){
            return response()->file($path);
        }
        abort(404);
    }

    public function delete($id)
    {
        if(! $attachment = $this->attachmentsService->one($id)) {
            return response(null, 404);
        }

        if($attachment->author_id != \Auth::id()) {
            return response(null, 403);
        }

        if($this->attachmentsService->delete($id)){
            return response(null, 204);
        }

        abort(404);
    }

    public function update($id, UpdateAttachmentRequest $request) {
        if(! $attachment = $this->attachmentsService->one($id)) {
            return response(null, 404);
        }

        if($attachment->author_id != \Auth::id()) {
            return response(null, 403);
        }
        if($this->attachmentsService->update($id, $request->validated())){
            return response(null, 204);
        }

        abort(404);
    }

    public function upload(UploadAttachmentRequest $request) {

        if(! $request->validated()) {
            abort(422);
        }

        $storagePath = storage_path() . '/app/public/uploads';

        $currentFilePath = $storagePath . '/user-' . \Auth::id() . '/' . '_' . $request->get('file_name');

        if(! is_dir($storagePath . '/user-' . \Auth::id())) {
            mkdir($storagePath . '/user-' . \Auth::id(), 0777, true);
        }

        if(! is_dir($currentFilePath)) {
            mkdir($currentFilePath, 0777, true);
        }

        $request->file('file_content')->move($currentFilePath, $request->get('file_chunk_id'));

        $chunkFilesList = array_sort(array_slice(scandir($currentFilePath), 2));

        if(count($chunkFilesList) == $request->get('chunk_amount')) {
            $endFilePath = $storagePath . '/user-' . \Auth::id() . '/' . $request->get('file_name');
            $endFile = fopen($endFilePath, 'a+');

            foreach($chunkFilesList as $chunkFile) {
                var_dump(array_sort(array_slice(scandir($currentFilePath), 2)));
                $chunkFp = fopen($currentFilePath . '/' . $chunkFile, 'r');
                $chunkBinaryString = fread($chunkFp, filesize($currentFilePath . '/' . $chunkFile));
                fwrite($endFile, $chunkBinaryString);
                fclose($chunkFp);
                if(file_exists($currentFilePath . '/' . $chunkFile)) {
                    unlink($currentFilePath . '/' . $chunkFile);
                }
            }

            fclose($endFile);


            if(filesize($endFilePath) == $request->get('file_total_size')) {
                $newFilename = time() . '_' . $request->get('file_name');
                $dateDirectory = date('Y/m');

                if(! is_dir($storagePath . '/' . $dateDirectory)) {
                    mkdir($storagePath . '/' . $dateDirectory, 0777, true);
                }

                if(rename($endFilePath, $storagePath . '/' . $dateDirectory . '/' . $newFilename)) {

                    $attachment = $this->attachmentsService->create([
                        'filename' => $request->get('file_name'),
                        'author_id' => \Auth::id(),
                        'disk_filename' => $newFilename,
                        'disk_directory' => $dateDirectory,
                        'filesize' => $request->get('file_total_size'),
                        'description' => $request->get('description')
                    ]);

                    rmdir($currentFilePath);
//                    if(scandir($storagePath . '/user-' . \Auth::id()) - 2 == 0) {
                        rmdir($storagePath . '/user-' . \Auth::id());
//                    }

                    return AttachmentResource::make($attachment);
                }
            }
        }

        // todo: need to add cron job to remove chunk non-full set and long time unused uploaded files

    }
}
