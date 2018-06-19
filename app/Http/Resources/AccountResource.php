<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

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
        return [
            'id' => $this->id,
            'login' => $this->login,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'language' => $this->language,
            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
            'last_login_on' => $this->last_login_on->format('Y-m-d H:i:s'),
            'emails' => EmailResource::collection($this->whenLoaded('emails')),
//            'additional_emails' => EmailResource::collection($this->whenLoaded('additional_emails')),
            'mail_notification' => $this->mail_notification,
            'tokens' => TokenResource::collection($this->whenLoaded('tokens')),
            'preference' => UserPreferenceResource::make($this->whenLoaded('preference')),
            'avatar' => $this->avatar,
//            'updated_on' => $this->updated_on,
        ];
    }
}
