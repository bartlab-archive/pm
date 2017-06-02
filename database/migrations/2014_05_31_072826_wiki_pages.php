<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WikiPages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wiki_pages', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('wiki_id')->index('index_wiki_pages_on_wiki_id');
            $table->string('title', 255);
            $table->dateTime('created_on');
            $table->tinyInteger('protected')->default(0);
            $table->integer('parent_id')->nullable()->index('index_wiki_pages_on_parent_id');

            $table->index(['wiki_id', 'title'], 'wiki_pages_wiki_id_title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wiki_pages');
    }
}
