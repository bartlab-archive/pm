import {Component, Input, OnInit} from '@angular/core';
import {Status, UsersStatusNames} from '../../interfaces/users';

@Component({
    selector: 'user-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
})
export class UserStatusComponent implements OnInit {
    @Input() value: number;

    public name = 'unknown';

    public ngOnInit(): void {
        const status: Status = UsersStatusNames.find(
            (item) => item.id === this.value,
        );

        if (status) {
            this.name = status.name;
        }
    }
}
