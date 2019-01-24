// export enum ProjectStatus {
//     OPEN = 1,
//     CLOSE = 5,
//     ARCHIVE = 9,
// }
//
// export const projectStatusName = {
//     [ProjectStatus.OPEN]: 'Open',
//     [ProjectStatus.CLOSE]: 'Close',
//     [ProjectStatus.ARCHIVE]: 'Archive',
// };

import {Project} from '../../projects/interfaces/projects';

export interface FilterTag {
    name: string;
    type: string;
    id: number;
}

export interface Issue {
    id: number;
    subject: string;
    description: string;
    due_date: string;
    // fixed_version_id: null;
    // lock_version: number;
    created_on: string;
    updated_on: string;
    start_date: string;
    // done_ratio: boolean;
    // estimated_hours: null
    // parent_id: null
    // root_id: number
    is_private: boolean;
    closed_on: null;
    attachments: any[];
    // tracker: any
    project: Project;
}

//
// export interface PaginationParams {
//     page: number;
//     per_page: number;
//     order?: string[];
//     status_ids?: ProjectStatus[];
//     public?: boolean[];
// }
//
// export interface Member {}
//
// export interface Module {}
//
// export interface Meta {
//     current_page: number;
//     from: number;
//     last_page: number;
//     path: string;
//     per_page: string;
//     to: number;
//     total: number;
// }
//
// export interface Project {
//     default_version_id: string;
//     description: string;
//     homepage: string;
//     identifier: string;
//     inherit_members: boolean;
//     is_my: boolean;
//     is_public: boolean;
//     members: Member[];
//     modules: Module[];
//     name: string;
//     status: number;
// }
//
// export interface ProjectResponse {
//     data: Project;
// }
//
// export interface ListResponse {
//     data: Project[];
//     meta: Meta;
// }
//
// export interface Entities<T> {
//     [key: string]: T;
// }
