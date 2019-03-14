export interface FilterTag {
    name: string;
    type?: string;
    id: number;
}

export interface Issue {
    id: number;
    subject: string;
    description: string;
    notes: string;
    due_date: string;
    status: any;
    priority: any;
    assigned: any;
    private_notes: boolean;
    // fixed_version_id: null;
    // lock_version: number;
    created_on: string;
    updated_on: string;
    start_date: string;
    done_ratio: null;
    estimated_hours: null;
    parent_id: null;
    // root_id: number
    is_private: boolean;
    closed_on: null;
    attachments: any[];
    tracker: any;
    project: any;
    watchers: any[];
}

export interface IssueSaveRequest {
    id?: number;
    body: IssueUpdate;
}

export interface IssueUpdate {
    assigned_to_id: number;
    description: string;
    done_ratio: string;
    due_date: string;
    estimated_hours: number;
    is_private: boolean;
    notes: string;
    parent_id: string;
    priority_id: number;
    private_notes: boolean;
    project_identifier: string;
    start_date: string;
    status_id: number;
    subject: string;
    tracker_id: number;
    watchers: any[];

}

export interface IssueResponse {
    data: Issue;
}