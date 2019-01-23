import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class EnumerationsService {

    public constructor(private http: HttpClient) {
    }

    public all(params) {
        const queryParams = {...params};
        return this.http.get<any>('/api/v1/enumerations', {params: queryParams});
    }

    public getPriorities() {
        return this.all({type: 'IssuePriority'});
    }
}
