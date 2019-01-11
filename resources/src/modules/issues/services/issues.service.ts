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

    public one(id) {
        return this.http.get(`/api/v1/issues/${id}`);
    }

    public watch(data) {
        const {id, is_watcheble} = data;

        if (is_watcheble) {
            return this.http.delete(`/api/v1/issues/${id}/watch`, {});
        }

        return this.http.post(`/api/v1/issues/${id}/watch`, {});
    }

}
