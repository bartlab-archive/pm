<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Projects extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('homepage')->nullable();
            $table->tinyInteger('is_public')->default(1);
            $table->integer('parent_id')->nullable();
            $table->dateTime('created_on')->nullable();
            $table->dateTime('updated_on')->nullable();
            $table->string('identifier')->nullable();
            $table->integer('status')->default(1);
            $table->integer('lft')->nullable()->index('index_projects_on_lft');
            $table->integer('rgt')->nullable()->index('index_projects_on_rgt');
            $table->tinyInteger('inherit_members')->defaul(0);
            $table->integer('default_version_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
