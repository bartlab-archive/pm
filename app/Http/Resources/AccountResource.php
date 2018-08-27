<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

// todo: extend from UserResource

class AccountResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        $email = $this->emails->firstWhere('is_default', true);

        return [
            'id' => $this->id,
            'login' => $this->login,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'language' => $this->language,
            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
//            'last_login_on' => $this->last_login_on->format('Y-m-d H:i:s'),
            $this->mergeWhen(!empty($this->last_login_on), function () {
                return [
                    'last_login_on' => $this->last_login_on->format('Y-m-d H:i:s')
                ];
            }),
            'emails' => EmailResource::collection($this->whenLoaded('emails')),
            'mail_notification' => $this->mail_notification,
            'tokens' => TokenResource::collection(
                $this->whenLoaded('tokens', $this->tokens()->whereIn('action', ['api', 'feeds'])->get())
            ),
            'preference' => UserPreferenceResource::make($this->whenLoaded('preference')),
            $this->mergeWhen($email !== null, function () use ($email) {
                return [
                    'avatar' => '//www.gravatar.com/avatar/' . md5(strtolower(trim($email->address))) . '?rating=PG&default=mp'
                ];
            }),
        ];
    }
}
