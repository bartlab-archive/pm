<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Members extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('user_id')->default(0)->index('index_members_on_user_id');
            $table->integer('project_id')->default(0)->index('index_members_on_project_id');
            $table->dateTime('created_on')->nullable();
            $table->tinyInteger('mail_notification')->default(0);

            $table->unique(['user_id', 'project_id'], 'index_members_on_user_id_and_project_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
}
