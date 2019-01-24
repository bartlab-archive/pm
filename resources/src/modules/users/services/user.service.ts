import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    public constructor(private http: HttpClient) {
    }

    public all(params) {
        return this.http.get('/api/v1/users', {params});
    }

    public one(id) {
        return this.http.get(`/api/v1/users/${id}`);
    }

    public create() {
        return this.http.post('/api/v1/users/', {});
    }

    public update(id) {
        return this.http.post(`/api/v1/users/${id}`, {});
    }

    public delete(id) {
        return this.http.delete(`/api/v1/users/${id}`, {});
    }

}
