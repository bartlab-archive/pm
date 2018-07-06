<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class UserResource extends Resource
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
            'full_name' => $this->full_name,
            'login' => $this->login,
            'avatar' => $this->avatar,
            $this->mergeWhen(\Auth::user() && \Auth::user()->admin, ['request' => $this->admin]),
            $this->mergeWhen($this->type !== 'User', ['is_group' => true]),
//            'is_group' => $this->type !== 'User',
            'created_on' => $this->created_on->format('Y-m-d H:i:s'),
            $this->mergeWhen(!empty($this->last_login_on), function () {
                return ['last_login_on' => $this->last_login_on->format('Y-m-d H:i:s')];
            })
        ];
    }
}
