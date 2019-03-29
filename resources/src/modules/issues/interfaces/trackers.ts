export interface Tracker {
    id: number;
    name: string;
    default_status_id: number;
    fields_bits: number;
}

export interface TrackerResponseData {
    enable: boolean;
    tracker: Tracker;
}

export interface TrackersAllResponse {
    data: Tracker[];
}

export interface TrackersIssueResponse {
    data: TrackerResponseData[];
}