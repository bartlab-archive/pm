import {Component, ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'users-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class UsersFilterComponent {
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl();
    filteredStatuses: Observable<string[]>;
    statuses: string[] = ['Lemon'];
    allStatuses: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor() {
        this.filteredStatuses = this.formControl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allStatuses.slice()));
    }

    add({ input, value }: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {

            if ((value || '').trim()) {
                this.statuses.push(value.trim());
            }

            if (input) {
                input.value = '';
            }

            this.formControl.setValue(null);
        }
    }

    remove(fruit: string): void {
        const index = this.statuses.indexOf(fruit);

        if (index >= 0) {
            this.statuses.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.statuses.push(event.option.viewValue);
        this.inputRef.nativeElement.value = '';
        this.formControl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allStatuses.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

}
