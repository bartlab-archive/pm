import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    public constructor(private http: HttpClient) {
    }

    public login(login, password): Observable<any> {
        return this.http
            .post('/api/v1/auth/login', {login, password})
            .pipe(
                tap((response) => {
                    const token = response.data.value;
                    const user = response.data.user;

                    console.log(token, user);

                    // return response;
                })
            );
    }

}
