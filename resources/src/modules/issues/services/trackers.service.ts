import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TrackersService {

    public constructor(private http: HttpClient) {
    }

    public all(identifier?) {
        const prefix = identifier ? 'projects/' + identifier + '/' : '';

        return this.http.get(`/api/v1/${prefix}trackers`);
    }

    public one(id) {
        return this.http.get(`/api/v1/trackers/${id}`);
    }

    public remove(id) {
        return this.http.delete(`/api/v1/trackers/${id}`);
    }

    public update(id, params) {
        return this.http.put(`/api/v1/trackers/${id}`, params);
    }

    public create(params) {
        return this.http.post('/api/v1/trackers', params);
    }
}
