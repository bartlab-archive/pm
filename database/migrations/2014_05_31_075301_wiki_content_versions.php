<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WikiContentVersions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wiki_content_versions', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('wiki_content_id')->index('wiki_content_versions_wcid');
            $table->integer('page_id');
            $table->integer('author_id')->nullable();
            $table->binary('data')->nullable();
            $table->string('compression', 6)->nullable();
            $table->string('comments', 1024)->nullable();
            $table->dateTime('updated_on')->index('index_wiki_content_versions_on_updated_on');
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
        Schema::dropIfExists('wiki_content_versions');
    }
}
