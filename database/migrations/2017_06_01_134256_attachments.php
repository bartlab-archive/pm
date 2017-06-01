<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Attachments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('container_id')->nullable();
            $table->string('container_type', 30)->nullable();
            $table->string('filename', 255);
            $table->string('disk_filename', 255);
            $table->bigInteger('filesize')->default(0);
            $table->string('content_type')->nullable();
            $table->string('digest', 40);
            $table->integer('downloads')->default(0);
            $table->integer('author_id')->index('index_attachments_on_author_id')->default(0);
            $table->dateTime('created_on')->index('index_attachments_on_created_on')->nullable();
            $table->string('description')->nullable();
            $table->string('disk_directory', 255)->nullable();

            $table->index(['container_id', 'container_type'], 'index_attachments_on_container_id_and_container_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attachments');
    }
}
