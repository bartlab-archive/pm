<?php

namespace App\Services;

use App\Models\Attachment;
use File;
use Illuminate\Support\Facades\DB;

class AttachmentsService
{
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
        return $path = storage_path('uploads/' . $this->getFilePath($id));
    }

    public function getFilePath($id)
    {
        $attachment = Attachment::find($id);
        if($attachment){
            return $attachment->disk_directory . '/' . $attachment->disk_filename;
        }
        return null;
    }
}