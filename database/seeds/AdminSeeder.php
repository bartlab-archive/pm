<?php

use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'login' => 'admin',
            'hashed_password' => md5('password'),
            'firstname' => 'Test',
            'lastname' => 'Admin',
            'admin' => 1,
            'mail_notification' => 'test'
        ]);
    }
}
