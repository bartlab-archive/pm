<?php

namespace App\Services;

use App\Models\Attachment;
use File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class AttachmentsService
{
    const UPLOAD_STATUS_SUCCESS = 'UPLOAD_STATUS_SUCCESS';
    const FILE_NOT_MOVED = 'FILE_NOT_MOVED';
    const FILE_SIZE_NOT_MATCH = 'FILE_SIZE_NOT_MATCH';
    const CHUNK_AMOUNT_NOT_REACHED = 'CHUNK_AMOUNT_NOT_REACHED';
    
    public function one($id)
    {
        return Attachment::query()
            ->where('id', $id)
            ->first();
    }

    public function delete($id)
    {

        DB::beginTransaction();
        $filePath = $this->getFullFilePath($id);
        if (($result = Attachment::destroy($id)) && is_file($filePath)) {
            if (!$result = File::delete($filePath)) {
                DB::rollBack();
            }
        }
        DB::commit();
        return $result;

    }

    public function getFullFilePath($id)
    {
        return storage_path() . env('UPLOADS_PATH') . '/' . $this->getFilePath($id);
    }

    public function getFilePath($id)
    {
        $attachment = Attachment::find($id);
        if($attachment){
            return $attachment->disk_directory . '/' . $attachment->disk_filename;
        }

        return null;
    }

    public function create(array $data) {
        $attachment = Attachment::make(array_only($data, [
            'filename',
            'author_id',
            'disk_filename',
            'disk_directory',
            'filesize',
            'description'
        ]));

        if($attachment->save()) {
            return $attachment;
        }

        return false;
    }

    public function update($id, array $data) {
        if($attachment = $this->one($id)) {
            return $attachment->update($data);
        }

        return false;
    }

    public function upload($fields, UploadedFile $file, $userId) {
        
        $returnArray = [];
        $storagePath = storage_path() . env('UPLOADS_PATH');
        $currentFilePath = $storagePath . '/user-' . $userId . '/' . '_' . $fields['file_name'];

        if(! is_dir($storagePath . '/user-' . $userId)) {
            @mkdir($storagePath . '/user-' . $userId, 0777, true);
        }

        if(! is_dir($currentFilePath)) {
            @mkdir($currentFilePath, 0777, true);
        }

        $file->move($currentFilePath, $fields['file_chunk_id']);

        $chunkFilesList = array_sort(array_slice(scandir($currentFilePath), 2));
        $returnArray['chunk_amount_local'] = count($chunkFilesList);

        if($returnArray['chunk_amount_local'] == $fields['chunk_amount']) {
            $endFilePath = $storagePath . '/user-' . $userId . '/' . $fields['file_name'];
            $endFile = fopen($endFilePath, 'a+');

            foreach($chunkFilesList as $chunkFile) {
                $chunkFp = fopen($currentFilePath . '/' . $chunkFile, 'r');
                $chunkBinaryString = fread($chunkFp, filesize($currentFilePath . '/' . $chunkFile));
                fwrite($endFile, $chunkBinaryString);
                fclose($chunkFp);
                if(file_exists($currentFilePath . '/' . $chunkFile)) {
                    @unlink($currentFilePath . '/' . $chunkFile);
                }
            }

            fclose($endFile);

            $returnArray['filesize_local'] = filesize($endFilePath);
            
            if($returnArray['filesize_local'] == $fields['file_total_size']) {
                $newFilename = time() . '_' . $fields['file_name'];
                $dateDirectory = date('Y/m');

                if(! is_dir($storagePath . '/' . $dateDirectory)) {
                    @mkdir($storagePath . '/' . $dateDirectory, 0777, true);
                }

                if(rename($endFilePath, $storagePath . '/' . $dateDirectory . '/' . $newFilename)) {

                    $attachment = $this->create([
                        'filename' => $fields['file_name'],
                        'author_id' => $userId,
                        'disk_filename' => $newFilename,
                        'disk_directory' => $dateDirectory,
                        'filesize' => $fields['file_total_size'],
                        'description' => isset($fields['description']) ? $fields['description'] : ''
                    ]);

                    @rmdir($currentFilePath);
                    @unlink($endFilePath);
//                    if(count(scandir($storagePath . '/user-' . $userId)) - 2 == 0) {
//                        @rmdir($storagePath . '/user-' . $userId);
//                    }

                    return array_merge($returnArray, ['status' => self::UPLOAD_STATUS_SUCCESS, 'attachment' => $attachment]);

                } else {
                    return  array_merge($returnArray, ['status' => self::FILE_NOT_MOVED]); 
                }

            } else {
                return  array_merge($returnArray, ['status' => self::FILE_SIZE_NOT_MATCH]);
            }

        } else {
            return array_merge($returnArray, ['status' => self::CHUNK_AMOUNT_NOT_REACHED]);
        }
    }
}