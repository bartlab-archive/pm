<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Journals extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('journalized_id')->index('index_journals_on_journalized_id');
            $table->string('journalized_type', 30);
            $table->integer('user_id')->index('index_journals_on_user_id');
            $table->text('notes')->nullable();
            $table->dateTime('created_on')->index('index_journals_on_created_on');
            $table->tinyInteger('private_notes')->default(0);

            $table->index(['journalized_id', 'journalized_type'], 'journals_journalized_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('journals');
    }
}
