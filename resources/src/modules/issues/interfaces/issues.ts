import {Project, User} from './projects';
import {Status} from './statuses';

export interface FilterTag {
    name: string;
    type?: string;
    id: number;
}

export interface Attachment {
    author?: User;
    content_type: string;
    created_on: string;
    description: string;
    filename: string;
    filesize: number;
    id: number;
}

export interface Detail {
    old_value: string;
    prop_key: string;
    property: string;
    value: string;
}

export interface Journal {
    created_on: string;
    details: Detail;
    notes: string;
    user?: User;
}

export interface Priority {
    id: number;
    name: string;
    position: number;
    is_default: boolean;
    active: boolean;
}

export interface Tracker {
    id: number;
    name: string;
    fields_bits: number;
    default_status_id: number;
}

export interface Issue {
    assigned?: User;
    attachments: Attachment[];
    author?: User;
    category: number;
    closed_on: string;
    created_on: string;
    description: string;
    done_ratio: number;
    due_date: string;
    estimated_hours: number;
    fixed_version_id: null;
    id: number;
    is_private: boolean;
    is_watcheble: boolean;
    journals: Journal[];
    lock_version: number;
    parent_id: number;
    priority: Priority;
    project?: Project;
    root_id: number;
    start_date: string;
    status: Status;
    subject: string;
    tracker: Tracker;
    trackers: Tracker[];
    updated_on: string;
    watchers?: User[];
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