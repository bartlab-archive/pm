<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OpenIdAuthenticationAssociations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('open_id_authentication_associations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('issued')->nullable();
            $table->integer('lifetime')->nullable();
            $table->string('handle', 255)->nullable();
            $table->string('assoc_type', 255)->nullable();
            $table->binary('server_url')->nullable();
            $table->binary('secret')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('open_id_authentication_associations');
    }
}
