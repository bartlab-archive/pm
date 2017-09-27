<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class IssueRelations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issue_relations', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('issue_from_id')->index('index_issue_relations_on_issue_from_id');
            $table->integer('issue_to_id')->index('index_issue_relations_on_issue_to_id');
            $table->string('relation_type', 255);
            $table->integer('delay')->nullable();

            $table->unique(['issue_from_id', 'issue_to_id'], 'index_issue_relations_on_issue_from_id_and_issue_to_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issue_relations');
    }
}
