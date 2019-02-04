import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StatusesService {

    public constructor(private http: HttpClient) {
    }

    public all() {
        return this.http.get('/api/v1/statuses');
    }

    public one(id) {
        return this.http.get(`/api/v1/statuses/${id}`);
    }

    public create(params) {
        return this.http.post('/api/v1/statuses', params);
    }

    public update(id, params) {
        return this.http.put(`/api/v1/statuses/${id}`, params);
    }

    public remove(id) {
        return this.http.delete(`/api/v1/statuses/${id}`);
    }

}
