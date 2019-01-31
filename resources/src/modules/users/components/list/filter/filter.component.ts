import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Status, UsersStatusNames} from "../../../interfaces/users";

const equalById = value => ({id}) => id == value;

@Component({
    selector: 'users-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class UsersFilterComponent {
    @Output() onChange = new EventEmitter<Status[]>();

    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl();
    filteredStatuses: Observable<Status[]>;
    statuses: Status[] = [];
    allStatuses: Status[] = UsersStatusNames;

    @ViewChild('inputRef') inputRef: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor() {
        this.filteredStatuses = this.formControl.valueChanges.pipe(
            startWith(null),
            map((status: string | null) => status ? this._filter(status) : this.allStatuses.slice()));
    }

    add({input}: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            if (input) {
                input.value = '';
            }

            this.formControl.setValue(null);
        }
    }

    remove(state: Status): void {
        const index = this.statuses.indexOf(state);

        if (index >= 0) {
            this.statuses.splice(index, 1);
        }

        this.onChange.emit(this.statuses);
    }


    selected(event: MatAutocompleteSelectedEvent): void {
        const {value} = event.option;
        const includes = this.statuses.some(equalById(value));
        if (includes) {
            return;
        }

        const status = this.allStatuses.find(equalById(value));
        this.statuses.push(status);

        this.inputRef.nativeElement.value = '';
        this.formControl.setValue(null);
        this.onChange.emit(this.statuses);
    }

    private _filter(value: string): Status[] {
        if (!value) {
            return this.allStatuses.slice();
        }
        const filterValue = String(value).toLowerCase();
        return this.allStatuses.filter(status => status.name.toLowerCase().indexOf(filterValue) === 0);
    }

}
