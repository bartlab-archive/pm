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

export interface RegisterResponse {
    message?: string;
    data?: LoginResponseData;
}

export interface RegisterResult {
    auth: AuthData;
    message: string;
}

export interface ResultMessage {
    message: string;
}

export interface ResetData {
    email: string;
}

export interface ResetResponseData {
    message: string;
}
