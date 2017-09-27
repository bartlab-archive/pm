<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('login', 255);
            $table->string('hashed_password', 40);
            $table->string('firstname', 30);
            $table->string('lastname', 255);
            $table->tinyInteger('admin')->default(0);
            $table->integer('status')->default(1);
            $table->dateTime('last_login_on')->nullable();
            $table->string('language', 5)->nullable();
            $table->integer('auth_source_id')->index('index_users_on_auth_source_id')->nullable();
            $table->dateTime('created_on')->nullable();
            $table->dateTime('updated_on')->nullable();
            $table->string('type', 255)->index('index_users_on_type')->nullable();
            $table->string('identity_url', 255)->nullable();
            $table->string('mail_notification', 255);
            $table->string('salt', 64)->nullable();
            $table->tinyInteger('must_change_passwd')->default(0);
            $table->dateTime('passwd_changed_on')->nullable();

            $table->index(['id', 'type'], 'index_users_on_id_and_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
