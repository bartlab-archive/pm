import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IssueUpdate} from '../interfaces/issues';

@Injectable({
    providedIn: 'root',
})
export class IssuesService {

    public constructor(private http: HttpClient) {
    }

    public all(params) {
        return this.http.get('/api/v1/issues', {params});
    }

    public one(id) {
        return this.http.get(`/api/v1/issues/${id}`);
    }

    public watch(id) {
        return this.http.post(`/api/v1/issues/${id}/watch`, {});
    }

    public unwatch(id) {
        return this.http.delete(`/api/v1/issues/${id}/watch`, {});
    }

    public update(id, body: IssueUpdate) {
      //console.log('Update', id, body);
        return this.http.put(`/api/v1/issues/${id}`, body);
    }
}
