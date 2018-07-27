<?php

namespace App\Http\Resources;

use App\Services\ProjectsService;
use App\Services\UsersService;
use Illuminate\Http\Resources\Json\Resource;

class ProjectResource extends Resource
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
            'name' => $this->name,
            'description' => $this->description,
            'homepage' => $this->homepage,
            'parent' => self::make($this->whenLoaded('parent')),
            $this->mergeWhen(\Auth::admin() && !empty($this->created_on), function () {
                return [
                    'created_on' => $this->created_on->format('Y-m-d H:i:s')
                ];
            }),
            $this->mergeWhen(\Auth::admin() && !empty($this->updated_on), function () {
                return [
                    'updated_on' => $this->updated_on->format('Y-m-d H:i:s')
                ];
            }),
            $this->mergeWhen($this->isMember(), [
                'is_public' => $this->is_public,
                'inherit_members' => $this->inherit_members,
                'default_version_id' => $this->default_version_id,
                'trackers' => TrackerResource::collection($this->whenLoaded('trackers')),
                'modules' => ModuleResource::collection($this->whenLoaded('enabledModules')),
            ]),
            'identifier' => $this->identifier,
            'status' => $this->status,
            'is_my' => $this->isMy(),
            'members' => MemberResource::collection($this->whenLoaded('members')),
        ];
    }

    protected function isMember()
    {
        if (\Auth::admin()) {
            return true;
        }

        // check user for the right to view issues in this project
        return app(ProjectsService::class)->isMember(
            $this->id,
            app(UsersService::class)->memberIds(\Auth::id())
        );
    }

    protected function isMy()
    {
        if (\Auth::guest()) {
            return false;
        }

        return app(ProjectsService::class)->isMember(
            $this->id,
            app(UsersService::class)->memberIds(\Auth::id(), false)
        );
    }
}
