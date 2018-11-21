import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class IssuesService {

    public constructor(private http: HttpClient) {
    }

    public all(params) {
        return this.http.get('/api/v1/issues', {params});
    }

}
