<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Roles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('name', 30);
            $table->integer('position')->nullable();
            $table->tinyInteger('assignable')->default(1)->nullable();
            $table->integer('builtin')->default(0);
            $table->text('permissions')->nullable();
            $table->string('issues_visibility', 30)->default('default');
            $table->string('users_visibility', 30)->default('all');
            $table->string('time_entries_visibility', 30)->default('all');
            $table->tinyInteger('all_roles_managed')->default(1);
            $table->text('settings')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
}
