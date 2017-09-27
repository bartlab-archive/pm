<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WikiContents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wiki_contents', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('page_id')->index('wiki_contents_page_id');
            $table->integer('author_id')->index('index_wiki_contents_on_author_id')->nullable();
            $table->longText('text')->nullable();
            $table->string('comments', 1024)->nullable();
            $table->dateTime('updated_on');
            $table->integer('version');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wiki_contents');
    }
}
