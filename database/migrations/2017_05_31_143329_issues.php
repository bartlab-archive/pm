<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Issues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('tracker_id')->index('index_issues_on_tracker_id');
            $table->integer('project_id')->index('issues_project_id');
            $table->string('subject', 255);
            $table->text('description')->nullable();
            $table->date('due_date')->nullable();
            $table->integer('category_id')->nullable()->index('index_issues_on_category_id');
            $table->integer('status_id')->index('index_issues_on_status_id');
            $table->integer('assigned_to_id')->nullable()->index('index_issues_on_assigned_to_id');
            $table->integer('priority_id')->index('index_issues_on_priority_id');
            $table->integer('fixed_version_id')->nullable()->index('index_issues_on_fixed_version_id');
            $table->integer('author_id')->index('index_issues_on_author_id');
            $table->integer('lock_version')->default(0);
            $table->dateTime('created_on')->nullable()->index('index_issues_on_created_on');
            $table->dateTime('updated_on')->nullable();
            $table->date('start_date')->nullable();
            $table->integer('done_ratio')->default(0);
            $table->float('estimated_hours')->nullable();
            $table->integer('parent_id')->nullable();
            $table->integer('root_id')->nullable();
            $table->integer('lft')->nullable();
            $table->integer('rgt')->nullable();
            $table->tinyInteger('is_private')->default(0);
            $table->dateTime('closed_on')->nullable();

            $table->index(['root_id', 'lft', 'rgt'], 'index_issues_on_root_id_and_lft_and_rgt');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues');
    }
}
