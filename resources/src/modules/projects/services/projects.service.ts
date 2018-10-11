import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromProjects from '../store/reducers';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {
    private data = null;

    public constructor(
        private http: HttpClient,
        private store: Store<any>,
    ) {
        this.store.pipe(select(fromProjects.selectProjectsData)).subscribe((data) => {
            this.data = data;
        });
    }

    public all(params = {}): Observable<any> {
        return this.http.get<any>('/api/v1/projects', {params});
    }
}
