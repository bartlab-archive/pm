<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Workflows extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workflows', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('tracker_id')->default(0);
            $table->integer('old_status_id')->default(0)->index('index_workflows_on_old_status_id');
            $table->integer('new_status_id')->default(0)->index('index_workflows_on_new_status_id');
            $table->integer('role_id')->default(0)->index('index_workflows_on_role_id');
            $table->tinyInteger('assignee')->default(0);
            $table->tinyInteger('author')->default(0);
            $table->string('type', 30)->nullable();
            $table->string('field_name', 30)->nullable();
            $table->string('rule', 30)->nullable();

            $table->index(['role_id', 'tracker_id', 'old_status_id'], 'wkfs_role_tracker_old_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workflows');
    }
}
