export interface ModuleMenu {
    title: string;
    path: string;
}

export interface ModuleSettings {
    title: string;
    path: string;
}

export interface BaseModule {
    title: string;
    name: string;
    optional: boolean;
    enabled?: boolean;
}

export interface AppModule extends BaseModule {
    menus?: ModuleMenu[];
    settings?: ModuleSettings[];
}
