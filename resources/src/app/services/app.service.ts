import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AppService {
    public httpError$: Subject<any> = new Subject<any>();

    public onHttpError(event) {
        this.httpError$.next(event);
    }
}
