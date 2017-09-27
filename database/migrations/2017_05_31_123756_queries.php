<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Queries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('queries', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('project_id')->nullable()->index('index_queries_on_project_id');
            $table->string('name', 255);
            $table->text('filters')->nullable();
            $table->integer('user_id')->default(0)->index('index_queries_on_user_id');
            $table->text('column_names')->nullable();
            $table->text('sort_criteria')->nullable();
            $table->string('group_by', 255)->nullable();
            $table->string('type', 255)->nullable();
            $table->integer('visibility')->default(0)->nullable();
            $table->text('options')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('queries');
    }
}
