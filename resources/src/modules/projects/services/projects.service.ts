import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    public constructor(private http: HttpClient, private store: Store<any>) {}

    public all(params): Observable<any> {
        const queryParams = { ...params };
        if (queryParams.status_ids && queryParams.status_ids.length > 0) {
            queryParams['status_ids[]'] = [...queryParams.status_ids];
            delete queryParams.status_ids;
        }

        return this.http.get<any>('/api/v1/projects', { params: queryParams });
    }

    public one(identifier: string): Observable<any> {
        return this.http.get<any>(`/api/v1/projects/${identifier}`);
    }
}
