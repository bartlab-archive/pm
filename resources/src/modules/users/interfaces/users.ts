
export interface PaginationParams {
    page: number;
    per_page: number;
    order?: string[];
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
    firstname: string;
    lastname: string;
    status: number;
    request: boolean;
    created_on: string;
    last_login_on: string;
}

export interface ProjectResponse {
    data: User;
}

export interface ListResponse {
    data: User[];
    meta: Meta;
}

export interface Entities<T> {
    [key: string]: T;
}
