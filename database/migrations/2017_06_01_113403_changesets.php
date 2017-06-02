<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Changesets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('changesets', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('repository_id')->index('index_changesets_on_repository_id');
            $table->string('revision', 255);
            $table->string('committer', 255)->nullable();
            $table->dateTime('committed_on')->index('index_changesets_on_committed_on');
            $table->longText('comments')->nullable();
            $table->date('commit_date')->nullable();
            $table->string('scmid', 255)->nullable();
            $table->integer('user_id')->nullable()->index('index_changesets_on_user_id');

            $table->index(['repository_id', 'revision'], 'changesets_repos_rev');
            $table->index(['repository_id', 'scmid'], 'changesets_repos_scmid');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('changesets');
    }
}
