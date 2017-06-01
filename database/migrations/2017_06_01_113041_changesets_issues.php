<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangesetsIssues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('changesets_issues', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->integer('changeset_id');
            $table->integer('issue_id');

            $table->unique(['changeset_id', 'issue_id'], 'changesets_issues_ids');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('changesets_issues');
    }
}
