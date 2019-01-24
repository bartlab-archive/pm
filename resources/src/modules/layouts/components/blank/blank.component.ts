import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    LayoutsBlankDestroyAction,
    LayoutsBlankInitAction
} from '../../store/actions/blank.action';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-layouts-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit, OnDestroy {

    public constructor(
        private store: Store<any>
    ) {
    }

    public ngOnInit() {
        this.store.dispatch(new LayoutsBlankInitAction());
    }

    public ngOnDestroy() {
        this.store.dispatch(new LayoutsBlankDestroyAction());
    }
}
