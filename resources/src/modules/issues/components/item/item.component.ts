import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {Subscription, combineLatest} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {
    IssuesItemRequestAction,
    IssuesItemWatchRequestAction,
    IssuesItemUnwatchRequestAction,
    IssuesItemRemoveRequestAction,
} from '../../store/actions/issues.action';
import {selectIssuesActive, selectIssuesStatus} from '../../store/selectors/issues';
import {RequestStatus} from '../../../../app/interfaces/api';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';
import {Issue} from '../../interfaces/issues';
import {AppConfirmDialogComponent} from '../../../../app/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-issues-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class IssuesItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public pending$: Observable<boolean> = this.store.pipe(select(selectIssuesStatus));
    public params$: Observable<Params> = this.activatedRoute.params;
    public id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    public identifier: string = this.activatedRoute.snapshot.paramMap.get('identifier');
    public routerUrl: string = this.router.url;
    public removeRequestId = null;
    public item$: Observable<Issue> = combineLatest(this.store.pipe(select(selectIssuesActive)), this.params$)
        .pipe(
            filter(([issue, params]) => issue && issue.id === Number(params.id)),
            map((([issue]) => issue)),
        );
    public item: Issue;

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router,
        public dialog: MatDialog,
    ) {
    }

    public ngOnInit(): void {
        this.pending$ = this.store.pipe(select(selectIssuesStatus), map((status) => status === RequestStatus.pending));
        this.item$.subscribe((data) => this.item = data);
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

    public remove(item: Issue): void {
        const dialogRef = this.dialog.open((AppConfirmDialogComponent), {
            width: '500px',
            data: {text: `Do you want to delete "${item.subject}" issue?`},
        });
        dialogRef.afterClosed()
            .pipe(
                filter((result) => Boolean(result)),
            )
            .subscribe(() => {
                const action = new IssuesItemRemoveRequestAction(this.id);
                this.removeRequestId = action.requestId;
                this.store.dispatch(action);
            });
    }

    public add() {
        if (this.item && this.item.project) {
            this.router.navigateByUrl(`projects/${this.item.project.identifier}/issues/new`);
        } else {
            this.router.navigateByUrl('new');
        }
    }

    public goToBack() {
        if (this.identifier) {
            this.router.navigateByUrl(`projects/${this.identifier}/issues`);
        } else {
            this.router.navigateByUrl(`issues`);
        }
    }
}
