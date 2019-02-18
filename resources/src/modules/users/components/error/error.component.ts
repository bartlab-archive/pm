import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

interface ValidationMessage {
    type: string;
    message: string;
}

@Component({
    selector: 'app-form-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
})
export class ErrorFormComponent {
    @Input() types: Array<ValidationMessage>;
    @Input() form: FormGroup;
    @Input() field: string;

    public constructor() {
    }

    public isInvalid(controlName: string, type: string): boolean {
        const control = this.form.controls[controlName];
        if (!control.errors) {
            return false;
        }
        return control.errors[type] || false;
    }
}
