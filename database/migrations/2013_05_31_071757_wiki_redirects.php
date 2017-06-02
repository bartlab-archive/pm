<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WikiRedirects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wiki_redirects', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('wiki_id')->index('index_wiki_redirects_on_wiki_id');
            $table->string('title', 255)->nullable();
            $table->string('redirects_to', 255)->nullable();
            $table->dateTime('created_on');
            $table->integer('redirects_to_wiki_id');

            $table->index(['wiki_id', 'title'], 'wiki_redirects_wiki_id_title');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wiki_redirects');
    }
}
