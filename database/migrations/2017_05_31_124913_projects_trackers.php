<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ProjectsTrackers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects_trackers', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->integer('project_id')->default(0)->index('projects_trackers_project_id');
            $table->integer('tracker_id')->default(0);

            $table->unique(['project_id', 'tracker_id'], 'projects_trackers_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects_trackers');
    }
}
