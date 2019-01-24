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
}
