<?php

namespace App\Http\Controllers\Auth;

use App\models\User;
use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __construct()
    {
        //TODO: take out check permission at middleware class
        $this->permission(
            Setting::where('name', Setting::setting_register_name)
                ->first(['value'])
                ->value
        );
    }

    public function register(Request $request)
    {
        $this->validate($request, $this->rules(), $this->messages());

        $request = $request->all();

        $user = $this->create($request);
        
        
    }

    /**
     * rules validation request params
     *
     * @return array
     */
    protected function rules()
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'login' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
            'language' => 'string'
        ];
    }

    /**
     * messages for rules validation
     *
     * @return array
     */
    protected function messages()
    {
        return [];
    }

    /**
     * This method created new user in system
     *
     * @param array $data
     * @return mixed
     */
    protected function create(array $data)
    {
        $salt = str_random(33);

        return User::create([
            'login' => $data['login'],
            'firstname' => $data['first_name'],
            'lastname' => $data['last_name'],
            'salt' => $salt,
            'hashed_password' => sha1($salt . sha1($data['password']))
        ]);
    }

    protected function permission(int $register_status)
    {
        switch ($register_status) {
            case 1:
                //TODO: created logic by register status === Settings::self_registration_account_activation_by_email
                break;
            case 2:
                //TODO: created logic by register status === Settings::self_registration_automatic_account_activation
                break;
            default:
                abort(403);
        }
    }
}
