<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class News extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('project_id')->nullable()->index('news_project_id');
            $table->string('title', 60);
            $table->string('summary', 255)->nullable();
            $table->text('description')->nullable();
            $table->integer('author_id')->index('index_news_on_author_id')->default(0);
            $table->dateTime('created_on')->nullable()->index('index_news_on_created_on');
            $table->integer('comments_count')->default(0);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
}
