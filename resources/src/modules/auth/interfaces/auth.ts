export interface User {
    id: number;
    login: string;
    avatar: string;
    full_name: string;
    created_on: string;
    last_login_on: string;
}

export interface LoginData {
    login: string;
    password: string;
}

export interface LoginResponseData {
    user: User;
    value: string;
}

export interface LoginResponse {
    data: LoginResponseData;
}

export interface AuthData {
    user: User;
    token: string;
}

export interface RegisterData {
    login: string;
    passwords: string;
    repeat_password: string;
    first_name: string;
    last_name: string;
    email: string;
    hide_email: boolean;
    language: string;
}

export interface RegisterResponseData {
    message?: string;
    user?: User;
    value?: string;
}

export interface RegisterResponse {
    data: RegisterResponseData;
    status: number
    code: number
    statusCode: number
}

export interface RegisterResult {
    message: string;
    auth: AuthData;
}
