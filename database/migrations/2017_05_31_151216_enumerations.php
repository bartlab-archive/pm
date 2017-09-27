<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Enumerations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enumerations', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('name', 30);
            $table->integer('position')->nullable();
            $table->tinyInteger('is_default')->default(0);
            $table->string('type', 255)->nullable();
            $table->tinyInteger('active')->default(1);
            $table->integer('project_id')->nullable()->index('index_enumerations_on_project_id');
            $table->integer('parent_id')->nullable();
            $table->string('position_name', 30)->nullable();

            $table->index(['id', 'type'], 'index_enumerations_on_id_and_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enumerations');
    }
}
