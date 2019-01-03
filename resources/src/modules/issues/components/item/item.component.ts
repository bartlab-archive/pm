import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router,} from '@angular/router';
import * as issuesActions from '../../store/actions/issues.action';
import {selectIssuesActive} from "../../store/selectors/issues";

@Component({
    selector: 'app-issues-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class IssuesItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public item = null;
    private id: number;

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
    }

    public ngOnInit(): void {
        const {id} = this.activatedRoute.snapshot.params;
        this.id = id;

        this.subscriptions.push(
            this.store.pipe(select(selectIssuesActive))
                .subscribe((data) => {
                        this.item = data;
                    }
                )
        );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public load(): void {
        if (this.id) {
            this.store.dispatch(new issuesActions.ItemRequestAction(this.id));
        }
    }

    public refresh(): void {
        this.load();
    }
}
