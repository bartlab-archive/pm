import {
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import {Subscription, combineLatest} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {
    ItemRequestAction,
    ItemWatchRequestAction,
    ItemUnwatchRequestAction
} from '../../store/actions/issues.action';
import {selectIssuesStatus} from '../../store/selectors/issues';
import {RequestStatus} from '../../../../app/interfaces/api';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';
import {Issue} from '../../interfaces/issues';
import {IssuesSelectService} from '../../services';

@Component({
    selector: 'app-issues-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class IssuesItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public item$: Observable<Issue>;
    public pending$: Observable<boolean> = this.store.pipe(select(selectIssuesStatus));
    public params$: Observable<Params> = this.activatedRoute.params;

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        public issuesSelectService: IssuesSelectService,
    ) {
    }

    public ngOnInit(): void {
        this.pending$ = this.store.pipe(select(selectIssuesStatus), map(status => status === RequestStatus.pending));
        this.item$ = combineLatest(this.issuesSelectService.issue$, this.params$)
            .pipe(
                filter(([issue, params]) => issue && issue.id === Number(params.id)),
                map((([issue]) => issue)),
            );

        this.subscriptions.push(
            this.params$.subscribe(params => this.load(Number(params.id))),
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    public load(id: number): void {
        this.store.dispatch(new ItemRequestAction(id));
    }

    public watch(id: number): void {
        this.store.dispatch(new ItemWatchRequestAction(id));
    }

    public unwatch(id: number): void {
        this.store.dispatch(new ItemUnwatchRequestAction(id));
    }
}
