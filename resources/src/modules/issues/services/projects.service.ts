import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ProjectsService {

    public constructor(private http: HttpClient) {
    }

    public all(params) {
        const queryParams = {...params};
        return this.http.get<any>('/api/v1/projects', {params: queryParams});
    }

    public getProjects() {
        return this.all({my: true})
    }

}
