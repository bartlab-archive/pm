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
