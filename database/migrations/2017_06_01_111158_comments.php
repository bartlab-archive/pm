<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Comments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('commented_type', 30);
            $table->integer('commented_id')->default(0);
            $table->integer('author_id')->default(0)->index('index_comments_on_author_id');
            $table->text('comments')->nullable();
            $table->dateTime('created_on');
            $table->dateTime('updated_on');

            $table->index(['commented_id', 'commented_type'], 'index_comments_on_commented_id_and_commented_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
