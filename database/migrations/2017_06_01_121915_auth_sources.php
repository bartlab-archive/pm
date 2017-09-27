<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AuthSources extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auth_sources', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('id');
            $table->string('type', 30);
            $table->string('name', 60);
            $table->string('host', 60)->nullable();
            $table->integer('port')->nullable();
            $table->string('account', 255)->nullable();
            $table->string('account_password', 255)->nullable();
            $table->string('base_dn', 255)->nullable();
            $table->string('attr_login', 30)->nullable();
            $table->string('attr_firstname', 30)->nullable();
            $table->string('attr_lastname', 30)->nullable();
            $table->string('attr_mail', 30)->nullable();
            $table->tinyInteger('onthefly_register')->default(0);
            $table->tinyInteger('tls')->default(0);
            $table->text('filter')->nullable();
            $table->integer('timeout')->nullable();

            $table->index(['id', 'type'], 'index_auth_sources_on_id_and_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auth_sources');
    }
}
