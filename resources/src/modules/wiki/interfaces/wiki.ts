export interface FilterTag {
    id: number;
    type: string;
    name: string;
}

export interface Project {

}

export interface Wiki {
    id: number;
    subject: string;
    description: string;
    notes: string;
    due_date: string;
    status: any;
    priority: any;
    assigned: any;
    created_on: string;
    updated_on: string;
    start_date: string;
    done_ratio: null;
    estimated_hours: null;
    parent_id: null;
    is_private: boolean;
    closed_on: null;
    attachments: any[];
    tracker: any;
    project: any;
    watchers: any[];
    notes_private: boolean;
}
