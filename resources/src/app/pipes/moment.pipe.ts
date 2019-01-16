import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({name: 'formattedDate'})
export class MomentPipe implements PipeTransform {
    transform(date: string, method: string, ...args: [any]) {
        return moment(date)[method](...args);
    }
}
