<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CustomFieldsProjects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_fields_projects', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->integer('custom_field_id')->default(0);
            $table->integer('project_id')->default(0);

            $table->unique(['custom_field_id', 'project_id'], 'index_custom_fields_projects_on_custom_field_id_and_project_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_fields_projects');
    }
}
