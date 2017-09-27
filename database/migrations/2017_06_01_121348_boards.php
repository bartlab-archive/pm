<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Boards extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('boards', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('project_id')->index('boards_project_id');
            $table->string('name', 255);
            $table->string('description', 255)->nullable();
            $table->integer('position')->nullable();
            $table->integer('topics_count');
            $table->integer('messages_count');
            $table->integer('last_message_id')->nullable()->index('index_boards_on_last_message_id');
            $table->integer('parent_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('boards');
    }
}
