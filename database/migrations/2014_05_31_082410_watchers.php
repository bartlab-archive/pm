<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Watchers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('watchers', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('watchable_type', 255);
            $table->integer('watchable_id');
            $table->integer('user_id')->nullable()->index('index_watchers_on_user_id');

            $table->index(['watchable_id', 'watchable_type'], 'index_watchers_on_watchable_id_and_watchable_type');
            $table->index(['user_id', 'watchable_type'], 'watchers_user_id_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('watchers');
    }
}
