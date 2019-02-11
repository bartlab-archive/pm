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
} from '../../store/actions/wiki.action';
import {selectWikiActive, selectWikiStatus} from '../../store/selectors/wiki';
import {RequestStatus} from '../../../../app/interfaces/api';
import {Observable} from 'rxjs/internal/Observable';
import {filter, map} from 'rxjs/operators';
import {Wiki} from '../../interfaces/wiki';

@Component({
    selector: 'app-wiki-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class WikiItemComponent implements OnInit, OnDestroy {

    public subscriptions: Subscription[] = [];
    public item$: Observable<Wiki>;
    public pending$: Observable<boolean> = this.store.pipe(select(selectWikiStatus));
    public params$: Observable<Params> = this.activatedRoute.params;

    public constructor(
        private store: Store<any>,
        private activatedRoute: ActivatedRoute,
        public router: Router
    ) {
    }

    public ngOnInit(): void {
        this.pending$ = this.store.pipe(select(selectWikiStatus), map(status => status === RequestStatus.pending));
        this.item$ = combineLatest(this.store.pipe(select(selectWikiActive)), this.params$)
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
    }

    public unwatch(id: number): void {
    }
}
