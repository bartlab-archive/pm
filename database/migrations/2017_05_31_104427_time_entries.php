<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TimeEntries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_entries', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('project_id')->index('time_entries_project_id');
            $table->integer('user_id')->index('time_entries_issue_id');
            $table->integer('issue_id')->index('index_time_entries_on_user_id')->nullable();
            $table->float('hours'); // make double in DB;
            $table->string('comments', 1024)->nullable();
            $table->integer('activity_id')->index('index_time_entries_on_activity_id');
            $table->date('spent_on');
            $table->integer('tyear');
            $table->integer('tmonth');
            $table->integer('tweek');
            $table->dateTime('created_on')->index('index_time_entries_on_created_on');
            $table->dateTime('updated_on');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('time_entries');
    }
}
