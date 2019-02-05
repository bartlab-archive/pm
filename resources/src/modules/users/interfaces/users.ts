export enum UsersStatus {
    ACTIVE = 1,
    REGISTERED = 2,
    LOCKED = 3,
}


export const UsersStatusNames = [
    {
        id: UsersStatus.ACTIVE,
        name: 'Active'
    },
    {
        id: UsersStatus.REGISTERED,
        name: 'Registered'
    },
    {
        id: UsersStatus.LOCKED,
        name: 'Locked'
    },
];

export interface Status {
    id: number,
    name: string,
}

export interface PaginationParams {
    page: number;
    per_page: number;
    order?: string[];
    status?: number[];
}

export interface Email {
    address: string;
    is_default: boolean;
    notify: boolean;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: string;
    to: number;
    total: number;
}

export interface User {
    id: number;
    full_name: string;
    login: string;
    avatar: string;
    language: string;
    mail_notification: string;
    emails: Email[];
    email: string;
    firstname: string;
    lastname: string;
    status: number;
    request: boolean;
    created_on: string;
    last_login_on: string;
}

export interface UserUpdate{
    login?: string;
    firstname?: string;
    lastname?: string;
    status?: number;
    email?: string;
    password?: string;
    repeat_rassword?: string;
}

export interface UserUpdateRequest {
    id: number;
    body: UserUpdate;
}

export interface UserResponse {
    data: User;
}

export interface ListResponse {
    data: User[];
    meta: Meta;
}

export interface Entities<T> {
    [key: string]: T;
}
