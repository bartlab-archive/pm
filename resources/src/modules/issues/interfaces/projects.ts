export interface Member {
}

export interface Module {
}

export interface Project {
    default_version_id: string;
    description: string;
    homepage: string;
    identifier: string;
    inherit_members: boolean;
    is_my: boolean;
    is_public: boolean;
    members: Member[];
    modules: Module[];
    name: string;
    status: number;
}
