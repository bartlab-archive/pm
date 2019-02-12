import {Component, Input} from '@angular/core';
import {Status, UsersStatusNames} from '../../interfaces/users';

@Component({
    selector: 'app-user-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
})
export class UserStatusComponent {
    @Input()
    public value: number;

    public constructor() {
    }

    public get name(): string {
        return this.getStatusById(this.value).name;
    }

    public getStatusById(status): Status {
        return UsersStatusNames.find((item) => item.id === status);
    }

}
