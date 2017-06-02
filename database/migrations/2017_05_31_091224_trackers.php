<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Trackers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trackers', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('name');
            $table->tinyInteger('is_in_chlog')->deffault(0);
            $table->integer('position')->deffault(0)->nullable();
            $table->tinyInteger('is_in_roadmap')->deffault(1);
            $table->integer('fields_bits')->deffault(0)->nullable();
            $table->integer('default_status_id')->nullable()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('trackers');
    }
}
