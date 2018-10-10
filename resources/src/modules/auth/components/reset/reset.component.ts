import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-auth-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss']
})
export class ResetComponent {

    public form = this.fb.group({
        'email': []
    });

    public constructor(private fb: FormBuilder) {
    }


    public getErrorMessage() {
        return '';
    }

    public submit() {

    }
}
