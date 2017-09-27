<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CustomFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_fields', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('type', 30);
            $table->string('name', 30);
            $table->string('field_format', 30);
            $table->text('possible_values')->nullable();
            $table->string('regexp', 255)->nullable();
            $table->integer('min_length')->nullable();
            $table->integer('max_length')->nullable();
            $table->tinyInteger('is_required')->default(0);
            $table->tinyInteger('is_for_all')->default(0);
            $table->tinyInteger('is_filter')->default(0);
            $table->integer('position')->nullable();
            $table->tinyInteger('searchable')->nullable();
            $table->text('default_value')->nullable();
            $table->tinyInteger('editable')->default(1)->nullable();
            $table->tinyInteger('visible')->default(1);
            $table->tinyInteger('multiple')->default(0)->nullable();
            $table->text('format_store')->nullable();
            $table->text('description')->nullable();

            $table->index(['id', 'type'], 'index_custom_fields_on_id_and_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_fields');
    }
}
