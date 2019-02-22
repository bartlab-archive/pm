import {Inject, Injectable} from '@angular/core';
import {
    AppModule,
    ModuleMenu,
    ModuleSettings,
} from '../../../app/interfaces/module';
import {Project} from '../interfaces/projects';
import {APP_MODULE_META} from '../../../app/providers/app.injection';

export const flat = (arr) => arr.reduce((acc, val) => acc.concat(val), []);
export const setEnabledByList = (list, prop) => (item) => ({
    ...item,
    enabled: list.includes(item[prop]),
});

export const getModuleNames = (project) =>
    project.modules.map((module) => module.name);

@Injectable()
export class ModulesService {
    public get modules(): AppModule[] {
        return this.appModules;
    }

    public constructor(
        @Inject(APP_MODULE_META)
        private appModules: AppModule[],
    ) {}

    public getProjectModules(
        project: Project,
        modules: AppModule[],
    ): AppModule[] {
        const names = getModuleNames(project);
        const mandatoryModules = modules.filter((module) => !module.optional);
        const optionalModules = modules
            .filter((module) => module.optional)
            .map(setEnabledByList(names, 'name'));

        return [...mandatoryModules, ...optionalModules];
    }

    public getModuleSettings(modules: AppModule[]): ModuleSettings[] {
        const settings = modules.map((appModule) => {
            if (appModule.settings && appModule.enabled) {
                return appModule.settings;
            }

            return [];
        });

        return flat(settings);
    }

    public getModuleMenus(modules: AppModule[]): ModuleMenu[] {
        const menus = modules.map((appModule) => {
            if (appModule.menus && appModule.enabled) {
                return appModule.menus;
            }

            return [];
        });

        return flat(menus);
    }
}
