import {Injectable} from '@angular/core';
import {Project} from '../interfaces/projects';

@Injectable({
    providedIn: 'root',
})
export class ModulesService {
    public get modules() {
        // ['name' => 'issue_tracking', 'title' => 'Issue tracking', 'enabled' => false],
        // ['name' => 'time_tracking', 'title' => 'Time tracking', 'enabled' => false],
        // ['name' => 'news', 'title' => 'News', 'enabled' => false],
        // ['name' => 'documents', 'title' => 'Documents', 'enabled' => false],
        // ['name' => 'files', 'title' => 'Files', 'enabled' => false],
        // ['name' => 'wiki', 'title' => 'Wiki', 'enabled' => false],
        // ['name' => 'repository', 'title' => 'Repository', 'enabled' => false],
        // ['name' => 'boards', 'title' => 'Forums', 'enabled' => false],
        // ['name' => 'calendar', 'title' => 'Calendar', 'enabled' => false],
        // ['name' => 'gantt', 'title' => 'Gantt', 'enabled' => false],
        return [
            {
                title: 'Issue Tracking',
                name: 'issue_tracking',
                enabled: false,
            },

            {
                title: 'Time tracking',
                name: 'time_tracking',
                enabled: false,
            },

            {
                title: 'News',
                name: 'news',
                enabled: false,
            },

            {
                title: 'Documents',
                name: 'documents',
                enabled: false,
            },

            {
                title: 'Files',
                name: 'files',
                enabled: false,
            },

            {
                title: 'Wiki',
                name: 'wiki',
                enabled: false,
            },

            {
                title: 'Repository',
                name: 'repository',
                enabled: false,
            },

            {
                title: 'Forums',
                name: 'boards',
                enabled: false,
            },

            {
                title: 'Calendar',
                name: 'calendar',
                enabled: false,
            },

            {
                title: 'Gantt',
                name: 'gantt',
                enabled: false,
            },
        ];
    }

    public constructor() {}

    public getProjectModules(project: Project) {
        const names = project.modules.map((module) => module.name);
        return this.modules.map((module) => ({
            ...module,
            enabled: names.includes(module.name),
        }));
    }
}
