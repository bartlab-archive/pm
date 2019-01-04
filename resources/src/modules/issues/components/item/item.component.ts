import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router,} from '@angular/router';
import {ItemRequestAction} from '../../store/actions/issues.action';
import {selectIssuesActive, selectIssuesStatus} from '../../store/selectors/issues';
import {RequestStatus} from '../../../../app/interfaces/api';

@Component({
    selector: 'app-issues-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class IssuesItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public item = null;
    private id: number = this.activatedRoute.snapshot.params['id'];
    public pending: boolean = false;

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
    }

    public ngOnInit(): void {

        this.subscriptions.push(
            this.store.pipe(select(selectIssuesStatus))
                .subscribe((status) => {
                    if (status === RequestStatus.pending) {
                        this.pending = true;
                    } else {
                        this.pending = false;
                    }
                }),

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
        this.store.dispatch(new ItemRequestAction(this.id));
    }
}
