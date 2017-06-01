<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CustomFieldsRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('custom_fields_roles', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->integer('custom_field_id');
            $table->integer('role_id');

            $table->unique(['custom_field_id', 'role_id'], 'custom_fields_roles_ids');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('custom_fields_roles');
    }
}
