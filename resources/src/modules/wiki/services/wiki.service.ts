import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class WikiService {

    public constructor(private http: HttpClient) {
    }

    public list(params) {
        return this.http.get('/api/v1/wiki', {params});
    }

    public one(id) {
        return this.http.get(`/api/v1/wiki/${id}`);
    }
}
