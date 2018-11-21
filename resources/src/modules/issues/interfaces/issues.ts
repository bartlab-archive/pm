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

export interface FilterTag {
    name: string;
    type: string;
    id: number;
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
