<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++)
            DB::table('users')->insert([
                'login' => 'user'.$i,
                'hashed_password' => md5('password'.$i),
                'firstname' => 'User_'.$i,
                'lastname' => 'LastName_'.$i,
                'mail_notification' => 'test_'.$i
            ]);
    }
}
