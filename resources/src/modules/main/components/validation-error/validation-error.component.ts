import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: '[validation-error]',
    templateUrl: './validation-error.component.html',
    styleUrls: ['./validation-error.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ValidationErrorComponent),
            multi: true,
        },

        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ValidationErrorComponent),
            multi: true,
        },
    ],
})
export class ValidationErrorComponent
    implements OnInit, OnDestroy, ControlValueAccessor, Validator {
    @Input()
    public formControlName: string;
    public messages: string;

    public statusSubscription: Subscription;

    public constructor() {}

    public ngOnInit(): void {}

    public registerOnChange(fn: any): void {}

    public registerOnTouched(fn: any): void {}

    public setDisabledState(isDisabled: boolean): void {}

    public writeValue(obj: any): void {}

    public registerOnValidatorChange(fn: () => void): void {}

    public validate(control: AbstractControl): ValidationErrors | null {
        if (!this.statusSubscription) {
            this.statusSubscription = control.statusChanges.subscribe(() => {
                this.messages = this.getErrorsMessage(control.errors);
            });
        }

        return null;
    }

    public getErrorsMessage(errors): string | null {
        if (!errors) {
            return null;
        }

        const field = this.formControlName;
        if (errors.required) {
            return `The ${field} is required`;
        }

        if (errors.minlength) {
            return `The ${field} must be at least ${
                errors.minlength.requiredLength
            } characters`;
        }

        if (errors.maxlength) {
            return `The ${field} must be less than ${
                errors.maxlength.requiredLength
            } characters`;
        }

        if (errors.custom) {
            return errors.custom;
        }

        console.log(errors);
        return `The ${field} is invalid`;
    }

    ngOnDestroy(): void {
        if (this.statusSubscription) {
            this.statusSubscription.unsubscribe();
        }
    }
}
