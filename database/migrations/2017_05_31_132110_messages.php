<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Messages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('board_id')->index('messages_board_id');
            $table->integer('parent_id')->index('messages_parent_id')->nullable();
            $table->string('subject', 255);
            $table->text('content')->nullable();
            $table->integer('author_id')->nullable()->index('index_messages_on_author_id')->nullable();
            $table->integer('replies_count')->default(0);
            $table->integer('last_reply_id')->nullable()->index('index_messages_on_last_reply_id');
            $table->dateTime('created_on')->index('index_messages_on_created_on');
            $table->dateTime('updated_on');
            $table->tinyInteger('locked')->default(0)->nullable();
            $table->integer('sticky')->default(0)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
