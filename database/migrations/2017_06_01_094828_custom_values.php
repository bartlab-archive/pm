<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CustomValues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_values', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('customized_type', 30);
            $table->integer('customized_id')->default(0);
            $table->integer('custom_field_id')->index('index_custom_values_on_custom_field_id')->default(0);
            $table->text('value')->nullable();

            $table->index(['customized_type', 'customized_id'], 'custom_values_customized');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_values');
    }
}
