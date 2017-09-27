<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Repositories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repositories', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('project_id')->index('index_repositories_on_project_id');
            $table->string('url', 255)->default('');
            $table->string('login', 60)->nullable();
            $table->string('password', 255)->nullable();
            $table->string('root_url', 255)->nullable();
            $table->string('type', 255)->nullable();
            $table->string('path_encoding', 64)->nullable();
            $table->string('log_encoding', 64)->nullable();
            $table->text('extra_info')->nullable();
            $table->string('identifier', 255)->nullable();
            $table->tinyInteger('is_default')->default(0);
            $table->dateTime('created_on')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repositories');
    }
}
