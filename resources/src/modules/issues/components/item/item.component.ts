import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Subscription, combineLatest} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {
    IssuesItemRequestAction,
    IssuesItemWatchRequestAction,
    IssuesItemUnwatchRequestAction,
} from '../../store/actions/issues.action';
import {selectIssuesActive, selectIssuesStatus} from '../../store/selectors/issues';
import {RequestStatus} from '../../../../app/interfaces/api';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';
import {Issue} from '../../interfaces/issues';

@Component({
    selector: 'app-issues-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class IssuesItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public item$: Observable<Issue>;
    public pending$: Observable<boolean> = this.store.pipe(select(selectIssuesStatus));
    public params$: Observable<Params> = this.activatedRoute.params;
    public id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
    ) {
    }

    public ngOnInit(): void {
        this.pending$ = this.store.pipe(select(selectIssuesStatus), map((status) => status === RequestStatus.pending));
        this.item$ = combineLatest(this.store.pipe(select(selectIssuesActive)), this.params$)
            .pipe(
                filter(([issue, params]) => issue && issue.id === Number(params.id)),
                map((([issue]) => issue)),
            );

        this.load();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    public load(): void {
        this.store.dispatch(new IssuesItemRequestAction(this.id));
    }

    public watch(): void {
        this.store.dispatch(new IssuesItemWatchRequestAction(this.id));
    }

    public unwatch(): void {
        this.store.dispatch(new IssuesItemUnwatchRequestAction(this.id));
    }
}
