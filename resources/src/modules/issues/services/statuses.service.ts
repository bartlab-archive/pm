import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class StatusesService {

    public constructor(private http: HttpClient) {
    }

    public all() {
        return this.http.get('/api/v1/statuses');
    }

}
