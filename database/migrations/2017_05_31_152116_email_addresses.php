<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EmailAddresses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_addresses', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->integer('user_id')->index('index_email_addresses_on_user_id');
            $table->string('address', 255);
            $table->tinyInteger('is_default')->default(0);
            $table->tinyInteger('notify')->default(1);
            $table->dateTime('created_on');
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
        Schema::dropIfExists('email_addresses');
    }
}
